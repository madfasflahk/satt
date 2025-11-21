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
import WhatsAppChat from '@/components/WhatsAppChat';




const getFreeAdsFromDb=async(admin)=>{
  const res = await fetch(`https://satt-mu.vercel.app/api/v1/freeAd?admin=${admin}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch free ads');
  }

  const data = await res.json();
  return data;
} ;

const GetResultOrder=async()=>{
  const res = await fetch(`https://satt-mu.vercel.app/api/v1/resultOrder`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 120 }, // Revalidate every 10 seconds
  });

  if (!res.ok) {
    throw new Error('Failed to fetch result order');
  }

  const data = await res.json();
  return data;  
}






export const dynamic = 'force-dynamic';

const HomePage = async () => {

  const freeAd = await getFreeAdsFromDb('1');
  const resultOrder = await GetResultOrder('1');

  return (
    <>
      {/* <Header /> */}


      <Logo />

      
    </>
  );
};

export default HomePage;

