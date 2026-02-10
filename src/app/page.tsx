"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PublicNavbar } from "@/components/PublicNavbar";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[30%] -left-[10%] h-[70vw] w-[70vw] animate-pulse rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/10" />
        <div className="absolute top-[20%] -right-[10%] h-[60vw] w-[60vw] animate-pulse rounded-full bg-purple-400/20 blur-[120px] delay-1000 dark:bg-purple-600/10" />
        <div className="absolute -bottom-[20%] left-[20%] h-[50vw] w-[50vw] animate-pulse rounded-full bg-cyan-400/20 blur-[120px] delay-2000 dark:bg-cyan-600/10" />
      </div>

      <PublicNavbar />

      <main className="relative z-10 mx-auto flex min-h-screen flex-col px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* Hero + Search (Naukri Style) */}
        <section className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 110, damping: 22 }}
            className="w-full max-w-4xl space-y-8"
          >
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Find your{" "}
              <span className="bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-emerald-300">
                dream job
              </span>{" "}
              now
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              5 lakh+ jobs for you to explore
            </p>

            {/* Centered Search Bar */}
            <JobSearchForm />

            {/* Summer Offer Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="relative mx-auto mt-8 w-full max-w-2xl overflow-hidden rounded-2xl bg-linear-to-r from-orange-500 to-rose-500 p-1 shadow-lg shadow-orange-500/20"
            >
              <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-md sm:flex-row sm:px-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl">
                    ☀️
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Summer Hiring Festival</h3>
                    <p className="text-sm font-medium text-white/90">
                      Get <span className="font-bold text-yellow-300">50% OFF</span> on premium job postings!
                    </p>
                  </div>
                </div>
                <button 
                  suppressHydrationWarning
                  className="whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm font-bold text-rose-600 transition-transform hover:scale-105 active:scale-95"
                >
                  Claim Offer
                </button>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Categories / Quick Chips */}
        <section className="mt-12">
          <div className="mx-auto max-w-6xl">
             <div className="flex flex-wrap justify-center gap-4">
                <QuickChip label="Remote" />
                <QuickChip label="MNC" />
                <QuickChip label="Banking" />
                <QuickChip label="Internship" />
                <QuickChip label="Fintech" />
                <QuickChip label="Startup" />
                <QuickChip label="Data Science" />
             </div>
          </div>
        </section>

        {/* Top Companies Hiring */}
        <section className="mx-auto mt-20 w-full max-w-6xl">
          <div className="mb-8 text-center">
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Top companies hiring now</h2>
             <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Featured companies actively looking for talent</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
             <CompanyCard name="PixelStack" type="MNC" />
             <CompanyCard name="BlueOrbit" type="Startup" />
             <CompanyCard name="CloudBridge" type="Fintech" />
             <CompanyCard name="Aurora" type="SaaS" />
             <CompanyCard name="NovaStack" type="AI/ML" />
          </div>
        </section>

        {/* Featured Opportunities (Previously Public Preview) */}
        <section className="mx-auto mt-20 w-full max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
             <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured opportunities</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Hand-picked roles for you</p>
             </div>
             <Link href="/dashboard" className="text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">View all &rarr;</Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
             <JobHighlight title="Frontend Engineer" company="PixelStack Labs" location="Bengaluru" type="Full-time" />
             <JobHighlight title="Product Manager" company="NorthBridge Fintech" location="Gurugram" type="Hybrid" />
             <JobHighlight title="UX Designer" company="Aurora Systems" location="Mumbai" type="Remote" />
             <JobHighlight title="Backend Dev" company="CloudBridge" location="Pune" type="Full-time" />
             <JobHighlight title="Data Analyst" company="NovaStack" location="Hyderabad" type="Hybrid" />
             <JobHighlight title="HR Specialist" company="HireX" location="Delhi" type="Contract" />
          </div>
        </section>

        {/* Categories & Value Props (Reused) */}
        <section className="mx-auto mt-20 w-full max-w-6xl space-y-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
                Explore jobs by category
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Quickly jump into the type of roles you&apos;re looking for.
              </p>
            </div>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              badge="In-demand"
              title="Software & IT"
              items={["Frontend", "Backend", "Full‑stack", "DevOps"]}
            />
            <CategoryCard
              badge="Business"
              title="Product & Management"
              items={["Product Manager", "Project Manager", "Business Analyst"]}
            />
            <CategoryCard
              badge="Creative"
              title="Design & Marketing"
              items={["UI/UX Designer", "Brand Marketing", "Content Specialist"]}
            />
            <CategoryCard
              badge="Early career"
              title="Fresher & Internships"
              items={["Campus roles", "Internships", "Graduate programs"]}
            />
          </div>
        </section>

        {/* Recruiters / CTA Section */}
        <section className="mx-auto mt-20 w-full max-w-6xl">
           <div className="rounded-3xl border border-slate-200/60 bg-white/60 p-8 text-center shadow-lg dark:border-slate-800/80 dark:bg-slate-900/60">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Accelerate your hiring</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Join thousands of recruiters finding top talent on HireX.</p>
              <div className="mt-6 flex justify-center gap-4">
                 <Link href="/auth/register" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500">Post a Job for Free</Link>
                 <Link href="/contact" className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Contact Sales</Link>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}

const QuickChip = ({ label }: { label: string }) => (
  <button 
    suppressHydrationWarning
    className="rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:text-blue-400"
  >
    {label}
  </button>
);

