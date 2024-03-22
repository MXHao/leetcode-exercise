<template>
  <div id="app">
    <!-- <div id="container"></div> -->
    <!-- <hello-world></hello-world> -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="官方demo" name="first">
        <draggableDemo v-if="activeName == 'first'"></draggableDemo>
      </el-tab-pane>
      <el-tab-pane label="表格" name="second">
        <dragTable v-if="activeName == 'second'"></dragTable>
      </el-tab-pane>
      <el-tab-pane label="表格2" name="fifth">
        <dragTable2 v-if="activeName == 'fifth'"></dragTable2>
      </el-tab-pane>
      <el-tab-pane label="复制表格" name="third">
        <copyTable v-if="activeName == 'third'"></copyTable>
      </el-tab-pane>
      <el-tab-pane label="两个表格" name="fourth">
        <twoTables v-if="activeName == 'fourth'"></twoTables>
      </el-tab-pane>
      <el-tab-pane label="树拖拽" name="sixth">
        <treeDraggable v-if="activeName == 'sixth'"></treeDraggable>
      </el-tab-pane>
      <el-tab-pane label="并联表格行" name="seventh">
        <binglianTable v-if="activeName == 'seventh'"></binglianTable>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import dragTable from "./components/dragTable.vue";
import dragTable2 from "./components/dragTable2.vue";
import draggableDemo from "./components/draggable.vue";
import copyTable from "./components/copyTable.vue";
import twoTables from "./components/twoTables.vue";
import treeDraggable from "./components/test.vue";
import binglianTable from "./components/binglianTable.vue";







export default {
  components: { dragTable, draggableDemo, copyTable, twoTables, dragTable2, treeDraggable, binglianTable },
  data() {
    return {
      activeName: 'seventh'
    };
  },
  mounted() {
    // this.print()
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
      },
    print() {
      const data = ['打字机效果']
        const arr = []
        // 获取dom元素
        const container = document.querySelector('#container')
        // for/of循环遍历数组
        for (const item of data) {
            // 打印每一个item => 数组的每一个元素
            console.log(item)
            // 创建p标签
            const p = document.createElement('p')
            // 遍历item的每一个字
            for (let i = 0; i < item.length; i++) {
                // 创建span
                let span = document.createElement('span')
                // span的内容等于item的每一个字
                span.innerHTML = item[i]
                // 将span插入到p标签中
                p.append(span)
                // 将span也添加到新数组中
                arr.push(span)
            }
            // 将p标签插入到container
            container.append(p)
        }
        // 延时1毫秒等待上方循环渲染完成
        setTimeout(() => {
            // 遍历arr数组的每一个元素
            arr.forEach((item, index) => {
                // 给每一个元素添加过渡延迟属性
                // 让每一个字都比前一个字延时0.2秒的时间
                item.style.transitionDelay = `${index * 0.1}s`
                // 将透明度设置为不透明
                item.style.opacity = 1
            })
        }, 1)
    }
  },
};
</script>

<style>
        #container {
  /* 添加这行样式=>文字纵向从右往左显示 */
  /* 目前先不设置,后面可以取消注释 */
  /* writing-mode: vertical-rl; */
}
#container span {
  /* 这里opacity先设置为1，让其不透明，可以看到每一步的效果 */
  /* 写完js之后到回来改为0 */
  opacity: 0;
  transition: opacity 0.5s;
}
</style>
