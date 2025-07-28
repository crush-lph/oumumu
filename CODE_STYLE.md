# 代码规范和格式化

本项目已配置 Prettier 和 Husky 来确保代码质量和一致性。

## 工具配置

### Prettier

- **配置文件**: `.prettierrc`
- **忽略文件**: `.prettierignore`
- **作用**: 自动格式化代码，确保代码风格一致

### ESLint

- **配置文件**: `eslint.config.mjs`
- **作用**: 代码质量检查和错误检测
- **集成**: 已与 Prettier 集成，避免冲突

### Husky

- **配置目录**: `.husky/`
- **作用**: Git hooks 管理
- **预提交钩子**: 在提交前自动运行代码检查和格式化

### lint-staged

- **配置**: 在 `package.json` 中
- **作用**: 只对暂存的文件运行检查和格式化

## 可用命令

```bash
# 格式化所有文件
pnpm format

# 检查格式化状态（不修改文件）
pnpm format:check

# 运行 ESLint 检查
pnpm lint

# 运行 ESLint 并自动修复
pnpm lint:fix

# 对暂存文件运行检查和格式化
pnpm lint-staged
```

## 工作流程

### 开发时

1. 编写代码
2. 运行 `pnpm format` 格式化代码
3. 运行 `pnpm lint` 检查代码质量
4. 修复任何 ESLint 错误

### 提交时

1. `git add .` 添加文件到暂存区
2. `git commit -m "提交信息"`
3. **自动触发**: Husky 会自动运行 lint-staged
4. **自动处理**: 对暂存的文件进行格式化和检查
5. 如果有错误，提交会被阻止

## 配置详情

### Prettier 配置

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "jsxSingleQuote": true,
  "bracketSameLine": false
}
```

### lint-staged 配置

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css,scss,yaml,yml}": ["prettier --write"]
}
```

## 注意事项

1. **首次设置**: 运行 `pnpm prepare` 来初始化 Husky
2. **IDE 集成**: 建议在 VS Code 中安装 Prettier 和 ESLint 插件
3. **自动保存**: 可以配置编辑器在保存时自动格式化
4. **团队协作**: 所有团队成员都应该使用相同的配置

## 故障排除

### 如果 pre-commit hook 失败

```bash
# 手动运行检查
pnpm lint-staged

# 修复 ESLint 错误
pnpm lint:fix

# 重新格式化
pnpm format
```

### 如果需要跳过 hooks（不推荐）

```bash
git commit -m "提交信息" --no-verify
```

### 重新安装 Husky

```bash
pnpm prepare
```
