import request from "supertest";
import app from "../server.js";
import Faq from "../models/Faq.js";

describe("FAQ API", () => {
  beforeEach(async () => {
    await Faq.deleteMany({});
  });

  test("should create an FAQ", async () => {
    const res = await request(app)
      .post("/api/faqs")
      .send({ question: "What is Node.js?", answer: "Node.js is a runtime.", lang: "en" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("question", "What is Node.js?");
  });

  test("should get FAQs", async () => {
    await Faq.create({ question: "What is Jest?", answer: "Jest is a testing framework.", lang: "en" });

    const res = await request(app).get("/api/faqs");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

});
