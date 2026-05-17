<!-- File: src/components/RecentAnswerCard.vue -->
<!-- 最近答案卡片组件 - 展示单条历史记录 -->
<!-- 功能：显示问题、答案摘要、时间戳，点击可跳转查看详情 -->
<template>
  <!-- 卡片容器：点击触发跳转 -->
  <view class="recent-answer-card" @click="handleClick" hover-class="card-hover">
    <!-- 左侧蓝色指示条 -->
    <view class="card-indicator"></view>
    <!-- 问题文本 -->
    <view class="card-header">
      <text class="question">{{ item.question }}</text>
    </view>
    <!-- 答案摘要：超过 40 字截断显示 -->
    <view class="card-body">
      <text class="answer">{{ item.answer.substring(0, 40) }}{{ item.answer.length > 40 ? '...' : '' }}</text>
    </view>
    <!-- 底部时间戳 -->
    <view class="card-footer">
      <text class="time">{{ formatTime(item.timestamp) }}</text>
    </view>
  </view>
</template>

<script setup>
// 定义组件属性：接收 item 对象（包含 question、answer、timestamp）
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

// 定义组件事件：click 事件，向父组件传递 item 数据
const emit = defineEmits(['click']);

// 处理卡片点击：触发 click 事件
const handleClick = () => {
  emit('click', props.item);
};

// 格式化时间戳：返回 MM-DD HH:mm 格式
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}-${day} ${hours}:${minutes}`;
};
</script>

<style scoped>
/* 卡片容器：白色背景、圆角、阴影 */
.recent-answer-card {
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}

/* 卡片悬停效果：上浮+加深阴影 */
.card-hover {
  transform: translateY(-4rpx);
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.08);
}

/* 左侧蓝色指示条 */
.card-indicator {
  position: absolute;
  left: 16rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 8rpx;
  height: 48rpx;
  background: linear-gradient(180deg, #4080FF, #6A9DFF);
  border-radius: 4rpx;
}

/* 问题区域 */
.card-header {
  margin-bottom: 16rpx;
  padding-left: 16rpx;
}

/* 问题文本 */
.question {
  font-size: 28rpx;
  color: #333333;
  font-weight: 600;
  line-height: 1.5;
}

/* 答案区域 */
.card-body {
  margin-bottom: 16rpx;
  padding-left: 16rpx;
}

/* 答案文本 */
.answer {
  font-size: 26rpx;
  color: #666666;
  line-height: 1.5;
}

/* 底部区域：右对齐时间 */
.card-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 16rpx;
  border-top: 1rpx solid #EEEEEE;
}

/* 时间文本 */
.time {
  font-size: 22rpx;
  color: #AAAAAA;
}
</style>
