"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PublicNavbar } from "@/components/layout/Navbar";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      
      if (response.ok) {
        toast.success("Message sent successfully! We will get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(result.error || "Failed to send message. Please try again later.");
      }
    } catch (error: any) {
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Background mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[30%] left-[10%] h-[60vw] w-[60vw] animate-pulse rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-25%] right-[5%] h-[70vw] w-[70vw] animate-pulse rounded-full bg-cyan-600/10 blur-[130px] delay-1000" />
      </div>

      <PublicNavbar />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 22 }}
          className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-blue-500/20"
        >
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Contact HireX
          </h1>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            Have a question about the platform, your account, or integrating HireX into your
            workflow? Send us a message and we&apos;ll get back to you.
          </p>

          <form onSubmit={onSubmit} className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className={`w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-slate-50/50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:bg-slate-900/60 dark:text-white transition-colors`}
              />
              {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-slate-50/50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:bg-slate-900/60 dark:text-white transition-colors`}
              />
              {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                Message
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us how we can help..."
                className={`w-full rounded-2xl border ${errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-slate-50/50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:bg-slate-900/60 dark:text-white transition-colors`}
              />
              {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message}</span>}
            </div>
            <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-slate-500">
                We typically respond within 1–2 business days.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>
        </motion.section>
      </main>
    </div>
  );
}

