<template>
  <div>
    <Header></Header>
    <br>
    <br>
    <br>
    <br>
    <el-main>
      <div class="img">
        <el-card shadow="always" class="person-card">
          <el-avatar
              :size="100"
              :src="form.avatar"
              style="text-align: center; margin-left: 42%"
          ></el-avatar>
          <br>
          <el-form label-width="80px"
                   size="small"
                   style="padding: 15px">
            <el-form-item label="昵称">
              <el-input v-model="form.nickName" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="用户名">
              <el-input v-model="form.userName" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="简介">
              <el-input v-model="form.description" auto-complete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>

          </el-form>

          <div style="text-align: center">
            <el-button type="primary" @click="save">确定并保存</el-button>
            <el-button style="" type="danger" @click="back">返回</el-button>
          </div>
        </el-card>
      </div>


    </el-main>
  </div>
</template>

<script>

import Header from "@/components/post/Header";
import {getUserById, modifyUserInfo} from "@/api/api";

export default {
  name: "PersonalEditor",
  components: {Header},
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      isCollapse: false,
      collapseBtnClass: 'el-icon-s-fold',
      sideWidth: 200,
      logTextShow: true,
      form: {
        id: '',
        avatar: '',
        description: '',
        nickName: '',
        userName: '',
        sex: '男',
        email: ''
      }
    }


  },

  created() {
    this.getUserById()
    this.form.id = this.user.id
    this.form.userName = this.user.userName
    this.form.email = this.user.email
  },
  methods: {

    getUserById(){
      const id = this.user.id
      if(!id){
        this.$message.error("当前无法获取用户信息")
        return
      }
      getUserById(id).then(res => {
        this.form.avatar = res.data.data.avatar
        this.form.description = res.data.data.description
        this.form.nickName = res.data.data.nickName
        this.form.sex = res.data.data.sex ? '女' : '男'
        console.log(this.form.sex)
      })
    },

    save() {
      console.log(this.form)
      var comUser = this.form
      comUser.sex = comUser.sex==='女' ? 1 : 0
      modifyUserInfo(comUser).then(res=>{
        if(res.status === 200){
          this.$message.success("保存成功")
        } else{
          this.$message.error("保存失败")
        }
      })
    },
    logout() {

    },
    back() {
      this.$router.go(-1);
    }
  }
}
</script>

<style>
.el-container {
  min-height: 100vh
}

.menu-logo {
  height: 60px;
  line-height: 60px;
  text-align: center
}

.menu-logo img {
  width: 20px;
  position: relative;
  top: 5px;
}

.menu-logo b {
  color: white;
  margin-left: 3px
}

.el-dropdown {
  width: 20px;
}

.el-dropdown i {
  margin-right: 5px;
  font-size: 16px;
}

.el-breadcrumb {
  margin-top: 15px;
}

.el-main .search-wrapper {
  margin-top: 15px;
  width: 600px;
  display: flex;
  height: 40px;
  line-height: 40px;
}

.el-main .btn-group {
  margin-top: 20px;
  margin-left: 20px;
}

.el-main .btn-group .el-button {
  margin-left: 15px;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-table {
  margin-top: 30px;
}

.person-card{
  height: 600px;
  width: 900px;
  margin: 0 auto;
}

</style>