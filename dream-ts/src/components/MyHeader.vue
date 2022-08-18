<template>
  <div class="my-header">
    <header>
      <img width="25" src="http://vue.mengxuegu.com/img/logo.7156be27.png" />
      <span class="title">梦学谷会员管理系统</span>
      <div class="user">
        <el-dropdown @command="loginEdit">
          <span class="el-dropdown-link" style="color: #fff">
            {{ admin.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="edit">
                <el-icon><EditPen /></el-icon>
                修改密码
              </el-dropdown-item>
              <el-dropdown-item command="exit">
                <el-icon><Fold /></el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>
    <el-dialog
      v-model="dialogFormVisible"
      width="600px"
      title="修改密码"
      @closed="formReset(ruleFormRef)"
    >
      <el-form
        ref="ruleFormRef"
        :model="editFrom"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="原密码" prop="original">
          <el-input
            type="password"
            v-model="editFrom.original"
            placeholder="请输入原密码"
          />
        </el-form-item>

        <el-form-item label="新密码" prop="password">
          <el-input
            type="password"
            v-model="editFrom.password"
            placeholder="请输入密码"
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="affirm">
          <el-input
            type="password"
            v-model="editFrom.affirm"
            placeholder="请确认密码"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="editPassword(ruleFormRef)"
            >提交</el-button
          >
          <el-button @click="formReset(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";

export default {
  name: "MyHeader",
  components: {},
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const router = useRouter();
    const BASE_URL = "http://vue.mengxuegu.com/pro-api";

    interface Data {
      admin: {
        id: number;
        name: string;
        roles: Array<any>;
      };
      dialogFormVisible: boolean;
      editFrom: {
        original: string;
        password: string;
        affirm: string;
      };
    }
    const data = reactive<Data>({
      admin: {
        id: 0,
        name: "",
        roles: [],
      },
      dialogFormVisible: false,
      editFrom: {
        original: "",
        password: "",
        affirm: "",
      },
    });

    const adminStr = sessionStorage.getItem("admin") || "";
    data.admin = JSON.parse(adminStr);

    const loginEdit = (command: string): void => {
      if (command == "edit") {
        data.dialogFormVisible = true;
      }
      if (command == "exit") {
        axios
          .post(BASE_URL + "/user/logout", { token: "admin" })
          .then((res) => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("admin");
            router.push("/login");
          });
      }
    };

    const queryPassword = (rule: any, value: any, callback: any): void => {
      if (value.length == 0) {
        callback(new Error("密码不能为空"));
      } else {
        axios
          .post(BASE_URL + "/user/pwd", {
            userId: data.admin.id,
            password: data.editFrom.password,
          })
          .then((res) => {
            if (!res.data.flag) {
              callback(new Error("密码错误"));
            } else {
              callback();
            }
          });
      }
    };
    const affirmPassword = (rule: any, value: any, callback: any): void => {
      if (value.length == 0) {
        callback(new Error("密码不能为空"));
      } else if (data.editFrom.password != value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const rules = reactive({
      original: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
        {
          validator: queryPassword,
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
      ],
      affirm: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
        {
          validator: affirmPassword,
          trigger: "blur",
        },
      ],
    });

    const editPassword = (formEl: FormInstance | undefined): void => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          axios
            .post(BASE_URL + "/user/pwd", {
              userId: data.admin.id,
              password: data.editFrom.password,
            })
            .then((res) => {
              if (res.data.flag) {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("admin");
                router.push("/login");
                ElMessage.warning("密码修改成功");
              } else {
                ElMessage.error(res.data.message);
              }
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    const formReset = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    return {
      ...toRefs(data),
      loginEdit,
      rules,
      editPassword,
      formReset,
      ruleFormRef,
    };
  },
};
</script>

<style scoped lang="scss">
header {
  height: 50px;
  line-height: 50px;
  padding: 0 40px;
  background-color: #2d3a4b;
  img {
    vertical-align: middle;
  }
  .title {
    padding: 0 10px;
    color: #fff;
  }
  .user {
    float: right;
    ::v-deep .el-dropdown {
      line-height: 50px;
    }
  }
}
</style>
