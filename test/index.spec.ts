// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import worker from '../src/index';
import { UsageResponse, AchievementsResponse } from '../src/types';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

// Mock GitHub 响应
const mockGitHubResponse = `
<div class="d-flex flex-wrap"><a href="/wangrunlin?achievement=starstruck&amp;tab=achievements" class="position-relative"><img src="https://github.githubassets.com/assets/starstruck-default-b6610abad518.png" data-hovercard-type="achievement" data-hovercard-url="/users/wangrunlin/achievements/starstruck/detail?hovercard=1" width="64" alt="Achievement: Starstruck" data-view-component="true" class="achievement-badge-sidebar"></a><a href="/wangrunlin?achievement=pair-extraordinaire&amp;tab=achievements" class="position-relative"><img src="https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png" data-hovercard-type="achievement" data-hovercard-url="/users/wangrunlin/achievements/pair-extraordinaire/detail?hovercard=1" width="64" alt="Achievement: Pair Extraordinaire" data-view-component="true" class="achievement-badge-sidebar"><span data-view-component="true" class="Label achievement-tier-label achievement-tier-label--silver text-small text-bold color-shadow-medium px-2 py-0 mb-1 position-absolute right-0 bottom-0">x3</span></a><a href="/wangrunlin?achievement=yolo&amp;tab=achievements" class="position-relative"><img src="https://github.githubassets.com/assets/yolo-default-be0bbff04951.png" data-hovercard-type="achievement" data-hovercard-url="/users/wangrunlin/achievements/yolo/detail?hovercard=1" width="64" alt="Achievement: YOLO" data-view-component="true" class="achievement-badge-sidebar"></a><a href="/wangrunlin?achievement=quickdraw&amp;tab=achievements" class="position-relative"><img src="https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png" data-hovercard-type="achievement" data-hovercard-url="/users/wangrunlin/achievements/quickdraw/detail?hovercard=1" width="64" alt="Achievement: Quickdraw" data-view-component="true" class="achievement-badge-sidebar"></a><a href="/wangrunlin?achievement=pull-shark&amp;tab=achievements" class="position-relative"><img src="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png" data-hovercard-type="achievement" data-hovercard-url="/users/wangrunlin/achievements/pull-shark/detail?hovercard=1" width="64" alt="Achievement: Pull Shark" data-view-component="true" class="achievement-badge-sidebar"><span data-view-component="true" class="Label achievement-tier-label achievement-tier-label--bronze text-small text-bold color-shadow-medium px-2 py-0 mb-1 position-absolute right-0 bottom-0">x2</span></a></div>
`;

// Mock fetch 函数
const originalFetch = globalThis.fetch;
beforeEach(() => {
	globalThis.fetch = vi.fn().mockImplementation((url: string) => {
		if (url.includes('non-existent-user')) {
			return Promise.resolve(new Response('Not Found', { status: 404 }));
		}
		return Promise.resolve(new Response(mockGitHubResponse, { status: 200 }));
	});
});

afterEach(() => {
	globalThis.fetch = originalFetch;
});

describe('GitHub Achievements API', () => {
	// 测试 API 使用说明
	it('responds with usage information when no username provided', async () => {
		const request = new IncomingRequest('http://example.com/');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		const data = (await response.json()) as UsageResponse;
		expect(response.headers.get('Content-Type')).toBe('application/json;charset=UTF-8');
		expect(data).toHaveProperty('description');
		expect(data).toHaveProperty('usage');
		expect(data).toHaveProperty('response');
	});

	// 测试获取用户成就
	it('fetches achievements for a valid username', async () => {
		const username = 'wangrunlin';
		const request = new IncomingRequest(`http://example.com/${username}`);
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		const data = (await response.json()) as AchievementsResponse;
		expect(response.headers.get('Content-Type')).toBe('application/json;charset=UTF-8');
		expect(data).toHaveProperty('total');
		expect(data.total.raw).toBe(5); // 5个成就
		expect(data.total.weighted).toBe(8); // 1 + 3 + 1 + 1 + 2 = 8
		expect(data.achievements).toHaveLength(5);

		// 验证每个成就的存在性和等级
		const achievementsMap = new Map(data.achievements.map((a) => [a.type, a.tier]));

		expect(achievementsMap.get('starstruck')).toBe(1);
		expect(achievementsMap.get('pair-extraordinaire')).toBe(3);
		expect(achievementsMap.get('yolo')).toBe(1);
		expect(achievementsMap.get('quickdraw')).toBe(1);
		expect(achievementsMap.get('pull-shark')).toBe(2);
	});

	// 测试无效用户名
	it('handles non-existent username gracefully', async () => {
		const request = new IncomingRequest('http://example.com/non-existent-user-123456');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(404);
	});

	// 测试缓存功能
	it('uses cache for repeated requests', async () => {
		const username = 'wangrunlin';
		const request = new IncomingRequest(`http://example.com/${username}`);
		const ctx = createExecutionContext();

		// 第一次请求
		const response1 = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const data1 = (await response1.json()) as AchievementsResponse;

		// 第二次请求
		const response2 = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const data2 = (await response2.json()) as AchievementsResponse;

		// 验证两次请求返回相同的数据
		expect(JSON.stringify(data1)).toBe(JSON.stringify(data2));
		// 验证 fetch 只被调用一次（第二次使用了缓存）
		expect(fetch).toHaveBeenCalledTimes(1);
	});
});
