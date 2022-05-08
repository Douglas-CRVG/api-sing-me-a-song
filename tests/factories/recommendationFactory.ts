import { prisma } from "../../src/database.js";
import { recommendationBody } from "./recommendationBodyFactory.js";

export async function createRecommendation(
  recommendation = recommendationBody()
) {
  return await prisma.recommendation.create({
    data: recommendation,
  });
}
