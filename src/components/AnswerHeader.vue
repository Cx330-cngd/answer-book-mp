<!-- File: src/components/AnswerHeader.vue -->
<!-- 顶部导航栏组件 - 显示标题和设置按钮 -->
<!-- 功能：标题展示、设置菜单（使用引导、清空答案、关于、分享） -->
<template>
  <!-- 导航栏容器：左侧标题，右侧设置图标 -->
  <view class="header">
    <!-- 应用标题 -->
    <text class="title">答案之书</text>
    <!-- 设置按钮：点击弹出操作菜单 -->
    <view class="icon" @click="handleSettingsClick" hover-class="icon-hover">
      <text class="icon-text">⚙️</text>
    </view>
  </view>
</template>

<script setup>
// 导入本地存储工具函数，用于清空最近答案
import { clearRecentAnswers } from '@/utils/storage.js';

// 处理设置按钮点击：弹出操作菜单
const handleSettingsClick = () => {
  uni.showActionSheet({
    // 菜单项：使用引导、清空最近答案、关于、分享
    itemList: ['使用引导', '清空最近答案', '关于', '分享'],
    success: (res) => {
      // 根据用户选择的索引执行对应操作
      if (res.tapIndex === 0) {
        handleGuide();        // 跳转到使用引导页
      } else if (res.tapIndex === 1) {
        handleClearAnswers(); // 清空最近答案
      } else if (res.tapIndex === 2) {
        handleAbout();        // 显示关于信息
      } else if (res.tapIndex === 3) {
        handleShare();        // 分享应用
      }
    }
  });
};

// 处理跳转到使用引导页
const handleGuide = () => {
  uni.navigateTo({
    url: '/pages/guide/guide'
  });
};

// 处理清空最近答案：确认后清空存储并刷新页面
const handleClearAnswers = () => {
  uni.showModal({
    title: '确认清空',
    content: '确定要清空所有最近答案吗？',
    success: (res) => {
      if (res.confirm) {
        // 调用存储工具函数清空数据
        clearRecentAnswers();
        uni.showToast({
          title: '已清空',
          icon: 'success'
        });
        // 延迟 1 秒后重新加载首页
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/index/index'
          });
        }, 1000);
      }
    }
  });
};

// 处理显示关于信息：展示版本号、开发者信息
const handleAbout = () => {
  uni.showModal({
    title: '关于',
    content: '答案之书 v1.0.0\n用心回答每一个问题\n\n开发者：Cx330\nGitHub: https://github.com/Cx330-cngd',
    showCancel: false,
    confirmText: '知道了'
  });
};

// 处理分享：复制 GitHub 链接到剪贴板
const handleShare = () => {
  uni.setClipboardData({
    data: 'https://github.com/Cx330-cngd',
    success: () => {
      uni.showToast({
        title: '链接已复制，分享给朋友吧',
        icon: 'none'
      });
    }
  });
};
</script>

<style scoped>
/* 导航栏容器：flex 布局，两端对齐 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40rpx 32rpx 32rpx;
  background-color: #F5F7FA;
}

/* 标题文字样式 */
.title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
}

/* 设置图标容器：圆形背景 */
.icon {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E8F0FF;
  border-radius: 40rpx;
}

/* 图标按下效果 */
.icon-hover {
  transform: scale(0.95);
}

/* 图标文字大小 */
.icon-text {
  font-size: 28rpx;
}
</style>
