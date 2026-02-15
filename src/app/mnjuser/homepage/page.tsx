"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { PublicNavbar } from "@/components/layout/Navbar";
import { 
  Search, 
  Briefcase, 
  Building2, 
  FileText, 
  MapPin, 
  TrendingUp, 
  Crown, 
  Rocket, 
  QrCode, 
  ChevronRight, 
  Star,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  Activity,
  LayoutDashboard,
  Globe,
  BookOpen,
  User,
  LogOut,
  Settings,
  HelpCircle
} from "lucide-react";

export default function Homepage() {
  const { data: user } = useAppSelector((state) => state.user);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    // Clear any local storage if needed
    localStorage.clear();
    // Redirect to logout page/route
    router.push('/auth/logout'); 
  };

  const userName = (isMounted && user?.fullName) || "Guest";
  const userRole = (isMounted && user?.role) || "Job Seeker";
  
  // Mock data
  const completeness = 85; 

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
    <PublicNavbar />
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-12 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          
          {/* LEFT SIDEBAR: Profile & Nav */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Card */}
            <motion.div
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800"
            >
              {/* Cover Image */}
              <div className="h-24 bg-linear-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
              </div>

              <div className="relative px-6 pb-6 pt-0 flex flex-col items-center">
                  <div className="relative -mt-12 mb-3">
                    {/* Circular Progress Avatar */}
                    <div className="relative h-24 w-24 rounded-full bg-white p-1 shadow-lg dark:bg-slate-900">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-slate-100 dark:text-slate-800"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            />
                            <path
                                className="text-blue-500 drop-shadow-sm transition-all duration-1000 ease-out"
                                strokeDasharray={`${completeness}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-2 overflow-hidden rounded-full border border-slate-100 dark:border-slate-800">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${userName}&background=random`} 
                                alt={userName}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                        </div>
                        <span className="absolute bottom-0 right-0 flex h-7 w-9 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-md ring-2 ring-white dark:ring-slate-900">
                            {completeness}%
                        </span>
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{userName}</h2>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{userRole}</p>
                  <div className="mt-2 flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-[10px] font-medium text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                    <Sparkles className="h-3 w-3 text-yellow-500" />
                    Last updated today
                  </div>
                  
                  <button className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl transition-all dark:bg-white dark:text-slate-900 dark:shadow-none dark:hover:bg-slate-200">
                      Complete Profile
                  </button>
              </div>

              <div className="border-t border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Profile Analytics</span>
                      <Activity className="text-blue-500 h-3.5 w-3.5" />
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700">
                      <div className="pr-4">
                          <p className="text-[10px] font-medium text-slate-500 mb-0.5">Search appearances</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">12</p>
                      </div>
                      <div className="pl-4">
                          <p className="text-[10px] font-medium text-slate-500 mb-0.5">Recruiter actions</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">4</p>
                      </div>
                  </div>
              </div>
            </motion.div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                <nav className="flex flex-col p-2">
                    <Link href="#" className="group flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                        <LayoutDashboard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        My Home
                    </Link>
                    <Link href="/jobs" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                        <Briefcase className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                        Jobs
                    </Link>
                    <Link href="/companies" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                        <Globe className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                        Companies
                    </Link>
                    <Link href="/blogs" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                        <BookOpen className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                        Blogs
                    </Link>
                    
                    <div className="my-2 border-t border-slate-100 dark:border-slate-800 mx-4"></div>
                    
                    <Link href="/mnjuser/profile" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                        <User className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                        Profile
                    </Link>
                    <Link href="/settings" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                        <Settings className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                        Settings
                    </Link>
                    <Link href="/help" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                        <HelpCircle className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                        Help Center
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                        <LogOut className="h-5 w-5 text-red-500 group-hover:text-red-600 dark:text-red-400" />
                        Logout
                    </button>
                </nav>
            </div>
          </div>

          {/* CENTER: Feed */}
          <div className="lg:col-span-6 space-y-6">
             {/* Pro Banner - IMPROVED DESIGN */}
             <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 shadow-sm border border-orange-100 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-yellow-950/20 dark:border-orange-900/50">
                 <div className="absolute -right-6 -top-6 text-orange-100 dark:text-orange-900/20 opacity-50 rotate-12">
                     <Crown size={120} strokeWidth={1.5} />
                 </div>
                 
                 <div className="relative flex justify-between items-start z-10">
                     <div className="flex-1">
                         <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center rounded-md bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700 ring-1 ring-inset ring-orange-600/20 dark:bg-orange-900/40 dark:text-orange-300">
                                PRO
                            </span>
                            <span className="text-xs font-semibold text-orange-600/80 dark:text-orange-400">
                                Premium Access
                            </span>
                         </div>
                         <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                             {userName}, unlock your potential
                         </h3>
                         <p className="text-sm text-slate-600 mt-1 mb-5 max-w-xs dark:text-slate-400">
                            Get 3x more visibility and exclusive job access.
                         </p>
                         <button className="group relative overflow-hidden rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all">
                             <span className="relative z-10 flex items-center gap-1">
                                Become a Pro Member <ChevronRight size={14} />
                             </span>
                             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                         </button>
                     </div>
                     <div className="hidden sm:block pl-6 border-l border-orange-200/50 dark:border-orange-800/30">
                         <div className="space-y-3 text-xs font-medium text-slate-700 dark:text-slate-300">
                             <p className="flex items-center gap-2"><CheckCircle2 className="text-orange-500 h-4 w-4" /> Priority Application</p>
                             <p className="flex items-center gap-2"><CheckCircle2 className="text-orange-500 h-4 w-4" /> AI Resume Review</p>
                             <p className="flex items-center gap-2"><CheckCircle2 className="text-orange-500 h-4 w-4" /> Hidden Job Access</p>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Recommended Jobs */}
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 dark:bg-slate-900 dark:border-slate-800">
                 <div className="flex items-center justify-between mb-5">
                     <div>
                        <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            Recommended Jobs <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Based on your profile and search history</p>
                     </div>
                     <button className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400">View all</button>
                 </div>
                 
                 {/* Horizontal Scroll Container */}
                 <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
                    <JobCard 
                        role="Senior React Dev" 
                        company="Microsoft" 
                        exp="3-5 Yrs" 
                        loc="Bangalore" 
                        logo="https://www.google.com/s2/favicons?domain=microsoft.com&sz=128" 
                        posted="1d ago" 
                    />
                    <JobCard 
                        role="Frontend Engineer" 
                        company="Airbnb" 
                        exp="1-3 Yrs" 
                        loc="Remote" 
                        logo="https://www.google.com/s2/favicons?domain=airbnb.com&sz=128" 
                        posted="Just now" 
                    />
                    <JobCard 
                        role="Full Stack Lead" 
                        company="Uber" 
                        exp="5-8 Yrs" 
                        loc="Hyderabad" 
                        logo="https://www.google.com/s2/favicons?domain=uber.com&sz=128" 
                        posted="3d ago" 
                    />
                 </div>
             </div>

             {/* Early Access Banner - IMPROVED DESIGN */}
             <div className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-500 to-purple-600 p-6 text-white shadow-lg shadow-purple-500/20">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Rocket size={100} />
                 </div>
                 
                 <div className="relative z-10 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                             <Rocket className="text-white h-6 w-6" />
                         </div>
                         <div>
                             <h3 className="font-bold text-lg text-white">16 Early Access Roles</h3>
                             <p className="text-xs text-purple-100/90">Exclusive opportunities from top tech giants</p>
                         </div>
                     </div>
                     <button className="rounded-lg bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md hover:bg-white/20 transition-colors border border-white/20">
                         View Roles
                     </button>
                 </div>
                 
                 <div className="mt-6 grid gap-3 sm:grid-cols-2">
                     <CompactJobCard role="Java Developer" company="Leading Firm" loc="Vadodara" />
                     <CompactJobCard role="Product Manager" company="Top MNC" loc="Mumbai" />
                 </div>
             </div>

             {/* Resume Banner */}
             <div className="rounded-2xl bg-linear-to-r from-blue-50 to-indigo-50 p-6 flex items-center justify-between border border-blue-100 dark:from-blue-900/10 dark:to-indigo-900/10 dark:border-blue-900/30">
                 <div className="flex gap-4 items-center">
                     <div className="h-12 w-10 bg-white shadow-sm rounded border border-slate-200 flex items-center justify-center dark:bg-slate-800 dark:border-slate-700">
                        <FileText className="text-blue-500 h-5 w-5" />
                     </div>
                     <div>
                         <h3 className="font-bold text-slate-900 dark:text-white">AI Resume Builder</h3>
                         <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">Enhance your CV with our AI-powered tools</p>
                     </div>
                 </div>
                 <button className="rounded-full bg-white px-5 py-2 text-xs font-bold text-blue-600 shadow-sm border border-blue-100 hover:bg-blue-50 transition-colors dark:bg-slate-800 dark:text-blue-400 dark:border-slate-700">
                    Update CV
                 </button>
             </div>

             {/* Top Companies */}
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 dark:bg-slate-900 dark:border-slate-800">
                 <div className="flex items-center justify-between mb-5">
                     <h2 className="font-bold text-lg text-slate-900 dark:text-white">Top Hiring Companies</h2>
                     <button className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400">View all</button>
                 </div>
                 <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                     <CompanyCard name="Amazon" logo="https://www.google.com/s2/favicons?domain=amazon.com&sz=128" rating="4.2" reviews="12K" />
                     <CompanyCard name="Google" logo="https://www.google.com/s2/favicons?domain=google.com&sz=128" rating="4.5" reviews="8K" />
                     <CompanyCard name="Microsoft" logo="https://www.google.com/s2/favicons?domain=microsoft.com&sz=128" rating="4.4" reviews="10K" />
                     <CompanyCard name="Flipkart" logo="https://www.google.com/s2/favicons?domain=flipkart.com&sz=128" rating="4.1" reviews="5K" />
                 </div>
             </div>
          </div>

          {/* RIGHT SIDEBAR: Widgets */}
          <div className="lg:col-span-3 space-y-6">
            {/* QR Code Widget */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="flex flex-col items-center text-center">
                   <div className="mb-4 h-32 w-32 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center dark:bg-slate-800 dark:border-slate-700">
                       <QrCode className="text-6xl text-slate-800 dark:text-slate-200" />
                   </div>
                   <p className="text-sm font-bold text-slate-900 dark:text-white">Download the App</p>
                   <p className="text-xs text-slate-500 mt-1 mb-3 dark:text-slate-400">Scan to download from Play Store</p>
                   <div className="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                       3,587 downloads this week
                   </div>
               </div>
            </div>

            {/* Career Objective Widget */}
            <div className="group rounded-2xl bg-white overflow-hidden shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="h-28 bg-slate-200 relative overflow-hidden">
                   <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10"></div>
                   <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                   />
                   <div className="absolute bottom-3 left-4 z-20">
                        <span className="inline-block rounded bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white mb-1">GUIDE</span>
                   </div>
               </div>
               <div className="p-5">
                   <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Mastering Your Resume Objective</h3>
                   <p className="text-xs text-slate-500 mt-2 line-clamp-2 dark:text-slate-400">A career objective is a crucial aspect of a professional resume. Get it right with this guide.</p>
                   <button className="mt-3 flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline dark:text-blue-400">
                        Read Article <ChevronRight size={10} />
                   </button>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}

