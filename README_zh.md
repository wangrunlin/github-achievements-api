# GitHub Achievements API

[![License](https://img.shields.io/github/license/wangrunlin/github-achievements-api)](https://github.com/wangrunlin/github-achievements-api/blob/main/LICENSE)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/wangrunlin/github-achievements-api)](https://github.com/wangrunlin/github-achievements-api/blob/main/package.json)
[![GitHub last commit](https://img.shields.io/github/last-commit/wangrunlin/github-achievements-api)](https://github.com/wangrunlin/github-achievements-api/commits)
[![Test Status](https://img.shields.io/github/actions/workflow/status/wangrunlin/github-achievements-api/test.yml?label=test)](https://github.com/wangrunlin/github-achievements-api/actions)

[English](README.md) | 简体中文

一个简单的 API 服务，用于获取 GitHub 用户的成就信息。基于 Cloudflare Workers 构建。

## 在线使用

- [https://github-achievements-api.wangrunlin.workers.dev](https://github-achievements-api.wangrunlin.workers.dev)

## 部署到 Cloudflare Workers

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/wangrunlin/github-achievements-api)

## 功能特点

- 获取用户的 GitHub 成就列表
- 支持成就等级统计
- 提供原始成就数量和加权成就数量
- 自动缓存结果（1 小时）以提高性能
- 使用 Cloudflare Workers 部署，低延迟全球访问

## API 使用说明

### 基本端点

```http
GET https://<your-worker>.workers.dev/<github_username>
```

### 示例请求

```http
GET https://<your-worker>.workers.dev/wangrunlin
```

### 响应格式

```json
{
	"total": {
		"raw": 5, // 原始成就数量（不计算等级）
		"weighted": 8 // 加权成就数量（计算等级）
	},
	"achievements": [
		{
			"type": "pair-extraordinaire",
			"tier": 3
		},
		{
			"type": "pull-shark",
			"tier": 2
		},
		{
			"type": "quickdraw",
			"tier": 1
		}
		// ...
	]
}
```

## 本地开发

### 前置要求

- Node.js 18+
- pnpm

### 安装依赖

```bash
pnpm install
```

### 本地运行

```bash
pnpm dev
```

### 运行测试

```bash
pnpm test
```

## 部署

1. 登录到 Cloudflare

```bash
pnpm dlx wrangler login
```

2. 部署 Worker

```bash
pnpm deploy
```

## 技术栈

- TypeScript
- Cloudflare Workers
- Vitest (测试框架)
- Wrangler (开发&部署工具)

## 许可证

MIT

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 作者

[Leo Wang](https://github.com/wangrunlin)

## 致谢

- GitHub 提供的成就系统
- Cloudflare Workers 平台
