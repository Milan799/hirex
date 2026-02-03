"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PublicNavbar } from "@/components/PublicNavbar";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Background mesh similar to auth page */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[30%] -left-[10%] h-[70vw] w-[70vw] animate-pulse rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[60vw] w-[60vw] animate-pulse rounded-full bg-purple-600/10 blur-[120px] delay-1000" />
        <div className="absolute -bottom-[20%] left-[20%] h-[50vw] w-[50vw] animate-pulse rounded-full bg-cyan-600/10 blur-[120px] delay-2000" />
      </div>

      <PublicNavbar />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 pt-24 pb-16 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:gap-12">
        {/* Hero text */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="max-w-xl space-y-6"
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold text-blue-300 ring-1 ring-blue-500/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Built for modern hiring teams & candidates
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            A modern way to{" "}
            <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              find talent & jobs
            </span>
          </h1>
          <p className="max-w-lg text-sm text-slate-300 sm:text-base">
            HireX connects{" "}
            <span className="font-semibold text-slate-100">candidates</span> and{" "}
            <span className="font-semibold text-slate-100">recruiters</span> with a smooth,
            animated experience, secure authentication, and MongoDB-backed data so your hiring
            journey is fast, transparent, and delightful.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/auth/register"
              className="rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60"
            >
              Get started as candidate
            </Link>
            <Link
              href="/auth/register"
              className="rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
            >
              Post a job as recruiter
            </Link>
          </div>

          <div className="mt-4 grid gap-4 text-xs text-slate-300 sm:text-sm sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3">
              <p className="text-xs font-semibold text-slate-400">Real-time</p>
              <p className="mt-1 font-semibold text-slate-100">Secure auth with NextAuth</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3">
              <p className="text-xs font-semibold text-slate-400">Data</p>
              <p className="mt-1 font-semibold text-slate-100">Stored safely in MongoDB</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3">
              <p className="text-xs font-semibold text-slate-400">Experience</p>
              <p className="mt-1 font-semibold text-slate-100">Smooth, animated UI on any device</p>
            </div>
          </div>
        </motion.section>

        {/* Side panel – “Our work” preview */}
        <motion.section
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 110, damping: 22, delay: 0.1 }}
          className="mt-10 w-full max-w-md lg:mt-0 lg:w-96"
        >
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-2xl shadow-blue-500/20 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Public Panel
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">What you can explore</h2>
            <p className="mt-2 text-xs text-slate-300">
              Browse HireX without logging in. Learn how we work, explore features, and reach us any
              time through the contact page.
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <InfoRow title="Contact us" description="Quick form for questions & support." />
              <InfoRow
                title="Our work"
                description="See how candidates and recruiters use HireX."
              />
              <InfoRow
                title="Full navigation"
                description="Access every public page from the responsive navbar."
              />
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

type InfoRowProps = {
  title: string;
  description: string;
};

const InfoRow = ({ title, description }: InfoRowProps) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-400" />
    <div>
      <p className="font-semibold text-slate-100">{title}</p>
      <p className="text-[11px] text-slate-400">{description}</p>
    </div>
  </div>
);
