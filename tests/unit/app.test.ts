/* eslint-disable indent */
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { conflictError, notFoundError } from "../../src/utils/errorUtils.js";
import { mockRecommendation } from "../factories/mockFindByNameFactory.js";
import { jest } from "@jest/globals";

describe("Recommendations service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("insert", () => {
    it("insert duplicate name", () => {
      const recommendation = mockRecommendation();
      jest
        .spyOn(recommendationRepository, "findByName")
        .mockResolvedValue(recommendation);
      jest.spyOn(recommendationRepository, "create").mockResolvedValue(null);

      expect(async () =>
        recommendationService.insert(recommendation)
      ).rejects.toEqual(conflictError());
    });
  });

  describe("downvote", () => {
    it("invalid id", () => {
      const recommendation = mockRecommendation();
      jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

      expect(async () =>
        recommendationService.downvote(recommendation.id)
      ).rejects.toEqual(notFoundError());
    });

    it("remove recommendation given a score less than -5", async () => {
      const recommendation = mockRecommendation();
      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValue(recommendation);
      jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValue({ ...recommendation, score: -6 });

      const remove = jest
        .spyOn(recommendationRepository, "remove")
        .mockResolvedValue(null);

      await recommendationService.downvote(recommendation.id);
      expect(remove).toHaveBeenCalledTimes(1);
    });
  });

  describe("get random", () => {
    it("should return  error not_found since there are no recommendations registered", () => {
      jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

      expect(async () => recommendationService.getRandom()).rejects.toEqual(
        notFoundError()
      );
    });
  });

  describe("upvote", () => {
    it("invalid id", () => {
      const recommendation = mockRecommendation();
      jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

      expect(async () =>
        recommendationService.upvote(recommendation.id)
      ).rejects.toEqual(notFoundError());
    });
  });
});
