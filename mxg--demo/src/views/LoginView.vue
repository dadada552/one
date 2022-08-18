// 结构
<template>
  <!-- 登录页面 -->
  <div class="login-box">
    <div class="login-form">
      <h2>梦学谷会员管理系统</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

// 行为
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      // 登录数据
      ruleForm: {
        username: "",
        password: "",
      },
      // 校验规则
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/user/login", this.ruleForm).then((res) => {
            console.log(res);
            if (res.data.code == 2000) {
              // 获取用户信息
              this.$axios
                .get(`/user/info/${res.data.data.token}`)
                .then((res) => {
                  if (res.data.code == 2000) {
                    localStorage.setItem(
                      "userInfo",
                      JSON.stringify(res.data.data)
                    );
                  }
                });
              // 存token
              localStorage.setItem("token", res.data.data.token);
              // 跳转
              setTimeout(() => {
                this.$router.push("/");
              }, 100);
              // 登录成功
              this.$message.success("登录成功!");
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

// 样式
<style scoped lang='scss'>
.login-box {
  width: 100%;
  height: 100vh;
  background-image: url("http://vue.mengxuegu.com/img/login.b665435f.jpg");
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 400px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.815);
    border-radius: 20px;
    box-sizing: border-box;
    text-align: center;
    padding: 45px 40px;
    h2 {
      margin-bottom: 20px;
    }
  }
}
</style>
