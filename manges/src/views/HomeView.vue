// 结构
<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <myHeader :isCollapse="isCollapse" @toggle="toggle"></myHeader>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <myAside
          :isCollapse="isCollapse"
          @menuSelect="menuSelect"
          :tagArr="tagArr"
        ></myAside>
        <!-- 内容 -->
        <el-main>
          <!-- 选项卡 -->
          <el-tag
            size="medium"
            style="margin-right: 10px; margin-bottom: 10px"
            @click="go(item.path)"
            closable
            @close="tagArr.splice(i, 1)"
            v-for="(item, i) in tagArr"
            :key="i"
            >{{ item.name }}</el-tag
          >
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

// 行为
<script>
import myHeader from "../components/myHeader.vue";
import myAside from "../components/myAside.vue";
export default {
  name: "",
  components: {
    myHeader,
    myAside,
  },
  data() {
    return {
      // 侧边栏显示隐藏
      isCollapse: false,
      // 选项卡
      tagArr: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    menuSelect(arr) {
      this.tagArr = arr;
    },
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
    // 切换子路由
    go(path) {
      this.$router.push(path);
    },
  },
};
</script>

// 样式
<style scoped lang='scss'>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.el-main {
  color: #333;
  height: calc(100vh - 60px);
}
</style>
