<template>
  <div>
    <Header></Header>
    <div class="mpost">
      <h2>{{ post.title }}</h2>
      <el-link v-if="ownPost" icon="el-icon-edit">
        <router-link :to="{name:'PostEdit',params: {postId:post.id}}">
          编辑
        </router-link>
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="post.content">

      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/post/Header";
import 'github-markdown-css/github-markdown.css'

export default {
  name: "PostDetail",
  components: {Header},
  data() {
    return {
      post: {
        id: "",
        title: "默认",
        content: "内容"
      },
      ownPost: false
    }
  },
  created() {
    const postId = this.$route.params.postId
    const _this = this
    if (postId) {
      this.$axios.get('/post/' + postId).then(res => {
        const post = res.data.data
        _this.post.id = post.id
        _this.post.title = post.title
        //_this.post.description=post.description

        /**
         * 进行markdown语法渲染
         * @type {function(*=, *=): (MarkdownIt|undefined)}
         */
        var MarkDownIt = require("markdown-it")
        var md = new MarkDownIt()

        var result = md.render(post.content)

        _this.post.content = result

        _this.ownPost = (post.userId === _this.$store.getters.getUser.id)

      })
    }
  }

}
</script>

<style scoped>
.mpost {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}
</style>