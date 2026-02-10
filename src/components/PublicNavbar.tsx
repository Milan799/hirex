

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose, IoChevronDown } from "react-icons/io5";

// Define Mega Menu Data
const navItems = [
  { 
    href: "/jobs", 
    label: "Jobs",
    columns: [
       {
         title: "Popular Categories",
         items: ["IT Jobs", "Sales Jobs", "Marketing Jobs", "Data Science Jobs", "HR Jobs", "Engineering Jobs"]
       },
       {
         title: "Jobs by Location",
         items: ["Jobs in Delhi", "Jobs in Mumbai", "Jobs in Bengaluru", "Jobs in Hyderabad", "Jobs in Pune", "Remote Jobs"]
       },
       {
         title: "Explore More",
         items: ["Jobs by Company", "Jobs by Category", "Jobs by Designation", "Jobs by Skill", "Featured Jobs"]
       }
    ]
  },
  { 
    href: "/companies", 
    label: "Companies",
    columns: [
      {
        title: "Explore Categories",
        items: ["Unicorn", "MNC", "Startup", "Product based", "Internet"]
      },
      {
        title: "Top Collections",
        items: ["Top Companies", "IT Companies", "Fintech Companies", "Sponsored Companies", "Featured Companies"]
      }
    ] 
  },
  { 
    href: "/services", 
    label: "Services",
    columns: [
      {
        title: "Resume Services",
        items: ["Resume Writing", "Text Resume", "Visual Resume", "Resume Critique", "Cover Letter"]
      },
      {
        title: "Recruiter Reach",
        items: ["Resume Display", "Recruiter Connection", "Priority Applicant", "Job Search Manager"]
      }
    ]
  },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  if (!mounted) {
    return (
      <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/70 bg-white/70 shadow-sm backdrop-blur-2xl dark:border-slate-800/60 dark:bg-slate-950/80">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
             {/* Render a basic static version to avoid layout shift, or just null/loading */}
             <div className="h-10 w-32 bg-slate-200/50 rounded animate-pulse dark:bg-slate-800/50"></div>
        </nav>
      </header>
    );
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/50 bg-white/60 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/70 dark:shadow-none"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Left Side: Logo & Main Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 px-2 py-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100"
            onClick={close}
          >
            <span className="flex flex-col leading-tight">
              <motion.span
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="bg-linear-to-r from-sky-500 via-blue-500 to-cyan-400 bg-clip-text text-xl font-bold tracking-tight text-transparent"
              >
                Hire<span className="text-slate-950 dark:text-slate-50">X</span>
              </motion.span>
            </span>
          </Link>

          {/* Desktop links (Jobs, Companies, Services) with Mega Menu */}
          <div className="hidden h-full items-center gap-1 md:flex" onMouseLeave={() => setHoveredNav(null)}>
            {navItems.map((link) => {
              const isActive = pathname.startsWith(link.href);
              const isHovered = hoveredNav === link.label;

              return (
                <div 
                   key={link.href}
                   className="relative h-full"
                   onMouseEnter={() => setHoveredNav(link.label)}
                >
                    <Link
                      href={link.href}
                      className={`group relative flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        isActive || isHovered
                          ? "text-blue-600 dark:text-blue-400" 
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                      }`}
                    >
                      {link.label}
                      <span className={`absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-blue-600 transition-transform duration-300 dark:bg-blue-400 ${isActive || isHovered ? 'scale-x-100' : ''}`} />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full z-50 mt-1 w-150 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-slate-900/50"
                        >
                          <div className="flex p-6">
                             {link.columns.map((col, idx) => (
                               <div key={idx} className="flex-1 space-y-3 px-4 first:pl-0 border-l border-slate-100 first:border-0 dark:border-slate-800">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">{col.title}</h4>
                                  <ul className="space-y-2">
                                     {col.items.map(item => (
                                       <li key={item}>
                                          <Link href="#" className="text-sm text-slate-600 hover:text-blue-600 hover:underline dark:text-slate-400 dark:hover:text-blue-400">
                                            {item}
                                          </Link>
                                       </li>
                                     ))}
                                  </ul>
                               </div>
                             ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Auth & Employer Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Search / Employer Link */}
          <Link
            href="/employer/register"
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/60"
          >
            For employers
          </Link>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

          <Link
            href="/auth/login"
            className="rounded-full border border-blue-500 px-5 py-2 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
          >
            Login
          </Link>
          
          <Link
            href="/auth/register"
            className="rounded-full bg-orange-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-500 hover:shadow-orange-500/40"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 p-2.5 text-slate-800 shadow-sm shadow-slate-200/60 hover:border-sky-400 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
            aria-label="Toggle navigation"
          >
            {open ? <IoClose className="h-5 w-5" /> : <RxHamburgerMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>


      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="border-t border-slate-200/70 bg-white/95 shadow-lg shadow-slate-200/70 dark:border-slate-800/60 dark:bg-slate-950/95 md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pb-5 pt-3 sm:px-6 lg:px-8">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="my-2 border-t border-slate-100 dark:border-slate-800" />
              
              <Link
                  href="/employer/register"
                  onClick={close}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
                >
                  For employers
              </Link>

              <div className="mt-2 flex gap-3 px-1">
                 <Link
                    href="/auth/login"
                    onClick={close}
                    className="flex-1 rounded-full border border-blue-500 py-2 text-center text-sm font-bold text-blue-600 dark:border-blue-400 dark:text-blue-400"
                 >
                    Login
                 </Link>
                 <Link
                    href="/auth/register"
                    onClick={close}
                    className="flex-1 rounded-full bg-orange-600 py-2 text-center text-sm font-bold text-white shadow-md shadow-orange-500/20"
                 >
                    Register
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

