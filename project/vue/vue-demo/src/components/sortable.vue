<!-- 拖拽排序表格 -->
<template>
    <div ref="wrapper">
      <div :key="tableKey">
        <slot></slot>
      </div>
    </div>
  </template>
   
  <script>
  import sortable from "sortablejs";
   
  export default {
    name: "ElTableDraggable",
    props: {
      handle: {
        type: String,
        default: ""
      },
      animate: {
        type: Number,
        default: 100
      }
    },
    data () {
      return {
        tableKey: 0,
        tableObj: undefined,
      };
    },
    methods: {
      //修改参数 目前只用来修改是否可拖拽了
      changeOption (name, value) {
        this.tableObj.option(name, value)
      },
      //初始化
      makeTableSortAble () {
        const table = this.$children[0].$el.querySelector(
          ".el-table__body-wrapper tbody"
        );
        this.tableObj = sortable.create(table, {
          handle: this.handle,
          animation: this.animate,
          //拖拽结束将新的排序数组传回给父组件
          onEnd: ({ newIndex, oldIndex }) => {
            this.keepWrapperHeight(true);
            this.tableKey = Math.random();
            const arr = this.$children[0].data;
            const targetRow = arr.splice(oldIndex, 1)[0];
            arr.splice(newIndex, 0, targetRow);
            this.$emit("drop", { targetObject: targetRow, list: arr });
          }
        });
      },
      keepWrapperHeight (keep) {
        // eslint-disable-next-line prefer-destructuring
        const wrapper = this.$refs.wrapper;
        if (keep) {
          wrapper.style.minHeight = `${wrapper.clientHeight}px`;
        } else {
          wrapper.style.minHeight = "auto";
        }
      }
    },
    mounted () {
      this.makeTableSortAble();
    },
    watch: {
      //每次拖拽都重新初始化
      tableKey () {
        this.$nextTick(() => {
          this.makeTableSortAble();
          this.keepWrapperHeight(false);
        });
      }
    }
  };
  </script>