import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-red-800 text-white py-6 mt-8">
      <div className="container max-w-6xl mx-auto px-4">
        <h3 className="text-xl font-bold text-center mb-4">
          Kolkata Satta
        </h3>
        <p className="text-lg text-center">
          Your trusted source for Satta King results and charts.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <Link href="#" className="hover:underline">
            About
          </Link>
          <Link href="#" className="hover:underline">
            Disclaimer
          </Link>
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline">
            Sitemap
          </Link>
        </div>
        <p className="text-sm text-center mt-4">
          {'Copyright © '}
          <Link href="https://kolkatasattapro.in/" className="hover:underline">
            Kolkata Satta
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;