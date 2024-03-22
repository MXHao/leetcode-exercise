<template>
    <div>
        <prism-editor
            class="my-editor height-300"
            v-model="pom"
            :highlight="highlighter"
            readonly
            line-numbers
            :readonly = "false"
          ></prism-editor>
    </div>
  </template>
   
  <script>
  // import Prism Editor
  import { PrismEditor } from "vue-prism-editor";
  import "vue-prism-editor/dist/prismeditor.min.css";
   
  // import highlighting library
  import { highlight, languages } from "prismjs/components/prism-core";
  import "prismjs/components/prism-clike";
  import "prismjs/components/prism-javascript";
  import "prismjs/themes/prism-tomorrow.css";
   
  export default {
    components: {
      PrismEditor
    },
    data() {
      return {
        activeName: "first",
        pom:
          "<dependency>\n" +
          "<groupId>cn.hutool</groupId>" +
          "<artifactId>hutool-all</artifactId>" +
          "<version>5.8.9</version>" +
          "</dependency>"
      };
    },
    methods: {
      highlighter(code) {
        return highlight(code, languages.js);
      }
    }
  };
  </script>
   
   
  <style scoped>
  .markdown-body p {
    font-size: 14px;
    line-height: 28px;
    word-wrap: break-word;
    color: rgba(0, 0, 0, 0.7);
  }
  * {
    font-family: Microsoft Yahei, PingFang SC, Hiragino Sans GB, tahoma, arial;
    box-sizing: border-box;
    font-size: 14px;
  }
  .markdown-body h1,
  .markdown-body h2 {
    color: rgba(0, 0, 0, 0.9);
    font-weight: 400;
  }
  .markdown-body blockquote {
    margin: 0;
    padding: 10px 0;
    border-left: 4px solid #6eacfd;
    font-size: 16px;
    color: #999;
    background: #f8fafd;
    box-sizing: border-box;
  }
   
  .markdown-body blockquote > * {
    margin: 0 18px;
    margin-top: 0px;
    margin-right: 18px;
    margin-bottom: 0px;
    margin-left: 18px;
  }
   
  .markdown-body .tab-container,
  .markdown-body .tab-item-container {
    background-color: #eaf1f9;
    overflow-y: hidden;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .markdown-body .tab-item-container {
    display: flex;
    align-items: center;
    list-style: none;
    padding-left: 0;
    padding-right: 0;
    height: 48px;
    margin: 0 20px;
  }
  .markdown-body .singlePreContainer {
    position: relative;
  }
   
  .markdown-body .hljs-attr,
  .markdown-body .hljs-number,
  .markdown-body .hljs-selector-attr,
  .markdown-body .hljs-selector-class,
  .markdown-body .hljs-selector-pseudo,
  .markdown-body .hljs-template-variable,
  .markdown-body .hljs-type,
  .markdown-body .hljs-variable {
    color: #d19a66;
  }
  .jsonStyle {
    background-color: #f8f8f9;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
  }
   
  /* ================= */
  .my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;
   
    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }
   
  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
   
  /* not required: */
  .height-300 {
    height: 300px;
  }
  </style>
  