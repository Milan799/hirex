
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

import { FaSearch, FaBell, FaUserCircle, FaBars, FaCrown } from "react-icons/fa";
import { useAppSelector } from "@/lib/store/hooks";
import { signOut } from "next-auth/react";

// ... existing code ...

export function PublicNavbar({ showSearch = false }: { showSearch?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const { data: user } = useAppSelector((state) => state.user);
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Fallback for user data if not yet loaded but on protected route
  const displayUser = (isMounted && user) || { fullName: "Guest User", role: "Job Seeker" };

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);
  const toggleProfileDrawer = () => setProfileDrawerOpen((v) => !v);

  const handleLogout = () => {
    localStorage.clear();
    signOut({ callbackUrl: "/" });
  };

  // --- PRO PROFILE NAVBAR ---
  if (pathname === "/pro_profile") {
    return (
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-amber-500/20 bg-slate-950 shadow-lg shadow-amber-900/10"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/mnjuser/homepage" className="group flex items-center gap-2">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 shadow-lg shadow-amber-500/20">
                <FaCrown className="text-white text-lg" />
             </div>
             <span className="flex flex-col leading-tight">
               <span className="text-xl font-bold tracking-tight text-white">
                 HireX <span className="text-amber-400">Pro</span>
               </span>
             </span>
          </Link>

          {/* Center Links (Hidden on mobile) */}
          <div className="hidden items-center gap-8 md:flex">
             {[
               { name: "Overview", id: "overview" },
               { name: "Benefits", id: "benefits" },
               { name: "Plans", id: "plans" }
             ].map((item) => (
               <button 
                 key={item.id}
                 onClick={() => {
                   const el = document.getElementById(item.id);
                   if (el) el.scrollIntoView({ behavior: 'smooth' });
                 }}
                 className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors relative group"
               >
                 {item.name}
                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
               </button>
             ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
             {user ? (
               <button 
                 onClick={toggleProfileDrawer}
                 className="group flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900 py-1 pl-1 pr-4 shadow-sm hover:border-amber-500/50 transition-all"
               >
                    <div className="h-8 w-8 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                        <img 
                           src={`https://ui-avatars.com/api/?name=${displayUser.fullName}&background=random&color=fff&background=d97706`} 
                           alt={displayUser.fullName}
                           className="h-full w-full object-cover" 
                        />
                    </div>
                    <FaBars className="text-slate-400 group-hover:text-amber-400 transition-colors" />
               </button>
             ) : (
               <div className="flex items-center gap-3">
                 <Link href="/auth/login" className="text-sm font-bold text-slate-300 hover:text-white">Login</Link>
                 <Link href="/auth/register" className="rounded-full bg-amber-500 px-5 py-2 text-xs font-bold text-slate-900 hover:bg-amber-400 shadow-lg shadow-amber-500/20">
                    Get Started
                 </Link>
               </div>
             )}
          </div>
        </nav>
        
        {/* Profile Drawer Integration */}
        <AnimatePresence>
          {profileDrawerOpen && (
              <>
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setProfileDrawerOpen(false)}
                      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                  />
                  <motion.div
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-slate-800 bg-slate-950 p-6 shadow-2xl sm:w-100"
                  >
                      <button 
                          onClick={() => setProfileDrawerOpen(false)}
                          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
                      >
                          <IoClose className="text-2xl" />
                      </button>

                      {/* Dark Mode Profile Drawer Content */}
                      <div className="mt-6 flex flex-col items-center text-white">
                          <div className="relative h-24 w-24 mb-4">
                              <div className="absolute inset-0 rounded-full border-2 border-amber-500/30"></div>
                              <div className="absolute inset-2 overflow-hidden rounded-full border-2 border-slate-900">
                                  <img 
                                      src={`https://ui-avatars.com/api/?name=${displayUser.fullName}&background=random`} 
                                      alt={displayUser.fullName}
                                      className="h-full w-full object-cover" 
                                  />
                              </div>
                          </div>
                          <h2 className="text-xl font-bold text-white">{displayUser.fullName}</h2>
                          <p className="text-sm text-slate-400 mt-1">HireX Pro Member</p>
                          
                          <Link href="/mnjuser/profile" className="mt-4 rounded-full border border-slate-700 px-6 py-2 text-sm font-bold text-slate-300 hover:bg-slate-900 hover:text-white hover:border-amber-500/50 transition-all">
                              View Profile
                          </Link>
                      </div>

                      <div className="mt-8 space-y-2">
                          <button 
                              onClick={handleLogout}
                              className="flex w-full items-center gap-4 p-3 rounded-lg hover:bg-slate-900 text-red-400 text-left"
                          >
                              <span className="font-medium">Logout</span>
                          </button>
                      </div>
                  </motion.div>
              </>
          )}
       </AnimatePresence>
      </motion.header>
    );
  }

  // If user is logged in, show a different navbar (Naukri style)
   if ((isMounted && user) || pathname.startsWith("/mnjuser")) {
       return (
         <>
         <motion.header
             initial={{ y: -24, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
         >
              <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-8">
                     <Link href="/mnjuser/homepage" className="group flex items-center gap-2" onClick={close}>
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
                                  className={`group relative flex items-center gap-1 px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                                    isActive || isHovered
                                      ? "text-blue-600 dark:text-blue-400" 
                                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                  }`}
                                >
                                  {link.label}
                                  {link.label === "Services" && (
                                    <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">1</span>
                                  )}
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

                  {/* Centered Search Bar */}
                  <div className="hidden flex-1 max-w-2xl mx-4 md:block">
                      <div className="flex items-center rounded-full bg-slate-50 border border-slate-200 px-2 py-1.5 dark:bg-slate-900 dark:border-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                          <FaSearch className="ml-3 text-slate-400" />
                          <input 
                            suppressHydrationWarning
                            type="text" 
                            placeholder="Search jobs, companies, skills..." 
                            className="flex-1 bg-transparent px-3 py-1.5 text-sm outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400 font-medium" 
                          />
                          <button className="rounded-full bg-blue-600 px-5 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-sm">
                              Search
                          </button>
                      </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400 relative transition-colors">
                          <FaBell className="text-lg" />
                          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-950"></span>
                     </button>
                     
                     <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
                     
                     {/* Profile Button */}
                     <button 
                       onClick={toggleProfileDrawer}
                       className="group flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-4 shadow-sm hover:shadow-md transition-all dark:border-slate-700 dark:bg-slate-900"
                     >
                          <div className="h-8 w-8 rounded-full bg-slate-100 overflow-hidden border border-slate-200 dark:border-slate-700">
                              <img 
                                 src={`https://ui-avatars.com/api/?name=${displayUser.fullName}&background=random`} 
                                 alt={displayUser.fullName}
                                 className="h-full w-full object-cover" 
                              />
                          </div>
                          <FaBars className="text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300 transition-colors" />
                     </button>
                     
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
                      
                      <div className="mt-2 flex gap-3 px-1 items-center">
                         <div className="h-8 w-8 rounded-full overflow-hidden">
                              <img 
                                 src={`https://ui-avatars.com/api/?name=${displayUser.fullName}&background=random`} 
                                 alt={displayUser.fullName}
                                 className="h-full w-full object-cover" 
                              />
                         </div>
                         <span className="text-sm font-bold text-slate-900 dark:text-white">{displayUser.fullName}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
         </motion.header>

         {/* Profile Side Drawer */}
         <AnimatePresence>
            {profileDrawerOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setProfileDrawerOpen(false)}
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/50"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:w-100"
                    >
                        <button 
                            onClick={() => setProfileDrawerOpen(false)}
                            className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        >
                            <IoClose className="text-2xl" />
                        </button>

                        <div className="mt-6 flex flex-col items-center">
                            {/* Circular Progress Avatar */}
                            <div className="relative h-24 w-24 mb-4">
                                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-slate-100 dark:text-slate-800"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <path
                                        className="text-orange-400 drop-shadow-sm"
                                        strokeDasharray="53, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-2 overflow-hidden rounded-full border-2 border-white dark:border-slate-900">
                                    <img 
                                        src={`https://ui-avatars.com/api/?name=${displayUser.fullName}&background=random`} 
                                        alt={displayUser.fullName}
                                        className="h-full w-full object-cover" 
                                    />
                                </div>
                                <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-700 shadow-md dark:bg-slate-800 dark:text-slate-200">
                                    53%
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{displayUser.fullName}</h2>
                            <p className="text-sm text-slate-500 mt-1 dark:text-slate-400 text-center">MCA Computers at Sarvajanik College of Engineering and Technology, Surat</p>
                            
                            <Link href="/mnjuser/profile" className="mt-3 text-sm font-bold text-blue-600 hover:underline dark:text-blue-400">
                                View & Update Profile
                            </Link>
                        </div>

                        {/* Pro Banner */}
                        <div className="mt-8 rounded-xl bg-linear-to-r from-orange-50 to-amber-50 p-4 border border-orange-100 dark:from-orange-900/20 dark:to-amber-900/20 dark:border-orange-900/40 flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-[#dfae47] flex items-center justify-center text-white">
                                    <span className="text-lg">👑</span>
                                </div>
                                <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Upgrade to Naukri Pro</span>
                            </div>
                            <IoChevronDown className="text-slate-400 -rotate-90" />
                        </div>

                        {/* Profile Performance */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-900 dark:text-white">Your profile performance</h3>
                                <span className="text-xs text-slate-400">Last 90 days</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                <div className="text-center border-r border-slate-200 dark:border-slate-800">
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
                                    <p className="text-xs text-slate-500 mt-1">Search Appearances</p>
                                    <button className="mt-2 text-xs font-bold text-blue-600 hover:underline">View all</button>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">0</p>
                                    <p className="text-xs text-slate-500 mt-1">Recruiter Actions</p>
                                    <button className="mt-2 text-xs font-bold text-blue-600 hover:underline">View all</button>
                                </div>
                            </div>
                        </div>

                        {/* Menu Links */}
                        <div className="mt-8 space-y-2">
                            <Link href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400">
                                <span className="text-lg">📝</span>
                                <span className="font-medium">Naukri Blog</span>
                            </Link>
                            <Link href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400">
                                <span className="text-lg">⚙️</span>
                                <span className="font-medium">Settings</span>
                            </Link>
                            <Link href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400">
                                <span className="text-lg">❓</span>
                                <span className="font-medium">FAQs</span>
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="flex w-full items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 text-left"
                            >
                                <span className="text-lg">↪️</span>
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>

                    </motion.div>
                </>
            )}
         </AnimatePresence>
         </>
       );
   }

  return (
    <motion.header
    // ... existing code ...
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

        {/* Search Bar (Visible only on Jobs page) */}
        {showSearch && (
          <div className="hidden max-w-md flex-1 md:block">
            <div className="group relative">
              <input
                suppressHydrationWarning
                type="text"
                placeholder="Search jobs, skills, companies..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm font-medium outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 group-hover:border-blue-300 group-hover:bg-white group-hover:shadow-lg group-hover:shadow-blue-500/5 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:bg-slate-950 dark:focus:ring-blue-400/10 dark:group-hover:border-slate-600 dark:group-hover:bg-slate-950"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-hover:text-blue-500 group-focus-within:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400 dark:group-focus-within:text-blue-400" />
            </div>
          </div>
        )}

        {/* Right Side: Auth Actions */}
        <div className="hidden items-center gap-3 md:flex">
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
