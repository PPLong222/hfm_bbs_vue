<template>
  <div class="post-container">
    <div class="post-rand-num">
      {{ index + 1 }}
    </div>

    <div class="post-content">
      <a :href="post.url" target="_blank">
        <div class="post-title">{{ post.title }}</div>
      </a>
      <div class="post-pretext">
        {{ post.description }}
      </div>
      <div class="post-tail">
        <span class="iconfont icon-ef-redian-gongju"></span>
        <span class="post-tail-text"> {{ post.views }} 热度</span>

        <span class="iconfont icon-comment"></span>
        <span class="post-tail-text"> {{ post.commentCount }} 条评论</span>

      </div>
    </div>
    <div class="post-cover">
      <el-image :src="post.cover" class="post-cover-img" lazy>
        <el-image slot="placeholder" :src="require('@/assets/images/image_loading.gif')" class="image-slot"/>
      </el-image>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopPostListPanel",
  props: {
    post: Object,
    index: Number
  },
  data() {
    return {
      colors: ["rgb(211 86 86)", "#fa9607", "#ff9607", "#999"]
    }
  }
  ,
  mounted() {
    console.log("123")
    if (this.index > 2) {
      document.getElementsByClassName("post-rand-num")[this.index].style.color = this.colors[3]
    } else {
      document.getElementsByClassName("post-rand-num")[this.index].style.color = this.colors[this.index]
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/iconfont/iconfont.css";

.post-container {
  height: 150px;
  width: auto;
  padding: 16px;
  background-color: white;
  border-bottom: 2px solid #f6f6f6;
  display: flex;
}

.post-rand-num {
  color: #0066ff;
  flex: 1;
  font-size: 24px;
  padding-top: 4px;
  padding-left: 14px;
}

.post-content {
  flex: 12;
  position: relative;
}

.post-cover {
  flex: 6;
  height: 130px;
  width: 220px;
}

.post-title {
  padding-left: 4px;
  padding-right: 20px;;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
  height: fit-content;
  font-size: 20px;
}

.post-cover-img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-top: 10px;
}

a {
  text-decoration: none;
  color: unset;
}

.post-pretext {
  padding-left: 4px;
  margin-top: 12px;
  padding-right: 20px;;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
  height: fit-content;
}

.post-tail {
  position: absolute;
  bottom: 0;
  display: flex;
}

.iconfont {
  font-size: 28px;
  color: #8590a6;
  line-height: 32px;
}

.post-tail-text {
  line-height: 32px;
  margin-left: 4px;
  color: #8590a6;
}

.icon-comment {
  margin-left: 20px;
  font-size: 24px;
}

</style>