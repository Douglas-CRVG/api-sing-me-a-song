import { prisma } from "../src/database.js";
import * as get from "./itControllers/getIt.js";
import * as insert from "./itControllers/insertIt.js";
import * as vote from "./itControllers/voteIt.js";

describe("Recommendaion controller", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /recommendations", () => {
    it(
      "should return 201 and persist recommendation given a valid body",
      insert.insertAndPersist
    );
    it("should return 422 given a invalid body", insert.insertInvalidBody);
    it("should return 409 given a duplicate body", insert.insertDuplicateBody);
  });

  describe("GET /recommendations", () => {
    it("should return up to 10 recommendations giving a request", get.getAll);
  });

  describe("POST /recommendations/:id/upvote", () => {
    it("should return 200 and persist upvote given a valid id", vote.upvote);
    it("should return 404 given a invalid id", vote.upvoteInvalidId);
  });

  describe("POST /recommendations/:id/downvote", () => {
    it(
      "should return 200 and persist downvote given a valid id",
      vote.downvote
    );
    it("should return 404 given a invalid id", vote.downvoteInvalidId);
    it(
      "should return 200 and remove recommendation given a score less than -5",
      vote.downvoteRemoveRecommendation
    );
  });
});
