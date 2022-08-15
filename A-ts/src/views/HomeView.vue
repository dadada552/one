<template>
  <div class="home">
    <header>
      <img height="40" :src="'./logo.png'" class="logo" />
      <el-menu
        :default-active="active"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        text-color="#000"
        active-text-color="#fff"
        background-color="#39f"
      >
        <el-menu-item :index="item.id.toString()" v-for="item in menulist">
          <span>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.name }}
          </span>
        </el-menu-item>
      </el-menu>
      <div class="head">
        <img height="40" :src="'./wsm056.png'" />
        <span class="arrow"></span>
      </div>
    </header>

    <div class="content">
      <aside>
        <el-menu default-active="about" class="el-menu-vertical-demo" router>
          <el-menu-item :index="item.url" v-for="item in arr">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </aside>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import axios from "axios";
import {
  UserFilled,
  Management,
  Checked,
  TrendCharts,
  Menu,
  Shop,
  Briefcase,
  Histogram,
  Tools,
} from "@element-plus/icons-vue";
export default {
  name: "HomeView",
  components: {
    UserFilled,
    Management,
    Checked,
    TrendCharts,
    Menu,
    Shop,
    Briefcase,
    Histogram,
    Tools,
  },
  setup() {
    interface Children {
      name: string;
      id: number;
      url?: string;
    }
    interface Menulist {
      name: string;
      id: number;
      icon: string;
      children?: Children;
    }
    interface Data {
      menulist: Array<Menulist>;
      active: string;
      arr: Array<Children>;
    }
    const data: Data = reactive({
      menulist: [],
      active: "1",
      arr: [],
    });
    axios.get("menu.json").then((res) => {
      data.menulist = res.data;
      data.arr = res.data[0].children;
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  header {
    height: 60px;
    padding: 0 20px;
    background-image: linear-gradient(to right, #2842be, #3899ff);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-menu-demo {
      background-color: transparent;
      margin-left: 80px;
    }
    .logo {
      margin: 10px 0;
      float: left;
    }
    .head {
      float: right;
      img {
        float: left;
        margin: 10px 5px;
        border-radius: 50%;
      }
      .arrow {
        margin-top: 25px;
        float: right;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-top-color: #fff;
      }
    }
  }

  .content {
    display: flex;
    justify-content: space-around;
    height: 900px;
    aside {
      box-sizing: border-box;
      width: 15%;
      padding-left: 20px;
      border-right: 1px solid #ccc;

      li {
        padding: 20px 0;
      }
      li.active {
        color: dodgerblue;
      }
    }
    main {
      box-sizing: border-box;
      width: 85%;
    }
  }
}
</style>
