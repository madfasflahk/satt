import React from 'react';
import axios from 'axios';

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
const NoticeBoard = async () => {
    const notice = await getCurrentResult(
        `${process.env.NEXT_PUBLIC_API_URL}notice`
    );
    return (
        <div className="my-8 bg-red-900">
            {notice && notice.map((e, i) => (
                <div key={i} className="mb-4 border-2 border-blue-500 rounded-lg my-7">
                    <div className="p-4 text-center">
                        <h3 className="text-xl font-medium mb-4">
                            {e.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {e.notice}
                        </p>
                        <p className="text-lg text-blue-500">
                            {e.designation}
                        </p>
                        <p className="text-lg font-bold text-red-500">
                            {e.name}
                        </p>
                        <p className="text-lg text-blue-500">
                            {e.number}
                        </p>
                        <p className="text-lg text-blue-500">
                            {e.note}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NoticeBoard;
