<template>
  <div class="login">
    <h1>Echo</h1>
    <div class="sub-desc">一个干净、纯粹的技术分享论坛</div>
    <login-panel id="login-panel"></login-panel>

  </div>
</template>

<script>
import LoginPanel from "@/components/user/LoginPanel";

export default {
  name: "LoginView",
  components: {
    LoginPanel,
  },
  methods: {},

}
</script>

<style scoped>
h1 {
  margin: 0 auto;
  padding-top: 120px;
  width: fit-content;
  letter-spacing: 3px;
  font-size: 52px;
}

.sub-desc {
  margin: 10px auto;
  width: fit-content;
  font-size: 20px;
}

.login {
  height: 100%;
  width: 100%;
  background: url("/src/assets/images/login_background.jpg") no-repeat;
  background-size: cover;
  /*解决缩小窗口后出现空白的情况*/
  overflow: auto;
}

#login-panel {
  margin: 40px auto;
}

</style>