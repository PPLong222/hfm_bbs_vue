<template>
  <div class="signup-panel">

    <el-form ref="signupForm" :model="signupForm" :rules="signupRules" class="signup-form">
      <el-row class="desc-text">UserName</el-row>
      <el-form-item label="" prop="userName">
        <el-input v-model="signupForm.userName" placeholder="8-32位字符"></el-input>
      </el-form-item>
      <el-row class="desc-text">Email</el-row>
      <el-form-item label="" prop="email">
        <el-input v-model="signupForm.email" placeholder="邮箱地址"></el-input>
      </el-form-item>
      <el-row class="desc-text">Password</el-row>
      <el-form-item label="" prop="password">
        <el-input v-model="signupForm.password" placeholder="9-32位字符"></el-input>
      </el-form-item>

      <div class="testify-block">
        验证码区域
      </div>
      <el-button :loading="isLoading" type="primary" v-on:click="onRegisterButtonClick">注册</el-button>
    </el-form>


  </div>
</template>

<script>
import {signup} from "@/api/api";

function onRegisterButtonClick() {
  // 先清空cookie, 后续可能会只清空某个cookie
  this.utils.clearCookieByName("token")
  // 先进行合格性校验
  if (this.utils.isFormValid('signupForm', this)) {
    // 发送网络请求
    this.isLoading = true
    signup(this.signupForm.userName, this.signupForm.email, this.signupForm.password).then(res => {
      console.log(res)
      if (this.utils.isRequestSuccess(res)) {
        // 跳转到邮箱验证界面
        this.$router.push({
          name: "/signup/emailConfirm",
          params: {
            email: this.signupForm.email
          }
        })
      } else {
        this.$message.error(res.msg)
        this.isLoading = false
      }
    }).catch(err => {
      // 进行错误提示
      console.log(err)
      this.isLoading = false;
    })
  }

}

export default {
  name: "SignUpPanel",
  methods: {
    onRegisterButtonClick,
  },
  data() {
    var validateEmail = (rule, value, callback) => {
      let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!reg.test(value)) {
        callback(new Error('请输入正确格式的邮箱'));
      } else {
        callback();
      }
    };
    return {
      signupForm: {
        userName: "",
        email: "",
        password: ""
      },
      isLoading: false,
      signupRules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
        ],
        email: [
          {validator: validateEmail, trigger: "blur"}
        ],

        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur'}
        ]
      }
    }
  },

}

</script>

<style scoped>
.el-input {
  margin: 0;
  display: block;
  width: auto;
}

.el-button {
  margin: 0;
  /*对不同浏览器进行填充适配*/
  width: -moz-available; /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  width: fill-available;
}

.testify-block {
  border: 1px solid #4960d0;
  border-radius: 4px;
  width: auto;
  margin: 20px 20px;
  height: 150px;
  text-align: center;
  line-height: 150px;
}

.desc-text {
  font-size: large;
  font-weight: 600;
  color: black;
  margin: 10px 0 10px 0px;
}

.signup-panel {
  height: 600px;
  width: 360px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.4) 0 5px 15px;
}

.signup-form {
  padding: 20px;
}
</style>