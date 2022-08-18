// 结构
<template>
  <div>
    <!-- 头部面包屑 -->
    <breadcrumb title="会员管理"></breadcrumb>
    <!-- 头部功能栏 -->
    <div class="header-tool">
      <!-- 会员卡号 -->
      <el-input
        v-model="memberForm.cardNum"
        placeholder="会员卡号"
        style="width: 200px; margin-right: 10px"
      ></el-input>
      <!-- 会员名字 -->
      <el-input
        v-model="memberForm.name"
        placeholder="会员名字"
        style="width: 200px; margin-right: 10px"
      ></el-input>
      <!-- 支付类型 -->
      <el-select
        v-model="memberForm.payType"
        placeholder="支付类型"
        style="width: 120px; margin-right: 10px"
      >
        <el-option
          v-for="item in payTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 出生日期 -->
      <el-date-picker
        style="margin-right: 10px"
        v-model="memberForm.birthday"
        type="date"
        placeholder="出生日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
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
      <el-table-column prop="cardNum" label="会员卡号" width="200">
      </el-table-column>
      <el-table-column prop="name" label="会员姓名" width="80">
      </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="integral" label="可用积分" width="80">
      </el-table-column>
      <el-table-column prop="money" label="开卡金额" width="80">
      </el-table-column>
      <el-table-column label="支付类型">
        <template slot-scope="scope">
          <p v-if="scope.row.payType == 1">现金</p>
          <p v-if="scope.row.payType == 2">微信支付</p>
          <p v-if="scope.row.payType == 3">支付宝支付</p>
          <p v-if="scope.row.payType == 4">银行卡支付</p>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="230">
      </el-table-column>
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
      :title="addEditFlag ? '添加会员' : '编辑会员'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="会员卡号" label-width="90px" prop="cardNum">
          <el-input v-model="form.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" label-width="90px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" label-width="90px">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" label-width="90px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" label-width="90px">
          <el-input v-model="form.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" label-width="90px">
          <el-input v-model="form.integral" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" label-width="90px" prop="payType">
          <el-select v-model="form.payType" placeholder="请选择">
            <el-option
              v-for="item in payTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" label-width="90px">
          <el-input type="textarea" v-model="form.address"> </el-input>
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
        cardNum: "", // 会员卡号
        name: "", // 会员名字
        payType: "", // 支付类型
        birthday: "", // 会员生日
      },
      // 支付类型下拉菜单
      payTypes: [
        {
          value: 1,
          label: "现金",
        },
        {
          value: 2,
          label: "微信支付",
        },
        {
          value: 3,
          label: "支付宝支付",
        },
        {
          value: 4,
          label: "银行卡支付",
        },
      ],
      // 表格数据
      tableData: [],
      // 对话框状态
      dialogFormVisible: false,
      // 对话框表单
      form: {
        name: "", // 会员姓名
        address: "", // 地址
        birthday: "", // 会员生日
        cardNum: "", // 会员卡号
        integral: "0", // 可用积分
        money: "0", // 开卡金额
        payType: "", // 支付类型
        phone: "", // 电话
      },
      // 对话框表单规则
      rules: {
        name: { required: true, message: "请输入会员姓名", trigger: "blur" },
        cardNum: { required: true, message: "请输入会员卡号", trigger: "blur" },
        payType: { required: true, message: "请输入支付类型", trigger: "blur" },
      },
      // 添加编辑的状态
      addEditFlag: false, // false 为编辑 true 为添加
      // 暂缓编辑ID
      editID: "",
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    // 重置
    remake() {
      this.memberForm = {
        cardNum: "", // 会员卡号
        name: "", // 会员名字
        payType: "", // 支付类型
        birthday: "", // 会员生日
      };
      this.getList();
    },
    // 新增会员
    addMember() {
      this.form = {
        name: "", // 会员姓名
        address: "", // 地址
        birthday: "", // 会员生日
        cardNum: "", // 会员卡号
        integral: "0", // 可用积分
        money: "0", // 开卡金额
        payType: "", // 支付类型
        phone: "", // 电话
      };
      this.addEditFlag = true;
      this.dialogFormVisible = true;
    },
    // 请求列表
    getList() {
      this.$axios
        .post(`/member/list/search/${this.page}/${this.pageSize}`)
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
      axios.get(`/member/${this.editID}`).then((res) => {
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
          axios.delete(`/member/${row.id}`).then((res) => {
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
        cardNum: "", // 会员卡号
        name: "", // 会员名字
        payType: "", // 支付类型
        birthday: "", // 会员生日
      }),
        this.getList();
    },
    // 对话框表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断添加或编辑
          if (this.addEditFlag) {
            // 添加
            axios.post("member", this.form).then((res) => {
              if (res.data.code == 2000) {
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            // 编辑
            axios.put(`/member/${this.editID}`, this.form).then((res) => {
              if (res.data.code == 2000) {
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
          this.dialogFormVisible = false;
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
