"use client";

import { useEffect } from "react";

type CaseStudyModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function CaseStudyModal({
  open,
  onClose,
  title,
  children,
}: CaseStudyModalProps) {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative z-50 w-full max-w-3xl bg-zinc-900 text-white rounded-2xl shadow-xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto border border-white/10 animate-in fade-in zoom-in-50 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="text-sm text-zinc-400 hover:text-white"
          >
            ← Back
          </button>

          <h2 className="text-lg font-semibold tracking-wide">
            {title}
          </h2>

          <div className="w-10" />
        </div>

        {/* Body */}
        <div className="prose prose-invert max-w-none pb-20">
          {children}
        </div>

        {/* Bottom-right Done */}
        <button
          onClick={onClose}
          className="
            fixed
            bottom-8
            right-8
            z-[60]
            px-5
            py-2.5
            bg-white
            text-zinc-900
            rounded-full
            shadow-xl
            hover:bg-zinc-200
            transition
          "
        >
          Done ✓
        </button>
      </div>
    </div>
  );
}
