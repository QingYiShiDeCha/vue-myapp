<template>
  <el-card>
    <el-form ref="form" :model="form" :rules="rules">
      <h3 class="login_title">注册</h3>
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
      <el-form-item prop="checkPass">
        <el-input
          v-model="form.checkPass"
          prefix-icon="el-icon-lock"
          type="password"
          placeholder="请再次输入密码"
        />
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="form.name"
          prefix-icon="el-icon-user"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item prop="sex">
        <el-select v-model="form.sex" placeholder="请选择" style="width: 360px">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="email" show-message>
        <el-input
          v-model="form.email"
          prefix-icon="el-icon-chat-square"
          type="email"
          placeholder="请输入邮箱"
        />
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model.number="form.phone"
          prefix-icon="el-icon-phone"
          placeholder="请输入手机号码"
        />
      </el-form-item>
      <el-form-item prop="addr">
        <el-input
          v-model="form.addr"
          prefix-icon="el-icon-position"
          type="text"
          placeholder="请输入地址"
        />
      </el-form-item>
      <el-form-item class="button_area">
        <el-button type="primary" @click="submit">注 册</el-button>
        <el-button @click="resetForm('form')">重 置</el-button>
      </el-form-item>
    </el-form>
    <span
      >已有账号？<el-link type="primary" @click="toSignUp">登录</el-link></span
    >
  </el-card>
</template>
<script>
export default {
  name: "signup",
  data() {
    let checkUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error("用户名长度在6-12位之间"));
      } else {
        callback();
      }
    };
    let checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let checkPhoneNumber = (rule, value, callback) => {
      const regExp = /^1[3456789]\d{9}$/;
      if (value === "") {
        callback(new Error("手机号码不能为空"));
      } else if (!regExp.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        checkPass: "",
        name: "",
        sex: "",
        phone: "",
        email: "",
        addr: "",
      },
      rules: {
        username: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别" }],
        phone: [{ validator: checkPhoneNumber, trigger: "blur" }],
        email: [
          {
            type: "email",
            required: false,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
        addr: [{ required: false, message: "请输入地址" }],
      },
    };
  },

  methods: {
    toSignUp() {
      this.$router.push("/");
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.commit("addUserInfo", this.form);
          this.$router.push("/");
          this.$message.success("注册成功");
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  position: relative;
  margin: 100px auto;
  width: 400px;
  padding: 30px;
  // height: 210px;
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