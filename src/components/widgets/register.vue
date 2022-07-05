<template>
  <div>
    <div>
      <span>
        <span class="change-icon"><i class="el-icon-s-claim" style="font-size:30px"></i></span>
          <span v-show="hasRegister" class="nameStyle">{{ userName }}&nbsp;</span>
          <span class="labelStyle">早上好！</span>
      </span>
      <el-button v-show="!hasRegister" class="beforeRegister" @click="register">
        <span style="text-align: center">签到</span>
      </el-button>
      <el-button v-show="hasRegister" class="afterRegister">
        <span style="text-align: center">已签到</span>
      </el-button>
    </div>
    <div class="good-life">认真学习 认真工作 认真生活</div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "register",
  data() {
    return {
      hasRegister: false,
    }
  },
  props: {
    userName: ''
  },
  methods: {
    register() {
      this.hasRegister = true
      let now = moment();
    },
  },
}
</script>

<style scoped>
.el-icon-s-claim {
  margin-right: 10px;
  color: #004fc4;
}

.change-icon {
  font-size: 20px;
}

.beforeRegister {
  color: white;
  background-color: #004fc4;
  float: right;
  height: 32px;
}

.afterRegister {
  color: #004fc4;
  background-color: white;
  float: right;
  height: 36px;
}

.labelStyle {
  font-size: 16px;
}

.good-life {
  color: #606a78;
  font-size: 15px;
  font-weight: 300;
  margin-top: 20px;
}

.nameStyle {
  font-weight: bold;
  font-size: 16px;
}
</style>