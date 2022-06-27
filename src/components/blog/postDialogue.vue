<template>
  <el-dialog
      title="博文提交"
      :visible.sync="visible"
      width="50%"
      :before-close="closeDialogue"
      center>
    <el-alert
        title="请勿发布涉及政治、广告、营销、翻墙、违反国家法律法规等内容,详见《ECHO社区内容创作规范》"
        type="success">
    </el-alert>
    <div class="spacing">
      <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          style="width:25%;float:left;"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-input
          type="textarea"
          style="width:75%;float:left;"
          :rows="8"
          placeholder="摘要(必填）：会在推荐、列表等场景外露，帮助读者快速了解内容，不超过256字"
          v-model="description">
      </el-input>
    </div>



    <div>
      请选择文章标签：
      <el-tag
          :key="tag"
          class="spacing"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>

    <div class="spacing">
      <span style="float: left">请选择语言领域：</span>
      <el-checkbox-group
          v-model="checkedLanguages"
          :min="1"
          :max="4">
        <el-checkbox v-for="language in languages" :label="language" :key="language">{{language}}</el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="spacing">
      <span style="float: left">请选择文章分类：</span>
      <el-checkbox-group
          v-model="checkedCategories"
          :min="1"
          :max="4">
        <el-checkbox v-for="category in categories" :label="category" :key="category">{{category}}</el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="spacing">
      <el-form-item label="发布形式：" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="公开"></el-radio>
          <el-radio label="私密"></el-radio>
          <el-radio label="粉丝可见"></el-radio>
        </el-radio-group>
      </el-form-item>
    </div>

    <div>
      <el-form-item label="关闭评论：" style="margin-top: -10px">
        <el-switch v-model="comment"></el-switch>
      </el-form-item>
    </div>


    <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogue">取 消</el-button>
        <el-button type="primary" @click="submitDialogue">发布</el-button>
    </span>

  </el-dialog>
</template>

<script>
const categoryOptions = ['前端', '后端', '数据库', '移动开发'];
const languageOptions = ['Java', 'C++', 'Python', 'C#'];

export default {
  data () {
    return {
      checkedCategories: ['前端', '后端'],
      checkedLanguages: ['Java', 'C++'],
      categories: categoryOptions,
      languages: languageOptions,
      comment: true,
      description: '',
      imageUrl: '',
      dynamicTags: ['标签一', '标签二', '标签三'],//用来存储标签数
      inputVisible: false,
      inputValue: '',
      visible: false,
      ruleForm: {
        resource: '',
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      require: true
    }
  },
  watch: {
    dialogVisible (val) {
      this.visible = val
      //console.log("this is dialogVisible")
    }
  },
  methods: {
    //处理封面
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type==='image/jpeg')||(file.type==='image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    // 处理tag
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
      console.log(this.dynamicTags);
    },

    closeDialogue(){
      console.log("this is closeDialogue")
      this.visible = false
      //传参顺序:头像，描述，标签，语言，分类，公开和评论
      this.$emit('visibleEvent', this.visible)
    },

    //父子组件传参
    submitDialogue () {
      this.visible = false
      //传参顺序:头像，描述，标签，语言，分类，公开和评论
      this.$emit('visibleEvent', this.visible,this.imageUrl,this.description,this.dynamicTags,
          this.checkedLanguages,this.checkedCategories,this.ruleForm.resource,this.comment)
    }

  }
}
</script>

<style scoped>
/*tag增加样式*/
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

/*图片上传样式*/
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

.spacing{
  margin-top: 30px;
}

.el-dialog__title{

}

</style>