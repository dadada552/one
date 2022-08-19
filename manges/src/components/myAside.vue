// 结构
<template>
  <el-aside :width="isCollapse ? '68px' : '180px'">
    <el-menu
      router
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :default-active="activePath"
      @select="menuSelect"
    >
      <el-menu-item index="/table">
        <i class="el-icon-document"></i>
        <span slot="title">基础表格</span>
      </el-menu-item>
      <el-menu-item index="/tab">
        <i class="el-icon-setting"></i>
        <span slot="title">tab选项卡</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

// 行为
<script>
export default {
  name: "",
  components: {},
  props: ["isCollapse", "tagArr"],
  data() {
    return {
      activePath: "",
    };
  },
  created() {},
  mounted() {},
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(val) {
        this.activePath = val.path;
      },
    },
  },
  methods: {
    // 获取选项卡
    menuSelect() {
      const { name } = this.$route.meta;
      const i = this.tagArr.findIndex((item) => item.name == name);
      if (i != -1) {
        this.tagArr.splice(i, 1);
      }
      this.tagArr.push({
        name,
        path: this.activePath,
      });
      this.$emit("menuSelect", this.tagArr);
    },
  },
};
</script>

// 样式
<style scoped lang='scss'>
.el-aside {
  color: #333;
  height: calc(100vh - 60px);
  text-align: center;
  border: 1px solid #eee;
}
</style>
