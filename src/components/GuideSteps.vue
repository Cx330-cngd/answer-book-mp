<!-- File: src/components/GuideSteps.vue -->
<!-- 使用引导组件 - 水平排列展示使用步骤 -->
<!-- 功能：展示图标+标题+描述的步骤卡片，带分隔线 -->
<template>
  <!-- 引导步骤容器 -->
  <view class="guide-steps-container">
    <!-- 模块标题 -->
    <view class="guide-steps-title">使用指南</view>
    <!-- 步骤列表：水平排列 -->
    <view class="guide-steps-list">
      <!-- 遍历 steps 数据，渲染每个步骤 -->
      <view v-for="(step, index) in steps" :key="step.id" class="guide-step-item">
        <!-- 步骤图标：渐变圆形背景 -->
        <view class="step-icon-wrapper">
          <text class="step-icon">{{ step.icon }}</text>
        </view>
        <!-- 步骤内容：标题+描述 -->
        <view class="step-content">
          <text class="step-title">{{ step.title }}</text>
          <text class="step-desc">{{ step.description }}</text>
        </view>
        <!-- 步骤分隔线：最后一个步骤不显示 -->
        <view v-if="index < steps.length - 1" class="step-divider"></view>
      </view>
    </view>
  </view>
</template>

<script setup>
// 定义组件属性：接收 steps 数组（包含 id、icon、title、description）
defineProps({
  steps: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
/* 引导步骤容器：左右留白 */
.guide-steps-container {
  padding: 0 32rpx;
  margin-bottom: 32rpx;
}

/* 模块标题 */
.guide-steps-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 24rpx;
  letter-spacing: 0.5rpx;
}

/* 步骤列表：flex 水平排列，白色卡片背景 */
.guide-steps-list {
  display: flex;
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx 16rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.04);
}

/* 单个步骤项：等分宽度，垂直居中排列 */
.guide-step-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 0 8rpx;
}

/* 图标容器：渐变圆形背景 */
.step-icon-wrapper {
  width: 96rpx;
  height: 96rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #E8F2FF, #F0F6FF);
  border-radius: 48rpx;
  margin-bottom: 16rpx;
}

/* 图标大小 */
.step-icon {
  font-size: 40rpx;
}

/* 步骤内容区域 */
.step-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 步骤标题 */
.step-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8rpx;
}

/* 步骤描述 */
.step-desc {
  font-size: 22rpx;
  color: #999999;
  text-align: center;
  line-height: 1.4;
}

/* 步骤分隔线：虚线样式，位于步骤之间 */
.step-divider {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1rpx;
  height: 40rpx;
  background: repeating-linear-gradient(
    to bottom,
    #EEEEEE 0,
    #EEEEEE 4rpx,
    transparent 4rpx,
    transparent 8rpx
  );
}
</style>
