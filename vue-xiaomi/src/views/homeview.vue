<template>
  <div>
    <div class="banner">
      <el-carousel height="450px">
        <el-carousel-item v-for="(item, index) in bannerlist" :key="index">
          <img
            class="img"
            :src="`http://101.132.181.9:3000/${item.imgPath}`"
            alt=""
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mymain">
      <mymain type="手机"></mymain>
    </div>
    <div class="mymain">
      <mymain type="电视机"></mymain>
    </div>
    <div class="mymain">
      <mymain type="保护套"></mymain>
    </div>
  </div>
</template>

<script>
import { carousel } from "../api/api";
import mymain from "../components/mymain.vue";
export default {
  name: "",
  components: {
    mymain,
  },
  data() {
    return {
      bannerlist: [],
    };
  },
  created() {
    carousel().then((res) => {
      //   console.log(res);
      this.bannerlist = res.data.carousel;
    });
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang='scss'>
.banner{
    width: 89%;
    img{
        width: 100%;
    }
}
.mymain {
  margin: 20px 0;
}
</style>
