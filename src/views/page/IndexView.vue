<template>
  <div>
    <!--    这里引入导航栏模块, 替换掉div-->
    <Header></Header>
    <div class="content-body">
      <div class="content-left">
        <category-panel :categories="categories" class="category-panel"></category-panel>
        <hot-post-panel class="hot-post-panel"></hot-post-panel>
        <div class="main-content">

          <div class="select-panel">
            <a class="select-text" index="0" @click="onSelectMenuClick($event)">关注</a>
            <a class="select-text" index="1" @click="onSelectMenuClick($event)">推荐</a>
            <a class="select-text" index="2" @click="onSelectMenuClick($event)">热榜</a>
          </div>
          <div v-if="curIndex===1" class="post-list">
            <single-post-view v-for="post of curPostList" v-bind:key="post.id"
                              :post="post"></single-post-view>
          </div>
          <div v-if="curIndex===2" class="post-list">
            <top-post-list-panel v-for="post of curPostList" v-bind:key="post.id" :index="curPostList.indexOf(post)"
                                 :post="post"></top-post-list-panel>
          </div>
          <el-image v-if="!isRequestEnd" :src="require('@/assets/images/loading.gif')" alt="" class="loading-gif"/>
        </div>
        <div v-if="isRequestEnd" class="post-end-text">已经到底了</div>

      </div>
      <div class="content-right">
        <div class="right-normal-panel">
          <register :user-name=user.username></register>
        </div>
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
    <go-top></go-top>
  </div>
</template>

<script>
import CategoryPanel from "@/components/page/CategoryPanel";
import HotPostPanel from "@/components/page/HotPostPanel";
import SinglePostView from "@/components/page/SinglePostView";
import {getHotPostList, getRecommendPostList} from "@/api/api";
import LanguagePanel from "@/components/page/LanguagePanel";
import {categories, languages} from "@/utils/utils";
import Header from "@/components/post/Header";
import TopPostListPanel from "@/components/page/TopPostListPanel";
import TopAuthorPanel from "@/components/page/TopAuthorPanel";
import Register from "@/components/widgets/register";
import GoTop from "@/components/gotop/GoTop";

export default {
  name: "IndexView",
  components: {
    Register,
    TopAuthorPanel,
    TopPostListPanel,
    Header,
    LanguagePanel,
    CategoryPanel,
    HotPostPanel,
    SinglePostView,
    "go-top": GoTop
  },
  created() {
    let user = this.utils.getObjectFromLocalStorage("user")
    if (user != null) {
      this.user = user
    }
    this.user.username = user.userName
  },
  mounted() {
    // 初始化时建立默认scroll, 并获取默认推荐列表
    this.onIndexChange()

  },
  data() {
    return {
      curPostList: [],
      languages: languages,
      categories: categories,
      curRequestPage: 1,
      isRequestEnd: false,
      isInRequest: false,
      curIndex: 1,
      user: {
        languageField: 0,
        category: 0,
        username: ''
      }
    }
  },
  methods: {
    onSelectMenuClick(e) {
      let index = parseInt(e.currentTarget.getAttribute("index"))
      // 重置变量
      this.curRequestPage = 1
      this.isRequestEnd = false
      this.curPostList = []
      // 设置字体颜色
      document.getElementsByClassName("select-text")[this.curIndex].style.color = "#141514"
      e.currentTarget.style.color = "#0066ff"
      this.curIndex = index

      this.onIndexChange()

    },
    onIndexChange() {
      // 请求对应接口并改变scroll监听函数
      switch (this.curIndex) {
        case 0:
          // 请求关注列表接口
          break;
        case 1:
          // 请求推荐列表接口
          this.updatePostList(getRecommendPostList)
          this.changeWindowScroll(getRecommendPostList)
          break;
        case 2:
          // 请求热榜接口
          this.updatePostList(getHotPostList)
          this.changeWindowScroll(getHotPostList)
          break;
      }
    },
    updatePostList(func) {
      func(this.user.category, this.user.languageField, this.curRequestPage, 6).then(res => {
        console.log(res)
        for (let i in res.data) {
          this.curPostList.push(res.data[i])
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
            func(vue.user.category, vue.user.languageField, vue.curRequestPage, 6).then(res => {
              console.log(res)
              // 如果没有数据了
              if (res.data == null || res.data.length < 1) {
                vue.isRequestEnd = true
              } else {
                for (let i in res.data) {
                  vue.curPostList.push(res.data[i])
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
  }
}
</script>

<style scoped>
.content-body {
  width: max-content;
  height: fit-content;
  margin: 20px auto 20px auto;
  /*避免margin top 无效*/
  padding: 20px 20px 20px 20px;
  position: relative;
}

.content-left {
  width: 740px;
  height: fit-content;
  float: left;
}

.content-right {
  height: fit-content;
  width: 320px;
  margin-left: 10px;
  float: right;
}

.category-panel {
  margin: 0 auto;

}

.select-panel {
  padding-top: 10px;
  padding-left: 10px;
  background-color: white;
  padding-bottom: 10px;
  border-bottom: 2px solid #f6f6f6;
  border-radius: 4px 4px 0 0;
}

.select-text {
  font-size: 20px;
  color: #141514;
  margin: 10px 10px 10px 20px;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}

.select-text:nth-child(2) {
  color: #0066ff;
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

.single-post-view {
  margin-bottom: 20px;
}

.post-list {
  height: fit-content;
  border-radius: 0 0 4px 4px;

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

.main-content {
  height: fit-content;
  box-shadow: rgba(0, 0, 0, 0.1) 0 5px 15px;
  border-radius: 4px;
}

.post-end-text {
  margin: 20px auto;
  padding-bottom: 20px;
  font-size: 30px;
  width: 150px;
}

</style>