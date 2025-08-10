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
const AlterNative = async() => {
     const alterNative = await getCurrentResult(
    `${process.env.NEXT_PUBLIC_API_URL}/alterNative`
  );
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-4">Alternative Of Satta King</h3>
            <hr className="border-gray-200 mb-6" />
            <p className="text-base mb-6">
                Today Satta King&apos;s popularity is increasing among people due to the opportunity to earn more money in less time and not only Satta King but also many other online games whose number of players is increasing day by day. Here are some alternatives for Satta King:
            </p>
            <ul className="space-y-1">
                {alterNative && alterNative.map((e) => (
                    <li key={e._id} className="flex items-start py-1">
                        <span
                            className="w-2 h-2 rounded-full bg-purple-500 mr-2 mt-1.5"
                        />
                        <p className="text-base">{e.alternative}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AlterNative
