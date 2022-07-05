<template>
  <div class="language-panel">
    <span v-for="(value, key)  in languages" :value=value class="language-item"
          v-on:click="onLanguageClick($event)">{{ key }}</span>
  </div>
</template>

<script>
// 设置语言标签大小
// function setRandomSize() {
//   // 缩放阈值
//   const GAP = 50
//   const BASE_LINE_HEIGHT = 30
//   const BASE_FONT_SIZE = 25
//   let languageList = document.getElementsByClassName("language-item")
//   for (let element of languageList) {
//     // let ratio = parseInt(element.getAttribute("value")) / GAP
//     //element.style.lineHeight =  BASE_LINE_HEIGHT * ratio + "px"
//     element.style.fontSize = BASE_FONT_SIZE + "px"
//   }
// }

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
  name: "LanguagePanel",
  props: {
    languages: Object
  },
  mounted() {
    this.$nextTick(function () {
      // 仅在整个视图都被渲染之后才会运行的代码
      // setRandomSize()
      setRandomColor()
    })
  },
  methods: {
    onLanguageClick(e) {
      console.log(e.target)
      let language = e.target.getAttribute("value")
      this.$router.push({
        path: `/common/0/${language}`
      })
    }
  }
}
</script>

<style scoped>
.language-panel {
  text-align: center;
  width: auto;
  height: fit-content;
}

.language-item {
  line-height: 30px;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 2px;
  margin: 20px 20px 0 10px;
  height: fit-content;
  display: inline-block;
  text-decoration: none;
  font-size: 24px;
}

.language-item:hover {
  cursor: pointer;
}
</style>