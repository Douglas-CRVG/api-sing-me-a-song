import supertest from "supertest";
import app from "../../src/app.js";

export async function getAll() {
  const response = await supertest(app).get("/recommendations");

  expect(response.body.length).toBeLessThan(11);
  expect(response).not.toBeNull();
}

export function getRandom() {}
export function getTop() {}
export function getById() {}
