<template>
  <div class="top">
    <ul>
      <li v-show="flag">
        <span @click="show">登录</span> | <span @click="showZhu">注册</span>
      </li>
      <li v-show="!flag" @click="logout">
        <span>欢迎{{ username }}</span>
      </li>
      <li><span @click="gorouter('oder')">我的订单</span></li>
      <li><span @click="gorouter('like')">我的收藏</span></li>
      <li class="gocar" @click="gorouter('car')">
        <i class="el-icon-shopping-cart-full"></i>
        购物车
      </li>
    </ul>
    <el-dialog
      :title="status ? '注册' : '登录'"
      width="20%"
      :visible.sync="dialogFormVisible"
    >
      <el-form :rules="rules" ref="ruleForm" :model="ruleForm" v-if="!status">
        <el-form-item prop="user">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
            v-model="ruleForm.user"
            style="width: 200px; margin-bottom: 20px"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            placeholder="请输入密码"
            type="password"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.pwd"
            style="width: 200px"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-form :rules="rules" ref="ruleForm" :model="ruleForm" v-else>
        <el-form-item prop="userZhu">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
            v-model="ruleForm.userZhu"
            style="width: 200px; margin-bottom: 20px"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="pwdZhu">
          <el-input
            placeholder="请输入密码"
            type="password"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.pwdZhu"
            style="width: 200px"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="pwdZhu">
          <el-input
            placeholder="请确认密码"
            type="password"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.pwdZhuOk"
            style="width: 200px"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { login, register } from "../api/api";
export default {
  name: "",
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      status: false,
      flag: true,
      ruleForm: {
        user: "",
        pwd: "",
        userZhu: "",
        pwdZhu: "",
        pwdZhuOk: "",
      },
      token: null,
      username: "",
      rules: {
        user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "字母开头,长度5-16之间,允许字母数字下划线",
            trigger: "blur",
          },
        ],
        userZhu: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "字母开头,长度5-16之间,允许字母数字下划线",
            trigger: "blur",
          },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "字母开头,长度6-18之间,允许字母数字和下划线",
            trigger: "blur",
          },
        ],
        pwdZhu: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "字母开头,长度6-18之间,允许字母数字和下划线",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    const token = localStorage.getItem("token");
    this.token = token;
  },
  mounted() {},
  methods: {
    login() {
      if (this.status) {
        //注册
        if (this.pwdZhu == this.pwdZhuOk) {
          register({
            userName: this.ruleForm.userZhu,
            password: this.ruleForm.pwdZhu,
          }).then((res) => {
            if (res.data.code == "001") {
              this.$message.success(res.data.msg);
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("两次密码输入不一致");
        }
      } else {
        //登录
        login({
          userName: this.ruleForm.user,
          password: this.ruleForm.pwd,
        }).then((res) => {
          console.log(res);
          if (res.data.code == "001") {
            this.username = res.data.user.userName;
            localStorage.setItem("token", res.data.user.user_id);
            this.dialogFormVisible = false;
            this.flag = false;
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    show() {
      this.dialogFormVisible = true;
      this.status = false;
    },
    logout(){
      this.flag = true
      localStorage.clear()
    },
    showZhu() {
      this.status = true;
      this.dialogFormVisible = true;
    },
    gorouter(router) {
      if (this.token) {
        this.$router.push(router);
      } else {
        this.dialogFormVisible = true;
        this.status = false;
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.top {
  height: 40px;
  width: 100%;
  background-color: #3d3d3d;
}
ul {
  display: flex;
  line-height: 40px;
  float: right;
  color: #b0b0b0;
  text-align: center;
  li {
    width: 120px;
    span:hover {
      color: #fff;
    }
  }
  .gocar {
    width: 120px;
  }
  .gocar:hover {
    background-color: #fff;
    color: orangered;
  }
}
</style>
