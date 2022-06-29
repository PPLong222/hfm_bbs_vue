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
          <div class="post-panel">
            <single-post-view :postData="postData"></single-post-view>
          </div>
        </div>

      </div>
      <div class="content-right">

      </div>
    </div>
    <h1>hello</h1>
    <!--test-->
    <p style="height:200px;">asd</p>
    <p style="height:200px;">asd</p>
    <p style="height:200px;">asd</p>
    <p style="height:200px;">asd</p>
    <p style="height:200px;">asd</p>
    <p style="height:200px;">asd</p>
    <!--回到顶部的组件-->
    <go-top></go-top>
  </div>
</template>

<script>
import CategoryPanel from "@/components/page/CategoryPanel";
import HotPostPanel from "@/components/page/HotPostPanel";
import SinglePostView from "@/components/page/SinglePostView";
import GoTop from "@/components/gotop/GoTop";

export default {
  name: "IndexView",
  components: {
    CategoryPanel,
    HotPostPanel,
    SinglePostView,
    "go-top": GoTop
  },
  data() {
    return {
      postData: {
        title: "文章标题",
        content: "hello",
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
  background-color: #42b983;
  margin: 20px 300px 20px 300px;
  /*避免margin top 无效*/
  padding: 20px 20px 20px 0;
  position: relative;
}

.content-left {
  background-color: #135dd0;
  width: 800px;
  height: 700px;
  float: left;
}

.content-right {
  background-color: #135dd0;
  height: 700px;
  width: 480px;
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
  margin: 10px 0px 10px 20px;
  display: inline-block;
  text-decoration: none;
}

.hot-post-panel {
  margin: 0 auto;
}
</style>