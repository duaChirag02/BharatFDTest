import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: { 
    type: Array,
    of: { question: String, answer: String }, 
    default: {} 
  }
});

// Method to get the translation dynamically based on lang
faqSchema.methods.getTranslation = function (lang) {
  let question = this.question;
  let answer = this.answer;

  // Check if the translation exists in the Map, otherwise fallback to default (English)
  if (this.translations.has(lang)) {
    question = this.translations.get(lang).question || question;
    answer = this.translations.get(lang).answer || answer;
  }

  return { question, answer };
};

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;