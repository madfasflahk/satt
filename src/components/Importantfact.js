import parse from "html-react-parser";
import React from "react";
import DOMPurify from "dompurify";
import HtmlRender from "./HtmlRender";
const getCurrentResult = async () => {
  try {
    

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}importantFactSatta`, {
      next: { revalidate: 30 },   // ⭐ FIXED
      headers: { "Content-Type": "application/json" },
    });
  
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getCurrentResult:", error);
    throw error;
  }
};


const Importantfact = async () => {
  const importantFact = await getCurrentResult();
  return (
    <div className="bg-gradient-to-r from-[#f44305] via-[#f47b1f] to-[#f8d12f] py-10 px-4 rounded-xl shadow-lg">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-2xl font-extrabold text-white mb-8 drop-shadow-lg uppercase">
          Important Facts About Satta King
        </h2>

        <ul className="space-y-6">
          {importantFact &&
            importantFact.map((e) => (
              <li
                key={e._id}
                className="bg-white border-l-4 border-[#b91c1c] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 px-2 py-4"
              >
                
                  <HtmlRender data={e.importantFactSatta} />
               </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Importantfact;
