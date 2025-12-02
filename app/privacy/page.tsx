"use client";

import Link from "next/link";
import { useState } from "react";

export default function PrivacyPolicy() {
  const [resetMsg, setResetMsg] = useState("");

  const handleResetCookies = () => {
    // 1. Delete the saved preference
    localStorage.removeItem("heiyu_cookie_consent");
    
    // 2. Show a message
    setResetMsg("Preferences cleared. Reloading...");
    
    // 3. Reload page to show banner again
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-gray-300 font-sans p-6 md:p-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-indigo-400 text-sm font-bold hover:underline mb-8 block">
          ← Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Privacy & Cookie Policy</h1>
        
        <div className="space-y-6 text-sm leading-relaxed border-t border-white/10 pt-8">
          <p><strong>Last Updated:</strong> December 2025</p>
          
          <h2 className="text-xl font-bold text-white mt-8">1. Who We Are</h2>
          <p>We are HeiyuDigital, based in Dublin, Ireland. We build software and web applications.</p>

          <h2 className="text-xl font-bold text-white mt-8">2. Cookies</h2>
          <p>
            We use essential cookies to make our site work (like remembering your preferences). 
            We do not sell your personal data to third parties.
          </p>

          {/* 👇 THE RESET BUTTON SECTION */}
          <div className="bg-[#111] p-4 rounded-lg border border-white/10 mt-4">
            <h3 className="text-white font-bold mb-2">Cookie Settings</h3>
            <p className="mb-4">You can withdraw your consent or reset your preferences at any time.</p>
            
            <button 
              onClick={handleResetCookies}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-full transition border border-white/20"
            >
              🔄 Reset Cookie Consent
            </button>
            
            {resetMsg && <span className="ml-3 text-green-400 text-xs animate-pulse">{resetMsg}</span>}
          </div>

          <h2 className="text-xl font-bold text-white mt-8">3. Data Collection</h2>
          <p>
            If you contact us via email, we keep your email address solely for the purpose of replying to your query.
            If you sign up for our apps, your data is stored securely using industry-standard encryption.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">4. Your Rights</h2>
          <p>
            Under GDPR, you have the right to ask for a copy of your data or for it to be deleted. 
            Contact us at <a href="mailto:info@heiyudigital.com" className="text-indigo-400 hover:underline">info@heiyudigital.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}