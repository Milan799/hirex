"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PublicNavbar } from "@/components/layout/Navbar";
import { 
  FaBuilding, FaSearch, FaBriefcase, FaMapMarkerAlt, 
  FaHome, FaCogs, FaTasks, FaCertificate, FaUserTie, FaRupeeSign, 
  FaChartBar, FaLaptopCode, FaGraduationCap, FaChevronRight 
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] h-[70vw] w-[70vw] animate-pulse rounded-full bg-blue-400/10 blur-[120px] dark:bg-blue-600/5" />
        <div className="absolute top-[20%] -right-[10%] h-[60vw] w-[60vw] animate-pulse rounded-full bg-purple-400/10 blur-[120px] delay-1000 dark:bg-purple-600/5" />
      </div>

      <PublicNavbar />

      <main className="relative z-10 flex flex-col gap-12 pb-20 pt-16 sm:pt-24">
        
        {/* HERO SECTION */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              Find your <span className="text-blue-600 dark:text-blue-400">dream job</span> now
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg text-slate-600 dark:text-slate-400"
            >
              5 lakh+ jobs for you to explore
            </motion.p>

            {/* SEARCH BAR */}
            <div className="mt-10">
              <JobSearchForm />
            </div>

            {/* PROMO CARD (Naukri FastForward Style) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-200 dark:bg-slate-900 dark:shadow-slate-900/50 dark:ring-slate-800"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 bg-linear-to-br from-blue-50 to-indigo-50 p-6 text-left dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl text-white">🚀</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">FastTrack Your Career</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Get 3x more recruiter views with our premium services.</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 bg-white p-6 dark:bg-slate-900 sm:justify-end">
                  <div className="text-left">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Limited Offer</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">Flat 50% OFF</p>
                  </div>
                  <button 
                    className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                    suppressHydrationWarning
                  >
                    Check Plans
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS / QUICK LINKS (Updated with Icons) */}
        <section className="px-4 sm:px-6 lg:px-8">
           <div className="mx-auto max-w-7xl">
              <div className="flex flex-wrap justify-center gap-4">
                  {quickLinks.map((link) => (
                    <QuickChip key={link.label} icon={link.icon} label={link.label} />
                  ))}
              </div>
           </div>
        </section>

        {/* PREPARE FOR INTERVIEW SECTION (New) */}
        <InterviewPrepSection />

        {/* TOP COMPANIES */}
        <section className="bg-white py-16 dark:bg-slate-900/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Top companies hiring now</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Featured companies actively looking for talent</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
               <CompanyCard name="Google" type="MNC" logo="https://www.google.com/s2/favicons?domain=google.com&sz=128" />
               <CompanyCard name="Microsoft" type="MNC" logo="https://www.google.com/s2/favicons?domain=microsoft.com&sz=128" />
               <CompanyCard name="Amazon" type="MNC" logo="https://www.google.com/s2/favicons?domain=amazon.com&sz=128" />
               <CompanyCard name="Flipkart" type="Internet" logo="https://www.google.com/s2/favicons?domain=flipkart.com&sz=128" />
               <CompanyCard name="Adobe" type="Product" logo="https://www.google.com/s2/favicons?domain=adobe.com&sz=128" />
            </div>

            <div className="mt-10 text-center">
              <button 
                className="rounded-full border border-blue-600 px-8 py-2.5 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                suppressHydrationWarning
              >
                View all companies
              </button>
            </div>
          </div>
        </section>

        {/* FEATURED JOBS */}
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
             <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured opportunities</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Hand-picked roles for you</p>
             </div>
             <Link href="/jobs" className="text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">View all &rarr;</Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
             <JobHighlight title="Senior Frontend Engineer" company="PixelStack Labs" location="Bengaluru" type="Full-time" />
             <JobHighlight title="Product Manager - Payments" company="NorthBridge Fintech" location="Gurugram" type="Hybrid" />
             <JobHighlight title="Lead UX Designer" company="Aurora Systems" location="Mumbai" type="Remote" />
             <JobHighlight title="Backend Developer (Go)" company="CloudBridge" location="Pune" type="Full-time" />
             <JobHighlight title="Data Analyst" company="NovaStack" location="Hyderabad" type="Hybrid" />
             <JobHighlight title="HR Business Partner" company="HireX" location="Delhi" type="Contract" />
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-slate-900 dark:text-white">Explore by category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              badge="Tech"
              title="Software & IT"
              items={["Frontend", "Backend", "Full‑stack", "DevOps"]}
            />
            <CategoryCard
              badge="Business"
              title="Product & Management"
              items={["Product Manager", "Project Manager", "Business Analyst"]}
            />
            <CategoryCard
              badge="Design"
              title="Creative & Design"
              items={["UI/UX Designer", "Graphic Designer", "Product Designer"]}
            />
            <CategoryCard
              badge="Freshers"
              title="Entry Level"
              items={["Campus Hiring", "Internships", "Trainee"]}
            />
          </div>
        </section>

      </main>
    </div>
  );
}

