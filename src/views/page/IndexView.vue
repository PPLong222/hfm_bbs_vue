<template>
  <div>
    <!--    这里引入导航栏模块, 替换掉div-->
    <div style="height: 60px;width: 100%; background-color: gray"></div>
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
            <single-post-view :postData="postData" class="single-post-view"></single-post-view>
            <single-post-view :postData="postData" class="single-post-view"></single-post-view>
          </div>
          <div>123123</div>
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
      </div>
    </div>
    <h1>hello</h1>
  </div>
</template>

<script>
import CategoryPanel from "@/components/page/CategoryPanel";
import HotPostPanel from "@/components/page/HotPostPanel";
import SinglePostView from "@/components/page/SinglePostView";
import {getTestPost} from "@/api/api";

export default {
  name: "IndexView",
  components: {
    CategoryPanel,
    HotPostPanel,
    SinglePostView
  },
  beforeCreate() {
    console.log("begin mounted")
    getTestPost("").then(res => {
      console.log(res)
      this.postData.title = res.data.postData.title
    }).catch(err => {
      console.log(err)
    })
  },
  data() {
    return {
      postData: {
        title: "这是标题",
        content: "hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello",
        cover: "http://www.pplong.top/gallery/covers/wallhaven-z85wpg.png",
        star: 102,
        remark: 100,
        favorite: 104,
        author: "PPLong"
      }
    }
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
  background-color: #135dd0;
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
  margin: 10px 0 10px 20px;
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
  border-radius: 10px;
  padding: 10px 10px 20px 20px;
  margin-bottom: 20px;
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
</style>