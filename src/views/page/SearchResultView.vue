<template>
  <div>
    <Header></Header>
    <div class="search_menu">
      <span class="search-menu-text" index="0" @click="onSelectMenuClick($event)">综合</span>
      <span class="search-menu-text" index="1" @click="onSelectMenuClick($event)">用户</span>
      <span class="search-menu-text" index="2" @click="onSelectMenuClick($event)">话题</span>
    </div>
    <div class="content">
      <div class="content-left">
        <div v-if="curIndex===0" class="post-list">
          <single-post-view v-for="post of searchList" v-bind:key="post.id"
                            :post="post"></single-post-view>
        </div>
        <div v-if="curIndex===1" class="user-list">
          <search-user-panel v-for="user of searchList" v-bind:key="user.id"
                             :user="user"></search-user-panel>
        </div>
        <el-image v-if="!isRequestEnd" :src="require('@/assets/images/loading.gif')" alt="" class="loading-gif"/>
        <div v-if="isRequestEnd" class="post-end-text">已经到底了</div>
      </div>
      <div class="content-right">

      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/post/Header";
import {searchPostByWords, searchUserByNickName} from "@/api/api";
import SinglePostView from "@/components/page/SinglePostView";
import SearchUserPanel from "@/components/user/SearchUserPanel";

export default {
  name: "SearchResultView",
  components: {SearchUserPanel, SinglePostView, Header},
  data() {
    return {
      searchList: [],
      curRequestPage: 1,
      isRequestEnd: false,
      isInRequest: false,
      curIndex: 0,
      searchWords: this.$route.params.words
    }
  },
  mounted() {
    this.onIndexChange()
  },
  methods: {
    updatePostList(func) {
      if (this.curIndex === 0) {
        func(0, 0, this.searchWords, this.curRequestPage, 6).then(res => {
          for (let i in res.data) {
            this.searchList.push(res.data[i])
          }
          if (this.searchList.length < 6) {
            this.isRequestEnd = true
          }
          this.curRequestPage += 1;
        }).catch(err => {
          console.log(err)
        })
      } else if (this.curIndex === 1) {
        let user = this.utils.getObjectFromLocalStorage("user")
        func(this.searchWords, user.id, this.curRequestPage, 8).then(res => {
          for (let i in res.data) {
            this.searchList.push(res.data[i])
          }
          if (this.searchList.length < 8) {
            this.isRequestEnd = true
          }
          this.curRequestPage += 1;
        }).catch(err => {
          console.log(err)
        })
      }

    },
    onSelectMenuClick(e) {
      let index = parseInt(e.currentTarget.getAttribute("index"))
      // 重置变量
      this.curRequestPage = 1
      this.isRequestEnd = false
      this.searchList = []
      // 设置字体颜色
      document.getElementsByClassName("search-menu-text")[this.curIndex].style.color = "#141514"
      e.currentTarget.style.color = "#0066ff"
      this.curIndex = index

      this.onIndexChange()

    },
    onIndexChange() {
      // 请求对应接口并改变scroll监听函数
      switch (this.curIndex) {
        case 0:
          // 请求综合搜索列表接口
          this.updatePostList(searchPostByWords)
          this.changeWindowScroll(searchPostByWords)
          break;
        case 1:
          // 请求用户搜索列表接口
          this.updatePostList(searchUserByNickName)
          this.changeWindowScroll(searchUserByNickName)
          break;
        case 2:
          // 请求话题搜索接口
          break;
      }
    },
    changeWindowScroll(func) {
      let vue = this
      let user = this.utils.getObjectFromLocalStorage("user")
      window.onscroll = function () {
        // 热榜最多展示前12条, 就不再请求
        if (!vue.isRequestEnd && !vue.isInRequest) {
          // 当滚动条移动马上就出发我们上面定义的事件触发函数,但是我们要求的是滚动条到底后才触发,所以自然这个触发事件里面需要逻辑控制一下.
          if (vue.utils.getScrollHeight() - 30 <= vue.utils.getWindowHeight() + vue.utils.getDocumentTop()) {
            // 请求一次后还没收到结果就不能再次请求
            vue.isInRequest = true
            if (vue.curIndex === 0) {
              func(0, 0, vue.searchWords, vue.curRequestPage, 6).then(res => {
                console.log(res)
                // 如果没有数据了
                if (res.data == null || res.data.length < 1) {
                  vue.isRequestEnd = true
                } else {
                  for (let i in res.data) {
                    vue.searchList.push(res.data[i])
                  }
                  vue.curRequestPage += 1;
                }
                vue.isInRequest = false
              }).catch(err => {
                console.log(err)
                vue.isInRequest = false
              })
            } else if (vue.curIndex === 1) {
              func(vue.searchWords, user.id, vue.curRequestPage, 8).then(res => {
                console.log(res)
                // 如果没有数据了
                if (res.data == null || res.data.length < 1) {
                  vue.isRequestEnd = true
                } else {
                  for (let i in res.data) {
                    vue.searchList.push(res.data[i])
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
}
</script>

<style scoped>
.search_menu {
  background-color: #f8f8f8;
  height: 60px;
  width: auto;
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  margin-top: 2px;
  padding-left: 440px;
}

.search-menu-text {
  line-height: 60px;
  margin-right: 30px;
  font-size: 20px;
  cursor: pointer;
}

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
  background-color: #8c8c93;
  height: 200px;
  margin-left: 10px;
}

.search-menu-text:nth-child(1) {
  color: #0066ff;
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

.post-end-text {
  margin: 20px auto;
  padding-bottom: 20px;
  font-size: 30px;
  width: 150px;
}

</style>