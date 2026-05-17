<!-- File: src/pages/answer/answer.vue -->
<!-- 答案页组件 - 展示用户问题及随机生成的答案 -->
<!-- 功能：显示问题、随机答案、再翻一次、返回首页、分享答案 -->
<template>
  <!-- 答案卡片容器，showCard 控制入场翻转动画 -->
  <view class="answer-container">
    <view class="answer-card" :class="{ 'flip-enter': showCard }">
      <!-- 问题展示区域 -->
      <view class="question-section">
        <text class="question-label">你的问题</text>
        <text class="question-text">{{ question }}</text>
      </view>
      
      <!-- 分隔线 -->
      <view class="divider"></view>
      
      <!-- 答案展示区域，showAnswer 控制淡入动画 -->
      <view class="answer-section">
        <text class="answer-label">答案之书说</text>
        <text class="answer-text" :class="{ 'answer-enter': showAnswer }">{{ answer }}</text>
      </view>
    </view>
    
    <!-- 操作按钮组 -->
    <view class="actions">
      <!-- 再翻一次：重新随机抽取答案 -->
      <button class="action-btn primary" @click="handleRandomAnswer" hover-class="btn-hover">
        再翻一次
      </button>
      <!-- 返回首页：返回上一页 -->
      <button class="action-btn secondary" @click="handleBackHome" hover-class="btn-hover">
        返回首页
      </button>
      <!-- 分享答案：弹出模态框供用户复制答案内容 -->
      <button class="action-btn share" @click="handleShare" hover-class="btn-hover">
        分享答案
      </button>
    </view>
  </view>
</template>

<script setup>
// 导入 Vue3 组合式 API
import { ref, onMounted } from 'vue';
// 导入答案库 Mock 数据
import { answerBook } from '@/mock/index.js';
// 导入本地存储工具函数，用于保存答案到历史记录
import { saveRecentAnswer } from '@/utils/storage.js';

// 当前问题文本
const question = ref('');
// 当前答案文本
const answer = ref('');
// 固定答案标记（点击最近答案时传入，不再随机抽取）
const fixedAnswer = ref('');
// 卡片显示状态，控制翻转动画
const showCard = ref(false);
// 答案显示状态，控制淡入动画
const showAnswer = ref(false);

// 页面挂载时执行：解析路由参数、生成答案、触发动画、保存历史记录
onMounted(() => {
  // 获取当前页面实例及路由参数
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.options;
  
  // 解码问题参数
  question.value = decodeURIComponent(options.question || '');
  // 解码固定答案参数（如果有）
  fixedAnswer.value = options.fixedAnswer ? decodeURIComponent(options.fixedAnswer) : '';
  
  // 如果有固定答案则直接使用，否则从答案库随机抽取
  if (fixedAnswer.value) {
    answer.value = fixedAnswer.value;
  } else {
    const randomIndex = Math.floor(Math.random() * answerBook.length);
    answer.value = answerBook[randomIndex];
  }
  
  // 将问题和答案保存到本地存储（最近答案列表）
  saveRecentAnswer(question.value, answer.value);
  
  // 延迟 100ms 触发卡片翻转动画
  setTimeout(() => {
    showCard.value = true;
  }, 100);
  
  // 延迟 600ms 触发答案淡入动画
  setTimeout(() => {
    showAnswer.value = true;
  }, 600);
});

// 处理再翻一次：重新随机抽取答案并保存
const handleRandomAnswer = () => {
  // 先隐藏答案
  showAnswer.value = false;
  // 延迟 300ms 后重新抽取答案并显示
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * answerBook.length);
    answer.value = answerBook[randomIndex];
    // 保存新的答案到历史记录
    saveRecentAnswer(question.value, answer.value);
    showAnswer.value = true;
  }, 300);
};

// 处理返回首页：返回上一页
const handleBackHome = () => {
  uni.navigateBack();
};

// 处理分享答案：弹出模态框，用户确认后复制答案到剪贴板
const handleShare = () => {
  uni.showModal({
    title: '分享答案',
    content: `我的问题：${question.value}\n\n答案之书说：${answer.value}`,
    confirmText: '复制',
    success: (res) => {
      if (res.confirm) {
        // 复制答案到剪贴板
        uni.setClipboardData({
          data: `我的问题：${question.value}\n\n答案之书说：${answer.value}`,
          success: () => {
            uni.showToast({
              title: '已复制到剪贴板',
              icon: 'success'
            });
          }
        });
      }
    }
  });
};
</script>

<style scoped>
/* 答案页容器：全屏渐变背景，居中布局 */
.answer-container {
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #FAFBFC 0%, #F5F7FA 100%);
  padding: 64rpx 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 答案卡片：初始隐藏，翻转动画入场 */
.answer-card {
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 48rpx 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
  margin-bottom: 48rpx;
  opacity: 0;
  transform: perspective(800rpx) rotateY(90deg);
  transition: all 0.6s ease;
}

/* 翻转动画结束状态 */
.answer-card.flip-enter {
  opacity: 1;
  transform: perspective(800rpx) rotateY(0deg);
}

/* 问题区域 */
.question-section {
  margin-bottom: 32rpx;
}

/* 问题标签 */
.question-label {
  display: block;
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 16rpx;
}

/* 问题文本 */
.question-text {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  line-height: 1.6;
}

/* 分隔线：渐变效果 */
.divider {
  height: 2rpx;
  background: linear-gradient(to right, transparent, #E8F0FF, transparent);
  margin: 32rpx 0;
}

/* 答案区域 */
.answer-section {
  text-align: center;
}

/* 答案标签 */
.answer-label {
  display: block;
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 24rpx;
}

/* 答案文本：初始隐藏，淡入动画 */
.answer-text {
  display: block;
  font-size: 40rpx;
  font-weight: 700;
  color: #4080FF;
  line-height: 1.6;
  letter-spacing: 2rpx;
  opacity: 0;
  transform: translateY(20rpx);
  transition: all 0.5s ease;
}

/* 答案淡入动画结束状态 */
.answer-text.answer-enter {
  opacity: 1;
  transform: translateY(0);
}

/* 按钮组：垂直排列 */
.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

/* 按钮通用样式 */
.action-btn {
  width: 100%;
  height: 88rpx;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 40rpx;
  border: none;
}

/* 主按钮：蓝色渐变 */
.action-btn.primary {
  background: linear-gradient(135deg, #4080FF, #6A9DFF);
  color: #FFFFFF;
  box-shadow: 0 4rpx 12rpx rgba(64, 128, 255, 0.25);
}

/* 次要按钮：白色背景蓝色边框 */
.action-btn.secondary {
  background-color: #FFFFFF;
  color: #4080FF;
  border: 2rpx solid #4080FF;
}

/* 分享按钮：灰色背景 */
.action-btn.share {
  background-color: #F5F7FA;
  color: #666666;
  border: 2rpx solid #E8E8E8;
}

/* 按钮按下效果 */
.btn-hover {
  transform: scale(0.97);
}
</style>
