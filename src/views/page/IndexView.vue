<template>
  <div>
    <!--    这里引入导航栏模块, 替换掉div-->
    <Header></Header>
    <div class="content-body">
      <div class="content-left">
        <category-panel class="category-panel"></category-panel>
        <hot-post-panel class="hot-post-panel"></hot-post-panel>
        <div class="main-content">
          <div class="select-panel">
            <a class="select-text" href="">关注</a>
            <a class="select-text" href="">推荐</a>
            <a class="select-text" href="">热榜</a>
          </div>
          <div class="post-list">
            <single-post-view v-for="recommendPost of recommendPostList" v-bind:key="recommendPost.id"
                              :recommendPost="recommendPost"></single-post-view>
          </div>
          <!--          加载框-->
          <img :src="require('@/assets/images/loading.gif')" class="loading-gif"/>
        </div>

      </div>
      <div class="content-right">
        <div class="right-normal-panel">
          <div class="right-float-subject-title">网站公告</div>
          <div class="right-float-subject-content">这是网站内容</div>
        </div>
        <div class="right-normal-panel">
          <div class="right-float-subject-title">网站公告</div>
          <div class="right-float-subject-content">这是网站内容</div>
        </div>

        <div class="right-normal-panel">
          <div class="right-float-subject-title">语言领域</div>
          <language-panel :languages="languages"></language-panel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryPanel from "@/components/page/CategoryPanel";
import HotPostPanel from "@/components/page/HotPostPanel";
import SinglePostView from "@/components/page/SinglePostView";
import {getRecommendPostList} from "@/api/api";
import LanguagePanel from "@/components/page/LanguagePanel";
import {languages} from "@/utils/utils";
import Header from "@/components/post/Header";

//文档高度
function getDocumentTop() {
  var scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}

//可视窗口高度
function getWindowHeight() {
  var windowHeight = 0;
  if (document.compatMode === "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

//滚动条滚动高度
function getScrollHeight() {
  var scrollHeight = 0,
      bodyScrollHeight = 0,
      documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
}


export default {
  name: "IndexView",
  components: {
    Header,
    LanguagePanel,
    CategoryPanel,
    HotPostPanel,
    SinglePostView
  },
  created() {
    console.log("begin mounted")
    console.log(this.curRequestPage)
    getRecommendPostList(0, 0, this.curRequestPage, 6).then(res => {
      console.log(res)
      for (let i in res.data) {
        this.recommendPostList.push(res.data[i])
      }
      this.curRequestPage += 1;
    }).catch(err => {
      console.log(err)
    })
  },
  mounted() {
    // 避免之后通过this拿不到vue对象
    let vue = this
    //下面我们需要一个监听滚动条的事件
    window.onscroll = function () {
      if (!vue.isRequestEnd) {
        // 当滚动条移动马上就出发我们上面定义的事件触发函数,但是我们要求的是滚动条到底后才触发,所以自然这个触发事件里面需要逻辑控制一下.
        if (getScrollHeight() - 100 <= getWindowHeight() + getDocumentTop()) {
          // $('.loading-gif').css('display', 'block')
          // 请求一次后还没收到结果就不能再次请求
          if (!vue.isInRequest) {
            vue.isInRequest = true
            getRecommendPostList(0, 0, vue.curRequestPage, 6).then(res => {
              console.log(res)
              // 如果没有数据了
              if (res.data == null || res.data.length < 1) {
                vue.isRequestEnd = true
              } else {
                for (let i in res.data) {
                  vue.recommendPostList.push(res.data[i])
                }
                vue.curRequestPage += 1;
              }
              vue.isInRequest = false
            }).catch(err => {
              console.log(err)
            })
          }

        }
      }
    }
  },
  data() {
    return {
      recommendPostList: [],
      languages: languages,
      curRequestPage: 1,
      isRequestEnd: false,
      isInRequest: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.content-body {
  width: 1300px;
  height: 700px;
  margin: 20px 300px 20px 300px;
  /*避免margin top 无效*/
  padding: 20px 20px 20px 0;
  position: relative;
}

.content-left {
  width: 900px;
  height: 700px;
  float: left;
}

.content-right {
  height: 700px;
  width: 380px;
  float: right;
}

.category-panel {
  margin: 0 auto;

}

.select-panel {
  margin-top: 10px;
  padding-left: 10px;
  background-color: white;
  margin-bottom: 10px;
  border-bottom: 2px solid black;
}

.select-text {
  font-size: 24px;
  color: #141514;
  margin: 10px 10px 10px 20px;
  display: inline-block;
  text-decoration: none;
}

.hot-post-panel {
  margin: 10px auto;
}

.right-normal-panel {
  background-color: white;
  height: auto;
  width: auto;
  border-radius: 4px;
  padding: 10px 10px 20px 20px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 5px 15px;

}

.right-float-subject-title {
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #8c8c93;
  font-weight: bold;
}

.right-float-subject-content {
  margin-top: 10px;
}

.single-post-view {
  margin-bottom: 20px;
}

.post-list {
  height: fit-content;
}

.loading-gif {
  margin: 10px auto;
  height: 100px;
  display: none;
  width: 100px;
}

body {
  background-color: #f6f6f6;
}

.main-content {
  height: fit-content;
  box-shadow: rgba(0, 0, 0, 0.1) 0 5px 15px;
  border-radius: 4px;
}
</style>