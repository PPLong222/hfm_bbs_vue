<template>
  <div>
    <Header></Header>
    <div class="me-view-body" v-title :data-title="title">
      <el-container class="me-view-container">
        <!--<el-aside class="me-area">-->
        <!--<ul class="me-operation-list">-->
        <!--<li class="me-operation-item">-->
        <!--<el-button type="primary" icon="el-icon-edit"></el-button>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</el-aside>-->
        <el-main class="el-main">

          <div class="me-view-card">
            <h1 class="me-view-title">{{post.title}}</h1>
            <div class="me-view-author">
              <a class="">
                <img class="me-view-picture" :src="post.author.avatar"></img>
              </a>
              <div class="me-view-info">
                <span>{{post.author.nickName}}</span>
                <div class="me-view-meta">
                  <span> {{post.createTime}} </span>
                  <span>阅读   {{post.views}}</span>
                  <span>评论   {{post.commentCount}}</span>
                </div>

              </div>
              <!--v-if="this.post.author.id == this.$store.state.id"-->
  <!--            <el-button-->
  <!--                @click="editpost()"-->
  <!--                style="position: absolute;left: 60%;"-->
  <!--                size="mini"-->
  <!--                round-->
  <!--                icon="el-icon-edit"-->
  <!--            >编辑</el-button>-->
            </div>
            <div class="me-view-content">
  <!--            <markdown-editor :editor=post.editor></markdown-editor>-->
                  <VueMarkdown :source="post.content"></VueMarkdown>
            </div>

            <div class="me-view-end">
              <el-alert
                  title="文章End..."
                  type="success"
                  center
                  :closable="false">
              </el-alert>
            </div>

            <div class="me-view-tag">
              标签：
              <!--<el-tag v-for="t in post.tags" :key="t.id" class="me-view-tag-item" size="mini" type="success">{{t.tagName}}</el-tag>-->
              <el-button @click="tagOrCategory('tag', t.id)" size="mini" type="primary" v-for="t in post.tags" :key="t.id" round plain>{{t.tagName}}</el-button>
            </div>

  <!--          <div class="me-view-tag">-->
  <!--            文章分类：-->
  <!--            &lt;!&ndash;<span style="font-weight: 600">{{post.category.categoryName}}</span>&ndash;&gt;-->
  <!--            <el-button @click="tagOrCategory('category', post.category.id)" size="mini" type="primary" round plain>{{post.category.categoryName}}</el-button>-->
  <!--          </div>-->

            <div class="me-view-comment">
              <div class="me-view-comment-write">
                <el-row :gutter="20">
                  <el-col :span="2">
                    <a class="">
                      <img class="me-view-picture" :src="avatar"></img>
                    </a>
                  </el-col>
                  <el-col :span="22">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2}"
                        placeholder="你的评论..."
                        class="me-view-comment-text"
                        v-model="comment.content"
                        resize="none">
                    </el-input>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="2" :offset="22">
                    <el-button type="text" @click="publishComment()">评论</el-button>
                  </el-col>
                </el-row>
              </div>

              <div class="me-view-comment-title">
                <span>{{post.commentCount}} 条评论</span>
              </div>

              <comment-item
                  v-for="(c,index) in comments"
                  :comment="c"
                  :postId="post.id"
                  :index="index"
                  :rootCommentCounts="comments.length"
                  @commentCountsIncrement="commentCountsIncrement"
                  :key="c.id">
              </comment-item>

            </div>

          </div>
        </el-main>

      </el-container>
    </div>
    <!--test-->
    <p style="height:200px;">asd</p>
    <p style="height:200px;">asd</p>
    <p style="height:200px;">asd</p>
    <p style="height:200px;">asd</p>
    <p style="height:200px;">asd</p>
    <p style="height:200px;">asd</p>
    <!--回到顶部的组件-->
    <go-top></go-top>
  </div>
</template>

<script>
import {findPostById, publishComment} from "@/api/api";
import {getCommentsByPost} from "@/api/api";
import 'github-markdown-css/github-markdown.css';
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import VueMarkdown from 'vue-markdown';
import Header from "@/components/post/Header";
import CommentItem from "@/components/comment/CommentItem";
import GoTop from "@/components/gotop/GoTop";