// --- Data & Subcomponents ---

const quickLinks = [
  { icon: FaHome, label: "Remote" },
  { icon: FaBuilding, label: "MNC" },
  { icon: FaCogs, label: "Engineering" },
  { icon: FaTasks, label: "Project Mgmt" },
  { icon: FaCertificate, label: "Internship" },
  { icon: FaUserTie, label: "HR" },
  { icon: FaRupeeSign, label: "Banking & Fin" },
  { icon: FaChartBar, label: "Data Science" },
  { icon: FaLaptopCode, label: "Software & IT" },
  { icon: FaSearch, label: "Analytics" },
  { icon: FaGraduationCap, label: "Fresher" },
];

const QuickChip = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <button 
    className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-900 dark:hover:text-blue-400"
    suppressHydrationWarning
  >
    <Icon className="text-lg text-slate-400 transition-colors group-hover:text-blue-500" />
    <span>{label}</span>
    <FaChevronRight className="text-xs text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
  </button>
);

const InterviewPrepSection = () => (
  <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
     <div className="rounded-3xl border border-orange-100 bg-orange-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50 sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row">
           {/* Column 1: Illustration */}
           <div className="flex flex-col items-center justify-center text-center lg:w-1/4 lg:items-start lg:text-left">
              <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-orange-50 p-4 dark:bg-slate-800">
                 <img src="https://cdn-icons-png.flaticon.com/512/1436/1436664.png" alt="Interview Prep" className="h-full w-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Prepare for your next interview</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Get ready with the most asked questions by top companies & roles.</p>
           </div>

           {/* Column 2: By Company */}
           <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-6 flex items-center justify-between">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white">Interview questions by company</h3>
                 <Link href="/interviews/profiles" className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400">View all &rarr;</Link>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                 <InterviewCompanyCard name="Flipkart" count="488" logo="https://www.google.com/s2/favicons?domain=flipkart.com&sz=128" />
                 <InterviewCompanyCard name="Amazon" count="1.7K+" logo="https://www.google.com/s2/favicons?domain=amazon.com&sz=128" />
                 <InterviewCompanyCard name="TCS" count="2.5K+" logo="https://www.google.com/s2/favicons?domain=tcs.com&sz=128" />
                 <InterviewCompanyCard name="Cognizant" count="1.6K+" logo="https://www.google.com/s2/favicons?domain=cognizant.com&sz=128" />
                 <InterviewCompanyCard name="Byjus" count="816" logo="https://www.google.com/s2/favicons?domain=byjus.com&sz=128" />
                 <InterviewCompanyCard name="Accenture" count="2K+" logo="https://www.google.com/s2/favicons?domain=accenture.com&sz=128" />
              </div>
           </div>

           {/* Column 3: By Role */}
           <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-6 flex items-center justify-between">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white">Interview questions by role</h3>
                 <Link href="/interviews/profiles" className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400">View all &rarr;</Link>
              </div>
              <div className="space-y-4">
                 <InterviewRoleRow role="Software Engineer" count="7.2K+" />
                 <InterviewRoleRow role="Business Analyst" count="2.8K+" />
                 <InterviewRoleRow role="Consultant" count="2.4K+" />
                 <InterviewRoleRow role="Financial Analyst" count="894" />
                 <InterviewRoleRow role="Sales & Marketing" count="991" />
                 <InterviewRoleRow role="Quality Engineer" count="1.3K+" />
              </div>
           </div>
        </div>
     </div>
  </section>
);

const InterviewCompanyCard = ({ name, count, logo }: { name: string; count: string; logo: string }) => (
  <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 p-3 transition-all hover:border-blue-200 hover:bg-blue-50/50 dark:border-slate-800 dark:hover:bg-slate-900">
     <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white p-1 shadow-sm">
           <img src={logo} alt={name} className="h-full w-full object-contain" />
        </div>
        <div>
           <p className="text-sm font-bold text-slate-900 dark:text-white">{name}</p>
           <p className="text-[10px] text-slate-500 dark:text-slate-400">{count} Interviews</p>
        </div>
     </div>
     <FaChevronRight className="text-xs text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
  </div>
);

const InterviewRoleRow = ({ role, count }: { role: string; count: string }) => (
  <div className="group flex cursor-pointer items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0 hover:bg-slate-50/50 dark:border-slate-800 dark:hover:bg-slate-900/50">
     <span className="text-sm font-medium text-slate-700 transition-colors group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400">{role}</span>
     <span className="text-xs text-slate-400">{count} questions</span>
  </div>
);

