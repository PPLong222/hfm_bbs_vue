<template>
  <div>
    <Header></Header>
    <div class="allContainer">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item class="characterStyle" label="文章标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item class="characterStyle" label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item class="characterStyle" label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content" class="editor"></mavon-editor>
        </el-form-item>

        <el-form-item class="m-content">
          <!--          <el-button type="primary" @click="submitForm('ruleForm')">发布文章</el-button>-->
          <el-button type="primary" @click="handleClick">发布</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

        <post-dialogue :dialogVisible="postVisible" :post-info="ruleForm"
                       @visibleEvent="updateParams"

        ></post-dialogue>

      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/post/Header";
import PostDialogue from "@/components/post/PostDialogue";

export default {
  name: "PostEdit",
  components: {PostDialogue, Header},
  data() {
    return {
      visible: false,
      postVisible: false,
      ruleForm: {
        id: '',
        title: '',
        description: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填写文章摘要', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'change' }
        ]
      },

    };
  },
  methods: {
    updateParams(val) {
      console.log("this is updateVisible")
      this.postVisible = val
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       const _this=this
    //       this.$axios.post('/post/edit', this.ruleForm, {
    //         headers: {
    //           "Authorization": localStorage.getItem("token")
    //         }
    //       }).then(res=>{
    //         console.log(res)
    //         _this.$alert('提交成功', '提示', {
    //           confirmButtonText: '确定',
    //           callback: action => {
    //             _this.$router.push("/posts")
    //           }
    //         });
    //       })
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      //this.$refs[formName].resetFields();
    },
    handleClick() {
      //console.log("this is handleClick")
      this.postVisible = true
    }
  },
  // created() {
  //   //重新编辑文章页面回显
  //   const postId = this.$route.params.postId
  //   const _this = this
  //   if (postId) {
  //     this.$axios.get('/post/' + postId).then(res => {
  //       const post = res.data.data
  //       _this.ruleForm.id = post.id
  //       _this.ruleForm.title = post.title
  //       _this.ruleForm.description = post.description
  //       _this.ruleForm.content = post.content
  //
  //     })
  //   }
  // }
}
</script>

<style scoped>
.allContainer{
  margin-right: 50px;
  margin-left: 30px;
}
.m-content{
  text-align: center;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.demo-ruleForm {
  margin-top: 20px;
}

.editor {
  height: 500px;
}

/*/deep/ .el-form-item__label{*/
/*  color: #06f;*/
/*  font-weight: bold;*/
/*}*/

/deep/ .characterStyle .el-form-item__label {
  color: #06f;
  font-weight: bold;
}

</style>