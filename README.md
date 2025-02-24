# GitHub Achievements API

<p align="center">
  <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" width="100" height="100" alt="Pull Shark Achievement" />
</p>

[![License](https://img.shields.io/github/license/wangrunlin/github-achievements-api)](https://github.com/wangrunlin/github-achievements-api/blob/main/LICENSE)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/wangrunlin/github-achievements-api)](https://github.com/wangrunlin/github-achievements-api/blob/main/package.json)
[![GitHub last commit](https://img.shields.io/github/last-commit/wangrunlin/github-achievements-api)](https://github.com/wangrunlin/github-achievements-api/commits)
[![Test Status](https://img.shields.io/github/actions/workflow/status/wangrunlin/github-achievements-api/test.yml?label=test)](https://github.com/wangrunlin/github-achievements-api/actions)
[![Node Version](https://img.shields.io/node/v/github-achievements-api)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.2-blue.svg)](https://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
[![GitHub stars](https://img.shields.io/github/stars/wangrunlin/github-achievements-api)](https://github.com/wangrunlin/github-achievements-api/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/wangrunlin/github-achievements-api)](https://github.com/wangrunlin/github-achievements-api/network)
[![GitHub issues](https://img.shields.io/github/issues/wangrunlin/github-achievements-api)](https://github.com/wangrunlin/github-achievements-api/issues)
[![Visitors](https://visitor-badge.laobi.icu/badge?page_id=wangrunlin.github-achievements-api)](https://github.com/wangrunlin/github-achievements-api)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-orange)](https://ko-fi.com/wangrunlin)

English | [简体中文](README_zh.md)

A simple API service for retrieving GitHub user achievements information. Built with Cloudflare Workers.

## Live Demo

- [https://github-achievements-api.wangrunlin.workers.dev](https://github-achievements-api.wangrunlin.workers.dev)

## Deploy to Cloudflare Workers

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/wangrunlin/github-achievements-api)

## Features

- Fetch GitHub user achievement list
- Support for achievement tier statistics
- Provide raw and weighted achievement counts
- Automatic result caching (1 hour) for better performance
- Deployed on Cloudflare Workers for low-latency global access

## API Usage

### Base Endpoint

```http
GET https://<your-worker>.workers.dev/<github_username>
```

### Example Request

```http
GET https://<your-worker>.workers.dev/wangrunlin
```

### Response Format

```json
{
	"total": {
		"raw": 5, // Raw achievement count (without tiers)
		"weighted": 8 // Weighted achievement count (with tiers)
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

## API Documentation

### Rate Limiting

This API inherits GitHub's rate limiting. Please be mindful of GitHub's rate limits when making requests.

### Caching

- Responses are cached for 1 hour to improve performance
- Cache is automatically invalidated when new achievements are earned
- Cache can be bypassed by adding `?nocache=true` to the request

### Error Responses

| Status Code | Description           |
| ----------- | --------------------- |
| 404         | User not found        |
| 429         | Rate limit exceeded   |
| 500         | Internal server error |

Example error response:

```json
{
	"error": "Failed to fetch GitHub achievements: Not Found"
}
```

## Roadmap

- [ ] Add support for achievement descriptions
- [ ] Add support for achievement dates
- [x] Add support for achievement images
- [ ] Add API key authentication
- [ ] Add more detailed statistics
- [ ] Add support for organization achievements
- [ ] Add webhook notifications for new achievements

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/wangrunlin)

[Other sponsorship options](https://alin.run/sponsor)

## Who's using GitHub Achievements API?

Are you using this API? [Let us know](https://github.com/wangrunlin/github-achievements-api/issues/new) and we'll add your logo here!

## Local Development

### Prerequisites

- Node.js 18+
- pnpm

### Install Dependencies

```bash
pnpm install
```

### Run Locally

```bash
pnpm dev
```

### Run Tests

```bash
pnpm test
```

## Deployment

1. Login to Cloudflare

```bash
pnpm dlx wrangler login
```

2. Deploy Worker

```bash
pnpm deploy
```

## Tech Stack

- TypeScript
- Cloudflare Workers
- Vitest (Testing Framework)
- Wrangler (Development & Deployment Tool)

## License

MIT

## Contributing

Issues and Pull Requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

[Leo Wang](https://github.com/wangrunlin)

## Available Achievements

Here are all the achievements currently available on GitHub:

[View more details about GitHub Achievements](https://github.com/drknzz/GitHub-Achievements)

| Achievement                                                                                                                            | Name                  | Description                                                         | Max Tiers |
| -------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------- | --------- |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png" width="60px">                    | Starstruck            | Created a repository that has 16 stars                              | 4         |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png" width="60px">                     | Quickdraw             | Closed an issue/PR within 5 minutes of opening                      | 1         |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png" width="60px">           | Pair Extraordinaire   | Coauthored in merged pull request                                   | 3         |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" width="60px">                    | Pull Shark            | Opened a pull request that has been merged                          | 3         |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png" width="60px">                  | Galaxy Brain          | Answered a discussion with an accepted answer                       | 4         |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" width="60px">                          | YOLO                  | Merged a pull request without code review                           | 1         |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png" width="60px"> | Arctic Code Vault     | Contributed code to repositories in the 2020 GitHub Archive Program | 1         |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/public-sponsor-default.png" width="60px">                | Public Sponsor        | Sponsored an open source contributor through GitHub Sponsors        | 1         |
| <img src="https://github.githubassets.com/images/modules/profile/achievements/mars-2020-contributor-default.png" width="60px">         | Mars 2020 Contributor | Contributed code to repositories used in the Mars 2020 Mission      | 1         |

## Acknowledgments

Thanks to these awesome projects and resources:

- [GitHub](https://github.com) - For providing the achievement system
- [Cloudflare Workers](https://workers.cloudflare.com) - For the serverless platform
- [GitHub Achievements List](https://github.com/drknzz/GitHub-Achievements) - For the comprehensive achievements documentation
- [TypeScript](https://www.typescriptlang.org) - For the typed JavaScript
- [Vitest](https://vitest.dev) - For the testing framework
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) - For the development & deployment tool
- [pnpm](https://pnpm.io) - For the fast package manager
