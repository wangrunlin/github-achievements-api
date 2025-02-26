# GitHub Achievements API

<p align="center">
  <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" width="100" height="100" alt="Pull Shark Achievement" />
</p>

[![License](https://img.shields.io/github/license/wangrunlin/github-achievements-api)][1]
[![GitHub package.json version](https://img.shields.io/github/package-json/v/wangrunlin/github-achievements-api)][2]
[![GitHub last commit](https://img.shields.io/github/last-commit/wangrunlin/github-achievements-api)][3]
[![Test Status](https://img.shields.io/github/actions/workflow/status/wangrunlin/github-achievements-api/test.yml?label=test)][4]
[![Node Version](https://img.shields.io/node/v/github-achievements-api)][5]
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.2-blue.svg)][6]
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)][7]
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)][8]
[![GitHub stars](https://img.shields.io/github/stars/wangrunlin/github-achievements-api)][9]
[![GitHub forks](https://img.shields.io/github/forks/wangrunlin/github-achievements-api)][10]
[![GitHub issues](https://img.shields.io/github/issues/wangrunlin/github-achievements-api)][11]
[![Visitors](https://visitor-badge.laobi.icu/badge?page_id=wangrunlin.github-achievements-api)][12]
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-orange)][13]

English | [简体中文][14]

A simple API service for retrieving GitHub user achievements information. Built with Cloudflare Workers.

## Live Demo

- [https://github-achievements-api.wangrunlin.workers.dev][15]

## Deploy to Cloudflare Workers

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)][16]

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

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)][17]

[Other sponsorship options][18]

## Who's using GitHub Achievements API?

Are you using this API? [Let us know][19] and we'll add your logo here!

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

This project uses GitHub Actions to automatically deploy to Cloudflare Workers:

- Commits to non-main branches create preview deployments
- Commits to main branch deploy to production

### Setup GitHub Secrets

To enable automatic deployments, you need to add the following secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following secrets:
   - `CF_API_TOKEN`: Your Cloudflare API token with Workers permissions

### How to get Cloudflare credentials

1. **Cloudflare API Token**:
   - Go to the [Cloudflare dashboard](https://dash.cloudflare.com/)
   - Navigate to My Profile > API Tokens
   - Create a new token with "Edit Workers" permissions

## Tech Stack

- TypeScript
- Cloudflare Workers
- Vitest (Testing Framework)
- Wrangler (Development & Deployment Tool)

## License

MIT

## Contributing

Issues and Pull Requests are welcome!

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## Author

[Leo Wang][20]

## Available Achievements

Here are all the achievements currently available on GitHub:

[View more details about GitHub Achievements][21]

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

- [GitHub][22] - For providing the achievement system
- [Cloudflare Workers][23] - For the serverless platform
- [GitHub Achievements List][24] - For the comprehensive achievements documentation
- [TypeScript][25] - For the typed JavaScript
- [Vitest][26] - For the testing framework
- [Wrangler][27] - For the development & deployment tool
- [pnpm][28] - For the fast package manager

[1]: https://github.com/wangrunlin/github-achievements-api/blob/main/LICENSE
[2]: https://github.com/wangrunlin/github-achievements-api/blob/main/package.json
[3]: https://github.com/wangrunlin/github-achievements-api/commits
[4]: https://github.com/wangrunlin/github-achievements-api/actions
[5]: https://nodejs.org
[6]: https://www.typescriptlang.org/
[7]: https://github.com/prettier/prettier
[8]: https://makeapullrequest.com
[9]: https://github.com/wangrunlin/github-achievements-api/stargazers
[10]: https://github.com/wangrunlin/github-achievements-api/network
[11]: https://github.com/wangrunlin/github-achievements-api/issues
[12]: https://github.com/wangrunlin/github-achievements-api
[13]: https://ko-fi.com/wangrunlin
[14]: README_zh.md
[15]: https://github-achievements-api.wangrunlin.workers.dev
[16]: https://deploy.workers.cloudflare.com/?url=https://github.com/wangrunlin/github-achievements-api
[17]: https://ko-fi.com/wangrunlin
[18]: https://alin.run/sponsor
[19]: https://github.com/wangrunlin/github-achievements-api/issues/new
[20]: https://github.com/wangrunlin
[21]: https://github.com/drknzz/GitHub-Achievements
[22]: https://github.com
[23]: https://workers.cloudflare.com
[24]: https://github.com/drknzz/GitHub-Achievements
[25]: https://www.typescriptlang.org
[26]: https://vitest.dev
[27]: https://developers.cloudflare.com/workers/wrangler/
[28]: https://pnpm.io
