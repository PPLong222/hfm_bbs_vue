<template>
  <div id="category-panel" class="category-panel">
    <span v-for="(value, key)  in categories" :value=value class="category-item"
          v-on:click="onCategoryClick($event)">{{ key }}</span>
  </div>

</template>

<script>
// 不设置随机颜色
function setRandomColor() {
  const language_color = ["#072448", "#54d2d2", "#ffcb00", "#f8aa4b", "#ff6150"]
  let languageList = document.getElementsByClassName("language-item")
  for (let element of languageList) {
    let color = language_color[parseInt(Math.random() * 5)]
    console.log(color)
    element.style.color = color
  }
}

export default {
  name: "CategoryPanel",
  props: {
    categories: Object
  },
  mounted() {
    this.$nextTick(function () {
      // 仅在整个视图都被渲染之后才会运行的代码
      // setRandomSize()
      setRandomColor()
    })
  },
  methods: {
    onCategoryClick(e) {
      console.log(e.target)
      let category = e.target.getAttribute("value")
      this.$router.push({
        path: `/common/${category}/0`
      })
    }
  }


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
  cursor: pointer;

}

.category-item:hover {
  color: #0066ff;
}

.category-panel:hover {
  height: 140px;
}

</style>