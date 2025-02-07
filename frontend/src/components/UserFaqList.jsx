// import React, { useState, useEffect } from "react";

// const FaqList = () => {
//   const [faqs, setFaqs] = useState([]);
//   const [lang, setLang] = useState("en");
//   const [answers, setAnswers] = useState({});

//   // Fetch FAQs from the API
//   const fetchFaqs = async () => {
//     const response = await fetch(`http://localhost:8000/api/faqs/?lang=${lang}`);
//     const data = await response.json();
//     setFaqs(data);
//   };

//   // Handle answer input change
//   const handleAnswerChange = (id, value) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [id]: value,
//     }));
//   };

//   // Submit the answers
//   const handleSubmit = async () => {
//     // Assuming you are sending the answers back to the backend or saving locally
//     // Replace the URL with your own API endpoint if needed
//     const response = await fetch("http://localhost:8000/api/faqs/submit", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(answers),
//     });

//     if (response.ok) {
//       alert("Your answers have been submitted successfully!");
//     } else {
//       alert("Failed to submit answers.");
//     }
//   };

//   useEffect(() => {
//     fetchFaqs();
//   }, [lang]);

//   return (
//     <div className="mt-6 bg-gray-50 p-4 rounded-md shadow-md">

//       <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-md p-2">
//         {faqs.length > 0 ? (
//           <ul className="space-y-4">
//             {faqs.map((faq) => (
//               <li key={faq.id} className="p-4 border-b border-gray-200">
//                 <div>
//                   <strong className="text-blue-600">Q: </strong>{faq.question}
//                 </div>
//                 <div className="mt-2">
//                   <strong className="text-green-600">Your Answer:</strong>
//                   <input
//                     type="text"
//                     value={answers[faq.id] || ""}
//                     onChange={(e) => handleAnswerChange(faq.id, e.target.value)}
//                     className="w-full p-2 mt-2 border border-gray-300 rounded-md"
//                     placeholder="Type your answer here..."
//                   />
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No FAQs available in this language.</p>
//         )}
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="mt-6 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
//       >
//         Submit Answers
//       </button>
//     </div>
//   );
// };

// export default FaqList;
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [lang, setLang] = useState("en");

  // Fetch FAQs from the API
  const fetchFaqs = async () => {
    const response = await fetch(`https://bharatfdtest.onrender.com/api/faqs/?lang=${lang}`);
    const data = await response.json();
    setFaqs(data);
  };

  useEffect(() => {
    fetchFaqs();
  }, [lang]);

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-md shadow-md">
      <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-md p-2">
        {faqs.length > 0 ? (
          <ul className="space-y-4">
            {faqs.map((faq) => (
              <li key={faq.id} className="p-4 border-b border-gray-200">
                <div>
                  <strong className="text-blue-600">Q: </strong>{parse(faq.question)}
                </div>
                <div className="mt-2">
                  <strong className="text-green-600">A: </strong>{parse(faq.answer)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No FAQs available in this language.</p>
        )}
      </div>
    </div>
  );
};

export default FaqList;

