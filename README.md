# GitHub Achievements API

<p align="center">
  <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" width="100" height="100" alt="Pull Shark Achievement" />
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

English | [简体中文][readme-zh]

A simple API service for retrieving GitHub user achievements information. Built with Cloudflare Workers.

## Live Demo

- [https://github-achievements-api.wangrunlin.workers.dev][demo]

## Deploy to Cloudflare Workers

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)][deploy]

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

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)][kofi-button]

[Other sponsorship options][sponsor]

## Who's using GitHub Achievements API?

Are you using this API? [Let us know][new-issue] and we'll add your logo here!

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

[Leo Wang][author]

## Available Achievements

Here are all the achievements currently available on GitHub:

[View more details about GitHub Achievements][github-achievements]

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

- [GitHub][github] - For providing the achievement system
- [Cloudflare Workers][cloudflare-workers] - For the serverless platform
- [GitHub Achievements List][github-achievements-list] - For the comprehensive achievements documentation
- [TypeScript][typescript-site] - For the typed JavaScript
- [Vitest][vitest] - For the testing framework
- [Wrangler][wrangler] - For the development & deployment tool
- [pnpm][pnpm] - For the fast package manager

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
[readme-zh]: README_zh.md
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
