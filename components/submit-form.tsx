"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Sparkles, Send } from "lucide-react";

export function SubmitForm() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    category: "",
    price: "Free",
    description: "",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="glossy-card mx-auto max-w-2xl p-6 sm:p-12 relative overflow-hidden border-2 border-[#a3ff12]/30 shadow-[0_0_50px_rgba(163,255,18,0.1)]">
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#a3ff12]/20 blur-3xl animate-pulse-glow" />

      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Submit an AI Tool
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-[#9eb19a] leading-relaxed mb-8">
          Tell us about the tool. We manually review every submission to verify utility, polish, and trustworthiness before featuring it.
        </p>

        {sent ? (
          <div className="rounded-2xl border-2 border-[#a3ff12]/60 bg-gradient-to-b from-[#a3ff12]/20 to-[#0e160a] p-8 text-center space-y-4 shadow-[0_0_35px_rgba(163,255,18,0.25)] animate-fade-up">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a3ff12] text-[#040603] font-black shadow-[0_0_25px_rgba(163,255,18,0.6)]">
              <Check size={28} className="stroke-[3]" />
            </div>
            <h3 className="text-xl font-black text-white">Submission Received!</h3>
            <p className="text-xs sm:text-sm text-[#b8ccb5] max-w-md mx-auto leading-relaxed">
              Thank you for contributing to AIFindr! Our curation team will test <span className="text-[#a3ff12] font-bold">{formData.name || "the tool"}</span> and feature it if it meets our standards.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setFormData({ name: "", url: "", category: "", price: "Free", description: "" });
              }}
              className="mt-4 btn-glossy-primary text-xs py-2 px-5"
            >
              <span>Submit Another Tool</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="tool-name" className="text-xs font-bold text-[#d8edd4]">
                  Tool Name <span className="text-[#a3ff12]">*</span>
                </label>
                <input
                  id="tool-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Cursor, Suno, Midjourney"
                  className="w-full rounded-xl border border-[#23351b] bg-[#070c05]/90 px-4 py-3 text-xs text-white placeholder-[#5a6b57] outline-none focus:border-[#a3ff12] focus:ring-1 focus:ring-[#a3ff12] focus:shadow-[0_0_15px_rgba(163,255,18,0.3)] transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="tool-url" className="text-xs font-bold text-[#d8edd4]">
                  Website URL <span className="text-[#a3ff12]">*</span>
                </label>
                <input
                  id="tool-url"
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-[#23351b] bg-[#070c05]/90 px-4 py-3 text-xs text-white placeholder-[#5a6b57] outline-none focus:border-[#a3ff12] focus:ring-1 focus:ring-[#a3ff12] focus:shadow-[0_0_15px_rgba(163,255,18,0.3)] transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="tool-category" className="text-xs font-bold text-[#d8edd4]">
                  Primary Category <span className="text-[#a3ff12]">*</span>
                </label>
                <select
                  id="tool-category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-[#23351b] bg-[#070c05]/90 px-4 py-3 text-xs text-[#dce8da] outline-none focus:border-[#a3ff12] transition-colors cursor-pointer font-medium"
                >
                  <option value="" disabled>Select category</option>
                  {[
                    "AI assistants",
                    "Writing",
                    "Image generation",
                    "Research",
                    "Productivity",
                    "Audio",
                    "Coding",
                    "Video",
                    "Design",
                    "Education",
                    "Automation",
                    "Marketing",
                  ].map((c) => (
                    <option key={c} value={c} className="bg-[#0b1208]">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="tool-price" className="text-xs font-bold text-[#d8edd4]">
                  Pricing Model
                </label>
                <select
                  id="tool-price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-xl border border-[#23351b] bg-[#070c05]/90 px-4 py-3 text-xs text-[#dce8da] outline-none focus:border-[#a3ff12] transition-colors cursor-pointer font-medium"
                >
                  <option value="Free" className="bg-[#0b1208]">Free / Freemium Available</option>
                  <option value="Paid" className="bg-[#0b1208]">Paid Only</option>
                  <option value="Check pricing" className="bg-[#0b1208]">Custom / Contact</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="tool-description" className="text-xs font-bold text-[#d8edd4]">
                What makes this tool special? <span className="text-[#a3ff12]">*</span>
              </label>
              <textarea
                id="tool-description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Give a brief summary of what this tool achieves, who it's for, and why it stands out..."
                className="w-full rounded-xl border border-[#23351b] bg-[#070c05]/90 px-4 py-3 text-xs text-white placeholder-[#5a6b57] outline-none focus:border-[#a3ff12] focus:ring-1 focus:ring-[#a3ff12] focus:shadow-[0_0_15px_rgba(163,255,18,0.3)] transition-all resize-y font-medium"
              />
            </div>

            <button
              type="submit"
              className="btn-glossy-primary w-full py-4 text-sm font-black"
            >
              <Send size={16} />
              <span>Submit for Verification</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
