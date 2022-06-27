<template>

  <div class="background">
    <div class="el-container">
      <el-col :span="16">
        <div class="grid-content">
        </div>
      </el-col>
      <el-col :span="8">
        <sign-up-panel></sign-up-panel>
      </el-col>
    </div>
  </div>
</template>

<script>
import SignUpPanel from "@/components/user/SignUpPanel";

export default {
  name: "SignUpView",
  components: {
    SignUpPanel
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
  max-width: 1600px;
  background-color: #42b983;
  height: 800px;
  margin: 100px auto;
}

.grid-content {
  background-color: #0066ff;
  width: 100%;
  height: 100%;
}

.signup-panel {
  margin: 100px auto 0;
}

</style>