const CompanyCard = ({ name, type, logo }: { name: string; type: string; logo?: string }) => {
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState(logo);

  return (
    <div className="group flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900">
       <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
          {logo && !imgError ? (
            <img 
              src={imgSrc} 
              alt={name} 
              className="h-10 w-10 object-contain transition-transform group-hover:scale-110" 
              onError={() => setImgError(true)}
            />
          ) : (
            <FaBuilding className="text-2xl text-slate-400" />
          )}
       </div>
       <div>
          <h3 className="font-bold text-slate-900 dark:text-white">{name}</h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{type}</p>
       </div>
       <div className="opacity-0 transition-opacity group-hover:opacity-100">
         <span className="text-xs font-bold text-blue-600 dark:text-blue-400">View Jobs</span>
       </div>
    </div>
  );
};

const JobSearchForm = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, type: "spring" }}
    className="relative z-20 mx-auto w-full max-w-5xl"
  >
    {/* Desktop View */}
    <div className="hidden rounded-full bg-white p-3 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 dark:bg-slate-900 dark:shadow-slate-900/50 dark:ring-slate-800 lg:block">
      <div className="flex flex-row items-center divide-x divide-slate-200 dark:divide-slate-800">
        
        {/* Search Input 1 */}
        <div className="relative flex flex-1 items-center px-4">
           <FaSearch className="mr-3 text-slate-400" />
           <div className="flex-1">
             <input 
                type="text" 
                placeholder="Enter skills / designations / companies" 
                className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
                suppressHydrationWarning
             />
           </div>
        </div>

        {/* Search Input 2 */}
        <div className="relative flex w-64 items-center px-4">
           <div className="flex-1">
             <select className="w-full cursor-pointer bg-transparent text-sm font-normal text-slate-500 focus:outline-none dark:text-slate-400" suppressHydrationWarning>
                <option value="">Select Experience</option>
                <option value="fresher">Fresher</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5+ Years</option>
             </select>
           </div>
        </div>

        {/* Search Input 3 */}
        <div className="relative flex flex-1 items-center px-4">
           <FaMapMarkerAlt className="mr-3 text-slate-400" />
           <div className="flex-1">
             <input 
                type="text" 
                placeholder="Enter location" 
                className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
             />
           </div>
        </div>

        <button
          type="button"
          className="rounded-full bg-blue-600 px-10 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
          suppressHydrationWarning
        >
          Search
        </button>
      </div>
    </div>

    {/* Mobile View */}
    <div className="flex flex-col gap-3 lg:hidden">
      <div className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
        <div className="flex flex-col">
          <div className="flex items-center border-b border-slate-100 px-4 py-3 dark:border-slate-800">
             <FaSearch className="mr-3 text-slate-400" />
             <input 
                type="text" 
                placeholder="Skills, Designation, Companies" 
                className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
                suppressHydrationWarning
             />
          </div>
          <div className="flex items-center border-b border-slate-100 px-4 py-3 dark:border-slate-800">
             <FaMapMarkerAlt className="mr-3 text-slate-400" />
             <input 
                type="text" 
                placeholder="Location" 
                className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
                suppressHydrationWarning
             />
          </div>
          <div className="flex items-center px-4 py-3">
             <FaBriefcase className="mr-3 text-slate-400" />
             <select className="w-full bg-transparent text-sm font-medium text-slate-500 focus:outline-none dark:text-slate-400" suppressHydrationWarning>
                <option value="">Select Experience</option>
                <option value="fresher">Fresher</option>
                <option value="1-3">1-3 Years</option>
                <option value="3-5">3-5 Years</option>
                <option value="5+">5+ Years</option>
             </select>
          </div>
        </div>
      </div>
      
      <button
        type="button"
        className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 active:scale-95"
        suppressHydrationWarning
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
  <div className="group relative flex flex-col justify-between gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900">
    <div>
      <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>{company}</span>
        <span>•</span>
        <span>{location}</span>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        {type}
      </span>
      <span className="text-xs font-bold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
        Apply Now &rarr;
      </span>
    </div>
  </div>
);

type CategoryCardProps = {
  badge: string;
  title: string;
  items: string[];
};

const CategoryCard = ({ badge, title, items }: CategoryCardProps) => (
  <div className="group rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900">
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
        {badge}
      </span>
    </div>
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-center text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
          <span className="mr-2 h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <Link href="#" className="hover:underline">{item}</Link>
        </li>
      ))}
    </ul>
    <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
      <Link href="#" className="flex items-center text-xs font-bold text-blue-600 hover:underline dark:text-blue-400">
        View all roles &rarr;
      </Link>
    </div>
  </div>
);
