<!-- File: src/components/AnswerBanner.vue -->
<!-- Banner 轮播图组件 - 展示宣传图片轮播 -->
<!-- 功能：自动轮播、指示器、图片+标题展示 -->
<template>
  <!-- 轮播图容器 -->
  <view class="banner-container">
    <!-- swiper 组件：自动播放、循环播放、带指示器 -->
    <swiper 
      class="banner-swiper" 
      :indicator-dots="true" 
      indicator-active-color="#4080FF"
      indicator-color="rgba(64, 128, 255, 0.3)"
      :autoplay="true" 
      :interval="3000" 
      :duration="300"
      :circular="true"
    >
      <!-- 遍历传入的 list 数据，渲染每个轮播项 -->
      <swiper-item v-for="item in list" :key="item.id" class="banner-item">
        <view class="banner-card">
          <!-- 轮播图片，mode="aspectFill" 保持比例填充 -->
          <image :src="item.imageUrl" class="banner-image" mode="aspectFill"></image>
          <!-- 图片上的文字内容 -->
          <view class="banner-content">
            <text class="banner-title">{{ item.title }}</text>
            <text class="banner-subtitle">{{ item.subtitle }}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
// 定义组件属性：接收 list 数组（包含 imageUrl、title、subtitle）
defineProps({
  list: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
/* 轮播图外层容器：左右留白 */
.banner-container {
  padding: 0 32rpx;
  margin-bottom: 32rpx;
}

/* swiper 组件样式：固定高度、圆角、阴影 */
.banner-swiper {
  height: 320rpx;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);
}

/* 单个轮播项 */
.banner-item {
  width: 100%;
  height: 320rpx;
}

/* 轮播卡片：相对定位，用于绝对定位文字内容 */
.banner-card {
  width: 100%;
  height: 320rpx;
  position: relative;
  border-radius: 16rpx;
}

/* 轮播图片：全尺寸填充 */
.banner-image {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
}

/* 文字内容区域：绝对定位在底部，渐变遮罩 */
.banner-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  padding: 80rpx 32rpx 32rpx;
  color: white;
  border-radius: 0 0 24rpx 24rpx;
}

/* 标题样式 */
.banner-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 8rpx;
  letter-spacing: 0.5rpx;
}

/* 副标题样式 */
.banner-subtitle {
  display: block;
  font-size: 24rpx;
  opacity: 0.9;
  line-height: 1.5;
}
</style>
