import supertest from "supertest";
import app from "../../../src/app.js";
import { recommendationBody } from "../../factories/recommendationBodyFactory.js";
import { prisma } from "../../../src/database.js";

export async function insertAndPersist() {
  const recommendation = recommendationBody();

  const response = await supertest(app)
    .post("/recommendations")
    .send(recommendation);

  const created = await prisma.recommendation.findUnique({
    where: {
      name: recommendation.name,
    },
  });

  expect(response.status).toEqual(201);
  expect(created).not.toBeNull();
}

export async function insertInvalidBody() {
  const recommendation = {};

  const response = await supertest(app)
    .post("/recommendations")
    .send(recommendation);
  const count = await prisma.recommendation.count();

  expect(response.status).toEqual(422);
  expect(count).toEqual(0);
}

export async function insertDuplicateBody() {
  const recommendation = recommendationBody();

  await supertest(app).post("/recommendations").send(recommendation);

  const response = await supertest(app)
    .post("/recommendations")
    .send(recommendation);
  const count = await prisma.recommendation.count();

  expect(response.status).toEqual(409);
  expect(count).toEqual(1);
}
