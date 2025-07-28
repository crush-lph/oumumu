# Oumomo

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) with internationalization support.

## 📁 项目结构

```
oumomo/
├── .husky/                    # Git hooks 配置
│   ├── _/                     # Husky 内部文件
│   └── pre-commit             # 提交前钩子
├── .gitignore                 # Git 忽略文件
├── .nvmrc                     # Node.js 版本配置
├── .prettierignore            # Prettier 忽略文件
├── .prettierrc                # Prettier 配置
├── CODE_STYLE.md              # 代码规范文档
├── README.md                  # 项目说明文档
├── actions/                   # Server Actions
├── app/                       # Next.js App Router
│   ├── [locale]/              # 国际化路由
│   │   ├── (normal)/          # 普通布局组
│   │   │   ├── dashboard/     # 仪表板页面
│   │   │   └── layout.tsx     # 普通布局
│   │   ├── (pure)/            # 纯净布局组
│   │   │   ├── layout.tsx     # 纯净布局
│   │   │   └── page.tsx       # 纯净页面
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 语言布局
│   │   └── loading.tsx        # 加载组件
│   ├── favicon.ico            # 网站图标
│   ├── layout.tsx             # 根布局
│   └── not-found.tsx          # 404 页面
├── components/                # 可复用组件
├── eslint.config.mjs          # ESLint 配置
├── hooks/                     # 自定义 Hooks
├── i18n/                      # 国际化配置
│   ├── navigation.ts          # 导航配置
│   ├── request.ts             # 请求配置
│   └── routing.ts             # 路由配置
├── locales/                   # 语言文件
│   ├── en/                    # 英文
│   │   └── origin.json        # 英文翻译
│   └── zh/                    # 中文
│       └── origin.json        # 中文翻译
├── middleware.ts              # Next.js 中间件
├── next.config.ts             # Next.js 配置
├── package.json               # 项目依赖
├── pnpm-lock.yaml             # 依赖锁定文件
├── postcss.config.mjs         # PostCSS 配置
├── public/                    # 静态资源
├── services/                  # API 服务
├── shared/                    # 共享工具
│   ├── index.ts               # 导出文件
│   └── language/              # 语言工具
│       └── index.ts           # 语言处理
├── tsconfig.json              # TypeScript 配置
└── utils/                     # 工具函数
```

## ✨ 特性

- 🌍 **国际化支持** - 基于 next-intl 的多语言支持
- 🎨 **代码规范** - 集成 Prettier + ESLint + Husky
- 🚀 **现代技术栈** - Next.js 15 + React 19 + TypeScript
- 📱 **响应式设计** - 基于 Tailwind CSS
- 🔧 **开发工具** - 完善的开发和构建工具链

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 可用脚本

```bash
# 开发模式（使用 Turbopack）
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 代码检查并修复
pnpm lint:fix

# 代码格式化
pnpm format

# 检查代码格式
pnpm format:check
```

## 🌍 国际化

项目支持多语言，当前支持：

- 🇺🇸 English (en)
- 🇨🇳 中文 (zh)

### 添加新语言

1. 在 `locales/` 目录下创建新的语言文件夹
2. 复制 `origin.json` 并翻译内容
3. 在 `i18n/routing.ts` 中添加新的语言配置

### 使用翻译

```tsx
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('namespace');
  return <h1>{t('title')}</h1>;
}
```

## 📋 开发规范

项目已配置完善的代码质量保障：

- **Prettier**: 自动代码格式化
- **ESLint**: 代码质量检查
- **Husky**: Git 提交前自动检查
- **lint-staged**: 只检查暂存文件

详细说明请查看 [CODE_STYLE.md](./CODE_STYLE.md)

### 提交规范

```bash
# 提交时会自动运行代码检查和格式化
git add .
git commit -m "feat: 添加新功能"
```

## 📚 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: next-intl
- **包管理**: pnpm
- **代码规范**: Prettier + ESLint + Husky

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