const CompanyCard = ({ name, type }: { name: string; type: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200/60 bg-white/60 p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/60">
     <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
        <span className="text-xl font-bold text-slate-700 dark:text-slate-300">{name[0]}</span>
     </div>
     <div>
        <h3 className="font-semibold text-slate-900 dark:text-white">{name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">{type}</p>
     </div>
     <button suppressHydrationWarning className="mt-1 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">View jobs</button>
  </div>
);

type StatPillProps = {
  label: string;
  value: string;
};

const StatPill = ({ label, value }: StatPillProps) => (
  <div className="rounded-2xl border border-slate-200/60 bg-white/50 p-3 dark:border-slate-800/80 dark:bg-slate-900/60">
    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">{value}</p>
  </div>
);

const JobSearchForm = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.05, type: "spring", stiffness: 120, damping: 24 }}
    className="relative z-20 mx-auto w-full max-w-4xl"
  >
    {/* Desktop View */}
    <div className="hidden rounded-full border border-slate-200 bg-white p-2 shadow-2xl shadow-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-blue-500/20 sm:block">
      <div className="flex flex-row items-center">
        {/* Search Input 1 */}
        <div className="relative flex-1 px-4 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl">
           <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Skills / Company</label>
           <input 
              suppressHydrationWarning
              type="text" 
              placeholder="Role, Skill or Company" 
              className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
           />
        </div>

        <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />

        {/* Search Input 2 */}
        <div className="relative flex-1 px-4 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl">
           <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Location</label>
           <input 
              suppressHydrationWarning
              type="text" 
              placeholder="City or Remote" 
              className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
           />
        </div>

        <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />

        {/* Search Input 3 */}
        <div className="relative w-48 px-4 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl">
           <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Experience</label>
           <select 
             suppressHydrationWarning
             className="w-full cursor-pointer bg-transparent text-sm font-semibold text-slate-900 focus:outline-none dark:text-white"
           >
              <option value="" className="dark:bg-slate-900">Select Yrs</option>
              <option value="0-1" className="dark:bg-slate-900">Fresher (0-1)</option>
              <option value="1-3" className="dark:bg-slate-900">1-3 Years</option>
              <option value="3-5" className="dark:bg-slate-900">3-5 Years</option>
              <option value="5+" className="dark:bg-slate-900">5+ Years</option>
           </select>
        </div>

        <button
          suppressHydrationWarning
          type="button"
          className="m-1 rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/50 active:scale-95"
        >
          Search
        </button>
      </div>
    </div>

    {/* Mobile View */}
    <div className="flex flex-col gap-3 sm:hidden">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-blue-500/5 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4">
          <div className="relative border-b border-slate-100 pb-2 dark:border-slate-800">
             <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">What</label>
             <input 
                suppressHydrationWarning
                type="text" 
                placeholder="Job title, key words or company" 
                className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
             />
          </div>

          <div className="relative border-b border-slate-100 pb-2 dark:border-slate-800">
             <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Where</label>
             <input 
                suppressHydrationWarning
                type="text" 
                placeholder="City, state or zip code" 
                className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
             />
          </div>

          <div className="relative">
             <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Experience</label>
             <select 
               suppressHydrationWarning
               className="w-full cursor-pointer bg-transparent text-sm font-semibold text-slate-900 focus:outline-none dark:text-white"
             >
                <option value="" className="dark:bg-slate-900">Select Experience</option>
                <option value="0-1" className="dark:bg-slate-900">Fresher (0-1)</option>
                <option value="1-3" className="dark:bg-slate-900">1-3 Years</option>
                <option value="3-5" className="dark:bg-slate-900">3-5 Years</option>
                <option value="5+" className="dark:bg-slate-900">5+ Years</option>
             </select>
          </div>
        </div>
      </div>
      
      <button
        suppressHydrationWarning
        type="button"
        className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 active:scale-95"
      >
        Search Jobs
      </button>
    </div>
  </motion.div>
);

type JobHighlightProps = {
  title: string;
  company: string;
  location: string;
  type: string;
};

const JobHighlight = ({ title, company, location, type }: JobHighlightProps) => (
  <div className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200/50 bg-white/50 px-3 py-3 dark:border-slate-800/80 dark:bg-slate-950/60">
    <div>
      <p className="text-[13px] font-semibold text-slate-900 dark:text-slate-50">{title}</p>
      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
        {company} · {location}
      </p>
      <p className="mt-1 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-sky-600 dark:bg-slate-900/80 dark:text-sky-300">
        {type}
      </p>
    </div>
    <button suppressHydrationWarning className="rounded-full border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-100 dark:hover:text-blue-200">
      View
    </button>
  </div>
);

type CategoryCardProps = {
  badge: string;
  title: string;
  items: string[];
};

const CategoryCard = ({ badge, title, items }: CategoryCardProps) => (
  <div className="flex flex-col justify-between rounded-2xl border border-slate-200/60 bg-white/60 p-4 shadow-md shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-slate-900/60">
    <div>
      <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-600 dark:bg-slate-800/90 dark:text-sky-300">
        {badge}
      </span>
      <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
      <ul className="mt-2 space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-cyan-500 dark:bg-cyan-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <button 
      suppressHydrationWarning
      className="mt-3 inline-flex items-center justify-center text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
    >
      View roles
    </button>
  </div>
);
