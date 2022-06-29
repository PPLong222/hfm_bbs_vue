<template>
  <div id="category-panel" class="category-panel">
    <!--    按理说这些元素应该通过list 由父组件传入，这里先写死-->
    <a class="category-item" href="">前端</a>
    <a class="category-item" href="">后端</a>
    <a class="category-item" href="">数据库</a>
    <a class="category-item" href="">操作系统</a>
    <a class="category-item" href="">网络</a>
    <a class="category-item" href="">游戏</a>
    <a class="category-item" href="">人工智能</a>
    <a class="category-item" href="">大数据</a>
    <a class="category-item" href="">嵌入式</a>
    <a class="category-item" href="">小程序</a>
    <a class="category-item" href="">软件测试</a>
  </div>
</template>

<script>
export default {
  name: "CategoryPanel"
}
</script>

<style scoped>
.category-panel {
  height: 76px;
  width: auto;
  overflow: hidden;
  background-color: white;
  word-wrap: break-word;
  transition-duration: 0.3s;
  padding: 1px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 5px 15px;
}

.category-item {
  line-height: 30px;
  font-size: 18px;
  padding: 4px 8px 4px 8px;
  margin: 20px 10px 0 10px;
  height: 30px;
  display: inline-block;
  text-decoration: none;
  color: #8c8c93;
}

.category-panel:hover {
  height: 140px;
}

</style>