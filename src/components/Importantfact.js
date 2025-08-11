import axios from 'axios';
import parse from "html-react-parser";

import React from 'react'
const getCurrentResult = async (url) => {
  try {
    const response = await axios.get(url, {
      params: { cache: 'no-cache' },
      headers: { 'Content-Type': 'application/json' }
    });


    const responseData = response.data;

    return responseData;
  } catch (error) {
    console.error('Error in getCurrentResult:', error);
    throw error;
  }
};
const Importantfact = async () => {


  const importantFact = await getCurrentResult(
    `${process.env.NEXT_PUBLIC_API_URL}/importantFact`
  );


  return (
    <div className=" rounded-lg shadow-md  ">

      <ul className="">
        {importantFact && importantFact.map((e) => (
          <li key={e._id} className="flex items-start  border-l-4 border-red-500 bg-white mb-5 rounded py-8 px-2">
           

            <div className="text-gray-700 text-center mb-4">
              {parse(e.importantFactSatta)}
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default Importantfact
