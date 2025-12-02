"use client";

import { useState } from "react";

// Define the type so the form knows it might receive a close function
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
        e.target.reset();
        
        // Optional: Close the modal automatically after 2 seconds on success
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
    <div className="w-full max-w-md mx-auto bg-[#111] p-8 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Send a Message</h3>
        {/* Top corner close button (optional visual aid) */}
        {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-white transition">✕</button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Name */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 ml-2 font-bold tracking-wider">NAME</label>
          <input type="text" name="name" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" placeholder="John Doe" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 ml-2 font-bold tracking-wider">EMAIL</label>
          <input type="email" name="email" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" placeholder="john@example.com" />
        </div>

        {/* Radio Buttons */}
        <div>
          <label className="block text-xs text-indigo-400 mb-3 ml-2 font-bold tracking-wider uppercase">* Please select a Topic (Required)</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-[#050505] border border-white/10 hover:border-indigo-500/50 transition group">
              <input type="radio" name="subject" value="New Project" required className="accent-indigo-500 w-4 h-4 cursor-pointer" />
              <span className="text-sm text-gray-300 group-hover:text-white transition">HeiyuDigital (Start a Project)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-[#050505] border border-white/10 hover:border-indigo-500/50 transition group">
              <input type="radio" name="subject" value="HeiyuBudget Support" required className="accent-indigo-500 w-4 h-4 cursor-pointer" />
              <span className="text-sm text-gray-300 group-hover:text-white transition">HeiyuBudget (Taxi App)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-[#050505] border border-white/10 hover:border-indigo-500/50 transition group">
              <input type="radio" name="subject" value="HeiyuQuiz Feedback" required className="accent-indigo-500 w-4 h-4 cursor-pointer" />
              <span className="text-sm text-gray-300 group-hover:text-white transition">HeiyuQuiz (Game)</span>
            </label>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 ml-2 font-bold tracking-wider">MESSAGE</label>
          <textarea name="message" required rows={4} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition resize-none" placeholder="How can we help?"></textarea>
        </div>

        {/* BUTTONS ROW */}
        <div className="flex gap-3">
            {/* CANCEL BUTTON */}
            {onClose && (
                <button 
                    type="button" 
                    onClick={onClose}
                    className="flex-1 bg-transparent border border-white/20 text-gray-300 font-bold py-4 rounded-xl hover:bg-white/10 transition"
                >
                    Cancel
                </button>
            )}
            
            {/* SEND BUTTON */}
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-[2] bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
            >
                {isSubmitting ? "Sending..." : "Send Message"}
            </button>
        </div>

        {result && <p className={`text-center text-sm mt-4 ${result.includes("Success") ? "text-green-400" : "text-red-400"}`}>{result}</p>}
      </form>
    </div>
  );
}