<template>
  <div>
    <el-dialog
      title="添加商品"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in products"
          :key="item.productId"
          :label="item.name"
          :value="item.productId"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddProduct">确 定</el-button>
      </span>
    </el-dialog>
    <div class="button_area">
      <div class="left">
        <el-button type="primary" @click="addProduct">添加商品</el-button>
        <el-select v-model="value2" placeholder="请选择排序方式">
          <el-option
            v-for="item in sortWay"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="right">
        <el-input placeholder="请输入内容" v-model="input" clearable>
        </el-input>
        <el-button type="primary" @click="search" icon="el-icon-search"
          >搜索</el-button
        >
      </div>
    </div>
    <el-table :data="products" style="width: 100%">
      <el-table-column
        prop="productId"
        label="商品id"
        width="100"
      ></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="summary" label="商品描述"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            :src="scope.row.picture"
            alt="产品图片"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            >编　辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删　除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Mall",
  data() {
    return {
      products: [],
      originPro: [],
      dialogVisible: false,
      value: "",
      input: "",
      sortWay: [
        { label: "名字", value: "name" },
        { label: "商品id", value: "goodId" },
        { label: "总价", value: "total" },
      ],
      value2: "",
      // productsLength: this.product.length
    };
  },
  methods: {
    sortByName(arr) {
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    },
    sortById(arr) {
      return arr.sort((a, b) => b.productId - a.productId);
    },
    searchMaxId(arr) {
      let maxId = arr[0].productId;
      let index = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].productId > maxId) {
          maxId = arr[i].productId;
          index = i;
        }
      }
      return index;
    },
    fetchData() {
      // 使用axios发送GET请求
      axios
        .get("http://demo-api.geekfun.website/product/list.aspx")
        .then(({ data }) => {
          // 处理请求成功的响应数据

          this.products = data.products;
          this.originPro = this.products;
          console.log(this.products);
          console.log("成功获取数据:", data);
          // console.log(typeof data.products[0].price); // 输出number
          // console.log(typeof data.products[0].sales); // 输出underfind
          // console.log("First product sales:", data.products[0].sales);
        })
        .catch((error) => {
          // 处理请求失败的情况
          console.error("获取数据失败:", error);
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleAddProduct() {
      const selectedProduct = this.products.filter(
        (item) => item.productId === this.value
      );
      const selectData = selectedProduct[0];
      if (selectData) {
        const newProduct = {
          ...selectData,
          len: this.searchMaxId(this.products),
          productId: this.products[length].productId + 1, // 新商品的 ID 自增
        };
        this.products.unshift(newProduct); // 将新商品添加到 products 中
        this.dialogVisible = false; // 关闭 dialog
      }
      console.log(selectedProduct, "数据");
    },
    addProduct() {
      this.dialogVisible = true;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const index = this.products.findIndex(
            (product) => product.productId === row.productId
          );
          if (index !== -1) {
            this.products.splice(index, 1);
          }
          this.$message.success("删除成功");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEdit(row) {
      console.log(this.value2);
      // console.log(this.productsLength)
    },
    search() {
      if (this.input) {
        const keyword = this.input;
        this.products = this.products.filter((product) =>
          product.name.includes(keyword)
        );
      }
    },
  },
  watch: {
    input(newValue, oldValue) {
      if (newValue === "") {
        this.products = this.originPro;
      }
    },
    value2(newValue) {
      if (newValue === "name") {
        this.products = this.sortByName(this.products);
      } else if (newValue === "goodId") {
        this.products = this.sortById(this.products);
      } 
    },
  },
  mounted() {
    // 在组件挂载完成后，调用fetchData方法
    this.fetchData();
    
  },
};
</script>

<style lang="less" scoped>
.button_area {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .left {
    .el-button {
      margin-right: 10px;
    }
  }
  .right {
    display: flex;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>