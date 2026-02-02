"use client";

import { motion } from "framer-motion";
import { PublicNavbar } from "@/components/PublicNavbar";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
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
          className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-2xl shadow-blue-500/20 backdrop-blur-xl"
        >
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Contact HireX
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Have a question about the platform, your account, or integrating HireX into your
            workflow? Send us a message and we&apos;ll get back to you.
          </p>

          <form className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us how we can help..."
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-slate-500">
                We typically respond within 1–2 business days.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60"
              >
                Send message
              </button>
            </div>
          </form>
        </motion.section>
      </main>
    </div>
  );
}

