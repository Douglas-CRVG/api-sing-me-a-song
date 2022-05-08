import { prisma } from "../src/database";
import * as get from "./itControllers/getIt";
import * as insert from "./itControllers/insertIt";

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
    it("", get.getAll);
  });

  /*describe("GET /recommendations/random", () => {
    it.todo("", () => {});
  });

  describe("GET /recommendations/top/:amount", () => {
    it.todo("", () => {});
  });

  describe("GET /recommendations/:id", () => {
    it.todo("", () => {});
  });

  describe("POST /recommendations/:id/upvote", () => {
    it.todo("", () => {});
  });

  describe("POST /recommendations/:id/downvote", () => {
    it.todo("", () => {});
  });*/
});
