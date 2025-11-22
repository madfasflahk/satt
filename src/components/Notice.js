import React from 'react';

const getCurrentResult = async () => {
    try {
        
        const response = await fetch(`https://www.luckpatix.com/api/v1/notice`, {
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error in getCurrentResult:', error);
        throw error;
    }
};
const NoticeBoard = async () => {
    const notice = await getCurrentResult();
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
