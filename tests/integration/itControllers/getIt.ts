/* eslint-disable indent */
import supertest from "supertest";
import app from "../../../src/app.js";
import { createRecommendation } from "../../factories/recommendationFactory.js";

export async function getAll() {
  const response = await supertest(app).get("/recommendations");

  expect(response.body.length).toBeLessThan(11);
  expect(response).not.toBeNull();
}

export async function getRandom() {
  await createRecommendation();
  await createRecommendation();

  const response = await supertest(app).get("/recommendations/random");

  expect(response.body).not.toBeNull();
}

export async function getRandomNoRecommendations() {
  const response = await supertest(app).get("/recommendations/random");

  expect(response.status).toEqual(404);
}

export async function getTop() {
  const amount = 10;

  for (let i = 0; i < amount; i++) {
    await createRecommendation();
  }
  const response = await supertest(app).get(`/recommendations/top/${amount}`);

  expect(response.body.length).toEqual(amount);
}

export async function getById() {
  const recommendation = await createRecommendation();

  const response = await supertest(app).get(
    `/recommendations/${recommendation.id}`
  );

  expect(response).not.toBeNull();
  expect(response.body).toEqual(recommendation);
}
