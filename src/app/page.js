import Header from '../components/Header';

import parse from "html-react-parser";

import CurrentDay from '../components/CurrentDay';
import Importantfact from '../components/Importantfact';
import AlterNative from '../components/AlterNative';
import YearlyResult from '../components/YearlyResult';
import Footer from '../components/Footer';
import Image from 'next/image';
import CurrentResult  from '@/components/GetCurrentResult';
import Logo from '@/components/Logo';

import { getFreeAdsFromDb,GetResultOrder } from '@/lib/data/freeAd';


const HomePage = async () => {

  const freeAd = await getFreeAdsFromDb('1');
  const resultOrder = await GetResultOrder('1');

  return (
    <>
      {/* <Header /> */}


      <Logo />

      <div className="mx-auto bg-zinc-950 ">
        <div className="">
          {freeAd.slice(0, -1).map((e) => (
            <div key={e._id} className='bg-gradient-to-r from-[#f44305] via-[#f47b1f] to-[#f8d12f] py-5 my-4 px-4'>
              <div

                className="max-w-3xl my-6 mx-auto text-center bg-gradient-to-r from-[#0bb36d] to-[#1ea97c] text-white rounded-3xl shadow-lg py-10 px-6 md:px-10 transition-transform duration-300 hover:scale-[1.02]"
              >
                {/* Title */}
                <h3 className="text-2xl font-bold mb-3">{e.title}</h3>

                {/* Main Message */}
                <p className="text-lg md:text-xl font-semibold leading-relaxed">
                  {parse(e.content)}
                </p>

                {/* Optional Subtext or Fees */}
                {e.aboutFees && (
                  <p className="text-yellow-200 text-lg font-bold mt-2">
                    {e.aboutFees}
                  </p>
                )}

                {/* Contact Name */}
                {e.name && (
                  <p className="text-white text-lg mt-2 font-bold">{e.name}</p>
                )}

                {/* WhatsApp Button */}
                <div className="mt-6 flex justify-center">
                  <a
                    href={`https://wa.me/${e.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-black font-bold py-2.5 px-5 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 animate-blink"
                  >
                    <img
                      src="/whatsapp.png"
                      alt="WhatsApp"
                      className="w-6 h-6"
                    />
                    Join WhatsApp Channel
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>








        {/* <CurrentResult resultOrder={resultOrder} /> */}


        {freeAd.slice(-1).map((e) => (
          <div key={e._id} className='bg-gradient-to-r from-[#f44305] via-[#f47b1f] to-[#f8d12f] py-5 my-4 px-4'>
            <div

              className="max-w-3xl my-6 mx-auto text-center bg-gradient-to-r from-[#0bb36d] to-[#1ea97c] text-white rounded-3xl shadow-lg py-10 px-6 md:px-10 transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Title */}
              <h3 className="text-2xl font-bold mb-3">{e.title}</h3>

              {/* Main Message */}
              <p className="">
                {parse(e.content)}
              </p>

              {/* Optional Subtext or Fees */}
              {e.aboutFees && (
                <p className="text-yellow-200 text-lg font-bold mt-2">
                  {e.aboutFees}
                </p>
              )}

              {/* Contact Name */}
              {e.name && (
                <p className="text-white text-lg mt-2 font-bold">{e.name}</p>
              )}

              {/* WhatsApp Button */}
              <div className="mt-6 flex justify-center">
                <a
                  href={`https://wa.me/${e.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-black font-bold py-2.5 px-5 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 animate-blink"
                >
                  <img
                    src="/whatsapp.png"
                    alt="WhatsApp"
                    className="w-6 h-6"
                  />
                  Join WhatsApp Channel
                </a>
              </div>
            </div>
          </div>
        ))}














        <CurrentDay resultOrder={resultOrder} />

        <YearlyResult  resultOrder={resultOrder} />
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

