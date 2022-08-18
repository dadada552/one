<template>
  <div>
    <myheade></myheade>
    <!-- 上部导航栏 -->
    <div class="W">
      <div class="top-nav">
        <ul>
          <li>
            <img src="../assets/imgs/logo.png" alt="" @click="changeRouter" />
          </li>
          <li>
            <div :class="active == '/' ? `active` : ''" @click="gorouter('/')">
              首页
            </div>
            <div
              :class="active == '/goods' ? `active` : ''"
              @click="gorouter('/goods')"
            >
              全部商品
            </div>
            <div
              :class="active == '/about' ? `active` : ''"
              @click="gorouter('/about')"
            >
              关于我们
            </div>
          </li>
        </ul>
      </div>
      <div class="ipt">
        <el-input
          placeholder="请输入内容"
          v-model="searchTxt"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
// import { login } from "@/api/api.js";
import myheade from "../components/myhead.vue";

export default {
  data() {
    return {
      active: "/",
      searchTxt: "",
    };
  },
  created() {},
  methods: {
    changeRouter() {
      this.$router.push("/");
      this.active = "/";
    },
    gorouter(str) {
      this.active = str;
      this.$router.push(str);
    },
  },
  components: {
    myheade,
  },
};
</script>
<style lang="scss" scoped>
.W {
  padding-left: 100px;
}
.ipt {
  width: 260px;
  position: absolute;
  right: 100px;
  top: 70px;
}
.top-nav {
  height: 60px;
  margin-top: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;

  ul {
    display: flex;
    li {
      margin: 0 40px;
      display: flex;
      div {
        padding: 0 20px;
        line-height: 60px;
      }
      .active {
        border-bottom: 2px solid #36f;
      }
      .input-with-select {
        height: 60px;
      }
    }
  }
}
</style>