<template>

  <div class="background">
    <div class="el-container">
      <el-col :span="12">
        <div class="grid-content">
          <div class="intro header">
            加入Echo技术社区
          </div>
          <div class="intro desc">Free To Ask 大胆询问任何技术领域上的问题</div>
          <div class="intro desc">Zeal And Extremely Positive User 活跃的技术用户群体</div>
          <div class="intro desc">Clean And Free Technique Community 干净免费的技术社区</div>
          <div class="intro desc">Express Your Own Technique Post 发布你自己的技术文章</div>
          <div class="intro user-post">截至目前, Echo社区已有超过<span
              class="text-num">{{ userCount }}</span>位用户注册<br>全站技术文章超过<span class="text-num">{{ postCount }}</span>篇
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <sign-up-panel></sign-up-panel>
      </el-col>
    </div>
  </div>
</template>

<script>
import SignUpPanel from "@/components/user/SignUpPanel";
import {getTotalPostCount, getTotalUserCount} from "@/api/api";

export default {
  name: "SignUpView",
  components: {
    SignUpPanel
  },
  data() {
    return {
      userCount: 0,
      postCount: 0
    }
  },
  created() {
    getTotalUserCount().then(res => {
      if (this.utils.isRequestSuccess(res)) {
        this.userCount = parseInt(res.data)
      }
    }).catch(err => {
      console.log(err)
    })
    getTotalPostCount().then(res => {
      if (this.utils.isRequestSuccess(res)) {
        this.postCount = parseInt(res.data)
      }
    })
  }
}
</script>

<style scoped>
.background {
  height: 100vh;
  background: url("/src/assets/images/login_background.jpg") no-repeat fixed;
  background-size: 100% 100%;
  overflow: auto;
}

.el-container {
  max-width: 1200px;
  background-color: rgb(201 210 229 / 79%);
  height: 800px;
  margin: 100px auto;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.7) 0 5px 15px;

}

.grid-content {
  width: 100%;
  height: 100%;
  padding-left: 20%;
  padding-top: 20%;
}

.intro {
  margin-bottom: 40px;
  font-size: 16px;
}

.header {
  font-size: 40px;

}

.signup-panel {
  margin: 100px auto 0;
}

.text-num {
  font-size: 24px;
  margin: 0 8px 0 8px;
}

.user-post {
  font-size: 20px;
  line-height: 40px;
}
</style>