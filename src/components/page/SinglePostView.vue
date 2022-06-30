<template>
  <div class="post-container">
    <a :href="post.url" target="_blank">
      <div class="post-title">{{ post.title }}</div>
    </a>
    <div class="post-description">
      <a :href="post.url" target="_blank">
        <el-image :fit="cover" :src="post.cover" alt="" class="post-cover" lazy>
          <el-image slot="placeholder" :src="require('@/assets/images/image_loading.gif')" class="image-slot">
          </el-image>
        </el-image>
      </a>
      <a :href="post.url" target="_blank">
        <span class="post-pretext">{{ post.description }}</span>
      </a>
    </div>
    <div class="post-tail">
      <span class="iconfont icon-heart"></span>
      <span class="icon-text">{{ post.stars }} 赞</span>

      <span class="iconfont icon-comment icon-next"></span>
      <span class="icon-text">{{ post.commentCount }} 赞 条评论</span>

      <span class="iconfont icon-star icon-next"></span>
      <span class="icon-text">{{ post.favoriteCount }} 收藏</span>

      <span class="post-author-text">作者: {{ post.author.nickName }}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "SinglePostView",
  props: {
    post: Object
  }
}
</script>

<style scoped>
@import "../../assets/css/iconfont/iconfont.css";

.post-container {
  height: fit-content;
  max-height: 280px;
  width: auto;
  padding: 20px 10px 10px 20px;
  background-color: white;
  border-bottom: 2px solid #f6f6f6;
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
  width: 560px;
  display: inline-block;
  margin-left: 20px;
  font-size: 20px;
  word-wrap: normal;
  word-break: break-all;
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

.post-title {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
  height: fit-content;
  font-size: 20px;
  margin: 0 0 10px 4px;
}

a {
  text-decoration: none;
  color: unset;
}
</style>