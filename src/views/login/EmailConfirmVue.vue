<template>
  <div class="background">
    <div class="container">
      <el-row class="intro-desc">输入发送到您邮箱的6位验证码</el-row>
      <el-row class="code-row" type="flex">
        <el-col :span="4"><input class="code-input" maxLength="1" size="1" type="text"/></el-col>
        <el-col :span="4"><input class="code-input" maxLength="1" size="1" type="text"/></el-col>
        <el-col :span="4"><input class="code-input" maxLength="1" size="1" type="text"/></el-col>
        <el-col :span="4"><input class="code-input" maxLength="1" size="1" type="text"/></el-col>
        <el-col :span="4"><input class="code-input" maxLength="1" size="1" type="text"/></el-col>
        <el-col :span="4"><input class="code-input" maxLength="1" size="1" type="text"/></el-col>
      </el-row>
      <el-row>
        <el-col :offset="8" :span="8">
          <el-button id="login-button" :loading="isLoading" type="primary" v-on:click="onConfirmButtonClick">
            {{ buttonText }}
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {confirmCode} from "@/api/api";
import Cookies from "js-cookie";


// 验证码输入自动跳转到下一个字符判断逻辑
$(function () {
  'use strict';
  var body = $('body');

  function goToNextInput(e) {
    let key = e.which
    console.log(key)
    if (key >= 65 && key <= 90) {
      console.log("1111")
      let t = $(e.target.parentNode),
          sib = t.next().children();
      if (!sib || !sib.length) {
        sib = body.find('.code-input').eq(0);
      }
      sib.select().focus();
    } else {
      e.preventDefault();
    }
  }

  function onKeyDown(e) {
    let key = e.which;

    if (key >= 65 && key <= 90) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  function onFocus(e) {
    $(e.target).select();

  }

  body.on('keydown', '.code-input', onKeyDown);
  body.on('keyup', '.code-input', goToNextInput);
  body.on('click', '.code-input', onFocus);

})
export default {
  name: "EmailConfirmVue",
  methods: {
    onConfirmButtonClick() {
      // 点击按钮后UI效果切换
      this.isLoading = true
      this.buttonText = "加载中"
      // 非空判断
      let inputList = document.getElementsByClassName("code-input")
      let code = ""
      for (let i = 0; i < inputList.length; i++) {
        code += inputList[i].value
      }
      if (code.length < 6) {
        this.$message({
          message: "验证码输入格式有误",
          type: "error",
          center: true,
        })
        this.isLoading = false
        this.buttonText = "确认"
        return
      }
      // 进行网络请求
      let email = this.$route.params.email
      confirmCode(email, code).then(res => {
        if (this.utils.isRequestSuccess(res)) {
          this.$message({
            message: "验证成功",
            type: "success",
            center: true
          })
          this.utils.clearCookieByName("token")
          // 保存cookie 并 跳转到用户个性化界面
          let token = res.data.token
          let user = res.data.user
          if (token != null) {
            // 使用js-cookie来传， 默认token过期时间是一天
            Cookies.set('token', token, {expires: 1})
          }
          if (user != null) {
            this.utils.setObjectToLocalStorage("user", user)
          }
          console.log(this.utils.getObjectFromLocalStorage("user"))
          // 登录成功
          this.$router.push("/index")
        } else {
          this.$message({
            message: "验证码输入错误",
            type: "error",
            center: true,
          })
          this.isLoading = false
          this.buttonText = "确认"
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  data() {
    return {
      isLoading: false,
      buttonText: "确认"
    }
  }
}
</script>

<style scoped>

.container {
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  height: 500px;
  background-color: #ffffffd4;
  text-align: center;
  overflow: auto;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0 5px 15px;
}

.background {
  height: 100%;
  width: 100%;
  background: url("/src/assets/images/login_background.jpg") no-repeat;
  background-size: cover;
  /*解决缩小窗口后出现空白的情况*/
  overflow: auto;
}


#login-button {
  width: 100%;
  height: 50px;
  margin-top: 80px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #0066ff;
  font-size: 24px;
  letter-spacing: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0 5px 15px;

}

.intro-desc {
  max-width: fit-content;
  margin: 40px auto 40px auto;
  font-weight: 600;
  font-size: 32px;
  letter-spacing: 3px;
}

.code-row {
  margin-top: 80px;
}

.code-input {
  margin: 0 5px;
  text-align: center;
  line-height: 120px;
  font-size: 60px;
  border: solid 1px #ccc;
  box-shadow: 0 0 5px #ccc inset;
  outline: none;
  width: 60%;
  transition: all .2s ease-in-out;
  border-radius: 10px;
}

.code-input:focus {
  border-color: purple;
  box-shadow: 0 0 5px purple inset;
}

.code-input::selection {
  background: transparent;
}


</style>