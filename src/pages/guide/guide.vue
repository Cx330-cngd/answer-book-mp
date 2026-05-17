<!-- File: src/pages/guide/guide.vue -->
<!-- 使用引导页 - 展示使用步骤和提示 -->
<!-- 功能：三步引导说明、小贴士、返回首页按钮 -->
<template>
  <!-- 引导页容器 -->
  <view class="guide-container">
    <!-- 页面头部：标题+副标题 -->
    <view class="guide-header">
      <text class="guide-title">使用引导</text>
      <text class="guide-subtitle">三步找到你的答案</text>
    </view>

    <!-- 步骤卡片列表：垂直排列 -->
    <view class="steps-container">
      <!-- 遍历 steps 数据，渲染每个步骤卡片 -->
      <view class="step-card" v-for="(step, index) in steps" :key="index">
        <!-- 步骤序号：蓝色圆形 -->
        <view class="step-number">{{ index + 1 }}</view>
        <!-- 步骤内容：图标+标题+描述 -->
        <view class="step-content">
          <text class="step-icon">{{ step.icon }}</text>
          <text class="step-title">{{ step.title }}</text>
          <text class="step-desc">{{ step.desc }}</text>
        </view>
      </view>
    </view>

    <!-- 小贴士卡片：渐变蓝色背景 -->
    <view class="tips-card">
      <text class="tips-title">小贴士</text>
      <text class="tips-text">问题没有对错之分，相信你的直觉。答案之书只是指引，最终的选择权在你手中。</text>
    </view>

    <!-- 开始提问按钮：返回首页 -->
    <button class="start-btn" @click="goToHome" hover-class="btn-hover">开始提问</button>
  </view>
</template>

<script setup>
// 引导步骤数据：本地定义（非 mock 数据，因为这是引导页专属内容）
const steps = [
  {
    icon: '💭',
    title: '心中默念问题',
    desc: '闭上眼睛，在心中默念你此刻最想知道的答案'
  },
  {
    icon: '📝',
    title: '输入或随机选择',
    desc: '在输入框中输入你的问题，或点击「随机问题」让命运为你选择'
  },
  {
    icon: '📖',
    title: '获得答案指引',
    desc: '翻开答案之书，获得来自书的专属指引，用心感受每一个字'
  }
];

// 返回首页：返回上一页
const goToHome = () => {
  uni.navigateBack();
};
</script>

<style scoped>
/* 引导页容器：全屏背景，底部留白 */
.guide-container {
  min-height: 100vh;
  background-color: #F5F7FA;
  padding: 48rpx 32rpx 120rpx;
}

/* 页面头部：居中对齐 */
.guide-header {
  text-align: center;
  margin-bottom: 48rpx;
}

/* 主标题 */
.guide-title {
  display: block;
  font-size: 48rpx;
  font-weight: 700;
  color: #333333;
  margin-bottom: 16rpx;
}

/* 副标题 */
.guide-subtitle {
  display: block;
  font-size: 28rpx;
  color: #999999;
}

/* 步骤列表：垂直排列，间距 24rpx */
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 32rpx;
}

/* 步骤卡片：白色背景，圆角阴影 */
.step-card {
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

/* 步骤序号：蓝色圆形背景 */
.step-number {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4080FF;
  color: #FFFFFF;
  font-size: 24rpx;
  font-weight: 700;
  border-radius: 50%;
  margin-right: 24rpx;
  flex-shrink: 0;
}

/* 步骤内容区域 */
.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 步骤图标 */
.step-icon {
  font-size: 40rpx;
  margin-bottom: 12rpx;
}

/* 步骤标题 */
.step-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8rpx;
}

/* 步骤描述 */
.step-desc {
  font-size: 26rpx;
  color: #666666;
  line-height: 1.6;
}

/* 小贴士卡片：渐变蓝色背景 */
.tips-card {
  background: linear-gradient(135deg, #E8F0FF, #F0F6FF);
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 48rpx;
}

/* 小贴士标题 */
.tips-title {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #4080FF;
  margin-bottom: 16rpx;
}

/* 小贴士内容 */
.tips-text {
  display: block;
  font-size: 26rpx;
  color: #666666;
  line-height: 1.6;
}

/* 开始提问按钮：蓝色渐变 */
.start-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #4080FF, #6A9DFF);
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 40rpx;
  border: none;
  box-shadow: 0 4rpx 12rpx rgba(64, 128, 255, 0.25);
}

/* 按钮按下效果 */
.btn-hover {
  transform: scale(0.97);
  box-shadow: 0 2rpx 8rpx rgba(64, 128, 255, 0.2);
}
</style>
