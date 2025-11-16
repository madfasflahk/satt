"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-8 ">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          Kolkata Satta
        </h3>
        <p className="text-base mb-4">
          Your trusted source for Satta King results and charts.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <Link href="#" className="hover:underline text-gray-400">About</Link>
          <Link href="#" className="hover:underline text-gray-400">Disclaimer</Link>
          <Link href="#" className="hover:underline text-gray-400">Privacy Policy</Link>
          <Link href="#" className="hover:underline text-gray-400">Sitemap</Link>
        </div>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <Link href="https://kolkatasattapro.in/" className="text-gray-400 hover:underline">
            Kolkata Satta
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
