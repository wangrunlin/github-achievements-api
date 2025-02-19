import { UsageResponse, AchievementsResponse } from './types';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		// 从路径中获取 username
		const username = url.pathname.split('/')[1];

		if (!username) {
			const usage: UsageResponse = {
				description: 'GitHub Achievements API - 获取用户的 GitHub 成就信息',
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

			return new Response(JSON.stringify(usage, null, 2), {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
				},
			});
		}

		try {
			// 使用完整 URL 作为缓存键
			const cacheKey = `${url.origin}/cache/${username}`;
			const cache = caches.default;
			let response = await cache.match(cacheKey);

			if (!response) {
				// 如果缓存中没有，则请求 GitHub
				const githubUrl = `https://github.com/${username}`;
				const githubResponse = await fetch(githubUrl);

				if (!githubResponse.ok) {
					return new Response(`Failed to fetch GitHub achievements: ${githubResponse.statusText}`, {
						status: githubResponse.status,
					});
				}

				const html = await githubResponse.text();

				// 只匹配包含 achievements 的部分
				const achievementsSection = html.match(/<div class="d-flex flex-wrap">[\s\S]*?<\/div>/);
				if (!achievementsSection) {
					return new Response(JSON.stringify({ total: 0, achievements: [] }), {
						headers: {
							'Content-Type': 'application/json;charset=UTF-8',
						},
					});
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

				// 计算两种总数
				const rawTotal = achievements.length; // 不计算等级的总数
				const weightedTotal = achievements.reduce((sum, { tier = 1 }) => sum + tier, 0); // 计算等级的总数

				const result: AchievementsResponse = {
					total: {
						raw: rawTotal,
						weighted: weightedTotal,
					},
					achievements: achievements.sort((a, b) => (b.tier || 1) - (a.tier || 1)),
				};

				// 创建响应
				response = new Response(JSON.stringify(result, null, 2), {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Cache-Control': 'public, max-age=3600', // 缓存1小时
					},
				});

				// 使用 Request 对象来存储缓存
				ctx.waitUntil(cache.put(new Request(cacheKey), response.clone()));
			}

			return response;
		} catch (error: unknown) {
			return new Response(`Error: ${error}`, {
				status: 500,
			});
		}
	},
} satisfies ExportedHandler<Env>;
