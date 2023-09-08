<template>
  <div id="app">
    <button @click="shuffle">打乱</button>
    <button @click="reset">重置</button>
    <TransitionGroup name="list" tag="ul">
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  methods: {
    shuffle() {
      this.list = []
      this.list = this.changeArr()
    },
    reset() {
      this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    changeArr() {
      // 创建一个空数组
      var arr = [];
      // 循环100次
      for (var i = 0; i < 11; i++) {
        // 生成一个随机的0或1
        var num = Math.floor(Math.random() * 2) + '';
        // 将数字添加到数组中
        arr.push(num);
      }
      // 输出字符串
      return arr
    },
  },
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
