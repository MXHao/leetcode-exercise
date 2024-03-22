<template>
    <div>
      <el-button @click="changeStyle">改变第一行的样式</el-button>
      <el-table :data="tableData" ref="table" :row-class-name="tableRowClassName">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tableData: [
          { name: "小张", age: 22, gender: "男" },
          { name: "小王", age: 25, gender: "女" },
          { name: "小李", age: 23, gender: "男" },
        ],
        firstRowStyle: "warning-row",
      };
    },
    methods: {
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 0) {
          return this.firstRowStyle;
        }
        return "";
      },
      changeStyle() {
        // 切换第一行的样式
        this.firstRowStyle =
          this.firstRowStyle === "warning-row" ? "success-row" : "warning-row";
        // 更新第一行的样式
        // this.$refs.table.updateRowStyle(0);
      },
    },
  };
  </script>
  
  <style>
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  </style>
  