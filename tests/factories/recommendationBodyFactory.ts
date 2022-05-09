import { faker } from "@faker-js/faker";
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";

export function recommendationBody(): CreateRecommendationData {
  return {
    name: faker.internet.userName(),
    youtubeLink: "https://www.youtube.com/watch?v=aGSYKFb_zxg",
  };
}
