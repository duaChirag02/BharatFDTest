import express from "express";
import { createFaq, getFaqs, deleteFaq } from "../controllers/faqController.js";

const router = express.Router();

router.post("/faqs", createFaq);

router.get("/faqs", getFaqs);

router.delete("/faqs/:id", deleteFaq);

export default router;
