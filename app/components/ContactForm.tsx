"use client";

import { useState } from "react";

interface ContactFormProps {
  onClose?: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const formData = new FormData(e.target);
    formData.append("topic", formData.get("subject") as string);

    // 👇 ACCESS KEY HERE
    formData.append("access_key", "4552e113-b8ed-4bce-9dde-ce725f43b955"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Success! We will be in touch soon.");
        e.target.reset();
        if (onClose) {
            setTimeout(() => onClose(), 2000);
        }
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } catch (error) {
      setResult("Connection error. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  return (
    // 👇 FIXED: Added max-height and scrolling for small phones
    <div className="w-full max-w-md mx-auto bg-[#111] p-5 md:p-8 rounded-3xl border border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto scrollbar-hide">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-white">Send a Message</h3>
        {/* Mobile Close 'X' */}
        {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-white transition p-2">✕</button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
        
        {/* Name */}
        <div>
          <label className="block text-[10px] text-gray-400 mb-1 ml-2 font-bold tracking-wider">NAME</label>
          <input type="text" name="name" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" placeholder="John Doe" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[10px] text-gray-400 mb-1 ml-2 font-bold tracking-wider">EMAIL</label>
          <input type="email" name="email" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" placeholder="john@example.com" />
        </div>

        {/* Radio Buttons */}
        <div>
          <label className="block text-[10px] text-indigo-400 mb-2 ml-2 font-bold tracking-wider uppercase">* Select Topic</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer p-2 md:p-3 rounded-xl bg-[#050505] border border-white/10 hover:border-indigo-500/50 transition group">
              <input type="radio" name="subject" value="New Project" required className="accent-indigo-500 w-4 h-4 cursor-pointer" />
              <span className="text-xs md:text-sm text-gray-300 group-hover:text-white transition">HeiyuDigital</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-2 md:p-3 rounded-xl bg-[#050505] border border-white/10 hover:border-indigo-500/50 transition group">
              <input type="radio" name="subject" value="HeiyuBudget Support" required className="accent-indigo-500 w-4 h-4 cursor-pointer" />
              <span className="text-xs md:text-sm text-gray-300 group-hover:text-white transition">HeiyuBudget </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-2 md:p-3 rounded-xl bg-[#050505] border border-white/10 hover:border-indigo-500/50 transition group">
              <input type="radio" name="subject" value="HeiyuQuiz Feedback" required className="accent-indigo-500 w-4 h-4 cursor-pointer" />
              <span className="text-xs md:text-sm text-gray-300 group-hover:text-white transition">HeiyuQuiz</span>
            </label>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-[10px] text-gray-400 mb-1 ml-2 font-bold tracking-wider">MESSAGE</label>
          <textarea name="message" required rows={3} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition resize-none" placeholder="How can we help?"></textarea>
        </div>

        {/* BUTTONS ROW */}
        <div className="flex gap-3 pt-2">
            {onClose && (
                <button 
                    type="button" 
                    onClick={onClose}
                    className="flex-1 bg-transparent border border-white/20 text-gray-300 font-bold py-3 rounded-xl hover:bg-white/10 transition text-sm"
                >
                    Cancel
                </button>
            )}
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-[2] bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition disabled:opacity-50 text-sm"
            >
                {isSubmitting ? "Sending..." : "Send Message"}
            </button>
        </div>

        {result && <p className={`text-center text-xs mt-4 ${result.includes("Success") ? "text-green-400" : "text-red-400"}`}>{result}</p>}
      </form>
    </div>
  );
}