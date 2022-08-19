<template>
  <div class="login-box">
    <div class="login">
      <h1>用户登录</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="user">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-user-solid"
            v-model="ruleForm.user"
            class="user"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.pwd"
            class="pwd"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-button class="btn" @click="login" type="primary">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      ruleForm: {
        user: "",
        pwd: "",
      },
      rules: {
        user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    login() {
      axios
        .post("https://api.imooc-admin.lgdsunday.club/api/sys/login", {
          username: this.ruleForm.user,
          password: this.ruleForm.pwd,
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style scoped lang='scss'>
.login-box {
  background-color: #30394a;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 400px;
    height: 300px;
    border-radius: 25px;
    padding: 20px;
    text-align: center;
    h1 {
      margin-left: 70px;
      color: #fff;
    }
    .user,
    .pwd {
      margin: 20px 0;
      width: 300px;
    }
    .btn {
      margin-top: 20px;
      margin-left: 90px;
      width: 300px;
    }
  }
}
</style>
