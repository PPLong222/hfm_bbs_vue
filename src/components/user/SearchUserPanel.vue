<template>
  <div class="user-container">
    <el-image :src="user.avatar" class="user-avatar">
    </el-image>
    <div class="user-info">
      <div class="nickname">{{ user.nickName }}</div>
      <div class="user-tail">
        <span class="tail-text">原创 {{ user.postCount }}</span>
        <span class="tail-text next">阅读 {{ user.totalView }}</span>
        <span class="tail-text next">点赞 {{ user.stars }}</span>
        <span class="tail-text next">订阅 {{ user.followerCount }}</span>
      </div>

    </div>
    <el-button v-if="!user.isFollowed" class="follow follow-click" round v-on:click="onFollowerButtonClick($event)"
               @mouseenter.native="onFollowMouseEnter($event)" @mouseleave.native="onFollowMouseLeave($event)">关注
    </el-button>
    <el-button v-if="user.isFollowed" class="follow unfollow-click" round v-on:click="onUnFollowerButtonClick($event)"
               @mouseenter.native="onFollowMouseEnter($event)" @mouseleave.native="onFollowMouseLeave($event)">已关注
    </el-button>

  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "SearchUserPanel",
  methods: {
    onFollowerButtonClick(e) {

    },
    onUnFollowerButtonClick(e) {

    },
    onFollowMouseEnter(e) {
      if ($(e.target).hasClass("unfollow-click")) {
        e.target.innerHTML = "取消关注"
      } else if ($(e.target).hasClass("follow-click")) {
        e.target.innerHTML = "立即关注"
      }
    },
    onFollowMouseLeave(e) {
      if ($(e.target).hasClass("unfollow-click")) {
        e.target.innerHTML = "已关注"
      } else if ($(e.target).hasClass("follow-click")) {
        e.target.innerHTML = "关注"
      }
    }
  },
  props: {
    user: Object
  }
}
</script>

<style scoped>
.user-container {
  height: 60px;
  width: auto;
  padding: 20px 10px 20px 20px;
  background-color: white;
  border-bottom: 2px solid #f6f6f6;
  overflow: hidden;
  position: relative;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  float: left;
}

.user-info {
  float: left;
  margin-left: 10px;
}

.nickname {
  font-size: 20px;

}

.follow {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}

.user-tail {
  position: absolute;
  bottom: 20px;
  display: flex;
}

.tail-text {
  font-size: 16px;
  color: #8590a6;
  margin-right: 20px;
}
</style>