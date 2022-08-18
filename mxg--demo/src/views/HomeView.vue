// 结构
<template>
  <!-- 后台主页 -->
  <el-container>
    <el-header>
      <!-- 头部logo -->
      <div class="header-letf">
        <img src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="" />
        <p>梦学谷会员管理系统</p>
      </div>
      <!-- 头部用户 -->
      <div class="header-right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="editPwd">
              <i class="el-icon-edit"></i> 修改密码
            </el-dropdown-item>
            <el-dropdown-item command="quit">
              <i class="el-icon-s-fold"></i> 退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
      <el-aside width="150px">
        <!-- 侧边导航栏 -->
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item
            :index="item.path"
            v-for="(item, i) in asideData"
            :key="i"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="editPassword">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPWd">
          <el-input
            type="password"
            show-password
            v-model.number="ruleForm.oldPWd"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            type="password"
            show-password
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            show-password
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

// 行为
<script>
export default {
  name: "",
  components: {},
  data() {
    var oldPWd = (rule, value, callback) => {
      // 判断是否为原密码
      this.$axios
        .post("/user/pwd", {
          userId: JSON.parse(localStorage.getItem("userInfo")).id,
          password: JSON.parse(localStorage.getItem("userInfo")).name,
        })
        .then((res) => {
          if (res.data.code != 2000) {
            return callback(new Error("原密码输入错误！"));
          }
        });
      if (!value) {
        return callback(new Error("原密码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空!"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 侧边栏数据
      asideData: [
        {
          title: "首页",
          path: "/index",
          icon: "el-icon-s-home",
        },
        {
          title: "会员管理",
          path: "/member",
          icon: "el-icon-user-solid",
        },
        {
          title: "供应商管理",
          path: "/supplier",
          icon: "el-icon-s-cooperation",
        },
        {
          title: "商品管理",
          path: "/goods",
          icon: "el-icon-s-goods",
        },
        {
          title: "员工管理",
          path: "/staff",
          icon: "el-icon-user",
        },
      ],
      // 对话框状态
      editPassword: false,
      // 修改密码
      username: "", // 用户姓名
      ruleForm: {
        pass: "",
        checkPass: "",
        oldPWd: "",
      },
      // 规则
      rules: {
        pass: [{ validator: validatePass, trigger: "blur", required: true }],
        checkPass: [
          { validator: validatePass2, trigger: "blur", required: true },
        ],
        oldPWd: [{ validator: oldPWd, trigger: "blur", required: true }],
      },
      // 高亮路由
      activePath: "",
    };
  },
  created() {
    this.username = JSON.parse(localStorage.getItem("userInfo")).name;
  },
  mounted() {},
  methods: {
    // 修改密码提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送修改密码请求
          this.$axios
            .put("/user/pwd", {
              userId: JSON.parse(localStorage.getItem("userInfo")).id,
              password: this.ruleForm.pass,
            })
            .then((res) => {
              if (res.data.code == 2000) {
                // 提示
                this.$message.success(res.data.message);
                // 退出登录
                localStorage.clear();
                // 跳转
                this.$router.push("/login");
              }
            });
          this.editPassword = false;
        } else {
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 选择菜单事件
    handleCommand(command) {
      // 修改密码
      if (command == "editPwd") {
        this.editPassword = true;
      }
      if (command == "quit") {
        this.$axios
          .post("/user/logout", { token: localStorage.getItem("token") })
          .then((res) => {
            if (res.data.code == 2000) {
              localStorage.clear();
              this.$router.push("/login");
              this.$message.success(res.data.message);
            }
          });
      }
    },
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(val) {
        this.activePath = val.path;
      },
    },
  },
};
</script>

// 样式
<style scoped lang='scss'>
.el-header {
  color: white;
  background-color: #2d3a4b;
  display: flex;
  align-items: center;
  height: 50px !important;
  justify-content: space-between;
  .header-letf {
    display: flex;
    align-items: center;
    margin-left: 15px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
  .header-right {
    margin-right: 20px;
    .el-dropdown-link {
      color: white;
      cursor: pointer;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}

.el-aside {
  background-color: #545c64;
  height: calc(100vh - 50px);
}

.el-main {
  height: calc(100vh - 50px);
}
</style>  
