// 结构
<template>
  <div>
    <!-- 头部面包屑 -->
    <breadcrumb title="商品管理"></breadcrumb>
    <!-- 头部功能栏 -->
    <div class="header-tool">
      <!-- 商品名称 -->
      <el-input
        v-model="memberForm.name"
        placeholder="商品名称"
        style="width: 200px; margin-right: 10px"
      ></el-input>
      <!-- 商品编号 -->
      <el-input
        v-model="memberForm.code"
        placeholder="商品编号"
        style="width: 200px; margin-right: 10px"
      ></el-input>
      <!-- 选择供应商 -->
      <el-input
        v-model="memberForm.supplierName"
        placeholder="选择供应商"
        style="width: 200px; margin-right: 10px"
        @focus="openGys"
      ></el-input>
      <!-- 查询 -->
      <el-button type="primary" @click="search">查询</el-button>
      <!-- 新增 -->
      <el-button type="primary" @click="addMember">新增</el-button>
      <!-- 重置 -->
      <el-button @click="remake">重置</el-button>
    </div>
    <!-- 表格部分 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 20px"
      max-height="450"
    >
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="code" label="商品编码"> </el-table-column>
      <el-table-column prop="spec" label="商品规格"> </el-table-column>
      <el-table-column prop="retailPrice" label="零售价"> </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"> </el-table-column>
      <el-table-column prop="storageNum" label="库存数量"> </el-table-column>
      <el-table-column prop="supplierName" label="供应商"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog
      :title="addEditFlag ? '添加商品' : '编辑商品'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="商品名称" label-width="90px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" label-width="90px" prop="code">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" label-width="90px">
          <el-input v-model="form.spec" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="零售价" label-width="90px" prop="retailPrice">
          <el-input v-model="form.retailPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货价" label-width="90px">
          <el-input v-model="form.purchasePrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" label-width="90px">
          <el-input v-model="form.storageNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商" label-width="90px">
          <el-input
            v-model="form.supplierName"
            autocomplete="off"
            @focus="openGys"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn" style="float: right">
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 表格对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <p>
        <el-input
          v-model="name"
          placeholder="供应商名称"
          style="width: 200px; margin-right: 10px"
        ></el-input>
        <el-button type="primary" @click="search1">查询</el-button>
      </p>
      <el-table :data="supplierData" max-height="450" @row-click="rowclick">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          property="name"
          label="供应商名称"
          width="200"
        ></el-table-column>
        <el-table-column property="linkman" label="联系人"></el-table-column>
      </el-table>
      <!-- 对话框分页 -->
      <el-pagination
        @current-change="handleCurrentChange1"
        style="margin-top: 10px"
        layout="prev, pager, next"
        :total="total1"
      >
      </el-pagination>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

// 行为
<script>
import axios from "axios";
import breadcrumb from "../components/headBreacrumb.vue";
export default {
  name: "",
  components: {
    breadcrumb,
  },
  data() {
    return {
      // 当前页码
      page: 1,
      // 每页条数
      pageSize: 10,
      // 总数
      total: 0,
      // 头部功能栏数据
      memberForm: {
        name: "", //商品名称
        code: "", //商品编号
        supplierName: "", //供应商名字
      },
      // 表格数据
      tableData: [],
      // 对话框状态
      dialogFormVisible: false,
      // 对话框表单
      form: {
        code: "",
        name: "",
        purchasePrice: "",
        retailPrice: "",
        spec: "",
        storageNum: "",
        supplierName: "",
      },
      // 对话框表单规则
      rules: {
        name: { required: true, message: "请输入商品名称", trigger: "blur" },
        code: { required: true, message: "请输入商品编码", trigger: "blur" },
        retailPrice: {
          required: true,
          message: "请输入零售价",
          trigger: "blur",
        },
      },
      // 添加编辑的状态
      addEditFlag: false, // false 为编辑 true 为添加
      // 暂缓编辑ID
      editID: "",
      // 表格对话框
      dialogTableVisible: false,
      // 供应商数据
      supplierData: [],
      // 表格分页数据
      page1: 1,
      total1: 0,
      name: "",
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    // 回显供应商名称
    rowclick(row) {
      this.memberForm.supplierName = row.name;
      this.dialogTableVisible = false;
      this.form.supplierName = row.name;
    },
    // 表格分页
    handleCurrentChange1(val) {
      this.page1 = val;
      axios.post(`/supplier/list/search/${this.page1}/10`).then((res) => {
        this.supplierData = res.data.data.rows;
        this.total1 = res.data.data.total;
      });
    },
    // 选择供应商
    openGys() {
      this.dialogTableVisible = true;
      axios.post(`/supplier/list/search/${this.page1}/10`).then((res) => {
        this.supplierData = res.data.data.rows;
        this.total1 = res.data.data.total;
      });
    },
    // 重置
    remake() {
      this.memberForm = {
        name: "", //商品名称
        code: "", //商品编号
        supplierName: "", //供应商名字
      };
      this.getList();
    },
    // 新增
    addMember() {
      this.form = {
        code: "",
        name: "",
        purchasePrice: "",
        retailPrice: "",
        spec: "",
        storageNum: "",
        supplierName: "",
      };
      this.addEditFlag = true;
      this.dialogFormVisible = true;
    },
    // 请求列表
    getList() {
      this.$axios
        .post(`/goods/list/search/${this.page}/${this.pageSize}`)
        .then((res) => {
          if (res.data.code == 2000) {
            // 请求成功
            this.tableData = res.data.data.rows;
            this.total = res.data.data.total;
          }
        });
    },
    // 编辑
    handleEdit(index, row) {
      this.addEditFlag = false;
      this.dialogFormVisible = true;
      // 暂缓id
      this.editID = row.id;
      console.log(this.editID);
      axios.get(`/goods/${this.editID}`).then((res) => {
        this.form = res.data.data;
      });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.delete(`/goods/${row.id}`).then((res) => {
            if (res.data.code == 2000) {
              // 提示
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              // 渲染
              this.getList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    // 查询
    search() {
      (this.memberForm = {
        name: "", //商品名称
        code: "", //商品编号
        supplierName: "", //供应商名字
      }),
        this.getList();
    },
    // 查询供应商
    search1() {
      this.name = "";
      axios.post(`/supplier/list/search/${this.page1}/10`).then((res) => {
        this.supplierData = res.data.data.rows;
        this.total1 = res.data.data.total;
      });
    },
    // 对话框表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断添加或编辑
          if (this.addEditFlag) {
            // 添加
            axios.post("goods", this.form).then((res) => {
              if (res.data.code == 2000) {
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            // 编辑
            axios.put(`/goods/${this.editID}`, this.form).then((res) => {
              if (res.data.code == 2000) {
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
          this.dialogFormVisible = false;
          this.memberForm.supplierName = "";
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 对话框表单取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
      this.memberForm.supplierName = "";
    },
  },
};
</script>

// 样式
<style scoped lang='scss'>
.header-tool {
  margin-top: 20px;
  width: 100%;
}
</style>
