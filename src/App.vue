<!-- File: src/App.vue -->
<!-- 应用根组件 - 定义全局生命周期和公共样式 -->
<script>
// 全局引入在线图标库，不用本地文件
import { onMounted } from 'vue'

onMounted(() => {
  const link = document.createElement('script')
  link.src = 'https://at.alicdn.com/t/c/font_4780576_0vjv57895.js'
  document.head.appendChild(link)
})

export default {
  // 应用初始化时触发（仅一次）
  onLaunch: function () {
    console.log('App Launch')
  },
  // 应用显示时触发（每次从后台切回前台都会触发）
  onShow: function () {
    console.log('App Show')
  },
  // 应用隐藏时触发（切到后台或退出时）
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/* 全局公共样式 */

/* 设置页面默认背景色 */
page {
  background-color: #F5F7FA;
}

/* 统一盒模型为 border-box */
view, text, button {
  box-sizing: border-box;
}
</style>
