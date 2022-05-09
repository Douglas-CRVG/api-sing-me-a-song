import supertest from "supertest";
import app from "../../../src/app.js";
import { prisma } from "../../../src/database.js";
import { createRecommendation } from "../../factories/recommendationFactory.js";

export async function upvoteInvalidId() {
  const id: number = 0;

  const response = await supertest(app).post(`/recommendations/${id}/upvote`);

  expect(response.status).toEqual(404);
}

export async function downvoteInvalidId() {
  const id: number = 0;

  const response = await supertest(app).post(`/recommendations/${id}/downvote`);

  expect(response.status).toEqual(404);
}

export async function upvote() {
  const { id } = await createRecommendation();

  const response = await supertest(app).post(`/recommendations/${id}/upvote`);

  expect(response.status).toEqual(200);
}

export async function downvote() {
  const { id } = await createRecommendation();

  const response = await supertest(app).post(`/recommendations/${id}/downvote`);

  expect(response.status).toEqual(200);
}

export async function downvoteRemoveRecommendation() {
  const { id } = await createRecommendation();

  await supertest(app).post(`/recommendations/${id}/downvote`);
  await supertest(app).post(`/recommendations/${id}/downvote`);
  await supertest(app).post(`/recommendations/${id}/downvote`);
  await supertest(app).post(`/recommendations/${id}/downvote`);
  await supertest(app).post(`/recommendations/${id}/downvote`);

  const response = await supertest(app).post(`/recommendations/${id}/downvote`);
  const count = await prisma.recommendation.count();

  expect(response.status).toEqual(200);
  expect(count).toEqual(0);
}
