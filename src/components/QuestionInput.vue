<!-- File: src/components/QuestionInput.vue -->
<!-- 问题输入组件 - 输入框+提交按钮 -->
<!-- 功能：输入问题、点击提问、回车提交、随机问题填充 -->
<template>
  <!-- 输入框容器 -->
  <view class="question-input-container">
    <!-- 输入框包装器：聚焦时高亮边框 -->
    <view class="input-wrapper" :class="{ 'focused': isFocused }">
      <!-- 文本输入框 -->
      <input 
        class="question-input" 
        v-model="question" 
        placeholder="在心中默念你的问题..." 
        placeholder-class="input-placeholder"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @confirm="handleSubmit"
      />
      <!-- 提交按钮 -->
      <button class="submit-btn" @click="handleSubmit" hover-class="btn-hover">提问</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 问题文本
const question = ref('');
// 输入框是否聚焦
const isFocused = ref(false);

// 定义组件事件：submit 事件，向父组件传递问题文本
const emit = defineEmits(['submit']);

// 处理提交：校验非空后触发 submit 事件并清空输入框
const handleSubmit = () => {
  if (!question.value.trim()) {
    uni.showToast({
      title: '请输入问题',
      icon: 'none'
    });
    return;
  }
  
  emit('submit', question.value.trim());
  question.value = '';
  isFocused.value = false;
};

// 设置问题文本：供外部调用（随机问题功能）
const setQuestion = (q) => {
  question.value = q;
  isFocused.value = true;
};

// 暴露 setQuestion 方法给父组件通过 ref 调用
defineExpose({ setQuestion });
</script>

<style scoped>
/* 输入框容器：左右留白 */
.question-input-container {
  padding: 0 32rpx;
  margin-bottom: 32rpx;
}

/* 输入框包装器：圆角胶囊形状 */
.input-wrapper {
  display: flex;
  background-color: #FFFFFF;
  border-radius: 48rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  border: 2rpx solid transparent;
}

/* 聚焦状态：蓝色边框+外发光 */
.input-wrapper.focused {
  box-shadow: 0 0 0 4rpx rgba(64, 128, 255, 0.2), 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  border-color: rgba(64, 128, 255, 0.3);
}

/* 输入框：占满剩余宽度 */
.question-input {
  flex: 1;
  height: 88rpx;
  padding: 0 32rpx;
  font-size: 28rpx;
  color: #333333;
  background: transparent;
}

/* 占位符颜色 */
.input-placeholder {
  color: #CCCCCC;
}

/* 提交按钮：蓝色渐变 */
.submit-btn {
  width: 140rpx;
  height: 88rpx;
  background: linear-gradient(135deg, #4080FF, #6A9DFF);
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 600;
  border: none;
  border-radius: 0;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s ease;
  box-shadow: 0 4rpx 12rpx rgba(64, 128, 255, 0.25);
}

/* 按钮按下效果 */
.btn-hover {
  transform: scale(0.97);
  box-shadow: 0 2rpx 8rpx rgba(64, 128, 255, 0.2);
}
</style>
