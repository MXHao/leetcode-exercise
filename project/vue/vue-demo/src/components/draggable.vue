<template>
    <!--  拖拽区域      -->
    <div class="down_panel">
          <el-tree
            :data="treeData1"
            ref="tree1"
            class="tree"
            node-key="id"
            draggable
            default-expand-all
            :allow-drop="returnFalse"
            @node-drag-start="handleDragstart"
            @node-drag-end="handleDragend"
          >
            <!-- <span class="custom-tree-node" slot-scope="{node,data}" :style="{cursor: node.level == 2 ? 'move' : 'not-allowed'}">
                {{data.label}}
            </span> -->
            <span class="custom-tree-node" slot-scope="{node,data}" >
                {{data.label}}
            </span>
          </el-tree>
 
          <div class="list">
            <div>当前拖拽的节点对象</div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="内容" prop="node">
                </el-table-column>
            </el-table>
          </div>
 
        </div>
</template>
  
<script>
export default {
    name: "HelloWorld",
    data() {
        return {
             // 树拖拽
          treeData1: [{
            id: 1,
            label: "一级 1",
            children: [{
              id: 3,
              label: "二级 1-1",
              children: [{id: 9,label: "三级 1-1-1"}]
            }],
          },{
            id: 2,
            label: "二级 2",
            children: [{
              id: 4,
              label: "二级 2-1",
              children: [{id: 5,label: "三级 2-1-1"}]
            }],
          }],
          nodeArr: {},
          tableData: [
            {node: ''}
          ]
        };
    },
    methods: {
        handleDragstart (node, event) {

        },
        handleDragend (draggingNode, endNode, position, event) {
            console.log('draggingNode, endNode, position, event: ', draggingNode, endNode, position, event);

            this.nodeArr = draggingNode.data
            this.tableData.push({
                node: draggingNode.data.label
            })
        },
        returnFalse () {
          return false;
        },
    }
};
</script>
  
<style scoped>
.down_panel {
    display: flex;
    /* align-items: center; */
    /* justify-content: space-between; */
    width: 100%;
    .tree {
        width: 50%;
    }
    .list {
        width: 50%;
    }
}
</style>
  