<template>
  <div>
    <div>
      <h1>个人中心</h1>
      <div>
        <el-tag class="tag" v-for="item in taglist" :key="item.id" closable>
          {{ item.name }}
        </el-tag>
      </div>
      <div class="contetn">
        <div class="left">
          <h3>介绍（已升级element-plus 正式版）</h3>
          <h3>项目介绍</h3>
          <p>《vue3改写vue-element-admin,实现后台前端综合解决方案》项目演示</p>
          <h3>项目功能</h3>
          <p>Vue3+全家桶</p>
          <el-progress :percentage="100" status="success"></el-progress>
          <p>Element-plus</p>
          <el-progress :percentage="100" status="success"></el-progress>
          <p>vue-element-admin</p>
          <el-progress :percentage="100" status="success"></el-progress>
          <p>ESlint</p>
          <el-progress :percentage="100" status="success"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      taglist: [
        {
          name: "个人中心",
          id: 1,
        },
        {
          name: "权限列表",
          id: 2,
        },
        {
          name: "数据可视化",
          id: 3,
        },
        {
          name: "员工管理",
          id: 4,
        },
        {
          name: "角色列表",
          id: 5,
        },
        {
          name: "文章排名",
          id: 6,
        },
        {
          name: "创建文章",
          id: 7,
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang='scss'>
.tag {
  margin: 0 20px;
}
.contetn {
  display: flex;
  justify-content: space-between;
  .left {
    width: 40%;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
}
</style>
