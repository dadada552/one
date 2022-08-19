// 结构
<template>
  <div class="header-box">
    <div class="header-left">
      <i class="el-icon-s-fold" v-if="isCollapse" @click="toggle"></i>
      <i class="el-icon-s-unfold" v-else @click="toggle"></i>
      <span>后台管理系统</span>
    </div>
    <div class="header-right">
      <i class="el-icon-rank" @click="screenfull"></i>
    </div>
  </div>
</template>

// 行为
<script>
import screenfull from "screenfull";

export default {
  name: "",
  components: {},
  props: ["isCollapse"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    // 全屏显示
    screenfull() {
      screenfull.toggle();
    },
  },
};
</script>

// 样式
<style scoped lang='scss'>
.header-box {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center;
  .header-left {
    font-size: 24px;
    font-weight: 600;
    span {
      margin: 0 20px;
    }
  }
}
</style>
