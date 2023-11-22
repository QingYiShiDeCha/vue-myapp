<template>
  <div>
    <el-button type="primary" @click="getToken">获取token</el-button>
    {{ uuid }}
  </div>
</template>

<script>

export default {
  data() {
    return {
      uuid: "",
    };
  },
  methods: {
    getRandomToken() {
      let d = new Date().getTime();
      let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    getToken() {
      this.uuid = this.getRandomToken();
    },
  },
};
</script>

<style lang="less" scoped>
</style>