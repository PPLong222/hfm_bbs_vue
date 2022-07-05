<template>
  <div class="m-content">
    <!--    <h3>欢迎来到您的博客</h3>-->
    <div style="float: left;margin-left: 5%">
      <span class="aspect"><el-link href="/index"><h2 style="color: #06f">主页</h2></el-link></span>
      <span class="aspect"><el-link href="/posts"><h3>下载·课程</h3></el-link></span>
      <span class="aspect"><el-link href="/posts"><h3>学习</h3></el-link></span>
      <span class="aspect"><el-link href="/posts"><h3>社区</h3></el-link></span>
      <span class="aspect"><el-link href="/posts"><h3>认证</h3></el-link></span>
      <span class="aspect"><el-link href="/posts"><h3>MyGitHub</h3></el-link></span>
      <span class="aspect"><el-link href="/posts"><h3>云服务</h3></el-link></span>
    </div>
    <!--    <div class="block" style="float: right">-->
    <!--      <el-avatar :size="40" :src="user.avatar"></el-avatar>-->
    <!--    </div>-->

    <div class="dropdown_style">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="30" :src="user.avatar"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <span class="username_style">{{ user.username }}</span>
          <el-dropdown-item divided>
            <div @click="onPersonPageClick"><i class="el-icon-user-solid"></i>个人主页</div>
          </el-dropdown-item>
          <el-dropdown-item><i class="el-icon-edit"></i>创作中心</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-s-opportunity"></i>无障碍</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-s-tools"></i>设置</el-dropdown-item>
          <el-dropdown-item divided>
            <span v-show="!hasLogin"><el-link href="/login" type="primary"><i
                class="el-icon-switch-button"></i>登录</el-link></span>
            <span v-show="hasLogin"><el-link type="danger" @click="userLogout"><i
                class="el-icon-switch-button"></i>退出</el-link></span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="m-action">
      <span><el-link href="/post/add"><i class="el-icon-edit el-icon-style"></i></el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link href="/post/add"><i class="el-icon-bell el-icon-style"></i></el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link href="/post/add"><i class="el-icon-chat-dot-square el-icon-style"></i></el-link></span>
    </div>

    <div class="search">
      <div style="float: right">
        <el-input v-model="input" placeholder="请输入您要搜索的内容...">
          <el-button slot="append" icon="el-icon-search" v-on:click="onSearchButtonClicked"></el-button>
        </el-input>
      </div>
    </div>

  </div>
</template>

<script>
import {logout} from "@/api/api";

export default {
  name: "Header",
  data() {
    return {
      input: '',
      user: {
        username: '请先登录',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      hasLogin: false
    }
  },
  methods: {
    userLogout() {
      logout(this.username).then(res => {
        if (this.utils.isRequestSuccess(res)) {
          this.utils.removeObjectFromLocalStorage("user")
          this.$message.success("成功登出")
          window.location.reload()
        } else {
          this.$message.error("登出失败")
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 搜索按钮点击时跳转的逻辑
    onSearchButtonClicked() {
      if (this.input !== '') {
        this.$router.push({
          path: `/search/${this.input}`
        })
      }
    },
    onPersonPageClick() {
      let id = parseInt(this.utils.getObjectFromLocalStorage("user").id);
      console.log("ssss")
      console.log(id)
      this.$router.push({
        path: `/person/info/${id}`
      })
    }
  },
  created() {
    if (this.utils.getObjectFromLocalStorage("user")) {
      this.user.username = this.utils.getObjectFromLocalStorage("user").userName;
      this.user.avatar = this.utils.getObjectFromLocalStorage("user").avatar;
      this.hasLogin = true
    }
  }
}
// this.user.username = this.$store.getters.getUser.username;
// this.user.avatar = this.$store.getters.getUser.avatar;
// this.hasLogin = true

</script>


<style scoped>

.m-content {
  width: 100%;
  height: 70px;
  min-width: 1356px;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.username_style {
  color: #06f;
  /*margin: 0 auto;*/
  margin-left: 25px;
  font-weight: bold;
  text-align: center

}

.m-action {
  margin-right: 30px;
  margin-top: 20px;
  float: right;
}

.dropdown_style {
  float: right;
  margin-top: 16px;
  margin-right: 5%;
}

.el-icon-style {
  font-size: 30px; /*改变图标大小*/
  /*line-height: 110px; !*通过设置行高让图标垂直居中*!*/
  color: #06f; /*设置图标颜色*/
  margin-right: 10px;
  margin-left: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #06f;
}

.aspect {
  margin-right: 15px;
  margin-left: 10px;
}

/*搜索框*/
.search {
  /*width: 340px;*/
  float: right;
  margin-right: 2%;
  margin-left: 2%;
  margin-top: 20px;
}

/*用于input样式*/
/deep/ .el-input__inner {
  height: 32px;
  outline: none;
  width: 250px;
  border-radius: 42px 0 0 42px;
  border-left: 2px solid #06f;
  border-top: 2px solid #06f;
  border-bottom: 2px solid #06f;
  transition: .3s linear;

}

/*用于button样式*/
/deep/ .el-input-group__append{
  cursor: pointer;
  border: none;
  outline: none;
  margin-right: 5px;
  border-radius: 0 42px 42px 0;
  border-right: 2px solid #06f;
  border-top: 2px solid #06f;
  border-bottom: 2px solid #06f;
}

/deep/ .el-input__inner:focus {
  width: 340px;
  border-left: 2px solid #06f;
  border-top: 2px solid #06f;
  border-bottom: 2px solid #06f;
}

.el-dropdown-menu {
  width: 120px;
}

</style>