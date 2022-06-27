<template>
  <div>
    <Header></Header>
    <div class="allContainer">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content" class="editor"></mavon-editor>
        </el-form-item>

        <el-form-item class="m-content">
          <!--          <el-button type="primary" @click="submitForm('ruleForm')">发布文章</el-button>-->
          <el-button type="primary" @click="handleClick">发布</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

        <post-dialogue :dialogVisible="postVisible"
                       @visibleEvent="updateParams"

        ></post-dialogue>

      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/blog/Header";
import postDialogue from "@/components/blog/postDialogue";
export default {
  name: "BlogEdit",
  components: {postDialogue, Header},
  data() {
    return {
      visible: false,
      obejctData: {},
      postVisible: false,
      ruleForm: {
        id: '',
        title: '',
        description: '',
        content:''
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
    updateParams (val) {
      console.log("this is updateVisible")
      this.postVisible = val
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this=this
          this.$axios.post('/blog/edit',this.ruleForm,{
            headers:{
              "Authorization": localStorage.getItem("token")
            }
          }).then(res=>{
            console.log(res)
            _this.$alert('提交成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/blogs")
              }
            });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClick(){
      console.log("this is handleClick")
      this.postVisible = true
    }
  },
  created() {
    //重新编辑文章页面回显
    const blogId=this.$route.params.blogId
    const _this=this
    if(blogId){
      this.$axios.get('/blog/'+blogId).then(res=>{
        const blog = res.data.data
        _this.ruleForm.id=blog.id
        _this.ruleForm.title=blog.title
        _this.ruleForm.description=blog.description
        _this.ruleForm.content=blog.content

      })
    }
  }
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
.demo-ruleForm{
  margin-top: 20px;
}
.editor{
  height: 500px;
}
/deep/ .el-form-item__label{
  color: #06f;
  font-weight: bold;
}

</style>