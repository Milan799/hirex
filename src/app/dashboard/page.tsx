"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-slate-400">Welcome to HireX. Your job hunting hub.</p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/"
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700"
          >
            Home
          </Link>
          <Link
            href="/auth/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Auth
          </Link>
        </div>
      </div>
    </div>
  );
}
