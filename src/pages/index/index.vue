<!-- File: src/pages/index/index.vue -->
<template>
  <view class="container" :class="{ 'page-enter': pageLoaded }">
    <AnswerHeader />
    <AnswerBanner :list="bannerList" />
    <GuideSteps :steps="guideSteps" />
    <QuestionInput ref="questionInputRef" @submit="handleQuestionSubmit" />

    <view class="action-cards-container">
      <view class="action-card" @click="handleRandomQuestion" hover-class="card-hover">
        <view class="card-icon-wrapper">
          <text class="card-icon">🎲</text>
        </view>
        <view class="card-content">
          <text class="card-title">随机问题</text>
          <text class="card-desc">让命运为你选择</text>
        </view>
        <text class="card-arrow">→</text>
      </view>

      <view class="action-card" @click="handleOpenBook" hover-class="card-hover">
        <view class="card-icon-wrapper book-icon">
          <text class="card-icon">📖</text>
        </view>
        <view class="card-content">
          <text class="card-title">翻开答案之书</text>
          <text class="card-desc">寻找此刻的指引</text>
        </view>
        <text class="card-arrow">→</text>
      </view>
    </view>

    <view class="recent-answers-section" v-if="recentAnswers && recentAnswers.length > 0">
      <view class="section-title">最近答案</view>
      <view class="recent-answers-list">
        <RecentAnswerCard
          v-for="item in recentAnswers.slice(0, 3)"
          :key="item.id"
          :item="item"
          @click="handleRecentAnswerClick"
        />
      </view>
    </view>

    <view class="empty-state" v-else>
      <text class="empty-icon">✨</text>
      <text class="empty-text">还没有答案，去翻开书吧</text>
    </view>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue';
import AnswerHeader from '@/components/AnswerHeader.vue';
import AnswerBanner from '@/components/AnswerBanner.vue';
import GuideSteps from '@/components/GuideSteps.vue';
import QuestionInput from '@/components/QuestionInput.vue';
import RecentAnswerCard from '@/components/RecentAnswerCard.vue';
import { bannerList, guideSteps, randomQuestions, defaultOpenBookQuestion } from '@/mock/index.js';
import { getRecentAnswers } from '@/utils/storage.js';

export default {
  components: {
    AnswerHeader,
    AnswerBanner,
    GuideSteps,
    QuestionInput,
    RecentAnswerCard
  },
  setup() {
    const pageLoaded = ref(false);
    const question = ref('');
    const recentAnswers = ref([]);

    const loadRecentAnswers = () => {
      recentAnswers.value = getRecentAnswers();
    };

    const handleQuestionSubmit = (q) => {
      uni.navigateTo({
        url: `/pages/answer/answer?question=${encodeURIComponent(q)}`
      });
    };

    const questionInputRef = ref(null);

    const handleRandomQuestion = () => {
      const randomIndex = Math.floor(Math.random() * randomQuestions.length);
      const randomQuestion = randomQuestions[randomIndex];
      if (questionInputRef.value) {
        questionInputRef.value.setQuestion(randomQuestion);
      }
    };

    const handleOpenBook = () => {
      uni.navigateTo({
        url: `/pages/answer/answer?question=${encodeURIComponent(defaultOpenBookQuestion)}`
      });
    };

    const handleRecentAnswerClick = (item) => {
      uni.navigateTo({
        url: `/pages/answer/answer?question=${encodeURIComponent(item.question)}&fixedAnswer=${encodeURIComponent(item.answer)}`
      });
    };

    onMounted(() => {
      loadRecentAnswers();
      setTimeout(() => {
        pageLoaded.value = true;
      }, 50);
    });

    return {
      pageLoaded,
      question,
      recentAnswers,
      bannerList,
      guideSteps,
      questionInputRef,
      loadRecentAnswers,
      handleQuestionSubmit,
      handleRandomQuestion,
      handleOpenBook,
      handleRecentAnswerClick
    };
  },
  onShow() {
    this.loadRecentAnswers();
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #FAFBFC 0%, #F5F7FA 100%);
  padding-bottom: 64rpx;
  opacity: 0;
  transform: translateY(20rpx);
  transition: all 0.3s ease;
}

.container.page-enter {
  opacity: 1;
  transform: translateY(0);
}

.action-cards-container {
  padding: 0 32rpx;
  margin-bottom: 32rpx;
  display: flex;
  gap: 24rpx;
}

.action-card {
  flex: 1;
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  position: relative;
}

.card-hover {
  transform: translateY(-4rpx);
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.08);
}

.card-icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #E8F2FF, #F0F6FF);
  border-radius: 40rpx;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.book-icon {
  background: linear-gradient(135deg, #FFF3E0, #FFF8F0);
}

.card-icon {
  font-size: 36rpx;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 6rpx;
}

.card-desc {
  font-size: 22rpx;
  color: #999999;
  line-height: 1.4;
}

.card-arrow {
  font-size: 28rpx;
  color: #CCCCCC;
  margin-left: 16rpx;
  transition: all 0.2s ease;
}

.card-hover .card-arrow {
  color: #4080FF;
  transform: translateX(4rpx);
}

.recent-answers-section {
  padding: 0 32rpx;
  margin-top: 8rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 24rpx;
  letter-spacing: 0.5rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 32rpx;
  text-align: center;
}

.empty-icon {
  font-size: 96rpx;
  margin-bottom: 32rpx;
  opacity: 0.6;
}

.empty-text {
  font-size: 28rpx;
  color: #999999;
  line-height: 1.6;
}
</style>