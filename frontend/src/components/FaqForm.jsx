import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

// Define a full toolbar with all formatting options
const toolbarOptions = [
  [{ header: [1, 2, 3, false] }], // Headers
  ["bold", "italic", "underline", "strike"], // Formatting options
  [{ color: [] }, { background: [] }], // Text & background color
  [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
  [{ list: "ordered" }, { list: "bullet" }], // Lists
  [{ indent: "-1" }, { indent: "+1" }], // Indent
  [{ align: [] }], // Text alignment
  ["blockquote", "code-block"], // Blockquote & Code Block
  ["link", "image", "video"], // Media
  ["clean"], // Remove formatting
];

const modules = {
  toolbar: toolbarOptions,
};

const FaqForm = ({ onFaqAdded }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [lang, setLang] = useState("en");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const faqData = { question, answer, lang };

    try {
      const response = await fetch("http://localhost:8000/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqData),
      });

      if (response.ok) {
        setMessage("FAQ added successfully!");
        setQuestion("");
        setAnswer("");
        onFaqAdded(); // Refresh the FAQ list
      } else {
        setMessage("Error adding FAQ");
      }
    } catch (error) {
      setMessage("Error connecting to the server");
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add FAQ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Question using ReactQuill */}
        <div>
          <label className="block text-gray-600 font-medium">Question:</label>
          <ReactQuill
            value={question}
            onChange={setQuestion}
            modules={modules}
            theme="snow"
            className="bg-white rounded-md"
          />
        </div>

        {/* Answer using ReactQuill */}
        <div>
          <label className="block text-gray-600 font-medium">Answer:</label>
          <ReactQuill
            value={answer}
            onChange={setAnswer}
            modules={modules}
            theme="snow"
            className="bg-white rounded-md"
          />
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-gray-600 font-medium">Language:</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default FaqForm;
