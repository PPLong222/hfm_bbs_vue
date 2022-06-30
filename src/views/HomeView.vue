<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <el-button type="primary" v-on:click="testString">主要按钮</el-button>
    <span v-bind:title="msg">
      悬停查看
    </span>
    <el-upload
        :before-upload="beforeAvatarUpload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :http-request="httpRequest"
        :on-success="handleAvatarSuccess"
        :show-file-list="false"
        class="avatar-uploader"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {uploadSimpleImage} from '@/api/cos'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  methods: {
    testString() {

    },
    handleAvatarSuccess(res, file) {
      console.log(file.raw)
      this.imageUrl = URL.createObjectURL(file.raw);
      this.file = file.raw
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return (isJPG || isPNG) && isLt5M;
    },
    httpRequest(file) {
      this.file = file.file
      uploadSimpleImage(this.file, (err, data) => {
        if (err) {
          console.log(err)
        }
        if (data) {
          this.imageUrl = "https:// " + data.Location
          console.log(data)
        }
      })
    }
  },
  data() {
    return {
      msg: "PPLong VUE",
      imageUrl: '',
      file: Object,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
