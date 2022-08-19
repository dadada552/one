<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <h1>imooc-adimn</h1>
        <el-menu
          default-active="/user"
          background-color="transparent"
          text-color="#fff"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/user">
            <i class="el-icon-menu"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">数据可视化</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-user"></i>
                <span>员工管理</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-user"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="1-3">
                <i class="el-icon-user"></i>
                <span>权限列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main> <router-view></router-view> </el-main>
    </el-container>
  </div>
</template>

<script>
import { getMy } from "../api/http";
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {
    getMy().then((res) => {
      console.log(res);
    });
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang='scss'>
.el-container {
  height: 100vh;
  .el-aside {
    background-color: #304156;
    h1 {
      color: #fff;
      text-align: center;
    }
  }
}
</style>
