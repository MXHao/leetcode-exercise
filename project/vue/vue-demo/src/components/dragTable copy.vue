<template>
  <div class="app-container">
    <div class="head-container">
      <div class="btnGroup" style="padding-left: 5px">
        <el-button size="mini" class="filter-btn" type="primary" icon="el-icon-plus" @click="save">保存</el-button>
      </div>
    </div>
    <div class="drag_table_wapper">
      <div style="width: 49%;">
        <el-table highlight-current-row @current-change="handleCurrentChange" ref="table1" class="table1"
          :data="tableData1" id="table_count" border>
          <el-table-column prop="device" label="设备名" align="center">
            <template slot-scope="scope">
              <draggable :sort="false" :key="scope.row.routeId" animation="500" v-model="scope.row.device" :move="onMove"
                :group="optionLDevice" :data-id="scope.row.routeId" @add="add1(scope.row, $event)"
                @start="onDragStart(scope.row, scope.$index, $event)" @end="onDragEnd(scope.row, scope.$index, $event)"
                class="draggableBox" :disabled="draggableDisabled">
                <!-- <el-tag class="tag" v-for="(item, index) in scope.row.device" :key="index">{{ `${item}_ ${scope.row.tdfz}_${scope.row.xxjd}` }}</el-tag> -->
                <el-tag class="tag" v-for="(item, index) in scope.row.device" :key="index">{{ item }}</el-tag>
              </draggable>
            </template>
          </el-table-column>
          <el-table-column prop="tdfz" label="通道分组/测试资源" align="center">
          </el-table-column>
          <el-table-column prop="xxjd" label="通道/消息节点" align="center">
          </el-table-column>
          <el-table-column label="关联产品信号" align="center">
            <template slot-scope="scope">
              <draggable :sort="false" :key="scope.row.routeId" animation="500" v-model="scope.row.product"
                :group="optionLProduct" :data-id="scope.row.routeId" @add="add1(scope.row, $event)"
                @start="onDragStart(scope.row, scope.$index, $event)" @end="onDragEnd(scope.row, scope.$index, $event)"
                class="draggableBox" :disabled="draggableDisabled">
                <el-tag class="tag" v-for="(item, index) in scope.row.product" :key="index">{{ item }}</el-tag>
              </draggable>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 49%; margin-left: 40px">
        <el-table :row-class-name="tableRowClassName" ref="table2" class="table2" :data="tableData2" id="table_count"
          border>
          <el-table-column prop="product" label="模块名" align="center">
            <template slot-scope="scope">
              <draggable :key="scope.row.routeId" animation="500" v-model="scope.row.product" :group="optionRProduct"
                :pull="false" :data-id="scope.row.routeId" @add="add2(scope.row, $event)"
                @start="onDragStart(scope.row, scope.$index, $event)" @end="onDragEnd(scope.row, scope.$index, $event)"
                class="draggableBox" :disabled="draggableDisabled">
                <el-tag class="tag" v-for="(item, index) in scope.row.product" :key="index">{{ item }}</el-tag>
              </draggable>
            </template>
          </el-table-column>
          <el-table-column prop="yxzx" label="硬线/总线" align="center">
          </el-table-column>
          <el-table-column prop="sx" label="缩写" align="center">
          </el-table-column>
          <el-table-column prop="xhlx" label="信号类型" align="center">
          </el-table-column>
          <el-table-column prop="tdxh" label="通道信号" align="center">
          </el-table-column>
          <el-table-column label="关联测试设备通道" width="120" align="center">
            <template slot-scope="scope">
              <draggable :key="scope.row.routeId" animation="500" v-model="scope.row.device" :group="optionRDevice"
                :data-id="scope.row.routeId" @add="add2(scope.row, $event)"
                @start="onDragStart(scope.row, scope.$index, $event)" @end="onDragEnd(scope.row, scope.$index, $event)"
                class="draggableBox" :disabled="draggableDisabled">
                <el-tag class="tag" closable @close="closeTag(item, scope.row)" v-for="(item, index) in scope.row.device"
                  :key="index">{{ item }}</el-tag>
              </draggable>
            </template>
          </el-table-column>

        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      optionLDevice: {
        name: 'group1',
        pull: 'clone',
        put: ['group4']//是否允许拖入当前组
      },
      optionLProduct: {
        name: 'group2',
        pull: false,
        put: ['group3']//是否允许拖入当前组
      },
      optionRProduct: {
        name: 'group3',
        pull: false,
        put: ['group2']//是否允许拖入当前组
      },
      optionRDevice: {
        name: 'group4',
        pull: true,
        put: ['group1']
      },
      option2: {

      },
      tableData1: [],
      tableData2: [],
      draggableDisabled: false,
      query: {
        cssbgx: '',
        cpgx: '',
        count: ''
      },
      cssbgxOption: [],
      cpgxOption: [],
      countOption: [],
      currentRelateId: ''
    };
  },
  created() {

  },
  mounted() {
    this.getData();
  },
  computed: {
    sortableListOptions() {
      return {
        group: "tableData",
      };
    },
  },
  methods: {
    getData() {
      // this.getSelect()
      this.getMockTableData()
    },
    getMockTableData() {
      this.tableData1 = [
        {
          device: ['板卡1'],
          tdfz: 'AO-Normal',
          xxjd: '17',
          product: [],
          routeId: 'sb1'
        },
        {
          device: ['板卡2'],
          tdfz: 'AO-Normal',
          xxjd: '18',
          product: [],
          routeId: 'sb2'
        },
        {
          device: ['板卡3'],
          tdfz: 'AO-Normal',
          xxjd: '17',
          product: [],
          routeId: 'sb1'
        },
        {
          device: ['板卡4'],
          tdfz: 'AO-Normal',
          xxjd: '18',
          product: [],
          routeId: 'sb2'
        },
      ]
      this.tableData2 = [
        {
          product: ['A'],
          yxzx: '硬线',
          sx: '地',
          xhlx: 'AI',
          tdxh: 'aa1',
          device: [],
          routeId: 'cp1'
        },
        {
          product: ['B'],
          yxzx: '硬线',
          sx: '地',
          xhlx: 'AI',
          tdxh: 'aa1',
          device: [],
          routeId: 'cp2',
        },
        {
          product: ['C'],
          yxzx: '硬线',
          sx: '地',
          xhlx: 'AI',
          tdxh: 'aa1',
          device: [],
          routeId: 'cp1'
        },
        {
          product: ['D'],
          yxzx: '硬线',
          sx: '地',
          xhlx: 'AI',
          tdxh: 'aa1',
          device: [],
          routeId: 'cp2'
        },
      ]
    },
    add1(data, e) {
      console.log('data, e: ', data, e);
    },
    add2(data, e) {
      console.log('e, e: ', e.from.parentNode.parentNode.parentNode.__vue__.row, e.to.parentNode.parentNode.parentNode.__vue__.row);
      let toCurrentMk = e.to.parentNode.parentNode.parentNode.__vue__.row.product[0]
      let toTdxh = e.to.parentNode.parentNode.parentNode.__vue__.row.tdxh
      let fromProduct = e.from.parentNode.parentNode.parentNode.__vue__.row.product
      fromProduct.push(toCurrentMk + '_' + toTdxh)

      // let fromDevice = e.from.parentNode.parentNode.parentNode.__vue__.row.device[0]
      // let fromXxjd = e.from.parentNode.parentNode.parentNode.__vue__.row.xxjd
      // let toDevice = e.to.parentNode.parentNode.parentNode.__vue__.row.device
      // toDevice.push(fromDevice + '_' + fromXxjd)

    },
    onDragEnd(data, index, evt) {
      console.log('evt: ', evt);
      // 输出拖动前的信号或设备
      // this.getData()
    },
    onDragStart(data, index, evt) {
      // console.log(evt)
    },
    workposMove(e) {
      this.workposNo = e.currentTarget.dataset.actindex
      console.log('this.workposNo: ', this.workposNo);
    },
    onMove(e, originalEvent) {
      // console.log(e)
      let from = e.from.__vue__.value
      let to = e.to.__vue__.value
      if (to.includes(from[0])) {
        return false
      }
      console.log('from, to: ', from, to);
      return true
      //不允许停靠
      //  if (e.relatedContext.element.id == 1) return false;
      //  //不允许拖拽
      //  if (e.draggedContext.element.id == 4) return false;
      //  return true;
    },
    closeTag(data, row) {
      // console.log(data, row.device)
      row.device.splice(row.device.indexOf(data), 1);
      this.tableData1.forEach(item => {
        if (item.device[0] == data) {
          console.log('item.device[0]: ', item.device[0]);
          item.product.splice(row.product.indexOf(data), 1);
          this.$refs.table1.setCurrentRow(null)
          // this.handleCurrentChange(row)
        }
      });
    },
    handleCurrentChange(val) {
      console.log('val: ', val);
      this.tableRowClassName = ({ row, rowIndex }) => {//这里重新定义方法
        if (row.isHigh) {
          return 'warning-row';
        }
        return '';
      }
      this.tableData2.forEach((item2, index2) => {
        //重置为白色
        item2.isHigh = false
        this.tableRowClassName({ row: item2, rowIndex: index2 })
        this.$forceUpdate()
        if (val) {
          val.product.forEach(item1 => {
            if (item2.product[0] == item1) {//如果关联了
              item2.isHigh = true
              this.tableRowClassName({ row: item2, rowIndex: index2 })
              this.$forceUpdate()
            }
          });
        }
      });

    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    tableRowClassName({ row, rowIndex }) {

    },
    save() {
      console.log('this.tableData1, this.tableData2: ', this.tableData1, this.tableData2);
      // let param = {
      //   productIndex: this.query.count,
      //   ateTypeId: this.query.cssbgx,
      //   relateId: this.currentRelateId,
      //   links: this.tableData1
      // }
      // crudCorrelation.saveAll(param).then(res => {
      //   if(res) {

      //   }
      // }).catch(err => {

      // })
    },


  },
};
</script>

<style lang='scss' scoped>
::v-deep .el-table .warning-row {
  background: #e8f4ff !important;
}

.flex {
  display: flex;
  align-items: center;
}

.draggableBox {

  // display: flex;
  // align-items: center;
  // justify-content: center;
  .tag {
    cursor: pointer;
  }
}

.drag_table_wapper {
  display: flex;
  width: 100%;
  justify-content: flex-start;

}

.btnGroup {
  justify-content: flex-start;

  .filter-btn {
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px 0px 0;
  }
}</style>
