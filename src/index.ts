import { UsageResponse, AchievementsResponse } from './types';

// 创建 CORS 头部
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

// 创建 JSON 响应的辅助函数
function createJsonResponse(data: any, status = 200, additionalHeaders = {}) {
	return new Response(JSON.stringify(data, null, 2), {
		status,
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			...corsHeaders,
			...additionalHeaders,
		},
	});
}

// 创建错误响应的辅助函数
function createErrorResponse(message: string, status = 500) {
	return new Response(message, {
		status,
		headers: corsHeaders,
	});
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const username = url.pathname.split('/')[1];

		if (!username) {
			const usage: UsageResponse = {
				description: 'GitHub Achievements API - 获取用户的 GitHub 成就信息',
				author: {
					name: 'Leo Wang',
					github: 'https://github.com/wangrunlin',
				},
				repository: 'https://github.com/wangrunlin/github-achievements-api',
				usage: {
					endpoint: `${url.origin}/<github_username>`,
					example: `${url.origin}/wangrunlin`,
				},
				response: {
					total: {
						raw: '成就总数（不计算等级）',
						weighted: '成就总数（计算等级）',
					},
					achievements: [
						{
							type: '成就类型',
							tier: '成就等级（若无等级则为1）',
						},
					],
				},
			};

			return createJsonResponse(usage);
		}

		try {
			const cacheKey = `${url.origin}/cache/${username}`;
			const cache = caches.default;
			const skipCache = url.searchParams.has('nocache');
			let response = skipCache ? null : await cache.match(cacheKey);

			if (!response) {
				const githubUrl = `https://github.com/${username}`;
				const githubResponse = await fetch(githubUrl);

				if (!githubResponse.ok) {
					return createErrorResponse(`Failed to fetch GitHub achievements: ${githubResponse.statusText}`, githubResponse.status);
				}

				const html = await githubResponse.text();
				const achievementsSection = html.match(/<div class="d-flex flex-wrap">[\s\S]*?<\/div>/);

				if (!achievementsSection) {
					return createJsonResponse({ total: 0, achievements: [] });
				}

				const achievements: { type: string; tier?: number }[] = [];
				const pattern = new RegExp(
					`<a[^>]*href="/${username}\\?achievement=([^&]+)[^>]*>.*?(?:class="Label[^>]*achievement-tier-label[^>]*>x(\\d+))?(?:</span>)?</a>`,
					'gs'
				);

				let match;
				while ((match = pattern.exec(achievementsSection[0])) !== null) {
					const [, type, tier] = match;
					achievements.push({
						type: type.trim(),
						tier: tier ? parseInt(tier) : 1,
					});
				}

				const rawTotal = achievements.length;
				const weightedTotal = achievements.reduce((sum, { tier = 1 }) => sum + tier, 0);

				const result: AchievementsResponse = {
					total: {
						raw: rawTotal,
						weighted: weightedTotal,
					},
					achievements: achievements.sort((a, b) => (b.tier || 1) - (a.tier || 1)),
				};

				response = createJsonResponse(result, 200, {
					'Cache-Control': skipCache ? 'no-store' : 'public, max-age=3600',
				});

				if (!skipCache) {
					ctx.waitUntil(cache.put(new Request(cacheKey), response.clone()));
				}
			}

			return response;
		} catch (error: unknown) {
			return createErrorResponse(`Error: ${error}`);
		}
	},
} satisfies ExportedHandler<Env>;
