<template>
  <div class="container">
    <div class="container-header" style="width: 100%">
      <el-card><h1>欢迎光临 管理员</h1></el-card>
    </div>
    <div class="container-buttom">
      <el-card v-for="item in cardData" :key="item.text" class="cardData" style="display: flex;"> 
        <div>
          <i :class="`el-icon-${item.icon}`"></i>
        </div>
        <div class="text">
          <span>{{ item.text }}</span>
          <span>{{ item.text2 }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardData: [
        { text: "在线文档", text2: "Doucument", icon: "document" },
        {
          text: "新增订单",
          text2: `${Math.floor(Math.random() * 100 + 1)}`,
          icon: "coin",
        },
        {
          text: "未处理消息",
          text2: `${Math.floor(Math.random() * 100 + 1)}`,
          icon: "message",
        },
        {
          text: "收入",
          text2: `${Math.floor(Math.random() * 100 + 1)}`,
          icon: "shopping-cart-2",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .container-header {
    display: flex;
    // justify-content: center;
    margin-bottom: 20px;
    .el-card {
      // height: 120px;
      border-radius: 15px;
      // width: 30%;
      background-color: transparent;
      // text-align: center;
    }
  }
  .container-buttom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .cardData {
      display: flex;
      // width: 22%;/
      min-width: 200px;
      margin-bottom: 20px;
      
    }
  }
}
</style>