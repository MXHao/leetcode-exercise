<!-- 组件说明 -->
<template>
    <div class="flex" style="width: 100%;">
        <el-button @click="print">打印</el-button>
      <el-aside width="300px" class="left">
        <el-tree ref="tree" highlight-current node-key="id" default-expand-all :data="testBxData" :props="defaultProps"
          @node-click="handleNodeClick" :expand-on-click-node="false" @node-contextmenu="floderOption">
          <span class="el-tree-node__label" :class="'el-tree-node__label-' + node.level" slot-scope="{ node, data }"
            :title="node.label">
            {{ node.label }}
          </span>
        </el-tree>
        <div :style="{ 'z-index': 9999, position: 'fixed', left: optionCardX + 'px', top: optionCardY + 'px' }"
          v-show="optionCardShow" id="option-button-group">
          <div class="option-card-button" v-if="isCsx" @click="addBxcs">
            添加并行测试
          </div>
          <div class="option-card-button" v-if="currentNode.type == 'item' || currentNode.type == 'item_child'"
            @click="delCsx">
            删除
          </div>
        </div>
      </el-aside>
      <el-main class="center">
        <!-- 改变合并长度为{{ csxLength }}
        <el-input type="number" v-model="csxLength" placeholder="请输入并行测试子项数量"></el-input> -->
        <div id="target" class="dropabled target">
        <el-table :span-method="(param)=>objectSpanMethod(param)" @dragover.native.prevent @drop.native="drop" ref="table" :data="tableData" border style="width: 100%">
          <el-table-column prop="relation" label="并行关系" width="180">
          </el-table-column>
          <el-table-column prop="name" label="测试项">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column prop="bxzx" label="并行测试子项">
            <template slot-scope="scope">
              <!-- {{ scope.row.bxzx }} -->
              <div class="flex">
                <span v-if="scope.row.bxzx.length">并行：</span>
                <div v-for="(item, index) in scope.row.bxzx">{{ item }}， </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="220" prop="cz">
              <template slot-scope="scope">
                <el-dropdown :ref="`dropdown-${scope.row.uud}`" style="padding: 3px 10px" v-if="scope.row.name && scope.row.cszx" trigger="click">
                  <!-- <span class="el-dropdown-link" ref='dropdown111'>
                    并<i class="el-icon-arrow-down el-icon--right"></i>
                  </span> -->
                  <el-button :ref="`dropdownBtn-${scope.row.uud}`" type="primary" size="mini">
                    并
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown" id="dropdown" class="cjycjy">
                    <div class="hezione" style="padding: 0 10px">
                      <el-checkbox-group v-model="scope.row.bxzx">
                        <div style="padding: 5px 0" v-for="item in scope.row.cszx" :key='item.id'>
                          <el-checkbox :label="item.name" >
  
                          </el-checkbox>
                        </div>
                      </el-checkbox-group>
  
                        <div class="btn">
                          <!-- <el-button class="cancel" @click="zxCancel(scope.row)">取消</el-button> -->
                          <el-button style="width: 100%" type="primary" class="sure" @click="zxConfirm(scope.row)">确认</el-button>
                        </div>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="mini" @click="addRow(scope.row, scope.$index)"></el-button>
                <el-popover placement="top" width="160" :ref="`popover-${scope.row.uud}`">
                  <p>确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="cancelDelete(scope.row)">取消</el-button>
                    <el-button type="primary" size="mini" @click="
                      delConfirm(scope.row, scope.$index)
                      ">确定</el-button>
                  </div>
                  <el-button type="danger" :disabled="tableData.length == 1 || (scope.row.relation.indexOf('并联-') != -1)" icon="el-icon-delete" size="mini" slot="reference" style="margin-left: 10px;"></el-button>
                </el-popover>
              </template>
            </el-table-column>
        </el-table>
      </div>
      </el-main>
      <el-aside width="300px" class="right">
        <div class="txt" id="txt">
        <el-tree ref="bxRTree" :props="defaultProps" :data="bxRData" node-key="id" default-expand-all
          @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable
          :allow-drop="allowDrop" :allow-drag="allowDrag">
          <span class="el-tree-node__label" :class="'el-tree-node__label-' + node.level" slot-scope="{ node, data }"
            :title="node.label">
            <span v-if="data.type != 'item_child'">{{ node.label }}</span>
            <span style="display: none;" v-else>{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
      </el-aside>
    </div>
  </template>
  
  <script>
//   import testTaskConfig from "@/api/taskManagement/testTaskConfig";
//   import { countColumn } from "codemirror";
  export default {
    components: {
  
    },
    props: {
      configId: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        activeName: 'second',
        testItemData: [],//测试项左侧树
        funData: [],//测试右侧树
        testBxData: [],//并行左侧树
        bxRData: [
        {
          id: 1,
          name: '一级 1',
          children: [{
            id: 4,
            name: '二级 1-1',
            type: 'item',
            zx: []
          }]
        }, {
          id: 2,
          name: '一级 2',
          children: [{
            id: 5,
            name: '二级 2-1',
            type: 'item',
            zx: []
          }, {
            id: 6,
            name: '二级 2-2',
            type: 'item',
            zx: []
          }]
        }, {
          id: 3,
          name: '一级 3',
          children: [{
            id: 7,
            name: '二级 3-1',
            type: 'item',
            zx: []
          }, {
            id: 8,
            name: '二级 3-2',
            type: 'item',
            zx: []
          }]
        }
        ],//并行右侧树
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        currentNode: {},
        currentNodeKey: null,
        // 树节点右键操作相关属性
        optionCardX: "", // 树节点右键菜单X位置
        optionCardY: "", // 树节点右键菜单Y位置
        optionCardShow: false, // 树节点右键菜单是否显示
        optionData: null, // 右键选中的节点data
        saveLoading: false, // 保存按钮是否loading
        itemForm: {
          csxmc: '',
          cshs: '',
          cscs: [],
          cshsId: ''
        },
        itemRules: {
          csxmc: [
            { required: true, message: "请输入测试项名称", trigger: "blur" },
          ],
          cshs: [
            { required: true, message: "请选择测试函数", trigger: "blur" },
          ],
        },
        isAdd: null,//添加或编辑
        isCsx: null,//测试项或测试子项
        TBCNodeKey: '',
        tableData: [
          { relation: '', name: '', uud: 0, cszx: [], bxzx: [] },
        ],
        draggedNode: null,
        csxLength: 10,
        relationArr: [],
        relationIndex: -1
      };
    },
    computed: {
  
    },
    created() {
      // this.configId = this.$route.query.id
      console.log('this.configId: ', this.configId);
    //   this.getBxData()
    },
    mounted() {
  
    },
    methods: {
      cellClassName({ row, column, rowIndex, columnIndex }){
        return "custom-"+rowIndex;
      },
      handleNodeClick(data, node) {
        this.optionCardShow = false
        console.log(data)
        //设置不能选中的节点
        if (node.level == "1" || node.level == "2") {
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.currentNodeKey);
          });
          return;
        }
        this.currentNode = data
        this.currentNodeKey = data.id;
        this.isCsx = data.type == 'item' ? true : false
        this.isAdd = false
        this.itemForm.csxmc = data.data.itemName
        this.itemForm.cshs = data.data.caseFuncName ? data.data.caseFuncName : ''
        this.itemForm.cscs = data.data.paramVal ? JSON.parse(data.data.paramVal) : []
        if (this.$refs["form"]) {
          this.$refs["form"].clearValidate();
        }
  
      },
      floderOption(e, data, node, tree) {
        this.optionCardShow = false
        this.currentNodeKey = null
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.currentNodeKey);
        });
        this.TBCNodeKey = data.id//待确认的nodekey
        this.currentNode = data
        this.isCsx = data.type == 'model' ? true : false
        // this.isAdd = true
        // 根节点不需要右键菜单
        try {
          if (node.level == 1) {
            this.optionCardShow = false;
            return;
          }
        } catch (error) { }
        // ERTHNET和COM节点不需要右键菜单
        this.optionCardX = e.x; // 让右键菜单出现在鼠标右键的位置
        this.optionCardY = e.y + 10;
        this.optionData = data;
        this.optionCardShow = true; // 展示右键菜单
  
      },
      optionCardClose(event) {
        var currentCli = document.getElementById("option-button-group");
        if (currentCli) {
          if (!currentCli.contains(event.target)) {
            //点击到了id为option-button-group以外的区域，就隐藏菜单
            this.optionCardShow = false;
            this.optionCardX = "";
            this.optionCardY = "";
            this.optionData = null;
          }
        }
      },
      getBxData() {
        this.getTestBxData()
        this.getBxRData()
      },
      getTestBxData() {//并行左侧树
        // testTaskConfig.getBxTree(this.configId).then(res => {
        //   this.testBxData = res
        // }).catch(err => {
  
        // })
      },
  
      dataTree(data) {
        for (const item of data) {
          if (item.type == 'item') {
            let child = item.children
            delete item.children
            item.zx = child
          }
          if (item.children) {
            this.dataTree(item.children)
          }
        }
      },
      getBxRData() {//并行右侧树
        // testTaskConfig.getTestTree(this.configId).then(res => {
        //   this.bxRData = res
        //   this.dataTree(this.bxRData)
        //   console.log('this.bxRData: ', this.bxRData);
        // }).catch(err => {
  
        // })
      },
      addBxcs() {
        this.currentNodeKey = this.TBCNodeKey
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.currentNodeKey);
        });
        this.itemForm = {
          csxmc: ''
        }
        this.optionCardShow = false;
        this.isAdd = true
      },
      // 删除测试项
      delCsx() {
        console.log('this.currentNode: ', this.currentNode);
        this.optionCardShow = false;
        // testTaskConfig.delItem([this.currentNode.dataId]).then(res => {
        //   this.$notify({
        //     title: '删除成功',
        //     type: 'success',
        //     duration: 2500
        //   })
        //   this.getData()
        // }).catch(err => {
  
        // })
      },
      itemSave() {//测试项保存
        console.log('this.tableData: ', this.tableData);
      },
      objectSpanMethod({  row, column, rowIndex, columnIndex }) {
        // console.log('countColumn, countRow, row, column, rowIndex, columnIndex: ', countColumn, countRow, row, column, rowIndex, columnIndex);
        if (columnIndex == 0 && row.relation.indexOf('并联-') != -1) {
            // 返回值[rowspan, colspan]，rowspan为2表示合并两行，colspan为1表示合并一列
            // console.log('this.relationArr: ', this.relationArr[row.reIndex]);
            // console.log('row.reIndex: ', row.reIndex);
            return [this.relationArr[row.reIndex].count, 1];
          } else if (columnIndex === 0 && rowIndex > 0 && row.relation == '并联') {
            // 返回[0, 0]表示这个单元格不显示，因为它已经被上一个单元格合并
            return [0, 0];
          }
        },
      parallelSave() {
  
      },
      toParallel() {
  
      },
      getUuiD() {
        return Number(
          Math.random().toString().substr(2, 8) + Date.now()
        ).toString(36);
      },
      addRow(row, index) {
        let j = {
                relation: '',
                name: '',
                uud: this.getUuiD(),
                cszx: [],
                bxzx: []
            };
            if(!this.tableData[index + 1] || !this.tableData[index + 1].relation) {
                this.tableData.splice(index + 1, 0, j)
            }else {
                this.$message.warning('并联项的添加请直接使用拖拽操作')
            }
        
      },
      cancelDelete(row) {
        this.$refs["popover-" + row.uud].showPopper = false;
      },
      delConfirm(row, index) {
        if(row.reIndex != null) {
            this.relationArr[row.reIndex].count = this.relationArr[row.reIndex].count - 1
        }
        this.tableData.splice(index, 1)
        this.$refs["popover-" + row.uud].showPopper = false;
        let arr = this.findUniqueReIndex(this.tableData)//并联组删到剩一个时，重置并联项的relation值为""
        if(arr.length) {
            arr.forEach(item => {
                console.log(item)
                item.relation = ''
            });
        }
      },
     findUniqueReIndex(array) {
        const reIndexCount = array.reduce((acc, obj) => {
            if (obj.reIndex !== undefined) {
            acc[obj.reIndex] = (acc[obj.reIndex] || 0) + 1;
            }
            return acc;
        }, {});

        return array.filter(obj => reIndexCount[obj.reIndex] === 1);
    },
      //并行
  
      handleDragStart(node, ev) {
        // console.log('drag start', node);
        this.draggedNode = node;
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        // console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        // console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        // console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, endNode, position, event) {
        // console.log('draggingNode, endNode, position, event: ', draggingNode, endNode, position, event);
        // this.remove(draggingNode, this.bxRData)
        this.draggedNode = null
        // this.itemForm.cshs = draggingNode.data.name
        // this.itemForm.cshsId = draggingNode.data.dataId
        // this.itemForm.cscs = JSON.parse(draggingNode.data.data.funcParam)
      },
      drop(event) {
        const targetRow = event.target.closest("tr");
        const rows = this.$refs.table.$el.querySelectorAll("tbody > tr");
        const index = Array.from(rows).indexOf(targetRow);
        if (index > -1) {
            if(this.tableData.some(item => item.itemId === this.draggedNode.data.id)) {
            this.$message.warning('不能重复添加')
            return
            }
          // console.log('this.draggedNode.zx: ', this.draggedNode.data.zx);
          console.log(`Dropped ${this.draggedNode.label} at row ${index + 1}`);
          if(this.tableData[index].name) {//创建并联组
            if(this.tableData[index].relation == '并联') {
                this.$message.warning('请拖动到并联组第一行位置')
                return
            }
            if(this.tableData[index].relation.indexOf('并联-') == -1) {//新创建的并联组
                this.relationIndex++
                console.log('this.relationIndex: ', this.relationIndex);
                this.tableData[index].relation = '并联-'+ this.relationIndex
                this.tableData[index].reIndex = this.relationIndex
                this.relationArr.push({count: 1})
            }
            if(this.tableData[index].relation.indexOf('并联-') != -1) {//在原有并联组继续添加
                this.relationArr[this.tableData[index].reIndex].count++
            }
            console.log('this.tableData[index].name: ', this.tableData[index].name);
            console.log('this.relationArr: ', this.relationArr);
            let j = {
              relation: '并联',
              name: this.draggedNode.parent.label + ' ' + this.draggedNode.label,
              uud: this.getUuiD(),
              cszx: this.draggedNode.data.zx,
              bxzx: [],
              reIndex: this.relationIndex >= 0 ? this.relationIndex : null,
              itemId: this.draggedNode.data.id
            };
            this.tableData.splice(index + 1, 0, j)
          }else {
            this.tableData[index].relation = ''
            this.tableData[index].name = this.draggedNode.parent.label + ' ' + this.draggedNode.label
            this.tableData[index].cszx = this.draggedNode.data.zx
            this.tableData[index].bxzx = []
            this.tableData[index].itemId = this.draggedNode.data.id
          }
        }
      },
      remove(node, data) {
        console.log('node, data: ', node, data);
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
        },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
      },
      allowDrag(draggingNode) {
        console.log('draggingNode: ', draggingNode);
        return draggingNode.data.type == 'item'
      },
      zxCancel(row) {
        console.log(this.$refs['dropdown-'+ row.uud])
        this.$refs['dropdown-'+ row.uud].hide();
      },
      zxConfirm(row) {
        console.log(row)
        this.$refs['dropdown-'+ row.uud].hide();
      },
      print() {
        console.log('this.tableData: ', this.tableData);
        console.log('this.relationArr: ', this.relationArr);
      }
    },
  }
  </script>
  
  <style lang='scss' scoped>
  .flex {
    display: flex;
    // align-items: center;
  }
  
  ::v-deep .el-tree-node__content {
    height: 28px;
    line-height: 28px;
  }
  
  ::v-deep .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    color: #21ce6a;
  }
  
  .app-container {
    .itemSave {
      position: absolute;
      right: 340px;
      top: 110px;
      z-index: 999;
    }
  
    .el-tabs {
      height: 100%;
  
      ::v-deep .el-tabs__content {
        height: calc(100% - 56px);
  
        .el-tab-pane {
          height: 100%;
  
  
        }
      }
    }
  
    .left,
    .center,
    .right {
      padding: 10px;
      box-shadow: 0 0px 5px 1px rgba(0, 0, 0, 0.2);
      height: 100%;
      background: #fff;
      margin-bottom: 0;
      line-height: normal;
    }
  
    .center {
      margin: 0 10px;
  
      .paramBox {
        height: 100px;
        width: 100%;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 0 5px;
  
        .tag {
          margin: 2px;
        }
      }
    }
  }
  
  // 右键菜单按钮
  .option-card-button {
    width: 100%;
    margin-left: 0;
    font-size: 13px;
    border-radius: 0;
    padding: 8px 16px;
    text-align: center;
    cursor: pointer;
    color: #333;
    border-bottom: 1px solid #d1d3d7;
  }
  
  .option-card-button:hover {
    background-color: #eee;
  }
  
  #option-button-group {
    list-style-type: none;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 400;
    color: #333;
    -webkit-box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.3);
    border: 1px solid #d1d3d7;
    border-bottom: none;
    width: 120px;
    background: #fff;
  }
  
  span.el-tree-node__label {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  span.el-tree-node__label.el-tree-node__label-1 {
    width: 240px;
  }
  
  span.el-tree-node__label.el-tree-node__label-2 {
    width: 220px;
  }
  
  span.el-tree-node__label.el-tree-node__label-3 {
    width: 200px;
  }
  
  span.el-tree-node__label.el-tree-node__label-4 {
    width: 180px;
  }
  
  span.el-tree-node__label.el-tree-node__label-5 {
    width: 160px;
  }
  
  ::v-deep .el-form-item__content {
    width: calc(95% - 100px);
  }
  </style>
  