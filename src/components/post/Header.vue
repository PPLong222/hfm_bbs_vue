<template>
  <div class="m-content">
    <!--    <h3>欢迎来到您的博客</h3>-->
    <div style="float: left">
      <span class="aspect"><el-link href="/posts"><h2 style="color: #06f;margin-left: 50px">主页</h2></el-link></span>
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
          <el-divider direction="horizontal"></el-divider>
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          <el-dropdown-item>
            <span v-show="!hasLogin"><el-link href="/login" type="primary">登录</el-link></span>
            <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!--    <div>{{user.username}}</div>-->
    <div class="m-action">
      <!--      <span><el-link href="/posts">主页</el-link></span>-->
      <!--      <el-divider direction="vertical"></el-divider>-->
      <span><el-link href="/post/add"><i class="el-icon-edit el-icon-style"></i></el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link href="/post/add"><i class="el-icon-bell el-icon-style"></i></el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link href="/post/add"><i class="el-icon-chat-dot-square el-icon-style"></i></el-link></span>
    </div>

    <div class="search">
      <div style="float: right">
        <el-input v-model="input" placeholder="请输入您要搜索的内容...">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      user: {
        username: '请先登录',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      hasLogin: false
    }
  },
  methods: {
    logout() {
      const _this = this
      _this.$axios.get("/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/login")
      })
    }
  },
  created() {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username;
      this.user.avatar = this.$store.getters.getUser.avatar;
      this.hasLogin = true
    }
  }
}

</script>


<style scoped>

.m-content {
  width: 100%;
  height: 70px;
  min-width: 1356px;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.username_style {
  color: #06f;
  margin: 0 auto;
}

.m-action {
  margin-right: 60px;
  margin-top: 20px;
  float: right;
}

.dropdown_style {
  float: right;
  margin-top: 16px;
  margin-right: 30px;
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
  width: 340px;
  float: right;
  margin-right: 100px;
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
  width: 320px;
  border-left: 2px solid #06f;
  border-top: 2px solid #06f;
  border-bottom: 2px solid #06f;
}

/*.bar button {*/
/*  background: none;*/
/*  top: -2px;*/
/*  line-height: 50px;*/
/*  margin-right: 5px;*/
/*  color: darkgray;*/
/*}*/

/*.bar button:before {*/
/*  color: #06f;*/
/*}*/


</style>