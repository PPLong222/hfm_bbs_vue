<template>
  <div>
    <Header></Header>
    <div class="content">
      <div class="content-left">
        <div class="post-list">
          <div class="post-list">
            <single-post-view v-for="post of postList" v-bind:key="post.id"
                              :post="post"></single-post-view>
          </div>
          <el-image v-if="!isRequestEnd" :src="require('@/assets/images/loading.gif')" alt="" class="loading-gif"/>
          <div v-if="isRequestEnd" class="post-end-text">已经到底了</div>
        </div>
      </div>
      <div class="content-right">
        <div class="right-normal-panel">
          <div class="right-float-subject-title">网站公告</div>
          <div class="right-float-subject-content">这是网站内容</div>
        </div>
        <div class="right-normal-panel">
          <div class="right-float-subject-title">热门作者</div>
          <top-author-panel></top-author-panel>
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
import {getRecommendPostList} from "@/api/api";
import SinglePostView from "@/components/page/SinglePostView";
import Header from "@/components/post/Header";
import TopAuthorPanel from "@/components/page/TopAuthorPanel";
import LanguagePanel from "@/components/page/LanguagePanel";
import {languages} from "@/utils/utils";

export default {
  name: "CommonPage",
  components: {LanguagePanel, TopAuthorPanel, Header, SinglePostView},
  mounted() {
    this.postList = []
    this.updatePostList(getRecommendPostList)
    this.changeWindowScroll(getRecommendPostList)
  },
  methods: {
    updatePostList(func) {
      func(this.category, this.language, this.curRequestPage, 6).then(res => {
        console.log(res)
        for (let i in res.data) {
          this.postList.push(res.data[i])
        }
        this.curRequestPage += 1;
      }).catch(err => {
        console.log(err)
      })
    },
    changeWindowScroll(func) {
      let vue = this
      window.onscroll = function () {
        // 热榜最多展示前12条, 就不再请求
        if (!vue.isRequestEnd && !vue.isInRequest) {
          if (vue.curIndex === 2) {
            if (vue.curPostList.length > 10) {
              vue.isRequestEnd = true
              return
            }
          }
          // 当滚动条移动马上就出发我们上面定义的事件触发函数,但是我们要求的是滚动条到底后才触发,所以自然这个触发事件里面需要逻辑控制一下.
          if (vue.utils.getScrollHeight() - 30 <= vue.utils.getWindowHeight() + vue.utils.getDocumentTop()) {
            // 请求一次后还没收到结果就不能再次请求
            vue.isInRequest = true
            func(vue.category, vue.language, vue.curRequestPage, 6).then(res => {
              console.log(res)
              // 如果没有数据了
              if (res.data == null || res.data.length < 1) {
                vue.isRequestEnd = true
              } else {
                for (let i in res.data) {
                  vue.postList.push(res.data[i])
                }
                vue.curRequestPage += 1;
              }
              vue.isInRequest = false
            }).catch(err => {
              console.log(err)
              vue.isInRequest = false
            })

          }
        }
      }
    }

  },
  data() {
    return {
      language: this.$route.params.language,
      category: this.$route.params.category,
      curRequestPage: 1,
      isRequestEnd: false,
      isInRequest: false,
      postList: [],
      languages: languages
    }
  }
}
</script>

<style scoped>
.content {
  width: max-content;
  height: fit-content;
  margin: 20px auto 20px auto;
  position: relative;
  padding: 0 20px 20px 20px;
}

.content-left {
  float: left;
  width: 740px;
  height: fit-content;
}

.content-right {
  float: right;
  width: 320px;
  height: fit-content;
  margin-left: 10px;
}

.loading-gif {
  margin: 10px auto;
  height: 100px;
  width: 100px;
  display: block;
}

body {
  background-color: #f6f6f6;
}

.right-normal-panel {
  background-color: white;
  height: auto;
  width: auto;
  border-radius: 4px;
  padding: 10px 10px 20px 20px;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 5px 15px;

}

.right-float-subject-title {
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f6f6f6;
  font-weight: bold;
}

.right-float-subject-content {
  margin-top: 10px;
}

</style>