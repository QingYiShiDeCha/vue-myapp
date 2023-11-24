<template>
  <div class="container">
    <div class="container-header" style="width: 100%">
      <el-card><h1>欢迎光临 管理员</h1></el-card>
    </div>
    <div class="data-area">
      <el-card style="width: 38%">
        <h1>表格数据展示</h1>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="id"
            label="商品ID"
            width="100"
          ></el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="type" label="商品类型"></el-table-column>
          <el-table-column prop="sales" label="销售量"></el-table-column>
        </el-table>
      </el-card>
      <el-card style="width: 60%; margin-left: auto" > 
        <div ref="echarts" style="height: 480px;"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      tableData: [
        {
          id: 56,
          name: "柯西-施瓦兹不等式马克杯",
          type: "马克杯",
          sales: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
        },
        {
          id: 57,
          name: "泊松分布马克杯",
          type: "马克杯",
          sales: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
        },
        {
          id: 58,
          name: "余弦定理马克杯",
          type: "马克杯",
          sales: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
        },
        {
          id: 59,
          name: "正弦定理马克杯",
          type: "马克杯",
          sales: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
        },
      ],

    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts: function () {
      const option = {
        title: {
          text: "商品销量统计",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: this.tableData.map((item) => item.name),
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.tableData.map((item) => item.sales),
          },
        ],
      };
      const myCharts = echarts.init(this.$refs.echarts);
      myCharts.setOption(option);
      window.addEventListener("resize", () => {
        myCharts.resize();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
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
  .data-area {
    width: 100%;
    display: flex;
    text-align: left;
  }
}
</style>