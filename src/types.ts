export interface UsageResponse {
  description: string;
  usage: {
    endpoint: string;
    example: string;
  };
  response: {
    total: {
      raw: string;
      weighted: string;
    };
    achievements: Array<{
      type: string;
      tier: string;
    }>;
  };
}

export interface AchievementsResponse {
  total: {
    raw: number;
    weighted: number;
  };
  achievements: Array<{
    type: string;
    tier?: number;
  }>;
} 