// 结构
<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <span class="el-breadcrumb-link">{{title}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

// 行为
<script>
export default {
  name: "",
  props: ['title'],
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

// 样式
<style scoped lang='scss'>
.el-breadcrumb {
  height: 10px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgb(223, 223, 223);
  .el-breadcrumb-link {
    font-size: 12px;
    border-left: 3px solid #31c17b;
    padding-left: 8px;
  }
}
</style>
