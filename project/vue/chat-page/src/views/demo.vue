<!-- 组件说明 -->
<template>
    <chat-page :chatTitle="chatTitle" :sseUrl="sseUrl"></chat-page>
</template>

<script>
  import chatPage from './components/chatPage.vue'
  export default {
    components: {
      chatPage
    },
    props: {

    },
    data () {
      return {
        chatTitle: '智能问答',
        sseUrl: 'http://192.168.10.43:18083/ai/api/chat/createSse/'
      };
    },
    computed: {

    },
    methods: {

    },
  }
</script>

<style lang='scss' scoped>

</style>
