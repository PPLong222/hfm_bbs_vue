<template>
  <div class="cropper-wrapper">
    <!-- element 上传图片按钮 -->
    <template v-if="!isPreview">
      <el-upload :auto-upload="false"
                 :on-change='handleChangeUpload'
                 :show-file-list="false"
                 action=""
                 class="upload-demo"
                 drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">点击上传</div>
        <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
      </el-upload>
    </template>
    <div v-else class="pre-box">
      <el-upload :auto-upload="false"
                 :on-change='handleChangeUpload'
                 :show-file-list="false"
                 action=""
                 class="upload-demo">
        <img :src="previewImg" alt="裁剪图片" width="240px">
      </el-upload>
    </div>
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog :visible.sync="dialogVisible" append-to-body class="crop-dialog" title="图片剪裁">
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper
              ref="cropper"
              :autoCrop="option.autoCrop"
              :autoCropHeight="option.autoCropHeight"
              :autoCropWidth="option.autoCropWidth"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :centerBox="option.centerBox"
              :fixed="option.fixed"
              :fixedBox="option.fixedBox"
              :fixedNumber="option.fixedNumber"
              :full="option.full"
              :img="option.img"
              :info="true"
              :infoTrue="option.infoTrue"
              :original="option.original"
              :outputSize="option.size"
              :outputType="option.outputType"
              @cropMoving="cropMoving"
          />
        </div>
      </div>
      <div class="action-box">
        <el-upload :auto-upload="false"
                   :on-change='handleChangeUpload'
                   :show-file-list="false"
                   action=""
                   class="upload-demo">
          <el-button plain type="primary">更换图片</el-button>
        </el-upload>
        <el-button plain type="primary" @click="clearImgHandle">清除图片</el-button>
        <el-button plain type="primary" @click="rotateLeftHandle">左旋转</el-button>
        <el-button plain type="primary" @click="rotateRightHandle">右旋转</el-button>
        <el-button plain type="primary" @click="changeScaleHandle(1)">放大</el-button>
        <el-button plain type="primary" @click="changeScaleHandle(-1)">缩小</el-button>
        <el-button plain type="primary" @click="downloadHandle('blob')">下载</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="finish">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "Cropper",
  data() {
    return {
      isPreview: false,
      dialogVisible: false,
      previewImg: '', // 预览图片地址
      // 裁剪组件的基础配置option
      option: {
        img: 'https://pic1.zhimg.com/80/v2-366c0aeae2b4050fa2fcbfc09c74aad4_720w.jpg', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        canMoveBox: true, // 截图框能否拖动
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [3, 2], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        enlarge: 0.1 //图片根据截图框输出比例倍数
      },
      // 防止重复提交
      loading: false,
      //用于存储图片的url
      url: '我是子组件的url'
    }
  },
  methods: {
    // 上传按钮 限制图片大小和类型
    handleChangeUpload(file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false
      }
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(async () => {
        // base64方式
        // this.option.img = await fileByBase64(file.raw)
        this.option.img = URL.createObjectURL(file.raw)
        this.loading = false
        this.dialogVisible = true
      })
    },
    // 放大/缩小
    changeScaleHandle(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 左旋转
    rotateLeftHandle() {
      this.$refs.cropper.rotateLeft();
    },
    // 右旋转
    rotateRightHandle() {
      this.$refs.cropper.rotateRight();
    },
    // 下载
    downloadHandle(type) {
      let aLink = document.createElement('a')
      aLink.download = 'author-img'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          aLink.href = URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          aLink.href = data;
          aLink.click()
        })
      }
    },
    // 清理图片
    clearImgHandle() {
      this.option.img = ''
    },
    // 截图框移动回调函数
    cropMoving(data) {
      // 截图框的左上角 x，y和右下角坐标x，y
      // let cropAxis = [data.axis.x1, data.axis.y1, data.axis.x2, data.axis.y2]
      // console.log(cropAxis)
    },
    finish() {
      // 获取截图的 blob 数据
      this.$refs.cropper.getCropBlob((blob) => {
        this.loading = true
        this.dialogVisible = false
        this.previewImg = URL.createObjectURL(blob)
        this.isPreview = true
      })
      this.emitCoverUrl();
      // 获取截图的 base64 数据
      // this.$refs.cropper.getCropData(data => {
      //     console.log(data)
      // })
    },

    //向父组件传递图片url
    emitCoverUrl() {
      this.$emit("emitUrl", this.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.cropper-wrapper {
  //height: calc(100vh - 50px);
  .pre-box {
    float: left;
    flex-direction: column;
  }
}

.crop-dialog {
  .cropper-content {
    padding: 0 40px;

    .cropper {
      width: auto;
      height: 350px;
    }
  }

  .action-box {
    padding: 25px 40px 0 40px;
    display: flex;
    justify-content: center;

    button {
      width: 80px;
      margin-right: 15px;
    }
  }

  .dialog-footer {
    button {
      width: 100px;
    }
  }
}

/deep/ .el-upload-dragger {
  float: left;
  width: 240px;
  height: 160px;
}

.el-upload__text {
  margin-top: -6px;
}

/deep/ .el-upload__tip {
  margin-top: 0;
}
</style>
