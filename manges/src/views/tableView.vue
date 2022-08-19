// 结构
<template>
  <div>
    <div class="header">
      <!-- 删除选中 -->
      <el-button type="primary" size="small" @click="dels">删除选中</el-button>
      <!-- 下拉菜单 -->
      <el-select
        v-model="selectVal"
        style="margin: 0 20px"
        clearable
        placeholder="请选择"
        size="small"
        @change="changeCity"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 搜索框 -->
      <el-input
        v-model="searchVal"
        style="width: 200px"
        size="small"
        placeholder="请输入内容"
        @input="search"
      ></el-input>
    </div>

    <!-- 表格 -->
    <el-table
      :data="
        $store.state.userArr.slice((currentPage3 - 1) * 10, currentPage3 * 10)
      "
      border
      style="width: 100%; margin-top: 20px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="id" label="ID" width="55"> </el-table-column>

      <el-table-column prop="name" label="用户名"> </el-table-column>

      <el-table-column label="账户余额">
        <template slot-scope="scope"> ￥{{ scope.row.price }} </template>
      </el-table-column>

      <el-table-column label="头像(查看大图)">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.img"
            :preview-src-list="[scope.row.img]"
          >
          </el-image>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="地址"> </el-table-column>

      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state ? 'success' : 'warning'">
            {{ scope.row.state ? "成功" : "失败" }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="create_time" label="注册时间"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="mini" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page.sync="currentPage3"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="$store.state.userArr.length"
      >
      </el-pagination>
    </div>

    <!-- 对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="地址" label-width="100px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

// 行为
<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      // 下拉菜单数据
      options: [
        {
          value: "广东省",
          label: "广东省",
        },
        {
          value: "河南省",
          label: "河南省",
        },
        {
          value: "山西省",
          label: "山西省",
        },
        {
          value: "湖南省",
          label: "湖南省",
        },
        {
          value: "福建省",
          label: "福建省",
        },
      ],
      // 搜索框数据
      searchVal: "",
      // 下拉菜单
      selectVal: "",
      list: [],
      // 表格选中的数据
      multipleSelection: [],
      // 对话框状态
      dialogFormVisible: false,
      // 对话框数据
      form: {
        name: "",
        address: "",
      },
      // 当前页码
      currentPage3: 1,
      // 编辑暂存id
      editID: 0,
    };
  },
  created() {
    // 请求数据
    axios.get("books.json").then((res) => {
      this.list = res.data;
      this.$store.state.userArr = res.data;
    });
  },
  mounted() {},
  methods: {
    // 过滤省市区
    changeCity(val) {
      const obj = { arr: this.list, val };
      this.$store.commit("changeCity", obj);
    },
    // 搜索
    search() {
      // 是否筛选城市
      if (this.selectVal) {
        this.$store.state.userArr = this.$store.state.cityArr.filter(
          (item) => item.name.indexOf(this.searchVal) != -1
        );
      } else {
        this.$store.state.userArr = this.list.filter(
          (item) => item.name.indexOf(this.searchVal) != -1
        );
      }
    },
    // 编辑
    handleEdit(row) {
      this.dialogFormVisible = true;
      const obj = this.$store.state.userArr.find((item) => item.id == row.id);
      this.form = obj;
    },
    // 删除
    handleDelete(row) {
      const i = this.$store.state.userArr.findIndex(
        (item) => item.id == row.id
      );
      this.$store.commit("del", i);
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量删除
    dels() {
      this.$store.commit("dels", this.multipleSelection);
    },
    // 编辑确定
    editAdd() {
      this.dialogFormVisible = false;
    },
  },
};
</script>

// 样式
<style scoped lang='scss'>
</style>