// --- Components ---

const JobCard = ({ role, company, exp, loc, logo, posted }: any) => {
    const [imgError, setImgError] = useState(false);
    
    return (
    <div className="group min-w-65 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:border-blue-800">
        <div className="flex justify-between items-start mb-3">
            <div className="h-10 w-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-600 text-lg shadow-sm overflow-hidden group-hover:scale-105 transition-transform dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                {logo.startsWith("http") && !imgError ? (
                    <img src={logo} alt={company} className="h-full w-full object-cover" onError={() => setImgError(true)} />
                ) : (
                    logo.startsWith("http") ? company.charAt(0) : logo
                )}
            </div>
            <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full dark:bg-slate-800">{posted}</span>
        </div>
        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{role}</h3>
        <p className="text-xs text-slate-500 mb-3 dark:text-slate-400">{company}</p>
        <div className="flex gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><Briefcase className="h-3 w-3 text-slate-400" /> {exp}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-slate-400" /> {loc}</span>
        </div>
    </div>
    );
};

const CompactJobCard = ({ role, company, loc }: any) => (
    <div className="group rounded-xl border border-white/20 bg-white/10 p-3 hover:bg-white/20 hover:shadow-sm transition-all backdrop-blur-sm cursor-pointer">
        <h4 className="font-bold text-xs text-white group-hover:text-purple-100">{role}</h4>
        <p className="text-[10px] text-purple-100/80 mt-0.5">{company}</p>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-purple-100/70">
            <MapPin size={10} /> {loc}
        </div>
    </div>
);

const CompanyCard = ({ name, logo, rating, reviews }: any) => {
    const [imgError, setImgError] = useState(false);

    return (
    <div className="group min-w-35 rounded-xl border border-slate-200 p-4 flex flex-col items-center justify-center text-center hover:shadow-md hover:border-blue-200 transition-all cursor-pointer dark:border-slate-800 dark:hover:bg-slate-800/50">
        <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 font-bold text-slate-600 text-xl shadow-sm overflow-hidden group-hover:-translate-y-1 transition-transform dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
            {logo.startsWith("http") && !imgError ? (
                <img src={logo} alt={name} className="h-full w-full object-contain p-2" onError={() => setImgError(true)} />
            ) : (
                logo.startsWith("http") ? name.charAt(0) : logo
            )}
        </div>
        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">{name}</p>
        <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-slate-500">
            <Star className="h-3 w-3 text-orange-400 fill-orange-400" /> {rating} <span className="text-slate-300">|</span> {reviews}
        </div>
        <button className="mt-3 text-[10px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">View jobs</button>
    </div>
    );
};
