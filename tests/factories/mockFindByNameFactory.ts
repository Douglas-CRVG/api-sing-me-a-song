import { Recommendation } from "@prisma/client";

export function mockRecommendation(): Recommendation {
  return {
    id: 10,
    name: "irineu",
    youtubeLink: "https://www.youtube.com/watch?v=aGSYKFb_zxg",
    score: 0,
  };
}
