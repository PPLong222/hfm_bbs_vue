<template>
  <div class="login-panel">
    <div class="text-field">
      <span class="normal-text pwd-needy-text">密码登录</span>
      <span class="normal-text pwd-free-text">免密登录</span>
    </div>


    <el-input v-model="user" placeholder="手机/邮箱/用户名"></el-input>
    <el-input v-model="password" class="input-password" placeholder="密码" type="password">
      <span slot="suffix" class="iconfont icon-eye" v-on:click="test"></span>
    </el-input>

    <div class="register">加入码社</div>
    <div class="forget-pwd">忘记密码</div>

    <div>
      <el-button id="login-button" type="primary">登录</el-button>
    </div>


  </div>
</template>

<script>

export default {
  name: "LoginPanel.vue",
  props: {
    msg: String
  },
  methods: {
    test() {
      console.log("hhhh")
    }
  },
  data() {
    return {
      user: "",
      password: ""
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/iconfont/iconfont.css";

.login-panel {
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
}

.text-field {
  margin-top: 16px;
  overflow: hidden;
  height: 40px;
}

.normal-text {
  margin-left: 20px;
  font-size: 18px;
  color: black;
  height: 30px;
}

.pwd-needy-text {
  padding-bottom: 8px;
  border-bottom: 3px solid #0066ff;
}

.forget-pwd {
  float: right;
  font-size: 14px;
  margin-right: 18px;
  color: #b1b9d5;
}

.register {
  float: left;
  font-size: 14px;
  margin-left: 22px;
  color: #b1b9d5;
}

#login-button {
  width: 360px;
  margin-top: 20px;
  margin-left: 20px;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #0066ff;
}

/deep/ .el-input__inner {
  border: 0;
  border-bottom: 1px solid #ebebeb;
  border-radius: 0;
  margin: 20px 20px 10px 20px;
  width: 360px;
  padding: 5px;
}

/deep/ .el-input__suffix {
  right: 20px;
  top: 20px;
  height: fit-content;
}

.input-password {

}

</style>