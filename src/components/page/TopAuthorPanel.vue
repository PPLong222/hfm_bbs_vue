<template>
  <div class="top-author-list">
    <div v-for="user of userList" :key="user.id" class="single-author-item">
      <el-image :src="user.avatar" class="author-avatar"></el-image>
      <div class="author-text">
        <div class="author-name">{{ user.nickName }}</div>
        <div class="author-desc">{{ user.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {getTopAuthor} from "@/api/api";

export default {
  name: "TopAuthorPanel",
  mounted() {
    getTopAuthor(5).then(res => {
      if (this.utils.isRequestSuccess(res)) {
        this.userList = res.data
        console.log(this.userList)
      }
    })
  },
  data() {
    return {
      userList: []
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