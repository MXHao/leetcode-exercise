<template>
    <div style="width: 100%; height: 100%">
      <iframe id="myIframe" :src="'/pdfjs/web/viewer.html?file='+src+ '#page=' + this.currentPage + '&keyword=' + keyword" width="100%" height="100%" border="0"></iframe>
    </div>
  </template>
  <script>
  export default {
    components:{
    },
    props: {
      src: {
        type: String,
        default: ""
      },
      currentPageProp: {
        type: Number,
        default: 1
      },
      keywordProp: {
        type: String,
        default: ''
      }
    },
     watch: {
      currentPageProp: {
        deep: true,
        handler(val) {
          // console.log(val)
          this.currentPage = val;
        },
      },
      keywordProp: {
        deep: true,
        handler(val) {
          console.log('keywordProp: ', val);
          this.keyword = val;
          this.getTextHighLight()
        },
      },
    },
    data(){
        return {
          id:this.$route.params.id,
          url:'',//pdf文件路径
          currentPage: this.currentPageProp,
          keyword: this.keywordProp
        }
    },
    methods:{
    },
    created() {
      console.log('created')
  
    },
    mounted(){
       console.log('this.keywordProp: ', this.keywordProp);
      // this.url = this.src
      // this.$http.get('/xxxx/xxxx/xxxx/xxxx/',{responseType: 'blob'}).then(response  => {
      //     if (!response) {
      //         return this.$message.error("查看电子协议失败，请联系管理员");
      //     }
      //     //将文件流转为成blob地址预览pdf文件
      //     let blob = new Blob([response.data],{type: 'application/pdf;charset=UTF-8'});
      //     //创建url
      //     let href = window.URL.createObjectURL(blob);
      //     this.url = encodeURIComponent(href);
      //   }).catch(() => {})
      },
      methods: {
        getTextHighLight() {
          const iframe = document.getElementById('myIframe')
          iframe.contentWindow.postMessage(this.keyword, '*')
          iframe.contentWindow.addEventListener('message', (e) => {
            iframe.contentWindow.PDFViewerApplication.findBar.findField.value = e.data
            iframe.contentWindow.PDFViewerApplication.findBar.highlightAll.checked = true
            iframe.contentWindow.PDFViewerApplication.findBar.dispatchEvent('highlightallchange')
          }, false)
          iframe.contentWindow.PDFViewerApplication.pagesCount
        }
      },
  }
  </script>
  <style>
  </style>
  