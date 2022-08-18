<template>
  <div class="home">
    <my-header></my-header>

    <div class="content">
      <aside>
        <my-aside></my-aside>
      </aside>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import MyHeader from "../components/MyHeader.vue";
import MyAside from "../components/MyAside.vue";

export default {
  name: "HomeValue",
  components: {
    MyHeader,
    MyAside,
  },
  setup() {},
};
</script>

<style scoped lang="scss">
.home {
  height: 100%;

  .content {
    display: flex;
    height: 100%;
    aside {
      width: 15%;
      height: 100%;
    }
    main {
      box-sizing: border-box;
      width: 85%;
      height: 100%;
      padding: 10px;
    }
  }
}
</style>
