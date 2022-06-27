<template>
  <div class="post-container">
    <h1 class="post-title">{{ postData.title }}</h1>
    <div class="post-description">
      <img :src=postData.cover alt="" class="post-cover"/>
      <span class="post-pretext">{{ postData.content }}</span>
    </div>
    <div class="post-tail">
      <span class="iconfont icon-heart"></span>
      <span class="icon-text">{{ postData.star }} 赞</span>

      <span class="iconfont icon-comment icon-next"></span>
      <span class="icon-text">{{ postData.remark }} 赞 条评论</span>

      <span class="iconfont icon-star icon-next"></span>
      <span class="icon-text">{{ postData.favorite }} 收藏</span>

      <span class="post-author-text">作者: {{ postData.author }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SinglePostView",
  props: {
    postData: Object
  }
}
</script>

<style scoped>
@import "../../assets/css/iconfont/iconfont.css";

.post-container {
  height: 240px;
  width: auto;
  padding: 20px 10px 10px 10px;
  background-color: red;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 10px 0;
}

.post-description {
  height: auto;
}

.post-cover {
  width: 270px;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  display: inline-block;
}

.post-pretext {
  text-overflow: clip;
  overflow: hidden;
  height: 160px;
  width: 480px;
  display: inline-block;
  margin-left: 20px;
  font-size: 20px;
  word-wrap: normal;
  word-break: normal;
  white-space: normal;
}

.post-tail {
  margin-top: 10px;
  display: flex;
  height: 30px;
}

.iconfont {
  font-size: 24px;
}

.icon-text {
  margin-left: 4px;
}

.icon-next {
  margin-left: 30px;
}

.post-author-text {
  margin-left: 30px;
}
</style>