<template>
  <div class="my-aside">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      text-color="#fff"
      :default-active="$route.path"
      router
    >
      <el-menu-item
        v-for="item in menuList"
        :key="item.id"
        :index="item.router"
      >
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { ref, reactive, toRefs } from "vue";
import axios from "axios";
export default {
  name: "MyAside",
  components: {},
  setup() {
    interface Menu {
      id: number;
      title: string;
      router: string;
      icon: string;
    }
    interface Data {
      menuList: Array<Menu>;
    }
    const data = reactive<Data>({
      menuList: [],
    });

    axios.get("./menu.json").then((res) => {
      data.menuList = res.data;
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style scoped lang="scss">
.my-aside {
  width: 100%;
  height: 100%;
  background-color: #545c64;

  .el-menu {
    border: none;
  }
}
</style>
