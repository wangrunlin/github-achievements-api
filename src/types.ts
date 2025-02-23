export interface UsageResponse {
  description: string;
  author: Record<'name' | 'github', string>;
  repository: string;
  usage: Record<'endpoint' | 'example', string>;
  response: {
    total: Record<keyof AchievementsResponse['total'], string>;
    achievements: Record<keyof Achievement, string>[];
  };
}

export interface Achievement {
  type: string;
  image: string;
  tier: number;
}

export interface AchievementsResponse {
  total: Record<'raw' | 'weighted', number>;
  achievements: Achievement[];
}
