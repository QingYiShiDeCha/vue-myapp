<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
        style="margin-right: 20px"
        type="primary"
      ></el-button>
      <!-- 面包屑区，待施工 -->
    </div>
    <div class="r-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar
            :size="35"
            :src="require('@/assets/images/user1.jpg')"
          ></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

export default {
  name: "HeaderContainer",
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    /**
     * 页面跳转
     * @param {string} command 要跳转的位置
     */
    handleCommand(command) {
      if (command === "a") {
        this.$router.push("/user");
      }
      if (command === "logout") {
        localStorage.removeItem("token");
        console.log(this.$store.state.userInfo, 'userInfo');
        this.$router.push("/login");
      }
    },
  },
};
</script>


<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  height: 100%;
  padding: 0 20px;
}
</style>