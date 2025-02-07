import React, { useState, useEffect } from "react";
import FaqForm from "../components/FaqForm";
import FaqList from "../components/FaqList";

const AdminPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [lang, setLang] = useState("en");

  // Fetch FAQs from the API
  const fetchFaqs = async () => {
    const response = await fetch(`http://localhost:8000/api/faqs/?lang=${lang}`);
    const data = await response.json();
    setFaqs(data);
  };

  useEffect(() => {
    fetchFaqs();
  }, [lang]);

  // Handle FAQ added in FaqForm, trigger refresh
  const handleFaqAdded = () => {
    fetchFaqs(); // Refresh FAQ list after adding new FAQ
  };

  return (
    <div className="h-full bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Admin Portal</h1>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        
        {/* FAQ Form Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-300 hover:shadow-2xl transition-all">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New FAQ</h2>
          <FaqForm onFaqAdded={handleFaqAdded} />
        </div>
        
        {/* FAQ List Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-300 hover:shadow-2xl transition-all h-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage FAQs</h2>
          <FaqList faqs={faqs} lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
