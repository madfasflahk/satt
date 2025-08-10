import axios from 'axios';
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
const Importantfact = async() => {


 const importantFact = await getCurrentResult(
    `${process.env.NEXT_PUBLIC_API_URL}/importantFact`
  );



    return (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold mb-4">Important Facts about Satta King game</h3>
            <hr className="border-gray-200 mb-6" />
            <p className="text-base mb-6">
                Satta king game is a popular gambling game, that originated in India. Here are some important aspects of this game.
            </p>
            <ul className="space-y-2">
                {importantFact && importantFact.map((e) => (
                    <li key={e._id} className="flex items-start py-1">
                        <span
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2 mt-1.5"
                        />
                        <p className="text-base">{e.importantFactSatta}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Importantfact
