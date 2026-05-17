// File: src/utils/storage.js
// 本地存储工具模块 - 封装最近答案的增删查操作
// 使用 uni-app 的 uni.getStorageSync / uni.setStorageSync / uni.removeStorageSync API

// 存储键名
const RECENT_ANSWERS_KEY = 'recent_answers';
// 最大保存条数
const MAX_RECENT_ANSWERS = 10;

// 获取最近答案列表
// 返回值：数组，包含 {id, question, answer, timestamp} 对象
export const getRecentAnswers = () => {
  try {
    const data = uni.getStorageSync(RECENT_ANSWERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('获取最近答案失败:', error);
    return [];
  }
};

// 保存最近答案
// 参数：question（问题文本）、answer（答案文本）
// 逻辑：将新答案插入到列表头部，超出最大条数时截断
export const saveRecentAnswer = (question, answer) => {
  try {
    const recentAnswers = getRecentAnswers();
    const newItem = {
      id: Date.now(),
      question,
      answer,
      timestamp: Date.now()
    };
    // 新答案插入到头部
    recentAnswers.unshift(newItem);
    // 只保留前 MAX_RECENT_ANSWERS 条
    const trimmed = recentAnswers.slice(0, MAX_RECENT_ANSWERS);
    uni.setStorageSync(RECENT_ANSWERS_KEY, JSON.stringify(trimmed));
    return true;
  } catch (error) {
    console.error('保存最近答案失败:', error);
    return false;
  }
};

// 清空最近答案
// 逻辑：删除本地存储中的对应键值
export const clearRecentAnswers = () => {
  try {
    uni.removeStorageSync(RECENT_ANSWERS_KEY);
    return true;
  } catch (error) {
    console.error('清空最近答案失败:', error);
    return false;
  }
};
