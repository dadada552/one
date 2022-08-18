<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default {
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      zhCn,
    };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
</style>
