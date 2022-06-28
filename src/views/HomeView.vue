<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <el-button type="primary" v-on:click="testString">主要按钮</el-button>
    <span v-bind:title="msg">
      悬停查看
    </span>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {getTestPost} from "@/api/api";

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  methods: {
    testString() {
      // test(null).then(res => {
      //   console.log(res)
      // })
      // test(null).then(res => {
      //   console.log(res)
      // }).catch(err=>{
      //   console.log(err)
      // })
      getTestPost(null).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  data() {
    return {
      msg: "PPLong VUE"
    }
  }
}
</script>
