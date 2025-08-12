import Header from '../components/Header';

import parse from "html-react-parser";

import CurrentDay from '../components/CurrentDay';
import Importantfact from '../components/Importantfact';
import AlterNative from '../components/AlterNative';
import YearlyResult from '../components/YearlyResult';
import Footer from '../components/Footer';
import Image from 'next/image';
import { GetCurrentResult } from '@/components/GetCurrentResult';

const getAllFreeAd = async (url) => {
  const response = await fetch(url, {

    next: {
      revalidate: 60
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};



const HomePage = async () => {

  const freeAd = await getAllFreeAd(`${process.env.NEXT_PUBLIC_API_URL}/freeAd?admin=1`);
  
  return (
    <>
      <Header />


      <div className="container mx-auto px-4 py-8 ">
        <div className=" my-6">
          {freeAd.slice(0, -1).map((e) => (
            <div key={e._id} className="col-span-1 max-w-5xl mx-auto my-6 border py-2 rounded bg-slate-50">
              <div className="h-full   transition-all duration-300 ">
                <div className="p-4 flex-grow">
                  <h3 className="text-center text-lg md:text-xl font-bold text-blue-600  mb-2">{e.title}</h3>
                  <p className="text-gray-700 text-center mb-4">
                    {parse(e.content)}
                  </p>
                  <p className="text-xl font-bold  text-purple-600 dark:text-purple-400 text-center">{e.aboutFees}</p>
                  <p className="text-lg mt-2 text-center font-bold text-zinc-800">{e.name}</p>
                  <div className="flex items-center gap-2 justify-center mt-4">
                    <Image
                      src="/whatsapp.png"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className="rounded-lg shadow-md"
                    />
                    <a
                      href={`https://wa.me/${e.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {e.number}
                    </a>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>



       


          <GetCurrentResult />


        {freeAd.slice(-1).map((e) => (
          <div key={e._id} className="col-span-1 max-w-5xl mx-auto my-6 border py-2 rounded bg-slate-50">
            <div className="h-full   transition-all duration-300 ">
              <div className="p-4 flex-grow">
                <h3 className="text-center text-lg md:text-xl font-bold text-blue-600  mb-2">{e.title}</h3>
                <p className="text-gray-700  text-center mb-4">{e.content}</p>
                <p className="text-xl font-bold  text-purple-600 dark:text-purple-400 text-center">{e.aboutFees}</p>
                <p className="text-lg mt-2 text-center font-bold text-zinc-800">{e.name}</p>
                <div className="flex items-center gap-2 justify-center mt-4">
                  <Image
                    src="/whatsapp.png"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="rounded-lg shadow-md"
                  />
                  <a
                    href={`https://wa.me/${e.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {e.number}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}














        <CurrentDay />

        <YearlyResult />
        {/* <YearlyResult /> */}

        <div className='my-8'>

          <Importantfact />




        </div>
        <AlterNative />

      </div>
      <Footer />
    </>
  );
};

export default HomePage;
