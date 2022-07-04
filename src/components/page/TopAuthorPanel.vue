<template>
  <div class="top-author-list">
    <div v-for="i in data" class="single-author-item">
      <el-image class="author-avatar" src="http://www.pplong.top/gallery/pipi.jpg"></el-image>
      <div class="author-text">
        <div class="author-name">1232222222222222222222222222222222222</div>
        <div class="author-desc">12222222222222222312312312312331231233333333</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopAuthorPanel",
  data() {
    return {
      data: [1, 2, 3, 4, 5]
    }
  }
}
</script>

<style scoped>
.top-author-list {
}

.single-author-item {
  display: flex;
  padding-top: 10px;
  max-height: 70px;
}

.author-avatar {
  flex: 1;
  height: 50px;
  width: 50px;
  border-radius: 4px;
}

.author-text {
  flex: 5;
  margin-left: 10px;
}

.author-name {
  font-size: 20px;

  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
  height: fit-content;
}

.author-desc {
  font-size: 12px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
  height: fit-content;
}
</style>