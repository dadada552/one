<template>
  <div>
    <h1>{{ type }}</h1>
    <div class="content">
      <div v-if="type == '手机'">
        <img
          class="img"
          src="http://101.132.181.9:3000/public/imgs/phone/phone.png"
          alt=""
        />
      </div>
      <ul v-else class="promo">
        <li>
          <img
            :src="
              type == '电视机'
                ? 'http://101.132.181.9:3000/public/imgs/appliance/appliance-promo1.png'
                : 'http://101.132.181.9:3000/public/imgs/accessory/accessory-promo1.png'
            "
            alt=""
          />
        </li>
        <li>
          <img
            :src="
              type == '电视机'
                ? 'http://101.132.181.9:3000/public/imgs/appliance/appliance-promo2.png'
                : 'http://101.132.181.9:3000/public/imgs/accessory/accessory-promo2.png'
            "
            alt=""
          />
        </li>
      </ul>
      <ul class="content-item-box">
        <li
          class="content-item"
          v-for="item in goodslist"
          :key="item.product_id"
        >
          <img
            :src="`http://101.132.181.9:3000/${item.product_picture}`"
            alt=""
          />
          <h2>{{ item.product_name }}</h2>
          <h3>{{ item.product_title }}</h3>
          <p>
            <span>{{ item.product_selling_price }}元</span
            ><span class="del">{{ item.product_price }}元</span>
          </p>
        </li>
        <li id="more" style="">
          浏览更多 <i class="el-icon-d-arrow-right"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getshopinhome } from "../api/api";
export default {
  props: ["type"],
  name: "",
  components: {},
  data() {
    return {
      goodslist: [],
    };
  },
  created() {},
  mounted() {
    getshopinhome({ categoryName: this.type }).then((res) => {
      if (this.type == "保护套") {
        let arr = [];
        res.data.Product = res.data.Product.slice(1, 5);
        arr = res.data.Product;
        getshopinhome({ categoryName: "充电器" }).then((res) => {
          res.data.Product = res.data.Product.slice(1, 4);
          this.goodslist = arr.concat(res.data.Product);
        });
      } else {
        this.goodslist = res.data.Product;
      }
    });
  },
  methods: {},
};
</script>

<style scoped lang='scss'>
.promo {
  li {
    width: 234px;
    height: 300px;
    margin-bottom: 14.5px;
    transition: all 0.2s linear;

    img {
      width: 234px;
      height: 300px;
    }
    li:hover {
      box-shadow: 0 2px 12px rgba(122, 110, 110, 0.459);
    }
  }
}
.img {
  height: 614px;
}
h1 {
  font-size: 24px;
}
.content {
  display: flex;
  justify-content: space-around;
}
.content-item-box {
  display: flex;
  flex-wrap: wrap;
  #more {
    width: 20%;
    height: 280px;
    padding: 10px 0;
    margin: 0 0 14.5px 13.7px;
    background-color: #fff;
    transition: all 0.2s linear;
    position: relative;
    text-align: center;
    line-height: 280px;
  }
  #more:hover {
    box-shadow: 0 2px 12px rgba(122, 110, 110, 0.459);
  }
  .content-item:hover {
    box-shadow: 0 2px 12px rgba(122, 110, 110, 0.459);
  }
  .content-item {
    width: 20%;
    height: 280px;
    padding: 10px 0;
    margin: 0 0 14.5px 13.7px;
    background-color: #fff;
    transition: all 0.2s linear;
    position: relative;

    img {
      display: block;
      width: 160px;
      height: 160px;
      margin: 0 auto;
    }
    h2 {
      margin: 25px 10px 0;
      font-size: 14px;
      color: #333;
      font-weight: 400;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    h3 {
      font-weight: 400;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: 5px 10px;
      height: 18px;
      font-size: 12px;
      color: #b0b0b0;
    }
    p {
      margin: 10px 10px 10px;
      text-align: center;
      color: #ff6700;
    }
  }
}
</style>
