import { translateText } from "../services/translateService.js";  
import Faq from "../models/Faq.js";
// import { cacheData } from "../middleware/cache.js"; // Import caching function
import sanitizeHtml from "sanitize-html";

export const createFaq = async (req, res) => {
  const { question, answer, lang } = req.body;
  console.log("FAQ Received:", { question, answer, lang });

  try {
    // Sanitize input
    let translatedQuestion = sanitizeHtml(question);
    let translatedAnswer = sanitizeHtml(answer);

    if (lang !== "en") {
      // Step 1: Translate text asynchronously
      const [rawTranslatedQuestion, rawTranslatedAnswer] = await Promise.all([
        translateText(question, lang),
        translateText(answer, lang),
      ]);

      // Step 2: Restore HTML formatting asynchronously after translation
      [translatedQuestion, translatedAnswer] = await Promise.all([
        restoreHtmlFormatting(question, rawTranslatedQuestion),
        restoreHtmlFormatting(answer, rawTranslatedAnswer),
      ]);
    }

    console.log("Final Values Before Saving:", {
      question,
      answer,
      [`question_${lang}`]: translatedQuestion,
      [`answer_${lang}`]: translatedAnswer,
    });

    // Step 3: Save the translated & formatted data
    const newFaq = new Faq({
      question : translatedQuestion,
      answer: translatedAnswer,
      [`question_${lang}`]: translatedQuestion,
      [`answer_${lang}`]: translatedAnswer,
    });

    await newFaq.save();
    console.log("FAQ Saved Successfully:", newFaq);

    res.status(201).json(newFaq);
  } catch (error) {
    console.error("Error Saving FAQ:", error);
    res.status(500).json({ message: "Error saving FAQ", error });
  }
};



import * as cheerio from "cheerio";

export async function restoreHtmlFormatting(originalHtml, translatedText) {
  return new Promise((resolve) => {
    const $ = cheerio.load(originalHtml);
    const translatedWords = translatedText.split(" ");
    let wordIndex = 0;

    function replaceTextNodes(element) {
      $(element)
        .contents()
        .each((_, node) => {
          if (node.type === "text") {
            const words = node.data.trim().split(" ");
            if (words.length > 0) {
              const translatedSegment = translatedWords
                .slice(wordIndex, wordIndex + words.length)
                .join(" ");
              wordIndex += words.length;
              $(node).replaceWith(translatedSegment);
            }
          } else {
            replaceTextNodes(node);
          }
        });
    }

    replaceTextNodes("body");
    resolve($("body").html()); // Ensure the modified HTML is resolved properly
  });
}

export const deleteFaq = async (req, res) => {
  const { id } = req.params; 

  try {
    const faq = await Faq.findById(id);

    if (!faq) {
      return res.status(404).json({ error: "FAQ not found" }); // If FAQ doesn't exist
    }

    await faq.remove(); // Delete the FAQ from the DB
    res.status(200).json({ message: "FAQ deleted successfully" }); // Success response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the FAQ" });
  }
};

export const getFaqs = async (req, res) => {
  const { lang = "en" } = req.query;

  try {
    // Step 1: Check if FAQs are in cache
    const faqs = await Faq.find().lean();
    const translatedFaqs = faqs.map((faq) => ({
      question: faq[`question_${lang}`] || faq.question,
      answer: faq[`answer_${lang}`] || faq.answer,
    }));

    // Step 2: Cache the response if not cached already

    // Step 3: Return the data
    res.status(200).json(translatedFaqs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs", error });
  }
};