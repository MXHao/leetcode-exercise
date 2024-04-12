<!-- 组件说明 -->
<template>
  <div class='faultInquiryContent'>
    <div class="topCatalogue flex">
      <img :src="catalogue" alt="">
      <div class="topCataloguetext">{{ chatTitle }}</div>
    </div>
    <div class="bottom flex">
      <div class="historyBox">
        <div class="historyTitle flex">
          <div class="titleText">会话列表</div>
          <div class="titleBtn">
            <el-button type="warning" @click="refreshHistory()" v-no-more-click icon="el-icon-refresh-left" size="mini"
              circle></el-button>
            <el-button type="primary" @click="addHistory()" v-no-more-click icon="el-icon-plus" size="mini"
              circle></el-button>
          </div>
        </div>
        <div class="historyList" v-loading="historyListLoading">
          <el-scrollbar ref="scroll" wrap-class="scrollbar-wrapper" style="height: 100%; padding-top: 15px">
            <div class="historyItem" :class="activeIndex == index ? 'isActive' : ''" @click="historyClick(item, index)"
              v-for="(item, index) in historyArr" :key="index">
              <div class="itemContent">
                <div class="flex itemTitleInput" :class="activeIndex == index ? 'isActive' : ''" v-if="item.isEdit">
                  <el-input maxlength="50" size="mini" @click.stop.native v-model="item.title"></el-input>
                  <el-button type="success" size="mini" @click.stop="editConfirm('', item, index)"
                    style="margin-left: 10px" circle icon="el-icon-check"></el-button>
                  <el-button type="danger" size="mini" @click.stop="item.isEdit = false" circle
                    icon="el-icon-close"></el-button>
                </div>
                <div class="itemTitle" :title="item.title" v-else>{{ item.title }}</div>
                <div class="flex itemMsg">
                  <div>{{ item.createTime }}</div>
                </div>
                <div class="historyItemBtn">
                  <el-button type="warning" @click.stop="editHistory(item, index)" icon="el-icon-edit" size="mini"
                    circle></el-button>
                  <el-popover :ref="'popover' + item.id" placement="top" width="200">
                    <p>确定删除吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="deleteCancel(item.id)">取消</el-button>
                      <el-button type="primary" size="mini" @click.stop="deleteConfirm(item.id)">确定</el-button>
                    </div>
                    <el-button style="margin-left: 10px" @click.stop icon="el-icon-delete" slot="reference" type="danger"
                      size="mini" circle></el-button>
                  </el-popover>
                </div>
              </div>

            </div>
          </el-scrollbar>
        </div>
        <el-pagination style="height: 30px" small layout="prev, pager, next" @current-change="handleCurrentChange"
          :current-page.sync="historyPage.pageNum" :page-size="historyPage.pageSize" :total="historyPage.historyTotal">
        </el-pagination>
      </div>
      <div id="chatBox" class="chatBox">
        <div class="chatTop flex">
          <div class="topTitle">新的对话</div>
          <div class="topBtn">
            <el-button class="exportBtn" type="primary" size="mini" round icon="el-icon-download"
              @click="exportBtn(currentHistoryItem)" :disabled="chatList.length == 0">导出</el-button>
            <el-button class="clearBtn" type="primary" size="mini" round icon="el-icon-delete" @click="clearChat()"
              :disabled="chatList.length == 0">清除记录</el-button>
          </div>
        </div>
        <div id="chatContent" class="chatContent" v-loading="detailLoading">
          <el-scrollbar class="scrollList" ref="scroll" wrap-class="scrollbar-wrapper" style="height: 100%;">
            <transition name="el-fade-in-linear">
              <div style="padding: 0 10px">
                <div v-for="(item, index) in chatList" :key="index">
                  <div v-if="item.question" class="question">
                    <div class="questionPerson flex">
                      <el-avatar class="personAvatar" size="small" :src="avatar"></el-avatar>
                      <div class="personName">用户名</div>
                    </div>

                    <div class="questionContent flex">

                      <div style="padding: 20px;">
                        {{ item.question.content }}
                      </div>

                    </div>
                    <div class="questionTime">{{ item.question.time }}</div>

                  </div>
                  <div v-if="item.answer" class="answer">
                    <div class="answerPerson flex">
                      <el-avatar class="personAvatar" size="small" :src="loginLogo"></el-avatar>
                      <div class="personName">{{ item.answer.role ? item.answer.role : defaultName }}</div>
                    </div>
                    <transition name="expand">
                      <div class="answerContent flex">
                        <div :ref="'contentText' + index" class="contentText">
                          <i v-if="item.answer.is_complete == false" class="el-icon-loading"></i>{{ item.answer.content }}
                        </div>
                      </div>
                    </transition>
                    <div class="hoverBtn">
                      <el-button @click="copy(item.answer.content, $event)" size="mini">
                        <i style="color: #f7901a" class="fa fa-copy"></i>
                        <span>复制</span>
                      </el-button>
                      <el-button @click="likeBtn(item.answer.messageId)" size="mini">
                        <i style="color: #4676fd" class="fa fa-thumbs-up"></i>
                        <span>点赞</span>
                      </el-button>
                      <el-button @click="dislikeBtn(item.answer.messageId)" size="mini">
                        <i style="color: #3d3d3d" class="fa fa-thumbs-o-down"></i>
                        <span>差评</span>
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </el-scrollbar>
        </div>
        <div class="chatBottom">
          <el-input placeholder="在此输入您想了解的内容，Enter 发送，Shift + Enter 换行" ref="questionInput" :rows="5" show-word-limit
            maxlength="300" :disabled="inputDisabled" type="textarea"
            @keydown.enter.native.prevent="handleEnterKey($event)" v-model="question"></el-input>
          <el-button class="sendBtn" :disabled="inputDisabled || isEmptyOrWhitespace(question)"
            @click="submmit">发送</el-button>
        </div>
      </div>
    </div>
    <el-dialog :fullscreen="true" :title="pdfTitle" :before-close="dialogClose" @opened="openDialog"
      :visible.sync="pdfVisible" width="1200px">
      <el-main style="padding: 0; height: calc(100vh - 65px)">
        
      </el-main>
    </el-dialog>
  </div>
