// 结构
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 未读消息 -->
      <el-tab-pane
        :label="
          '未读消息' +
          '(' +
          $store.getters.length.ready +
          ')'
        "
        name="weidu"
      >
        <div
          class="item"
          v-for="(item, i) in $store.state.textArr
            .filter((item) => !item.flag)
            .slice((currentPage - 1) * 4, currentPage * 4)"
          :key="i"
        >
          <div class="title">{{ item.title }}</div>
          <div class="time">{{ item.create_time }}</div>
          <div class="btn">
            <el-button size="small" @click="toggleReady(item)"
              >标记为已读</el-button
            >
          </div>
        </div>
        <div
          class="item"
          v-show="$store.state.textArr.filter((item) => !item.flag).length == 0"
        >
          暂无数据
        </div>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="4"
            layout="prev, pager, next, jumper"
            :total="$store.state.textArr.filter((item) => !item.flag).length"
          >
          </el-pagination>
        </div>
        <el-button style="margin-top: 20px" type="primary" @click="allReady"
          >全部标记为已读</el-button
        >
      </el-tab-pane>

      <!-- 已读消息 -->
      <el-tab-pane
        :label="
          '已读消息' +
          '(' +
          $store.getters.length.unReady +
          ')'
        "
        name="yidu"
      >
        <div
          class="item"
          v-for="(item, i) in $store.state.textArr
            .filter((item) => item.flag)
            .slice((currentPage - 1) * 4, currentPage * 4)"
          :key="i"
        >
          <div class="title">{{ item.title }}</div>
          <div class="time">{{ item.create_time }}</div>
          <div class="del">
            <el-button type="danger" size="small" @click="goDel(item)"
              >删除</el-button
            >
          </div>
          <div class="btn">
            <el-button size="small" type="info" @click="toggleReady(item)"
              >还原未读</el-button
            >
          </div>
        </div>
        <div
          class="item"
          v-show="$store.state.textArr.filter((item) => item.flag).length == 0"
        >
          暂无数据
        </div>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="4"
            layout="prev, pager, next, jumper"
            :total="$store.state.textArr.filter((item) => item.flag).length"
          >
          </el-pagination>
        </div>
        <el-button style="margin-top: 20px" type="danger" @click="allDel"
          >删除全部</el-button
        >
      </el-tab-pane>

      <!-- 回收站 -->
      <el-tab-pane :label="'回收站' + '(' + delArr.length + ')'" name="huishou">
        <div
          class="item"
          v-for="(item, i) in delArr.slice(
            (currentPage - 1) * 4,
            currentPage * 4
          )"
          :key="i"
        >
          <div class="title">{{ item.title }}</div>
          <div class="time">{{ item.create_time }}</div>
          <div class="btn">
            <el-button size="small" type="info" @click="remake(item, i)"
              >还原</el-button
            >
          </div>
        </div>
        <div
          class="item"
          v-show="delArr.filter((item) => item.flag).length == 0"
        >
          暂无数据
        </div>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="4"
            layout="prev, pager, next, jumper"
            :total="delArr.filter((item) => item.flag).length"
          >
          </el-pagination>
        </div>
        <el-button style="margin-top: 20px" type="danger" @click="delAll"
          >清空全部</el-button
        >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

// 行为
<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      // 标签页
      activeName: "weidu",
      // 当前页码
      currentPage: 1,
      // 回收站
      delArr: [],
    };
  },
  created() {
    // 请求数据
    axios.get("text.json").then((res) => {
      this.$store.state.textArr = res.data;
    });
  },
  mounted() {},
  methods: {
    // 已读未读切换
    toggleReady(obj) {
      this.$store.commit("toggleReady", obj);
    },
    // 移动到回收站
    goDel(obj) {
      // 进回收站
      this.delArr.push(obj);
      this.$store.commit("goDel", obj);
    },
    // 还原
    remake(obj, i) {
      this.$store.commit("remake", obj);
      this.delArr.splice(i, 1);
    },
    // 清空全部
    delAll() {
      this.delArr = [];
    },
    // 删除全部
    allDel() {
      this.$store.state.textArr.forEach(item => {
        if(item.flag){
          this.delArr.push(item)
        }
      });
      this.$store.commit('allDel')
    },
    // 全部标记为已读
    allReady() {
      this.$store.commit('allReady')
    },
    // 切换标签页
    handleClick(a) {
      this.activeName = a.name;
      this.currentPage = 1;
    },
  },
};
</script>

// 样式
<style scoped lang='scss'>
.item {
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  align-items: center;
  .title {
    width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.item:hover {
  background-color: #eee;
}
</style>