export default {
  name: 'BlogView',
  created() {
    this.findPostById();
    this.findCommentList();
  },
  data() {
    return {
      post: {
        id: '',
        title: '',
        commentCount: 0,
        views: 0,
        summary: '',
        author: {
          nickName: ''
        },
        tags: [],
        category:{},
        createTime: '',
        content: '',
        editor: {
          value: '',
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: 'preview'
        }
      },
      comments: [],
      comment: {
        post: {},
        content: ''
      },
      avatar: '',
      default_avatar: "E:\vue_workspace\HFM-BBS\hfm_bbs_vue\src\assets\icon\icon_github.png"
    }
  },
  computed: {
    avatar() {
      let avatar = this.$store.state.avatar

      if (avatar.length > 0) {
        return avatar
      }
      return this.default_avatar
    },
    title() {
      return `${this.post.title} - 文章详情`
    }
  },
  methods: {
    tagOrCategory(type, id) {
      this.$router.push({path: `/${type}/${id}`})
    },
    editpost() {
      this.$router.push({path: `/write/${this.post.id}`})
    },
    findPostById() {
      var id = this.$route.params.id;
      //发起http请求 请求后端的数据
      findPostById(id).then((res)=>{
          if(res.data.success){
            this.post.editor.value = res.data.data.content;
            Object.assign(this.post,res.data.data)
          }else{
            this.$message.error(res.data.msg);
          }
      }).catch((err)=>{
        this.$message.error("系统错误");
      }).finally(()=>{
      })
    },
    findCommentList(){
      var id = this.$route.params.id;
      //发起http请求 请求后端的数据
      getCommentsByPost(id).then((res)=>{
        if(res.data.success){
          this.comments = res.data.data;
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        this.$message.error("系统错误");
      }).finally(()=>{
      })
    },
    publishComment() {
      let that = this
      if (!that.comment.content) {
        return;
      }
      that.comment.post.id = that.post.id
      let parms = {postId:that.post.id,content:that.comment.content}
      publishComment(parms,this.$store.state.token).then(data => {
        if(data.success){
          that.$message({type: 'success', message: '评论成功', showClose: true})
          that.comment.content = ''
          that.comments.unshift(data.data)
          that.commentCountsIncrement()

        }else{
          that.$message({type: 'error', message: data.msg, showClose: true})
        }

      }).catch(error => {
        if (error !== 'error') {
          that.$message({type: 'error', message: '评论失败', showClose: true})
        }
      })
    },

    getCommentsByPost() {
      let that = this
      getCommentsByPost(that.post.id).then(data => {
        if(data.success){
          that.comments = data.data
        }else{
          that.$message({type: 'error', message: '评论加载失败', showClose: true})
        }
      }).catch(error => {
        if (error !== 'error') {
          that.$message({type: 'error', message: '评论加载失败', showClose: true})
        }
      })
    },
    commentCountsIncrement() {
      this.post.commentCounts += 1
    }
  },
  components: {
    MarkdownEditor,
    VueMarkdown,
    Header,
    "comment-item": CommentItem,
    "go-top": GoTop
  },
  //组件内的守卫 调整body的背景色
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = '#fff';
    next();
  },
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = '#f5f5f5';
    next();
  }
}
</script>

<style scoped>
.me-view-body {
  width: 800px;
  min-height: 100%;
  position: relative;
  margin: 100px auto 140px;
  font-weight: 400;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,"\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  line-height: 1.5;
}


*{
  margin: 0;
  padding: 0;
}

.me-view-container {
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  -webkit-box-flex: 1;
  flex: 1;
  box-sizing: border-box;
  min-width: 0;
  width: 800px;
}

.el-main {
  overflow: hidden;
}

.me-view-title {
  font-size: 34px;
  font-weight: 800;
  line-height: 1.3;
}

.me-view-author {
  /*margin: 30px 0;*/
  margin-top: 30px;
  vertical-align: middle;
}

.me-view-picture {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #0066ff;
}

.me-view-info {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
}

.me-view-meta {
  font-size: 12px;
  color: #969696;
}

.me-view-end {
  margin-top: 20px;
}

.me-view-tag {
  margin-top: 20px;
  padding-left: 6px;
  border-left: 4px solid #c5cac3;
}

.me-view-tag-item {
  margin: 0 4px;
}

.me-view-comment {
  margin-top: 60px;
}

.me-view-comment-title {
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}

.me-view-comment-write {
  margin-top: 20px;
}

.me-view-comment-text {
  font-size: 16px;
}

.v-show-content {
  padding: 8px 25px 15px 30px !important;
}

.v-note-wrapper .v-note-panel {
  box-shadow: none !important;
}

.v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  background: #fff !important;
}
</style>