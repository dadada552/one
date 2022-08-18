<template>
  <div
    class="vip"
    v-loading="loading"
    element-loading-text="正在加载中..."
    element-loading-background="rgba(122, 122, 122, 0.8)"
  >
    <title-box borderColor="yellowgreen" title="会员管理"></title-box>

    <el-form :inline="true" :model="vipForm" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="vipForm.cardNum"
          placeholder="会员卡号"
          size="large"
        />
      </el-form-item>

      <el-form-item>
        <el-input v-model="vipForm.name" placeholder="会员名字" size="large" />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="vipForm.payType"
          placeholder="支付方式"
          size="large"
        >
          <el-option label="现金" value="1" />
          <el-option label="微信" value="2" />
          <el-option label="支付宝" value="3" />
          <el-option label="银行卡" value="4" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="vipForm.birthday"
          type="date"
          placeholder="出生日期"
          size="large"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="cardNum" label="会员卡号" width="180" />
      <el-table-column prop="name" label="会员姓名" width="90" />
      <el-table-column prop="birthday" label="会员生日" width="120" />
      <el-table-column prop="phone" label="手机号码" width="150" />
      <el-table-column prop="integral" label="可用积分" width="90" />
      <el-table-column prop="money" label="开卡金额" width="90" />
      <el-table-column label="支付类型" width="90">
        <template #default="scope">
          <span v-if="scope.row.payType == 1">现金</span>
          <span v-else-if="scope.row.payType == 2">微信</span>
          <span v-else-if="scope.row.payType == 3">支付宝</span>
          <span v-else>银行卡</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" />
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
      title="编辑会员"
      @closed="dialogReset(ruleFormRef)"
    >
      <el-form
        :model="vipUser"
        ref="ruleFormRef"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="vipUser.cardNum" placeholder="会员卡号" />
        </el-form-item>

        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="vipUser.name" placeholder="会员姓名" />
        </el-form-item>

        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            v-model="vipForm.birthday"
            type="date"
            placeholder="会员生日"
          />
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="vipUser.phone" placeholder="手机号码" />
        </el-form-item>

        <el-form-item label="开卡金额" prop="money">
          <el-input v-model.number="vipUser.money" placeholder="开卡金额" />
        </el-form-item>

        <el-form-item label="可用积分" prop="integral">
          <el-input v-model.number="vipUser.integral" placeholder="可用积分" />
        </el-form-item>

        <el-form-item label="支付方式" prop="payType">
          <el-select v-model="vipUser.payType" placeholder="支付方式">
            <el-option label="现金" value="1" />
            <el-option label="微信" value="2" />
            <el-option label="支付宝" value="3" />
            <el-option label="银行卡" value="4" />
          </el-select>
        </el-form-item>

        <el-form-item label="会员地址" prop="address">
          <el-input v-model="vipUser.address" type="textarea" />
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
  name: "VipView",
  components: {
    TitleBox,
  },
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const BASE_URL = "http://vue.mengxuegu.com/pro-api";

    const loading = ref(true);

    interface vipUser {
      address: string;
      birthday: string;
      cardNum: string;
      id: number;
      integral: number;
      money: number;
      name: string;
      payType: string;
      phone: string;
    }
    interface Data {
      vipForm: {
        cardNum: string;
        name: string;
        payType: string;
        birthday: string;
      };

      vipUser: vipUser;

      tableData: Array<vipUser>;
      total: number;
      currentPage: number;
      pageSize: number;

      dialogVisible: boolean;
      id: number;
    }
    const data = reactive<Data>({
      vipForm: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },

      vipUser: {
        address: "",
        birthday: "",
        cardNum: null,
        id: null,
        integral: 0,
        money: 0,
        name: "",
        payType: "",
        phone: "",
      },

      tableData: [],
      total: 100,
      currentPage: 1,
      pageSize: 10,

      dialogVisible: false,
      id: null,
    });

    axios
      .post(BASE_URL + "/member/list/search/0/0", data.vipForm)
      .then((res) => {
        console.log(res);
        data.tableData = res.data.data.rows;
        data.total = res.data.data.total;
        loading.value = false;
      });

    const search = (): void => {
      loading.value = true;
      axios
        .post(BASE_URL + "/member/list/search/0/0", data.vipForm)
        .then((res) => {
          console.log(res);
          data.tableData = res.data.data.rows;
          data.total = res.data.data.total;
          loading.value = false;
        });
    };
    const reset = (): void => {
      data.vipForm = {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      };
    };

    const rules = reactive({
      cardNum: [
        {
          required: true,
          message: "卡号不能为空",
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
      payType: [
        {
          required: true,
          message: "支付类型不能为空",
          trigger: "blur",
        },
      ],
      address: [],
      birthday: [],
      id: [],
      integral: [],
      money: [],
      phone: [],
    });

    const add = (formEl: FormInstance | undefined): void => {
      if (!formEl) return;
      loading.value = true;
      formEl.validate((valid) => {
        if (valid) {
          axios.post(BASE_URL + "/member/", data.vipUser).then((res) => {
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
      axios.get(BASE_URL + "/member/" + id).then((res) => {
        data.dialogVisible = true;
        data.id = id;
        setTimeout(() => {
          data.vipUser = res.data.data;
        },0);
      });
    };

    const del = (id: number) => {
      ElMessageBox.confirm("确定要删除这条记录吗？", "提示 ", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          axios.delete(BASE_URL + "/member/" + id).then((res) => {
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
.vip {
  ::v-deep .el-form-item {
    margin-right: 18px;
  }
}
</style>
