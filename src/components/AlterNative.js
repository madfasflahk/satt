import axios from "axios";
import React from "react";

const getCurrentResult = async (url) => {
  try {
    const response = await axios.get(url, {
      params: { cache: "no-cache" },
      headers: { "Content-Type": "application/json" },
    });

    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error("Error in getCurrentResult:", error);
    throw error;
  }
};

const AlterNative = async () => {
  const alterNative = await getCurrentResult(
    `${process.env.NEXT_PUBLIC_API_URL}/alterNative`
  );

  return (
    <div className="bg-gradient-to-r from-[#f44305] via-[#f47b1f] to-[#f8d12f] py-10 px-4">
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#0bb36d] to-[#1ea97c] text-white rounded-3xl shadow-lg py-10 px-6 md:px-12 transition-transform duration-300 hover:scale-[1.02]">
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Alternative Of Satta King
        </h3>
        <hr className="border-white/40 mb-6 w-2/3 mx-auto" />

        {/* Paragraph */}
        <p className="text-base md:text-lg mb-6 leading-relaxed">
          Today Satta King&apos;s popularity is increasing among people due to
          the opportunity to earn more money in less time. Not only Satta King,
          but many other online games are gaining players day by day. Here are
          some popular alternatives to Satta King:
        </p>

        {/* Alternatives List */}
        <ul className="text-left inline-block mx-auto space-y-2">
          {alterNative &&
            alterNative.map((e) => (
              <li
                key={e._id}
                className="flex items-start py-1 text-base md:text-lg font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-yellow-300 mr-3 mt-2" />
                <p>{e.alternative}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AlterNative;
