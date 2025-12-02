"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const consent = localStorage.getItem("heiyu_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("heiyu_cookie_consent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#111]/95 backdrop-blur-md border-t border-white/10 p-4 z-50 animate-fade-in-up shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-300 text-center md:text-left leading-relaxed max-w-2xl">
          🍪 We use cookies to ensure you get the best experience on our website. 
          By continuing, you accept our use of cookies.{" "}
          <a href="/privacy" className="text-indigo-400 underline hover:text-indigo-300">
            Read Privacy Policy
          </a>
        </p>
        <div className="flex gap-3">
          <button 
            onClick={acceptCookies}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-full transition shadow-lg shadow-indigo-500/20"
          >
            Accept
          </button>
          <button 
            onClick={() => setShow(false)}
            className="px-4 py-2 bg-transparent border border-white/20 text-gray-400 hover:text-white text-xs font-bold rounded-full transition hover:bg-white/5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}