import React from "react";
import parse from "html-react-parser";

const FaqList = ({ faqs, lang }) => {
  // Reverse the FAQ list to display the latest entry on top
  const reversedFaqs = [...faqs].reverse();
  console.log(faqs);

  return (
    <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-md p-2">
      {reversedFaqs.length > 0 ? (
        <ul className="space-y-4">
          {reversedFaqs.map((faq) => (
            <li key={faq.id} className="p-4 border-b border-gray-200">
              <div className="flex justify-between">
                <div>
                  <strong className="text-blue-600">Q: </strong>{parse(faq.question)}
                  <br />
                  <strong className="text-green-600">A: </strong>{parse(faq.answer)}
                </div>
                {/* <button
                  onClick={() => deleteFaq(faq.id)}
                  className="ml-4 p-2 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button> */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No FAQs available in this language.</p>
      )}
    </div>
  );
};

export default FaqList;
