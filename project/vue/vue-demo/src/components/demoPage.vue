<template>
  <div id="app">
    <button @click="addText">添加文字</button>
    <button @click="changeText">改变文字</button>
    <transition name="expand">
      <div class="box" ref="box" style="width: 100%; background: skyblue">
        {{ text }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    addText() {
      this.text += '这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字';
      this.$nextTick(() => {
        this.$refs.box.style.height = `${this.$refs.box.scrollHeight}px`;
      });
    },
    changeText() {
      this.text = '这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字。这是一些文字'
      this.$nextTick(() => {
        this.$refs.box.style.height = `${this.$refs.box.scrollHeight}px`;
      });
    }
  }
}
</script>

<style>
.box {
  overflow: hidden;
  transition: height 0.5s ease-out;
}
.expand-enter-active, .expand-leave-active {
  transition: height 0.5s;
}
.expand-enter, .expand-leave-to {
  height: 0;
}
</style>
