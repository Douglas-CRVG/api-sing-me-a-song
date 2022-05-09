import supertest from "supertest";
import app from "../../src/app.js";
import { createRecommendation } from "../factories/recommendationFactory.js";

export async function getAll() {
  const response = await supertest(app).get("/recommendations");

  expect(response.body.length).toBeLessThan(11);
  expect(response).not.toBeNull();
}

export function getRandom() {}
export function getTop() {}
export async function getById() {
  const { id } = await createRecommendation();

  const response = await supertest(app).get(`/recommendations/${id}`);

  expect(response).not.toBeNull();
}
