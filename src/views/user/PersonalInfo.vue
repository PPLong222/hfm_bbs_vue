<template>
  <div>
    <!--    这里引入导航栏模块, 替换掉div-->
    <Header></Header>
    <div class="content-body">
      <div class="content-left">
        <div class="main-content">

          <div class="select-panel">
<!--            <a class="select-text" index="0" @click="onSelectMenuClick($event)">我的文章</a>-->
            <span class="select-text" index="1" @click="onSelectMenuClick($event)">我的文章</span>
            <span class="select-text" index="2" @click="onSelectMenuClick($event)">我的关注</span>
          </div>
          <div v-if="curIndex===1" class="post-list">
            <x-single-post-view v-for="post of curPostList" v-bind:key="post.id"
                              :post="post"></x-single-post-view>
          </div>
<!--          <div v-if="curIndex===2" class="post-list">-->
<!--            <top-post-list-panel v-for="post of curPostList" v-bind:key="post.id" :index="curPostList.indexOf(post)"-->
<!--                                 :post="post"></top-post-list-panel>-->
<!--          </div>-->
          <div v-if="curIndex===1" class="user-list">
            <search-user-panel v-for="user of userList" v-bind:key="user.id"
                               :user="user"></search-user-panel>
          </div>
          <el-image v-if="!isRequestEnd" :src="require('@/assets/images/loading.gif')" alt="" class="loading-gif"/>
        </div>
        <div v-if="isRequestEnd" class="post-end-text">已经到底了</div>

      </div>
      <div class="content-right">
        <div class="right-normal-panel">
          <div class="right-float-subject-title">网站公告</div>
          <div class="right-float-subject-content">这是网站内容</div>
        </div>
        <div class="right-normal-panel">
          <div class="right-float-subject-title">我的信息</div>
          <el-row>
            <div>
              <br>
              <el-avatar
                  :size="100"
                  :src="info.avatar"
                  style="text-align: center; margin-left: 35%"
              ></el-avatar>
            </div>
            <br>
            <el-col :span="5"><div class="grid-content bg-purple" style="font-weight: bolder">昵称</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple-light" style="font-style: italic">{{info.nickName}}</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple" style="font-weight: bolder">文章数</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple-light" style="font-style: italic">{{info.postCount}}</div></el-col>
            <br>
            <br>
            <el-col :span="5"><div class="grid-content bg-purple" style="font-weight: bolder">粉丝数</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple-light" style="font-style: italic">{{info.followerCount}}</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple" style="font-weight: bolder">获赞数</div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple-light" style="font-style: italic">{{info.stars}}</div></el-col>
            <br>
            <br>
            <el-col :span="5"><div class="grid-content bg-purple" style="font-weight: bolder">个人描述</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light" style="font-style: italic">{{info.description}}</div></el-col>
            <br>
            <br>
            <el-button type="primary" icon="el-icon-edit" circle style="float: right; margin-right: 30px" @click="modifyUserInfo()"></el-button>
          </el-row>
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
import {getHotPostList, getRecommendPostList, getUserById} from "@/api/api";
import LanguagePanel from "@/components/page/LanguagePanel";
import {languages} from "@/utils/utils";
import Header from "@/components/post/Header";
import TopPostListPanel from "@/components/page/TopPostListPanel";
import TopAuthorPanel from "@/components/page/TopAuthorPanel";
import XSinglePostView from "@/components/page/XSinglePostView";
import SearchUserPanel from "@/components/user/SearchUserPanel";

import GoTop from "@/components/gotop/GoTop";

export default {
  name: "IndexView",
  components: {
    TopAuthorPanel,
    TopPostListPanel,
    Header,
    LanguagePanel,
    CategoryPanel,
    HotPostPanel,
    SinglePostView,
    "go-top": GoTop,
    "x-single-post-view": XSinglePostView,
    SearchUserPanel
  },
  created() {
    this.getUserById()
  },
  mounted() {
    // 初始化时建立默认scroll, 并获取默认推荐列表
    this.onIndexChange()

  },
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      curPostList: [],
      languages: languages,
      curRequestPage: 1,
      isRequestEnd: false,
      isInRequest: false,
      curIndex: 1,
      info: '',
      userList: ''
    }
  },
  methods: {
    getUserById(){
      const id = this.user.id
      if(!id){
        this.$message.error("当前无法获取用户信息")
        return
      }
      getUserById(id).then(res => {
        this.info = res.data.data
        this.curPostList = this.info.posts
      })
    },
    modifyUserInfo(){
      this.$router.push("/person/editor")
    },
    onSelectMenuClick(e) {
      let index = parseInt(e.currentTarget.getAttribute("index"))
      // 重置变量
      this.curRequestPage = 1
      this.isRequestEnd = false
      this.curPostList = []
      // 设置字体颜色
      console.log(this.curIndex)
      document.getElementsByClassName("select-text")[this.curIndex-1].style.color = "#141514"

      e.currentTarget.style.color = "#0066ff"
      this.curIndex = index

      this.onIndexChange()

    },
    onIndexChange() {
      // 请求对应接口并改变scroll监听函数
      switch (this.curIndex) {
        case 1:
          // 请求我的文章接口
          this.getUserById()
          this.changeWindowScroll(getRecommendPostList)
          break;
        case 2:
          // 请求我的关注接口
          this.updatePostList(getHotPostList)
          this.changeWindowScroll(getHotPostList)
          break;
      }
    },
    updateMyPosts(){

      this.curPostList = this.info.posts
      console.log(this.curPostList)
    },
    updatePostList(func) {
      func(0, 0, this.curRequestPage, 6).then(res => {
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
            func(0, 0, vue.curRequestPage, 6).then(res => {
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
  width: 400px;
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

.select-text:nth-child(1) {
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