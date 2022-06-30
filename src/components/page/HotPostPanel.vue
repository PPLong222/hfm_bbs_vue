<template>
  <div class="hot-post-panel">
    <div class="host-text-panel"><span class="iconfont icon-ef-redian-gongju"></span><span
        class="hot-text toutiao">头条</span></div>

    <div class="hot-post-panel-left">
      <img class="hot-post-img" src="http://www.pplong.top/gallery/covers/wallhaven-z85wpg.png"/>
      <div class="hot-post-title">如何实现elementUI如何实现elementUI如何实现elementUI如何实现elementUI如何实现elementUI</div>
      <div class="hot-post-desc">如何实现elementUI</div>
    </div>

    <div class="hot-post-panel-right">

      <div class="single-simple-post">
        <div class="single-simple-post-title">12312sssssssssssssssssssssssssssssssssssssss3</div>
        <div class="single-simple-post-desc">12312sssssssssssssssssssssssssssssssssssssss34444444444</div>
      </div>

      <div class="single-simple-post">
        <div class="single-simple-post-title">123123</div>
        <div class="single-simple-post-desc">123123</div>
      </div>

      <div class="single-simple-post">
        <div class="single-simple-post-title">123123</div>
        <div class="single-simple-post-desc">123123</div>
      </div>

      <div class="single-simple-post">
        <div class="single-simple-post-title">123123</div>
        <div class="single-simple-post-desc">123123</div>
      </div>

      <div class="single-simple-post">
        <div class="single-simple-post-title">123123</div>
        <div class="single-simple-post-desc">123123</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "HotPostPanel"
}
</script>

<style scoped>
@import "../../assets/css/iconfont/iconfont.css";
.hot-post-panel {
  padding: 10px 10px 30px 10px;
  height: 420px;
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
  width: 400px;
  height: 400px;
  overflow: hidden;
}

.hot-post-img {
  height: 300px;
  width: 460px;
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
}

.hot-post-desc {
  margin-top: 10px;
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
</style>