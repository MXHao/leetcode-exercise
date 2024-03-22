<template>
  <div>
    <el-tree
      ref="tree"
      :data="treeData"
      draggable
      @node-drag-start="dragStart"
      @node-drag-end="dragEnd"
    ></el-tree>
    <el-table
      ref="table"
      :data="tableData"
      @dragover.native.prevent
      @drop.native="drop"
    >
      <el-table-column prop="name" label="Name"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: "Node1",
        },
        {
          id: 2,
          label: "Node2",
        },
      ],
      tableData: [
        {
          id: 1,
          name: "Row1",
        },
        {
          id: 2,
          name: "Row2",
        },
      ],
      draggedNode: null,
    };
  },
  methods: {
    dragStart(node) {
      this.draggedNode = node;
    },
    dragEnd() {
      this.draggedNode = null;
    },
    drop(event) {
      const targetRow = event.target.closest("tr");
      const rows = this.$refs.table.$el.querySelectorAll("tbody > tr");
      const index = Array.from(rows).indexOf(targetRow);
      if (index > -1) {
        console.log(`Dropped ${this.draggedNode.label} at row ${index + 1}`);
      }
    },
  },
};
</script>
