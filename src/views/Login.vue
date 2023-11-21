<template>
  <el-card>
    <el-form ref="form" :model="form" :rules="rules">
      <h3 class="login_title">简易登录系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          prefix-icon="el-icon-user"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          prefix-icon="el-icon-lock"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item class="button_area">
        <el-button type="primary" @click="submit">登 录</el-button>
        <el-button @click="resetForm('form')">重 置</el-button>
      </el-form-item>
    </el-form>
    <span
      >没有账号？<el-link type="primary" @click="toSignUp">注册</el-link></span
    >
  </el-card>
</template>
<script>
import Mock from "mockjs";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
  },
  methods: {
    toSignUp() {
      this.$router.push("/signup");
    },
    submit() {
      // 校验通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          const user = this.users.find((user) => user.name === this.form.username);
          console.log(user, "获取的user");
          if (user && user.password === this.form.password) {
            const token = Mock.Random.guid();
            localStorage.setItem("token", token);
            this.$router.push("/home");
            this.$message.success("登录成功");
            console.log(this.users, "登录后");
          } else {
            this.$message.error("登录失败");
          }
        }
      });
    },
  },
  mounted() {
    console.log(this.users, "user");
  },
};
</script>


<style lang="less" scoped>
.el-card {
  position: relative;
  margin: 200px auto;
  width: 400px;
  padding: 30px;
  height: 210px;
  border-radius: 20px;
  padding-top: 80px;
  .login_title {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 24px;
  }
  .button_area {
    display: flex;
    justify-content: space-between;
    .el-button {
      width: 100px;
      margin: 0 20px;
    }
  }
  span {
    position: absolute;
    right: 18px;
    font-size: 16px;
    .el-link {
      font-size: 16px;
      vertical-align: bottom;
    }
  }
}
</style>