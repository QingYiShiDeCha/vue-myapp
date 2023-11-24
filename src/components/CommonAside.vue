<template>
  <el-menu
    :default-active="activeUrl"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <!-- 标题 -->
    <h3>{{ isCollapse ? "后台" : "简易后台管理系统" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 二级菜单 -->
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{
          subItem.name
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
@height: 100vh;
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: @height;
  overflow-x: none;
  h3 {
    display: block;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 550;
    cursor: pointer;
  }
}
</style>

<script>
export default {
  data() {
    return {
      // isCollapse: false,
      menuData: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "menu",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "个人中心",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "页面1",
              label: "首页",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "页面2",
              label: "首页",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
      activeUrl: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    /**
     * 点击菜单跳转路由
     */
    clickMenu(item) {
      // console.log(item, "item");
      this.$router.push(
        item.path,
        () => {},
        () => {}
      ); // 第二种方法
    },
  },
  computed: {
    // 没有子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    // 有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.isCollapse;
    },
  },
  mounted() {
    this.activeUrl = this.$route.path.slice(1);
  }, 
};
</script>