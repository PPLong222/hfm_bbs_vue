<template>
  <div class="signup-panel">

    <el-row class="desc-text">UserName</el-row>
    <el-input v-model="input"></el-input>
    <el-row class="desc-text">Email</el-row>
    <el-input v-model="input"></el-input>
    <el-row class="desc-text">Password</el-row>
    <el-input v-model="input"></el-input>

    <div>
      <el-button type="primary">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpPanel"
}
</script>

<style scoped>
.el-input {
  margin: 0 20px;
  display: block;
  width: auto;
}

.el-button {
  margin: 10px 20px;
  width: auto;
  overflow: visible;
}

.desc-text {
  font-size: large;
  font-weight: 600;
  color: black;
  margin: 20px 0 10px 20px;
}

.signup-panel {
  height: 600px;
  width: 360px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.4) 0 5px 15px;
}
</style>