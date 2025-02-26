# GitHub Achievements API

<p align="center">
  <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" width="100" height="100" alt="Pull Shark 成就" />
</p>

[![License](https://img.shields.io/github/license/wangrunlin/github-achievements-api)][license]
[![GitHub package.json version](https://img.shields.io/github/package-json/v/wangrunlin/github-achievements-api)][package-json]
[![GitHub last commit](https://img.shields.io/github/last-commit/wangrunlin/github-achievements-api)][commits]
[![Test Status](https://img.shields.io/github/actions/workflow/status/wangrunlin/github-achievements-api/test.yml?label=test)][actions]
[![Node Version](https://img.shields.io/node/v/github-achievements-api)][nodejs]
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)][typescript]
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)][prettier]
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)][make-pr]
[![GitHub stars](https://img.shields.io/github/stars/wangrunlin/github-achievements-api)][stars]
[![GitHub forks](https://img.shields.io/github/forks/wangrunlin/github-achievements-api)][forks]
[![GitHub issues](https://img.shields.io/github/issues/wangrunlin/github-achievements-api)][issues]
[![Visitors](https://visitor-badge.laobi.icu/badge?page_id=wangrunlin.github-achievements-api)][repo]
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-orange)][kofi]

[English][readme-en] | 简体中文

一个简单的 API 服务，用于获取 GitHub 用户的成就信息。基于 Cloudflare Workers 构建。

## 在线使用

- [https://github-achievements-api.wangrunlin.workers.dev][demo]

## 部署到 Cloudflare Workers

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)][deploy]

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
      "tier": 3,
      "image": "https://some.cdn.com/path/to/pair-extraordinaire.png"
    },
    {
      "type": "pull-shark",
      "tier": 2,
      "image": "https://some.cdn.com/path/to/pull-shark.png"
    },
    {
      "type": "quickdraw",
      "tier": 1,
      "image": "https://some.cdn.com/path/to/quickdraw.png"
    }
    // ...
  ]
}
```

## API 文档

### 速率限制

本 API 继承了 GitHub 的速率限制。请注意在发送请求时遵守 GitHub 的速率限制规则。

### 缓存机制

- 响应结果缓存时间为 1 小时，以提高性能
- 当获得新成就时，缓存会自动失效
- 可以通过在请求中添加 `?nocache=true` 来绕过缓存

### 错误响应

| 状态码 | 描述           |
| ------ | -------------- |
| 404    | 用户未找到     |
| 429    | 超出速率限制   |
| 500    | 内部服务器错误 |

错误响应示例：

```json
{
  "error": "Failed to fetch GitHub achievements: Not Found"
}
```

## 项目路线图

- [ ] 添加成就描述支持
- [ ] 添加成就获得日期支持
- [x] 添加成就图片支持
- [ ] 添加 API 密钥认证
- [ ] 添加更详细的统计信息
- [ ] 添加组织成就支持
- [ ] 添加新成就获得时的 webhook 通知

## 赞助商

成为赞助商来支持这个项目。您的 logo 将会出现在这里并链接到您的网站。

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)][kofi-button]

[其他赞助方式][sponsor]

## 谁在使用 GitHub Achievements API？

您正在使用这个 API 吗？[告诉我们][new-issue]，我们会在这里添加您的 logo！

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

本项目使用 GitHub Actions 自动部署到 Cloudflare Workers：

- 向非主分支提交代码会创建预览部署
- 向主分支提交代码会部署到生产环境

### 设置 GitHub Secrets

要启用自动部署，您需要在 GitHub 仓库中添加以下密钥：

1. 前往您的 GitHub 仓库
2. 导航到 Settings > Secrets and variables > Actions
3. 添加以下密钥：
   - `CF_API_TOKEN`：您的 Cloudflare API 令牌（需要 Workers 权限）

### 如何获取 Cloudflare 凭据

1. **Cloudflare API 令牌**：

   - 前往 [Cloudflare 控制面板](https://dash.cloudflare.com/)
   - 导航到 My Profile > API Tokens
   - 创建一个具有"Edit Workers"权限的新令牌

## 技术栈

- TypeScript
- Cloudflare Workers
- Vitest (测试框架)
- Wrangler (开发&部署工具)

## 许可证

MIT

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1.  Fork 本仓库
2.  创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3.  提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  开启一个 Pull Request

## 作者

[Leo Wang][author]

## 可获得的成就

以下是目前 GitHub 上可获得的所有成就：

[查看更多 GitHub 成就相关信息][github-achievements]

| 成就图标                                                                                                                               | 名称                  | 描述                                    | 最高等级 |
| -------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | --------------------------------------- | -------- |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png" width="60px">                    | Starstruck            | 创建的仓库获得 16 个星标                | 4        |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png" width="60px">                     | Quickdraw             | 在开启后 5 分钟内关闭了 Issue 或 PR     | 1        |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png" width="60px">           | Pair Extraordinaire   | 在已合并的 PR 中作为合作者              | 3        |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" width="60px">                    | Pull Shark            | 创建的 PR 被合并                        | 3        |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png" width="60px">                  | Galaxy Brain          | 在讨论中的回答被采纳                    | 4        |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" width="60px">                          | YOLO                  | 在没有代码审查的情况下合并 PR           | 1        |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png" width="60px"> | Arctic Code Vault     | 为 2020 GitHub 存档计划中的仓库贡献代码 | 1        |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/public-sponsor-default.png" width="60px">                | Public Sponsor        | 通过 GitHub Sponsors 赞助开源贡献者     | 1        |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/mars-2020-contributor-default.png" width="60px">         | Mars 2020 Contributor | 为火星 2020 任务中使用的仓库贡献代码    | 1        |

## 致谢

感谢这些优秀的项目和资源：

- [GitHub][github] - 提供成就系统
- [Cloudflare Workers][cloudflare-workers] - 提供无服务器平台
- [GitHub Achievements List][github-achievements-list] - 提供完整的成就文档
- [TypeScript][typescript-site] - 提供类型化的 JavaScript
- [Vitest][vitest] - 提供测试框架
- [Wrangler][wrangler] - 提供开发和部署工具
- [pnpm][pnpm] - 提供快速的包管理器

[license]: https://github.com/wangrunlin/github-achievements-api/blob/main/LICENSE
[package-json]: https://github.com/wangrunlin/github-achievements-api/blob/main/package.json
[commits]: https://github.com/wangrunlin/github-achievements-api/commits
[actions]: https://github.com/wangrunlin/github-achievements-api/actions
[nodejs]: https://nodejs.org
[typescript]: https://www.typescriptlang.org/
[prettier]: https://github.com/prettier/prettier
[make-pr]: https://makeapullrequest.com
[stars]: https://github.com/wangrunlin/github-achievements-api/stargazers
[forks]: https://github.com/wangrunlin/github-achievements-api/network
[issues]: https://github.com/wangrunlin/github-achievements-api/issues
[repo]: https://github.com/wangrunlin/github-achievements-api
[kofi]: https://ko-fi.com/wangrunlin
[readme-en]: README.md
[demo]: https://github-achievements-api.wangrunlin.workers.dev
[deploy]: https://deploy.workers.cloudflare.com/?url=https://github.com/wangrunlin/github-achievements-api
[kofi-button]: https://ko-fi.com/wangrunlin
[sponsor]: https://alin.run/sponsor
[new-issue]: https://github.com/wangrunlin/github-achievements-api/issues/new
[author]: https://github.com/wangrunlin
[github-achievements]: https://github.com/drknzz/GitHub-Achievements
[github]: https://github.com
[cloudflare-workers]: https://workers.cloudflare.com
[github-achievements-list]: https://github.com/drknzz/GitHub-Achievements
[typescript-site]: https://www.typescriptlang.org
[vitest]: https://vitest.dev
[wrangler]: https://developers.cloudflare.com/workers/wrangler/
[pnpm]: https://pnpm.io
