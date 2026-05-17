# 答案之书

一个基于 uni-app + Vue3 的移动端《答案之书》应用，帮助用户通过随机答案获得心灵指引。

## 运行方式

1. 安装依赖
打开终端，进入项目根目录：
cd e:\answer-book-mp
安装项目依赖：
npm install
2. 启动开发服务器
npm run dev:h5
3. 访问应用
在浏览器中打开：http://localhost:5173/

## 目录结构

```
e:\answer-book-mp\
├── package.json              # 项目配置
├── package-lock.json         # 依赖锁定文件
├── vite.config.js            # Vite 构建配置
├── pages.json                # 页面路由配置（根目录，备用）
── manifest.json             # 应用配置（根目录，备用）
└── src\
    ├── pages.json            # 页面路由配置（uni-app 实际读取）
    ├── manifest.json         # 应用配置（uni-app 实际读取）
    ├── App.vue               # 根组件
    ├── main.js               # 入口文件
    ├── pages\                # 页面目录
    │   ├── index\index.vue   # 首页
    │   ├── answer\answer.vue # 答案页
    │   └── guide\guide.vue   # 使用引导页
    ├── components\           # 组件目录
    │   ├── AnswerHeader.vue       # 首页顶部导航栏
    │   ├── AnswerBanner.vue       # 首页 Banner 轮播图
    │   ├── GuideSteps.vue         # 首页使用引导步骤
    │   ├── QuestionInput.vue      # 首页问题输入框
    │   └── RecentAnswerCard.vue   # 最近答案卡片
    ├── mock\
    │   └── index.js          # Mock 数据（20条问题 + 20条答案）
    └── utils\
        └── storage.js        # 本地存储工具
```

## 组件拆分结构

| 组件名 | 路径 | 职责 |
|--------|------|------|
| AnswerHeader.vue | `src/components/` | 首页顶部导航栏（标题 + 右侧设置菜单） |
| AnswerBanner.vue | `src/components/` | 首页 Banner 轮播图区域 |
| GuideSteps.vue | `src/components/` | 首页"使用引导"步骤区域 |
| QuestionInput.vue | `src/components/` | 首页问题输入框与提交按钮区域 |
| RecentAnswerCard.vue | `src/components/` | 首页"最近答案"列表中的单个卡片 |

## 功能说明

### 首页
- **Banner 轮播图**：3 张自动轮播图片，支持手动滑动
- **使用引导**：3 步图文引导，水平排列
- **问题输入**：输入框 + 提问按钮，支持回车提交
- **随机问题**：点击卡片从 20 条预设问题中随机选择并填入输入框
- **翻开答案之书**：携带默认问题跳转答案页
- **最近答案**：展示最近 3 条历史记录，点击可查看详情

### 答案页
- **翻书动画**：3D 旋转淡入效果
- **随机答案**：从 20 条答案库中随机抽取
- **再翻一次**：重新随机抽取答案
- **分享答案**：复制问题+答案到剪贴板

### 设置菜单（右上角 ⚙️）
- **使用引导**：跳转引导页
- **清空最近答案**：确认后清空本地存储并刷新
- **关于**：显示版本信息和开发者信息
- **分享**：复制 GitHub 链接到剪贴板

## 技术栈

- **框架**：uni-app + Vue3 (Composition API)
- **构建工具**：Vite 5.2.8
- **样式**：rpx 响应式单位，flex 布局
- **存储**：uni-app 本地存储 API

## UI 规范

- 设计基准：750rpx
- 主色：#4080FF
- 页面背景：#F5F7FA
- 卡片圆角：16rpx
- 按钮圆角：40rpx
