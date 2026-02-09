"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Your HireX dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Track your applications, discover new roles, and stay on top of your hiring journey.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:text-blue-200"
            >
              Back to home
            </Link>
            <Link
              href="/auth/login"
              className="rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 dark:from-blue-500 dark:to-indigo-500 dark:shadow-blue-500/40"
            >
              Switch account
            </Link>
          </div>
        </header>

        {/* Stats row */}
        <section className="grid gap-4 md:grid-cols-3">
          <DashboardStat label="Total applications" value="18" trend="+3 this week" />
          <DashboardStat label="Shortlisted" value="6" trend="2 interviews scheduled" />
          <DashboardStat label="Saved jobs" value="9" trend="3 expiring soon" />
        </section>

        {/* Main content grid */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          {/* Left: applications / recommended */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 110, damping: 22 }}
              className="rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-slate-900/70"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50 sm:text-base">
                    Recent applications
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    A quick view of where your profile has been submitted.
                  </p>
                </div>
                <button className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-100 dark:hover:text-blue-200">
                  View all
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <ApplicationRow
                  title="Frontend Engineer"
                  company="PixelStack Labs"
                  status="Under review"
                  meta="Applied 3 days ago · Bengaluru · Remote"
                />
                <ApplicationRow
                  title="Product Designer"
                  company="Aurora Systems"
                  status="Interview scheduled"
                  meta="Interview on Tue · Mumbai"
                />
                <ApplicationRow
                  title="Junior Developer (Fresher)"
                  company="CloudBridge"
                  status="Application sent"
                  meta="Applied 1 week ago · Pune"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, type: "spring", stiffness: 110, damping: 22 }}
              className="rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-slate-900/70"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50 sm:text-base">
                    Recommended for you
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Based on your skills and recent activity.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <RecommendedJob
                  title="React Developer"
                  company="NorthBridge Fintech"
                  location="Gurugram · Hybrid"
                  tags={["React", "TypeScript", "3–5 yrs"]}
                />
                <RecommendedJob
                  title="Associate Product Manager"
                  company="BlueOrbit"
                  location="Bengaluru"
                  tags={["0–2 yrs", "Product", "Agile"]}
                />
                <RecommendedJob
                  title="Talent Acquisition Partner"
                  company="HireX Partner Network"
                  location="Remote (India)"
                  tags={["Recruitment", "Stakeholder mgmt", "3–6 yrs"]}
                />
                <RecommendedJob
                  title="Full‑stack Engineer"
                  company="NovaStack"
                  location="Chennai · Remote"
                  tags={["Node.js", "React", "4–7 yrs"]}
                />
              </div>
            </motion.div>
          </div>

          {/* Right: activity & saved searches */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 24 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-slate-900/70">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50 sm:text-base">Activity timeline</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Stay updated on your recent movements inside HireX.
              </p>

              <ol className="mt-4 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      Interview scheduled with Aurora Systems
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Product Designer · Tue, 11:00 AM · Google Meet
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      Profile viewed by PixelStack Labs
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Frontend Engineer · 2 hours ago</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      You saved a search for &quot;Remote React roles&quot;
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Yesterday · 8 new jobs added</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-slate-900/70">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50 sm:text-base">Saved searches</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quickly re-run the filters you use most often.
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                <span className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80">
                  Frontend · Bengaluru · 3–5 yrs
                </span>
                <span className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80">
                  Product Manager · Remote
                </span>
                <span className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80">
                  Fresher · NCR
                </span>
                <span className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80">
                  Recruiter · Mumbai
                </span>
              </div>
            </div>
          </motion.aside>
        </section>
      </div>
    </div>
  );
}

type StatProps = {
  label: string;
  value: string;
  trend: string;
};

const DashboardStat = ({ label, value, trend }: StatProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 120, damping: 24 }}
    className="rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-md shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-slate-900/70"
  >
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
    <p className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-300">{trend}</p>
  </motion.div>
);

type ApplicationRowProps = {
  title: string;
  company: string;
  status: string;
  meta: string;
};

const ApplicationRow = ({ title, company, status, meta }: ApplicationRowProps) => (
  <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950/60">
    <div>
      <p className="text-[13px] font-semibold text-slate-900 dark:text-slate-50">{title}</p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        {company} · {status}
      </p>
      <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-500">{meta}</p>
    </div>
    <button className="rounded-full border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-100 dark:hover:text-blue-200">
      View
    </button>
  </div>
);

type RecommendedJobProps = {
  title: string;
  company: string;
  location: string;
  tags: string[];
};

const RecommendedJob = ({ title, company, location, tags }: RecommendedJobProps) => (
  <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
    <div>
      <p className="text-[13px] font-semibold text-slate-900 dark:text-slate-50">{title}</p>
      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
        {company} · {location}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-slate-600 dark:text-slate-200">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-200/50 px-2 py-0.5 text-[10px] text-sky-700 dark:bg-slate-800/80 dark:text-sky-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <button className="mt-3 inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-blue-600 hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:text-blue-300 dark:hover:text-blue-200">
      View details
    </button>
  </div>
);
