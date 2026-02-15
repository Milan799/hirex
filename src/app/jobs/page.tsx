"use client";

import { useState } from "react";
import { PublicNavbar } from "@/components/layout/Navbar";
import { JobFilter } from "@/components/jobs/JobFilter";
import { JobCard } from "@/components/jobs/JobCard";
import { FaSearch, FaMapMarkerAlt, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Mock Data
const jobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Google",
    rating: 4.2,
    reviews: 120,
    experience: "3-5 Yrs",
    salary: "12-18 LPA",
    location: "Bangalore",
    description: "Looking for an experienced Full Stack Developer with React and Node.js skills.",
    tags: ["React.js", "Node.js", "MongoDB", "TypeScript"],
    postedAt: "1 day ago",
    applicants: 120,
    logo: "https://www.google.com/s2/favicons?domain=google.com&sz=128",
  },
  {
    id: 2,
    title: "Product Designer (UI/UX)",
    company: "Figma",
    rating: 4.5,
    reviews: 85,
    experience: "2-4 Yrs",
    salary: "8-12 LPA",
    location: "Remote",
    description: "Join our design team to create world-class user experiences for global clients.",
    tags: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    postedAt: "2 days ago",
    applicants: 45,
    logo: "https://www.google.com/s2/favicons?domain=figma.com&sz=128",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Spotify",
    rating: 4.0,
    reviews: 200,
    experience: "4-7 Yrs",
    salary: "15-25 LPA",
    location: "Gurugram",
    description: "Analyze large datasets to extract actionable insights and build ML models.",
    tags: ["Python", "Machine Learning", "SQL", "Tableau"],
    postedAt: "3 days ago",
    applicants: 210,
    logo: "https://www.google.com/s2/favicons?domain=spotify.com&sz=128",
  },
  {
    id: 4,
    title: "Frontend Engineer",
    company: "Vercel",
    rating: 3.8,
    reviews: 50,
    experience: "1-3 Yrs",
    salary: "6-10 LPA",
    location: "Pune",
    description: "We are looking for a passionate Frontend Engineer to build responsive web apps.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    postedAt: "5 hours ago",
    applicants: 89,
    logo: "https://www.google.com/s2/favicons?domain=vercel.com&sz=128",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Amazon",
    rating: 4.7,
    reviews: 30,
    experience: "5+ Yrs",
    salary: "20-30 LPA",
    location: "Hyderabad",
    description: "Manage cloud infrastructure and CI/CD pipelines for high-scale applications.",
    tags: ["AWS", "Docker", "Kubernetes", "Jenkins"],
    postedAt: "Just now",
    applicants: 15,
    logo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128",
  },
  {
    id: 6,
    title: "Backend Developer",
    company: "Oracle",
    rating: 4.1,
    reviews: 90,
    experience: "2-5 Yrs",
    salary: "10-16 LPA",
    location: "Noida",
    description: "Build robust APIs and microservices using Java and Spring Boot.",
    tags: ["Java", "Spring Boot", "Microservices", "PostgreSQL"],
    postedAt: "4 days ago",
    applicants: 67,
    logo: "https://www.google.com/s2/favicons?domain=oracle.com&sz=128",
  },
];

export default function JobsPage() {
  const [sortBy, setSortBy] = useState("Relevance");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PublicNavbar showSearch={true} />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        
        {/* Search Bar (Mobile Only - Hidden on Desktop as it's in Navbar) */}
        <div className="mb-6 block lg:hidden">
          <div className="flex gap-2 rounded-xl bg-white p-2 shadow-sm dark:bg-slate-900">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
              <FaSearch className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="w-full bg-transparent text-sm outline-none dark:text-white"
              />
            </div>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Left Sidebar - Filters */}
          <div className="hidden lg:block">
            <JobFilter />
          </div>

          {/* Right Content - Job Listings */}
          <div className="lg:col-span-3">
            {/* Sorting & Count */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                1 - 20 of 1205 IT Jobs
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Sort by:</span>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-8 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                  >
                    <option>Relevance</option>
                    <option>Date</option>
                    <option>Salary</option>
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                </div>
              </div>
            </div>

            {/* Active Filters (Chips) */}
            <div className="mb-6 flex flex-wrap gap-2">
              {["Bangalore", "Full Stack", "Remote"].map((filter) => (
                <button 
                  key={filter}
                  className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {filter}
                  <span className="text-blue-400">×</span>
                </button>
              ))}
              <button className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400">
                Clear all
              </button>
            </div>

            {/* Job Cards Grid */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-1 rounded-full bg-white p-1.5 shadow-md shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-900/50">
                <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                  <FaChevronLeft className="text-xs" />
                </button>
                
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      page === 1
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 hover:shadow-blue-500/40"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                  <FaChevronRight className="text-xs" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}