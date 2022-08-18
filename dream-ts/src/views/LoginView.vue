<template>
  <div class="login">
    <div class="from-box">
      <p class="title">梦学谷会员管理系统</p>
      <el-form
        ref="ruleFormRef"
        :model="loginFrom"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginFrom.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginFrom.password"
            placeholder="请输入密码"
          />
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="login(ruleFormRef)">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";

export default {
  name: "LoginView",
  components: {},
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const router = useRouter();
    const BASE_URL = "http://vue.mengxuegu.com/pro-api";

    interface Data {
      loginFrom: {
        username: string;
        password: string;
      };
    }
    const data = reactive<Data>({
      loginFrom: {
        username: "",
        password: "",
      },
    });

    interface FormRules {
      username: Array<object>;
      password: Array<object>;
    }
    const rules = reactive<FormRules>({
      username: [
        {
          required: true,
          message: "账号不能为空",
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
    });

    const login = (formEl: FormInstance | undefined): void => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          axios.post(BASE_URL + "/user/login", data.loginFrom).then((res) => {
            if (res.data.flag) {
              sessionStorage.setItem("token", res.data.data.token);

              axios.get(BASE_URL + "/user/info/admin").then((res) => {
                sessionStorage.setItem("admin", JSON.stringify(res.data.data));

                router.push("/");
              });
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

    return {
      ...toRefs(data),
      rules,
      login,
      ruleFormRef,
    };
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  background-image: url("../assets/background.jpg");
  background-position: center center;
  background-repeat: no-repeat;

  .from-box {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    width: 350px;
    background-color: rgba($color: #fff, $alpha: 0.75);
    border-radius: 16px;

    .title {
      margin: 10px 0;
      text-align: center;
      font-size: 24px;
      font-weight: 550;
    }

    .btn {
      text-align: center;
    }
  }
}
</style>
