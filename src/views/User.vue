<template>
  <div>
    <el-dialog
      title="修改此用户密码"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="原密码" prop="oldPassword" required>
          <el-input v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" required>
          <el-input v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" required>
          <el-input v-model="form.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>
    <el-card class="box-card" style="width: 500px">
      <div slot="header" class="clearfix">
        <span>管理员信息</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="dialogVisible = true"
          >修改此用户密码</el-button
        >
      </div>
      <div class="text item">
        <el-form
          label-position="right"
          label-width="80px"
          style="font-size: 18px"
        >
          <el-form-item label="用户名:">{{ userInfo.username }}</el-form-item>
          <el-form-item label="姓名:">{{ userInfo.name }}</el-form-item>
          <el-form-item label="性别:">{{
            userInfo.sex == "1" ? "男" : "女"
          }}</el-form-item>
          <el-form-item label="手机号:">{{ userInfo.phone }}</el-form-item>
          <el-form-item label="邮箱:">{{ userInfo.email }}</el-form-item>
          <el-form-item label="地址:">{{ userInfo.addr }}</el-form-item>
          <el-form-item label="个人介绍:">{{
            userInfo.Introduce
          }}</el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    let checkOldPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("旧密码不能为空"));
      } else {
        callback();
      }
    };
    let checkNewPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("新密码不能为空"));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error("密码长度必须在6-16位之间"));
      } else {
        callback();
      }
    }
    let checkConfirmPwd = (rule, value, callback) => { 
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.form.newPassword) { 
        callback(new Error("两次输入密码不一致"));
      } else {
        callback()
      }
    }
    return {
      userInfo: {},
      Introduce: "这是一个懒惰的管理员",
      dialogVisible: false,
      form: {
        curUser: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        oldPassword: [{ validator: checkOldPwd, trigger: "blur" }],
        newPassword: [{ validator: checkNewPwd, trigger: "blur" }],
        confirmPassword: [{ validator: checkConfirmPwd, trigger: "blur" }],
      },
    };
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    // 页面刷新时，将vuex里的信息保存到sessionStorage
    // 在页面刷新时先触发beforeunload事件
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  computed: {
    getUserInfo() {
      return this.$store.getters["getCurrUser"];
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    changePassword() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.newPassword !== this.form.confirmPassword) {
            this.$message.error("新密码与确认密码不匹配");
            return;
          }
          const userIndex = this.$store.state.userInfo.findIndex(
            (user) => user.username === this.form.curUser
          );
          if (userIndex !== -1) {
            const user = this.$store.state.userInfo[userIndex];
            if (user.password !== this.form.oldPassword) {
              this.$message.error("原密码错误");
              return;
            }
            this.$store.commit("setUserInfo", {
              ...user,
              password: this.form.newPassword,
            });
            this.dialogVisible = false;
            this.form.oldPassword = "";
            this.form.newPassword = "";
            this.form.confirmPassword = "";
            this.$message.success("密码修改成功");
          } else {
            this.$message.error("用户不存在");
          }
        }
      });
    },
  },
  mounted() {
    this.userInfo = this.getUserInfo;
    this.userInfo.Introduce = this.Introduce;
    this.form.curUser = this.userInfo.username;
    console.log(this.userInfo);
    console.log(this.form);
  },
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
  span {
    text-align: right;
  }
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}

.el-form-item__label {
  font-size: 24px;
}
</style>