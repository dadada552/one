<template>
  <div
    class="goods"
    v-loading="loading"
    element-loading-text="正在加载中..."
    element-loading-background="rgba(122, 122, 122, 0.8)"
  >
    <title-box borderColor="yellowgreen" title="会员管理"></title-box>

    <el-form :inline="true" :model="goodsForm" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="goodsForm.name"
          placeholder="商品名称"
          size="large"
        />
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="goodsForm.code"
          placeholder="商品编码"
          size="large"
        />
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="goodsForm.supplierName"
          placeholder="选择供应商"
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
      <el-table-column prop="name" label="商品名称" width="110" />
      <el-table-column prop="code" label="商品编码" width="90" />
      <el-table-column prop="spec" label="商品规格" width="90" />
      <el-table-column prop="retailPrice" label="零售价" width="150" />
      <el-table-column prop="purchasePrice" label="进货价" width="120" />
      <el-table-column prop="storageNum" label="库存数量" width="90" />
      <el-table-column prop="supplierName" label="供应商" />
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
        :model="goodsUser"
        ref="ruleFormRef"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsUser.name" placeholder="商品名称" />
        </el-form-item>

        <el-form-item label="商品编码" prop="code">
          <el-input v-model="goodsUser.code" placeholder="商品编码" />
        </el-form-item>

        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="goodsUser.spec" placeholder="商品规格" />
        </el-form-item>

        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="goodsUser.retailPrice" placeholder="零售价" />
        </el-form-item>

        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="goodsUser.purchasePrice" placeholder="进货价" />
        </el-form-item>

        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="goodsUser.storageNum" placeholder="库存数量" />
        </el-form-item>

        <el-form-item label="供应商" prop="supplierName">
          <el-input v-model="goodsUser.supplierName" type="textarea" />
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
  name: "GoodsView",
  components: {
    TitleBox,
  },
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const BASE_URL = "http://vue.mengxuegu.com/pro-api";

    const loading = ref(true);

    interface GoodsUser {
      supplierName: string;
      purchasePrice: string;
      code: string;
      id: number;
      spec: string;
      storageNum: number;
      name: string;
      supplierId: number;
      retailPrice: string;
    }
    interface Data {
      goodsForm: {
        code: string;
        name: string;
        supplierId: string;
        purchasePrice: string;
      };

      goodsUser: GoodsUser;

      tableData: Array<GoodsUser>;
      total: number;
      currentPage: number;
      pageSize: number;

      dialogVisible: boolean;
      id: number;
    }
    const data = reactive<Data>({
      goodsForm: {
        code: "",
        name: "",
        supplierId: "",
        purchasePrice: "",
      },

      goodsUser: {
        supplierName: "",
        purchasePrice: "0",
        code: "",
        id: null,
        spec: "",
        storageNum: 0,
        name: "",
        supplierId: null,
        retailPrice: "0",
      },

      tableData: [],
      total: 100,
      currentPage: 1,
      pageSize: 10,

      dialogVisible: false,
      id: null,
    });

    axios
      .post(BASE_URL + "/goods/list/search/0/0", data.goodsForm)
      .then((res) => {
        console.log(res);
        data.tableData = res.data.data.rows;
        data.total = res.data.data.total;
        loading.value = false;
      });

    const search = (): void => {
      loading.value = true;
      axios
        .post(BASE_URL + "/goods/list/search/0/0", data.goodsForm)
        .then((res) => {
          console.log(res);
          data.tableData = res.data.data.rows;
          data.total = res.data.data.total;
          loading.value = false;
        });
    };
    const reset = (): void => {
      data.goodsForm = {
        code: "",
        name: "",
        supplierId: "",
        purchasePrice: "",
      };
    };

    const rules = reactive({
      code: [
        {
          required: true,
          message: "商品编码不能为空",
          trigger: "blur",
        },
      ],
      name: [
        {
          required: true,
          message: "商品名称不能为空",
          trigger: "blur",
        },
      ],
      retailPrice: [
        {
          required: true,
          message: "零售价不能为空",
          trigger: "blur",
        },
      ],
      supplierId: [],
      supplierName: [],
      purchasePrice: [],
      id: [],
      spec: [],
      storageNum: [],
    });

    const add = (formEl: FormInstance | undefined): void => {
      if (!formEl) return;
      loading.value = true;
      formEl.validate((valid) => {
        if (valid) {
          axios.post(BASE_URL + "/goods/", data.goodsUser).then((res) => {
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
      axios.get(BASE_URL + "/goods/" + id).then((res) => {
        data.dialogVisible = true;
        data.id = id;
        setTimeout(() => {
          data.goodsUser = res.data.data;
        }, 0);
      });
    };

    const del = (id: number) => {
      ElMessageBox.confirm("确定要删除这条记录吗？", "提示 ", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          axios.delete(BASE_URL + "/goods/" + id).then((res) => {
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
.goods {
  ::v-deep .el-form-item {
    margin-right: 18px;
  }
}
</style>