</template>

<script>
import avatar from "@/assets/images/avatar.png";
import loginLogo from "@/assets/images/loginLogo.png";
import catalogue from "@/assets/images/catalogue.png";
import clipboard from "@/utils/clipboard.js";
import mockData from "@/utils/mockData";
export default {
  components: {
    
  },
  data() {
    return {
      historyArr: [],
      question: "",
      avatar,
      pdfTitle: '',
      catalogue,
      loginLogo,
      chatList: [],
      questionList: [],
      answerLoading: false,
      inputDisabled: false,
      pdfVisible: false,
      currentSessionId: "",
      activeIndex: null,
      defaultName: "assistant",
      currentQuestionArr: [],
      currentAnswerArr: [],
      isEdit: false, //是否编辑模式
      detailLoading: false, //查看详情loading
      currentHistoryItem: {},
      tokenId: "",
      detailView: {
        text: "",
      },
      pop: false,
      historyPage: {
        pageNum: 1,
        pageSize: 20,
        historyTotal: null
      },
      historyListLoading: false,
      page: {
        pageNum: 1,
        pageSize: 20,
        total: null
      }
    };
  },
  props: {
    chatTitle: {
      type: String,
      required: true,
    },
    sseUrl: {
      type: String,
      required: true,
    }
  },
  computed: {

  },
  created() {
    this.getHistoryData();
  },
  mounted() {
    this.$refs.scroll.wrap.onscroll = (e) => {
      this.handleScroll()
    }
  },
  beforeDestroy() {
    this.closeSse();
  },
  methods: {
    openSse() {
      if ("EventSource" in window) {
        // 创建EventSource对象并指定SSE服务器的路径
        this.source = new EventSource(this.sseUrl);
        // 监听消息的传输
        this.source.onmessage = this.sseOnmessage;
        // 连接建立成功时触发
        this.source.onopen = this.sseSuccess;
        // 连接成功窒触发open事件

        // 自定义 EventHandler，在收到 event 字段为 stop 的消息时触发
        //在这里将SSE关闭
        this.source.addEventListener(
          "stop",
          (e) => {
            this.source.close();
          },
          false
        );
        // 连接发生错误时触发
        this.source.onerror = function (e) {
          if (e.readyState == EventSource.CLOSED) {
          } else {
            console.log("onerror:" + e.readyState);
          }
        };
      } else {

      }
    },
    closeSse() {

    },
    refreshHistory() {//刷新历史记录
      this.historyPage.pageNum = 1
      this.chatList = [];
      this.currentSessionId = "";
      this.getHistoryData()
    },
    getHistoryData(type) {//获取历史记录
      this.historyListLoading = true
      let res = mockData.historyList()
      this.historyListLoading = false
      this.historyArr = res?.content.map((item) => {
        return {
          ...item,
          isEdit: false,
        };
      });
      this.historyPage.historyTotal = res?.totalElements
      if (type == "sendAdd") {//发送时创建后刷新
        this.currentAnswerArr = [];
        this.currentQuestionArr = [];
        this.currentSessionId = this.historyArr[0].sid;
      } else if (type == "add") {//点击新增按钮创建后刷新
        this.activeIndex = this.activeIndex ? this.activeIndex : 0;
        this.chatList = [];
        this.currentAnswerArr = [];
        this.currentQuestionArr = [];
        this.currentSessionId = this.historyArr[0].sid;
      } else if (type == "addEdit") {//修改标题后刷新
        this.activeIndex = this.activeIndex ? this.activeIndex : 0;
      } else {
        this.activeIndex = null;//点击刷新按钮刷新
      }
    },
    handleCurrentChange(val) {
      this.historyPage.pageNum = val
      this.getHistoryData()
    },
    historyClick(item, index) {//会话点击
      this.activeIndex = index;
      this.currentSessionId = item.sid;
      this.currentHistoryItem = item;
      this.page.pageNum = 1
      this.getHistoryDetail(item, 'top')
    },
    getHistoryDetail(item, position) {//获取历史详情
      this.detailLoading = true;
      let res = mockData.detailData()
      this.page.total = res.totalElements
      if (res.content) {
        this.detailLoading = false;
        this.chatList = [];
        this.currentAnswerArr = [];
        this.currentQuestionArr = [];
        res.content.forEach((item) => {
          if (item.type == "Q") {
            this.chatList.push({
              question: {
                content: item.content,
                time: item.createTime,
                qid: item.id,
              },
              answer: {},
            });
            this.currentQuestionArr.push(item);
          } else if (item.type == "A") {
            this.currentAnswerArr.push(item);
          }
        });
        this.currentAnswerArr.forEach((item, index) => {
          this.currentQuestionArr.forEach((item2) => {
            if (item.qid == item2.id) {
              this.chatList[index].answer = {
                content: item.content,
                sourceTypes: item.sourceType,
                role: item.role ? item.role : this.defaultName,
                messageId: item.id,
                isUp: item.isUp,
                isDown: item.isDown,
                isList: true,
                confidence: item.scores ? item.scores.toFixed(3) : null
              };
            }
          });
        });
        if (position == 'top') {
          this.$refs["scroll"].wrap.scrollTop = 1;
        } else if (position == 'bottom') {
          setTimeout(() => {
            this.$refs["scroll"].wrap.scrollTop = this.$refs["scroll"].wrap.scrollHeight - this.$refs["scroll"].$el.offsetHeight - 1
          }, 100);
        }
      }
    },
    addHistory() {//新建会话
      this.historyPage.pageNum = 1
      let res = {
        "sid": "xxx",
      }
      this.activeIndex = 0;
      if (!this.currentSessionId && this.question.length) {
        //没有点击历史直接提问，就会创建一个新会话
        this.currentSessionId = res.sid;
        this.getHistoryData("sendAdd");
        this.sendQuestion();
      } else {
        this.currentSessionId = res.sid;
        this.getHistoryData("add");
      }
    },
    editHistory(item, index) {//编辑会话标题按钮
      this.historyArr[index].isEdit = true;
    },
    editConfirm(type, item, index) {
      //提交会话修改

    },
    deleteConfirm(id) {

    },
    deleteCancel(id) {
      this.$refs["popover" + id][0].doClose();
    },
    exportBtn(data) {

    },
    sseSuccess() {
      this.chatList = [];
      this.questionList = [];
    },
    sseOnmessage(e) {
      const data = JSON.parse(e.data);
      this.chatList[this.chatList.length - 1].answer = {}
      this.chatList[this.chatList.length - 1].answer = {
        content: data.content,
        sourceTypes: data.sourceTypes,
        role: data.role,
        messageId: data.messageId ? data.messageId : "",
        is_complete: data.is_complete,
        confidence: data.confidence ? data.confidence.toFixed(3) : null
      };
      this.$nextTick(() => {
        let flag = 'contentText' + (this.chatList.length - 1).toString()
        this.$refs[flag][0].style.height = this.$refs[flag][0].scrollHeight + 'px'
      });
      this.scrollBottom();
    },
    scrollBottom() {
      setTimeout(() => {
        this.$refs["scroll"].wrap.scrollTop =
          this.$refs["scroll"].wrap.scrollHeight - this.$refs["scroll"].$el.offsetHeight;
      }, 100);
    },
    submmit() {//提交按钮
      if (this.currentSessionId) {//点击了左侧某个历史会话
        if (this.chatList.length == 0 && !this.currentHistoryItem.id) {//该历史会话是刚创建还没对话详情的
          let data = {
            id: this.historyArr[0].id, //点击过，修改新增后的
            title: this.question,
          };
          this.editConfirm("add", data, null);
          this.sendQuestion();
        } else {//该历史会话已经有对话详情的
          this.sendQuestion();
        }
      } else {
        //没有点击左侧，直接对话
        this.addHistory();
      }
    },
    sendQuestion() {//发送事件
      this.chatList.push({
        question: {
          content: this.question,
          time: this.timestampToTime(new Date().getTime()),
        },
      });
      let param = {
        content: this.question,
      };
      this.question = "";
      this.answerLoading = true;
      this.inputDisabled = true;
      this.chatList.push({
        answer: {
          content: "正在思考中……",
          sourceTypes: "",
          role: "",
          messageId: "",
          is_complete: false
        },
      });
      this.scrollBottom();
    },
    timestampToTime(timestamp) {
      // 时间戳为10位需*1000，时间戳为13位不需乘1000
      var date = new Date(timestamp);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    clearChat() {
      this.chatList = [];
      this.questionList = [];
    },
    copy(data, event) {
      clipboard(data, event);
    },
    viewPdf(data) {//预览pdf相关

    },
    likeBtn(id) {//点赞按钮
      
    },
    dislikeBtn(id) {//不喜欢按钮

    },
    downloadFileResponse(obj, title) {
      const url = window.URL.createObjectURL(new Blob([obj]));
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      const fileName = title || this.currentHistoryItem.title;
      link.setAttribute("download", decodeURIComponent(fileName));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    openDialog() {

    },
    dialogClose() {
      this.pdfVisible = false;
      this.pdfUrl = "";
      this.currentPdfPage = 1;
      this.detailView.text = "";
    },
    handleScroll() {//滚动自动翻页
      let height = this.$refs["scroll"].$el.offsetHeight
      let scrollHeight = this.$refs["scroll"].wrap.scrollHeight
      let scrollTop = this.$refs["scroll"].wrap.scrollTop
      if (scrollTop == scrollHeight - height && this.page.pageNum * this.page.pageSize < this.page.total) {
        this.page.pageNum++
        this.getHistoryDetail(this.currentHistoryItem, 'top')
      } else if (scrollTop == 0 && this.page.pageNum != 1) {
        this.page.pageNum--
        this.getHistoryDetail(this.currentHistoryItem, 'bottom')
      }
    },
    handleEnterKey(e) {
      if (e.shiftKey && e.keyCode == 13) { //用户点击了shift+enter触发
        this.question += '\n';
      } else { //用户点击了enter触发
        if (this.isEmptyOrWhitespace(this.question)) {
          this.$message.warning('不能为空')
        } else {
          this.submmit();
        }
      }
    },
    isEmptyOrWhitespace(str) {//发送框空格和回车正则校验
      return !str || /^\s*$/.test(str);
    }
  },
};
</script>
<style lang='scss' scoped>
.flex {
  display: flex;
  align-items: center;
}

.faultInquiryContent {
  height: 100%;
  width: 100%;
  background: transparent;
  padding: 0 30px 30px;

  .top {
    background: #fff;
    padding: 10px;
    border-radius: 20px;

    .topIcon {
      font-size: 70px;
      color: #ed5565;
      font-weight: bold;
    }

    .topText {
      margin-left: 20px;

      .topTitle {
        font-size: 26px;
        padding: 5px;
      }

      .topMsg {
        font-size: 16px;
        padding: 5px;
      }
    }
  }

  .topCatalogue {
    padding: 0 30px;
    padding-top: 20px;
    height: 50px;

    .topCataloguetext {
      color: #1c1b1f;
      font-size: 18px;
      font-weight: bold;
      margin-left: 10px;
    }
  }

  .bottom {
    height: calc(100% - 50px);
    margin-top: 20px;
    justify-content: space-between;

    .historyBox {
      width: 20%;
      background: #fff;
      height: 100%;
      padding: 10px;
      border-radius: 20px;

      .historyTitle {
        justify-content: space-between;
        border-bottom: 1px solid #f2f5ff;
        padding: 10px;

        .titleText {
          font-size: 18px;
        }
      }

      .historyList {
        // padding: 10px;
        height: calc(100% - 80px);

        .historyItem {
          position: relative;
          cursor: pointer;
          height: 80px;
          background-image: linear-gradient(to right, #ebedff, #f2f6fe);
          color: #2d62fd;
          margin-top: 10px;
          border-radius: 18px;

          .itemContent {
            padding: 20px 20px 10px;
            height: 100%;
            border-radius: 18px;

            .itemTitle {
              width: 100%;
              font-size: 16px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .itemTitleInput {
              z-index: 1;
              position: absolute;
              width: 90%;
              height: 50%;
              padding: 5px 0;
              border-radius: 10px;
              background-image: linear-gradient(to right, #ebedff, #f2f6fe);
            }

            .itemMsg {
              font-size: 12px;
              color: #759afd;
              line-height: 40px;
              justify-content: space-between;
            }

            .historyItemBtn {
              display: none;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 5%;
            }
          }

          .isActiveBorder {
            border-left: 5px solid #fff;
          }
        }

        .isActive {
          // box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
          // padding: 0 2px;
          background-image: linear-gradient(to right,
              #527fff,
              #759afd) !important;
          color: #fff;

          .itemContent {
            .itemMsg {
              color: #b1c5ff;
            }
          }
        }

        .historyItem:hover .historyItemBtn {
          display: block;
        }
      }

      ::v-deep .historyList .el-scrollbar__view {
        padding: 0 10px;
      }
    }

    .chatBox {
      padding: 10px;
      background: #fff;
      width: 79%;
      height: 100%;
      position: relative;
      border-radius: 20px;

      .chatTop {
        justify-content: space-between;
        border-bottom: 1px solid #f2f5ff;
        padding: 10px;

        .topTitle {
          font-size: 18px;
        }

        .topBtn {
          .exportBtn {
            background: #b1c6fe;
            color: #4676fd;
          }

          .exportBtn:hover {
            background: #b1c6fecc;
          }

          .clearBtn {
            background: #ffc097;
            color: #f97c2b;
            border: 1px solid #fe6a07;
          }

          .clearBtn:hover {
            background: #ffc097cc;
          }
        }
      }

      .chatContent {
        padding: 0px 20px 120px;
        position: relative;
        height: calc(100% - 50px);

        .question {
          padding: 10px 0;
          position: relative;
          z-index: 1;

          .questionPerson {
            justify-content: flex-end;

            .personAvatar {
              height: 30px;
              width: 30px;
            }

            .personName {
              margin-left: 10px;
              color: #868686;
              font-size: 16px;
            }
          }

          .questionContent {
            border-radius: 20px;
            background: #f3f5fb;
            margin-left: auto;
            width: 80%;
            margin-top: 10px;

            line-height: 28px;
            font-size: 13px;
            position: relative;
            box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.1);
          }

          .questionTime {
            color: #868686;
            font-size: 14px;
            padding: 10px 20px;
            width: 80%;
            margin-left: auto;
          }
        }

        .answer {
          padding: 10px 0;
          position: relative;
          z-index: 1;

          .answerPerson {
            justify-content: flex-start;

            .personAvatar {
              height: 30px;
              width: 30px;
            }

            .personName {
              margin-left: 10px;
              color: #868686;
              font-size: 16px;
            }
          }

          .answerContent {
            border-radius: 20px;
            background: #b1c6fe;
            padding: 20px 20px;
            margin-right: auto;
            margin-left: 20px;
            width: 80%;
            margin-top: 10px;
            font-size: 13px;
            line-height: 1.5;
            box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.1);
            white-space: pre-line;
            min-height: 70px;

            .contentText {
              transition: height 0.3s ease-out;
            }

            .expand-enter-active,
            .expand-leave-active {
              transition: height 0.3s;
            }

            .expand-enter,
            .expand-leave-to {
              height: 0;
            }
          }

          .hoverBtn {
            display: none;
            position: absolute;
            right: 19%;
            top: 23px;
          }

          ::v-deep .hoverBtn .el-button--mini {
            padding: 6px 10px;
            border-radius: 15px;
          }

          ::v-deep .el-button+.el-button {
            margin-left: 5px;
          }

          .sourceOfknowledge {
            width: 80%;
            // margin-left: auto;
            padding: 20px 30px;
          }
        }

        .answer:hover .hoverBtn {
          display: flex;
          align-items: center;
          width: 220px;
          height: 25px;
          justify-content: flex-end;
        }

        .relatedQuestion {
          // position: absolute;
          bottom: 0px;
          height: 120px;
          border-top: 1px solid #f5f7ff;
          padding: 0px 20px;
          width: 36%;

          .regenerate {
            background: #5380fd;
          }

          .regenerate:hover {
            background: #5380fdcc;
          }

          .questionList {
            flex-wrap: wrap;
            margin-top: 5px;

            .questionItem {
              padding: 5px 10px;
            }
          }
        }
      }

      .chatBottom {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
        width: 94%;
        // height: 20%;
        display: flex;
        align-items: baseline;
        z-index: 1;

        .sendBtn {
          background: #5380fd;
          margin-left: 15px;
          color: #fff;
          border-radius: 8px;
        }

        .sendBtn:hover {
          background: #5380fdcc;
        }
      }
    }

    ::v-deep .chatBox .watermarkClass {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
  }
}

::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

::v-deep .chatBottom .el-textarea {
  border-radius: 10px;
  border: 1px solid #75acff;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
}
</style>
