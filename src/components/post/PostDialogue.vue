<template>
  <el-dialog
      :before-close="closeDialogue"
      :visible.sync="visible"
      center
      title="博文提交"
      width="50%">
    <el-alert
        title="请勿发布涉及政治、广告、营销、翻墙、违反国家法律法规等内容,详见《ECHO社区内容创作规范》"
        type="success">
    </el-alert>
    <div class="spacing">
      <!--      <el-upload-->
      <!--          :before-upload="beforeAvatarUpload"-->
      <!--          :on-success="handleAvatarSuccess"-->
      <!--          :show-file-list="false"-->
      <!--          action="https://jsonplaceholder.typicode.com/posts/"-->
      <!--          class="avatar-uploader"-->
      <!--          style="width:30%;float:left;">-->
      <!--        <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
      <!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <!--      </el-upload>-->
      <div class="m-upload">
        <Cropper></Cropper>
        <el-input
            v-model="description"
            :rows="7"
            placeholder="摘要(必填）：会在推荐、列表等场景外露，帮助读者快速了解内容，不超过256字"
            style="margin-left: 20px"
            type="textarea">
        </el-input>
      </div>
    </div>


    <div class="spacing">
      请选择文章标签：
      <el-tag
          type="success"
          v-for="tag in dynamicTags"
          :key="tag"
          :disable-transitions="false"
          closable
          @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
      <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="small"
          @blur="handleInputConfirm"
          @keyup.enter.native="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>

    <div class="spacing">
      请选择语言领域：
      <el-tag
          type="warning"
          v-for="language in checkedLanguages"
          :key="language"
          :disable-transitions="false"
          closable
          @close="handleCloseLanguage(language)">
        {{ language }}
      </el-tag>
      <el-input
          v-if="languageVisible"
          ref="saveLanguageInput"
          v-model="languageValue"
          class="input-new-tag"
          size="small"
          @blur="handleInputConfirmLanguage"
          @keyup.enter.native="handleInputConfirmLanguage"
      >
      </el-input>

      <el-button v-else class="button-new-tag" type="text" @click="languageAddVisible = true">添加语言</el-button>
      <el-dialog
          :visible.sync="languageAddVisible"
          append-to-body
          title="请选择语言领域"
          width="30%">
        <el-checkbox-group
            v-model="checkedLanguages"
            :max="6"
            :min="1">
          <el-checkbox v-for="language in languages" :key="language" :label="language">{{ language }}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="languageAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="showInputLanguage">确 定</el-button>
        </span>
      </el-dialog>

    </div>

    <div class="spacing">
      请选择文章分类：
      <el-tag
          type="danger"
          v-for="category in checkedCategories"
          :key="category"
          :disable-transitions="false"
          closable
          @close="handleCloseLanguage(category)">
        {{ category }}
      </el-tag>
      <el-input
          v-if="categoryVisible"
          ref="saveCategoryInput"
          v-model="categoryValue"
          class="input-new-tag"
          size="small"
          @blur="handleInputConfirmCategory"
          @keyup.enter.native="handleInputConfirmCategory"
      >
      </el-input>

      <el-button v-else class="button-new-tag" type="text" @click="categoryAddVisible = true">添加分类</el-button>
      <el-dialog
          :visible.sync="categoryAddVisible"
          append-to-body
          title="请选择文章分类"
          width="30%">
        <el-checkbox-group
            v-model="checkedCategories"
            :max="4"
            :min="1">
          <el-checkbox v-for="category in categories" :key="category" :label="category">{{ category }}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="categoryAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="showInputCategory">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="spacing">
      <el-form-item label="发布形式：" prop="resource">
        <!--        <span style="float: left">发布形式：</span>-->
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
import Cropper from "@/components/post/Cropper";

const categoryOptions = ['前端', '后端', '数据库', '操作系统', '网络', '游戏', '人工智能', '大数据', '嵌入式', '小程序', '软件测试'];
const languageOptions = ['C', 'C++', 'Java', 'Python', 'Javascript', 'HTML', 'CSS', 'csharp', 'rust',
  'Go', 'Android', 'kotlin', 'swift', 'ios', 'dart'];

export default {
  components: {Cropper},
  data() {
    return {
      visible: false,//操纵父子组件显示
      inputVisible: false,//操纵tag生成
      languageVisible: false,//操纵生成选择完成的语言标签显示
      languageAddVisible: false,//操纵添加语言界面组件显示
      categoryVisible: false,//操纵生成选择完成的分类标签显示
      categoryAddVisible: false,//操纵添加语言界面组件显示

      inputValue: '',
      languageValue: '',
      categoryValue: '',

      checkedCategories: [],
      checkedLanguages: [],
      dynamicTags: [],//用来存储标签数

      categories: categoryOptions,
      languages: languageOptions,

      comment: true,
      description: '',
      imageUrl: '',

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
    dialogVisible(val) {
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
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    // 动态生成tag
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

    closeDialogue() {
      console.log("this is closeDialogue")
      this.visible = false
      this.$emit('visibleEvent', this.visible)
    },

    //父子组件传参
    submitDialogue() {
      this.visible = false
      //传参顺序:头像，描述，标签，语言，分类，公开和评论
      this.$emit('visibleEvent', this.visible, this.imageUrl, this.description, this.dynamicTags,
          this.checkedLanguages, this.checkedCategories, this.ruleForm.resource, this.comment)
    },

    //动态生成分类标签
    handleCloseCategory(tag) {
      this.checkedCategories.splice(this.checkedCategories.indexOf(tag), 1);
    },

    showInputCategory() {
      this.categoryAddVisible = false;
      this.categoryVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveCategoryInput.$refs.input.focus();
      });
    },

    handleInputConfirmCategory() {
      let categoryValue = this.categoryValue;
      if (categoryValue) {
        this.checkedLanguages.push(categoryValue);
      }
      this.categoryVisible = false;
      this.categoryValue = '';
      console.log(this.checkedCategories);
    },

    //动态生成语言标签
    handleCloseLanguage(tag) {
      this.checkedLanguages.splice(this.checkedLanguages.indexOf(tag), 1);
    },

    showInputLanguage() {
      this.languageAddVisible = false;
      this.languageVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveLanguageInput.$refs.input.focus();
      });
    },

    handleInputConfirmLanguage() {
      let languageValue = this.languageValue;
      if (languageValue) {
        this.checkedLanguages.push(languageValue);
      }
      this.languageVisible = false;
      this.languageValue = '';
      console.log(this.checkedLanguages);
    },
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

.spacing {
  margin-top: 30px;
}

.m-upload {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap
}

</style>