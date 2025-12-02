"use client";

import { useState } from "react";

export default function ContactForm() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Stops page reload
    
    // HTML5 'required' attribute handles the validation before this function runs.
    // If we are here, a radio button IS selected.

    setIsSubmitting(true);
    setResult("");

    const formData = new FormData(e.target);
    
    // 👇 PASTE YOUR ACCESS KEY HERE
    formData.append("access_key", "YOUR-ACCESS-KEY-GOES-HERE"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Success! We will be in touch soon.");
        e.target.reset(); // Clears form (and unchecks radio buttons)
      } else {
        setResult("Something went wrong. Please try again or email us directly.");
      }
    } catch (error) {
      setResult("Connection error. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#111] p-8 rounded-3xl border border-white/10 shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Send a Message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Name */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 ml-2 font-bold tracking-wider">NAME</label>
          <input 
            type="text" 
            name="name" 
            required 
            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 ml-2 font-bold tracking-wider">EMAIL</label>
          <input 
            type="email" 
            name="email" 
            required 
            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
            placeholder="john@example.com"
          />
        </div>

        {/* 👇 RADIO BUTTONS (None selected by default + Required) */}
        <div>
          <label className="block text-xs text-indigo-400 mb-3 ml-2 font-bold tracking-wider uppercase">
            * Please select a Topic (Required)
          </label>
          <div className="flex flex-col gap-2">
            
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-[#050505] border border-white/10 hover:border-indigo-500/50 transition group">
              <input 
                type="radio" 
                name="subject" 
                value="New Project (HeiyuDigital)" 
                required 
                className="accent-indigo-500 w-4 h-4 cursor-pointer" 
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition">HeiyuDigital</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-[#050505] border border-white/10 hover:border-indigo-500/50 transition group">
              <input 
                type="radio" 
                name="subject" 
                value="HeiyuBudget Support" 
                required 
                className="accent-indigo-500 w-4 h-4 cursor-pointer" 
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition">HeiyuBudget</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-[#050505] border border-white/10 hover:border-indigo-500/50 transition group">
              <input 
                type="radio" 
                name="subject" 
                value="HeiyuQuiz Feedback" 
                required 
                className="accent-indigo-500 w-4 h-4 cursor-pointer" 
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition">HeiyuQuiz</span>
            </label>

          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 ml-2 font-bold tracking-wider">MESSAGE</label>
          <textarea 
            name="message" 
            required 
            rows={4}
            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition resize-none"
            placeholder="How can we help?"
          ></textarea>
        </div>

        {/* Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {/* Success/Error Message */}
        {result && (
          <p className={`text-center text-sm mt-4 ${result.includes("Success") ? "text-green-400" : "text-red-400"}`}>
            {result}
          </p>
        )}
      </form>
    </div>
  );
}