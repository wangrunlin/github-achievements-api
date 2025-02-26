import { CacheStorage, Request as CF_Req, Response as CF_Res } from '@cloudflare/workers-types';
import { parseHTML } from 'linkedom';

import { Achievement, AchievementsResponse, UsageResponse } from './types';

// 创建 CORS 头部
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// 创建 JSON 响应的辅助函数
const createJsonResponse = (data: any, status = 200, additionalHeaders = {}) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...corsHeaders,
      ...additionalHeaders,
    },
  });

// 创建错误响应的辅助函数
const createErrorResponse = (message: string, status = 500) =>
  new Response(message, { status, headers: corsHeaders });

const usageOf = (origin: string): UsageResponse => ({
  description: 'GitHub Achievements API - 获取用户的 GitHub 成就信息',
  author: {
    name: 'Leo Wang',
    github: 'https://github.com/wangrunlin',
  },
  repository: 'https://github.com/wangrunlin/github-achievements-api',
  usage: {
    endpoint: `${origin}/<github_username>`,
    example: `${origin}/wangrunlin`,
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
        image: '成就图标 URL',
      },
    ],
  },
});

class HTTPError extends Error {
  constructor(
    message: string,
    public readonly response: Response,
  ) {
    super(message);
  }
}

const loadAchievements = async (username: string) => {
  const githubResponse = await globalThis.fetch(`https://github.com/${username}?tab=achievements`);

  if (!githubResponse.ok) throw new HTTPError(githubResponse.statusText, githubResponse);

  const { document } = parseHTML(await githubResponse.text());

  const achievements = [
    ...document.querySelectorAll<HTMLDetailsElement>('.js-achievement-card-details'),
  ].map((card) => {
    const type = card.dataset.achievementSlug,
      tier = card.querySelector('.achievement-tier-label')?.textContent?.trim().slice(1) || '1',
      image = card.querySelector<HTMLImageElement>('.achievement-badge-card')!.src;

    return { type, tier: +tier, image } as Achievement;
  });

  return {
    total: {
      raw: achievements.length,
      weighted: achievements.reduce((sum, { tier }) => sum + tier, 0),
    },
    achievements: achievements.sort((a, b) => b.tier - a.tier),
  } as AchievementsResponse;
};

const fetch: ExportedHandler['fetch'] = async (request, env, ctx) => {
  const { origin, pathname, searchParams } = new URL(request.url);
  const [, username] = pathname.split('/');

  if (!username) return createJsonResponse(usageOf(origin));

  try {
    const cacheKey = `${origin}/cache/${username}`;
    const cache = (caches as unknown as CacheStorage).default;
    const skipCache = searchParams.has('nocache');
    const cacheResponse = !skipCache && (await cache.match(cacheKey));

    if (cacheResponse) return cacheResponse as unknown as Response;

    const result = await loadAchievements(username);

    const response = createJsonResponse(result, 200, {
      'Cache-Control': skipCache ? 'no-store' : 'public, max-age=3600',
    });
    if (!skipCache)
      ctx.waitUntil(
        cache.put(
          new Request(cacheKey) as unknown as CF_Req,
          response.clone() as unknown as CF_Res,
        ),
      );
    return response;
  } catch (error: unknown) {
    return error instanceof HTTPError
      ? createErrorResponse(
          `Failed to fetch GitHub achievements: ${error.response.statusText}`,
          error.response.status,
        )
      : createErrorResponse(`Error: ${error}`);
  }
};

export default { fetch } satisfies ExportedHandler<Env>;
