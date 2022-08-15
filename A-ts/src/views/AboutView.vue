<template>
  <div class="about">
    <div class="title">学员管理</div>

    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学员状态">
          <el-select v-model="formInline.status" placeholder="状态" @change="search">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="学员名称">
          <el-input v-model="formInline.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item>
          <el-button @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="btns">
      <el-button type="primary">新增学员</el-button>
      <el-button type="primary">批量导入</el-button>
      <el-button type="primary">批量导出</el-button>
      <el-button type="primary">查看报表</el-button>
    </div>

    <el-table
      ref="multipleTableRef"
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
      stripe
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="学生名称" width="180">
        <template #default="scope">
          <img height="30" :src="scope.row.avatar" />
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column property="mobile" label="手机号" width="180" />
      <el-table-column label="状态" width="180">
        <template #default="scope">
          {{ scope.row.status == 0 ? "禁用" : "启用" }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template #default="scope">
          {{ new Date(scope.row.created_at * 1000).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="">
        <el-link :underline="false">详情</el-link><span>-</span>
        <el-link :underline="false">编辑</el-link><span>-</span>
        <el-link :underline="false">禁用</el-link><span>-</span>
        <el-link :underline="false">删除</el-link><span>-</span>
        <el-link :underline="false">重置密码</el-link>
      </el-table-column>
    </el-table>

    <div class="division" style="margin: 10px"></div>

    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[2, 4, 6, 8, 10]"
      layout="sizes, prev, pager, next"
      background
      :total="tableData.length"
    />
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import axios from "axios";
export default {
  name: "AboutView",
  components: {},
  setup() {
    interface Form {
      name: string;
      status: string;
      mobile: string;
    }

    interface List {
      uid: number;
      mobile: string;
      avatar: string;
      nickname: string;
      status: number;
      created_at: string;
      updated_at: string;
    }

    interface Data {
      formInline: Form;
      tableData: Array<List>;
      originalData: Array<List>;
      currentPage: number;
      pageSize: number;
    }
    const data: Data = reactive({
      formInline: {
        name: "",
        status: "",
        mobile: "",
      },

      tableData: [],
      originalData: [],
      currentPage: 1,
      pageSize: 10,
    });

    axios.get("./list.json").then((res) => {
      data.tableData = res.data;
      data.originalData = res.data;
      // console.log(res.data);
    });

    const search = (): void => {
      data.tableData = data.originalData.filter((item) => {
        return (
          item.nickname.indexOf(data.formInline.name) != -1 &&
          item.mobile.indexOf(data.formInline.mobile) != -1 &&
          (data.formInline.status.length == 0 ||
            item.status == parseInt(data.formInline.status))
        );
      });
    };
    const reset = (): void => {
      data.tableData = data.originalData;
      data.formInline = {
        name: "",
        status: "",
        mobile: "",
      };
    };

    return {
      ...toRefs(data),
      search,
      reset,
    };
  },
};
</script>

<style scoped lang="scss">
.about {
  > * {
    padding: 0 20px;
  }
  .title {
    margin-bottom: 10px;
    line-height: 25px;
    border-bottom: 1px solid #ccc;
  }
}
</style>
