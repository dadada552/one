<template>
  <div
    class="staff"
    v-loading="loading"
    element-loading-text="正在加载中..."
    element-loading-background="rgba(122, 122, 122, 0.8)"
  >
    <title-box borderColor="yellowgreen" title="供应商管理"></title-box>

    <el-form :inline="true" :model="staffForm" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="staffForm.username"
          placeholder="账号"
          size="large"
        />
      </el-form-item>

      <el-form-item>
        <el-input v-model="staffForm.name" placeholder="姓名" size="large" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="name" label="姓名" width="90" />
      <el-table-column prop="age" label="年龄" width="90" />
      <el-table-column prop="mobile" label="联系电话" />
      <el-table-column prop="salary" label="薪酬" width="90" />
      <el-table-column prop="entryDate" label="入职时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="search"
      @current-change="search"
    />

    <el-dialog
      v-model="dialogVisible"
      width="500px"
      title="编辑供应商"
      @closed="dialogReset(ruleFormRef)"
    >
      <el-form
        :model="staffUser"
        ref="ruleFormRef"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="staffUser.username" placeholder="账号" />
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="staffUser.name" placeholder="姓名" />
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="staffUser.age" placeholder="年龄" />
        </el-form-item>

        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="staffUser.mobile" placeholder="联系电话" />
        </el-form-item>

        <el-form-item label="薪酬" prop="salary">
          <el-input v-model="staffUser.salary" placeholder="薪酬" />
        </el-form-item>

        <el-form-item label="入职时间" prop="entryDate">
          <el-date-picker
            v-model="staffUser.entryDate"
            type="date"
            placeholder="会员生日"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="add(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, reactive, toRefs } from "vue";
import axios from "axios";
import TitleBox from "../components/TitleBox.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

export default {
  name: "StaffView",
  components: {
    TitleBox,
  },
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const BASE_URL = "http://vue.mengxuegu.com/pro-api";

    const loading = ref(true);

    interface StaffUser {
      entryDate: string;
      username: string;
      age: string;
      salary: string;
      id: number;
      name: string;
      mobile: string;
    }
    interface Data {
      staffForm: {
        username: string;
        name: string;
      };

      staffUser: StaffUser;

      tableData: Array<StaffUser>;
      total: number;
      currentPage: number;
      pageSize: number;

      dialogVisible: boolean;
      id: number;
    }
    const data = reactive<Data>({
      staffForm: {
        username: "",
        name: "",
      },

      staffUser: {
        entryDate: "",
        username: "",
        id: null,
        age: "",
        salary: "",
        name: "",
        mobile: "",
      },

      tableData: [],
      total: 100,
      currentPage: 1,
      pageSize: 10,

      dialogVisible: false,
      id: null,
    });

    axios
      .post(BASE_URL + "/staff/list/search/0/0", data.staffForm)
      .then((res) => {
        console.log(res);
        data.tableData = res.data.data.rows;
        data.total = res.data.data.total;
        loading.value = false;
      });

    const search = (): void => {
      loading.value = true;
      axios
        .post(BASE_URL + "/staff/list/search/0/0", data.staffForm)
        .then((res) => {
          console.log(res);
          data.tableData = res.data.data.rows;
          data.total = res.data.data.total;
          loading.value = false;
        });
    };
    const reset = (): void => {
      data.staffForm = {
        username: "",
        name: "",
      };
    };

    const rules = reactive({
      username: [
        {
          required: true,
          message: "名称不能为空",
          trigger: "blur",
        },
      ],
      name: [
        {
          required: true,
          message: "姓名不能为空",
          trigger: "blur",
        },
      ],
      mobile: [],
      entryDate: [],
      id: [],
      age: [],
      salary: [],
    });

    const add = (formEl: FormInstance | undefined): void => {
      if (!formEl) return;
      loading.value = true;
      formEl.validate((valid) => {
        if (valid) {
          axios.post(BASE_URL + "/staff/", data.staffUser).then((res) => {
            data.dialogVisible = false;
            search();
            data.id = null;
            loading.value = false;
          });
        } else {
          console.log("error submit!");
          loading.value = false;
          return false;
        }
      });
    };
    const dialogReset = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const edit = (id: number) => {
      axios.get(BASE_URL + "/staff/" + id).then((res) => {
        data.dialogVisible = true;
        data.id = id;
        setTimeout(() => {
          data.staffUser = res.data.data;
        }, 0);
      });
    };

    const del = (id: number) => {
      ElMessageBox.confirm("确定要删除这条记录吗？", "提示 ", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          axios.delete(BASE_URL + "/staff/" + id).then((res) => {
            search();
            console.log(res);
            ElMessage({
              type: "success",
              message: "删除成功",
            });
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "删除已取消",
          });
        });
    };

    return {
      loading,
      ruleFormRef,
      ...toRefs(data),
      search,
      reset,
      add,
      dialogReset,
      rules,
      edit,
      del,
    };
  },
};
</script>

<style scoped lang="scss">
.staff {
  ::v-deep .el-form-item {
    margin-right: 18px;
  }
}
</style>
