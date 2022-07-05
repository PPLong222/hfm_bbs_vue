<template>
  <div class="hot-post-panel">
    <div class="host-text-panel"><span class="iconfont icon-ef-redian-gongju"></span><span
        class="hot-text toutiao">头条</span></div>

    <div class="hot-post-panel-left">
      <el-carousel class="hot-post-carousel" height="320px">
        <el-carousel-item v-for="hotPost of mainHotPostList" :hotPost="hotPost">
          <a :href="hotPost.url">
            <el-image :fit="cover" :src="hotPost.cover" class="hot-post-img">
              <el-image slot="placeholder" :src="require('@/assets/images/image_loading.gif')" class="image-slot"/>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </a>

          <a :href="hotPost.url">
            <div class="hot-post-title">{{ hotPost.title }}</div>
          </a>
          <a :href="hotPost.url">
            <div class="hot-post-desc">{{ hotPost.description }}</div>
          </a>
          <!--          <img class="hot-post-img" src="http://www.pplong.top/gallery/covers/wallhaven-z85wpg.png"/>-->
        </el-carousel-item>
        <!--        <div class="hot-post-title">如何实现elementUI如何实现elementUI如何实现elementUI如何实现elementUI如何实现elementUI</div>-->
        <!--        <div class="hot-post-desc">如何实现elementUI</div>-->
      </el-carousel>
    </div>

    <div class="hot-post-panel-right">

      <div v-for="subHotPost of subHotPost" :subHotPost="subHotPost" class="single-simple-post">
        <a :href="subHotPost.url">
          <div class="single-simple-post-title">{{ subHotPost.title }}</div>
        </a>
        <a :href="subHotPost.url">
          <div class="single-simple-post-desc">{{ subHotPost.description }}</div>
        </a>

      </div>
    </div>

  </div>
</template>

<script>
// 先用热榜的来替代
import {getHotPostList} from "@/api/api";

export default {
  name: "HotPostPanel",
  created() {
    getHotPostList().then(res => {
      if (this.utils.isRequestSuccess(res)) {
        this.mainHotPostList = res.data.slice(0, 3)
        this.subHotPost = res.data.slice(3, 7)
      }
    }).catch(err => {
      console.log(err)
    })
  },

  data() {
    return {
      mainHotPostList: [],
      subHotPost: []
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/iconfont/iconfont.css";

.hot-post-panel {
  padding: 10px 10px 30px 10px;
  height: 360px;
  width: auto;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0 5px 15px;
  border-radius: 4px;

}

.hot-post-panel-left {
  float: left;
}

.hot-post-panel-right {
  float: right;
  width: 280px;
  height: 280px;
  overflow: hidden;
}

.hot-post-img {
  height: auto;
  width: auto;
  border-radius: 4px;
}

.hot-post-title {
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  max-width: 460px;
  line-height: 30px;
  height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.hot-post-desc {
  margin-top: 10px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.single-simple-post {
  margin-bottom: 20px;
  overflow: hidden;
}

.single-simple-post-title {
  font-size: 20px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
}

.single-simple-post-desc {
  font-size: 16px;
  margin-top: 10px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
  line-height: 16px;
}

.host-text-panel {
  height: 48px;
  margin-bottom: 4px;
}

.icon-ef-redian-gongju {
  font-size: 48px;
  font-weight: normal;
  vertical-align: middle;
  margin-right: 4px;
  color: rgba(227, 60, 60, 0.73);
}

.hot-text {
  font-size: 24px;
  vertical-align: middle;
}

.hot-text.toutiao {
  color: rgba(227, 60, 60, 0.73);
  font-weight: bold;
  letter-spacing: 2px;
}

.hot-post-carousel {
  height: 340px;
  width: 420px;
}

/deep/ .el-carousel__button {
  background-color: #141514;
}

a {
  color: unset;
  text-decoration: none;
}
</style>