"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/freeAd`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          next: { revalidate: 60 },
        });
        const data = await response.json();
        if (data && data.length > 0) {
          setChatData(data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch chat data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (loading || !chatData) {
    return (
        <div
        className="fixed bottom-5 right-5 bg-white rounded-full p-3 cursor-pointer z-50"
      >
        <Image src="/whatsapp.png" alt="WhatsApp" width={40} height={40} />
      </div>
    );
  }

  const { title, content, number } = chatData;
  const whatsappLink = `https://wa.me/${number}?text=${encodeURIComponent(content)}`;

  return (
    <div>
      <div
        className="fixed bottom-5 right-5 bg-white rounded-full p-3 cursor-pointer z-50"
        onClick={toggleChat}
      >
        <Image src="/whatsapp.png" alt="WhatsApp" width={40} height={40} />
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
              <Image src="/satta-king2.png" alt="User" width={100} height={100} />
            </div>
          </div>
          <div className="p-4 h-[400px] overflow-y-auto">
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <div className="p-4 bg-gray-100 rounded-b-lg">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 text-white text-center py-2 rounded-md hover:bg-green-600"
            >
              WhatsApp Me
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChat;