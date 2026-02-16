"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PublicNavbar } from "@/components/layout/Navbar";
import { 
  User, Mail, Phone, MapPin, Edit2, Upload, Download, Plus, 
  Briefcase, GraduationCap, Code, FileText, Award, Globe, 
  Languages, ChevronRight, CheckCircle2, AlertCircle, Crown,
  Calendar, Building2, ExternalLink
} from "lucide-react";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("resume");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PublicNavbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 pt-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* LEFT SIDEBAR: Quick Links */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold text-slate-900 dark:text-white">Quick Links</h3>
                </div>
                <nav className="flex flex-col p-2">
                  {[
                    { id: "resume", label: "Resume", icon: FileText },
                    { id: "headline", label: "Resume Headline", icon: Edit2 },
                    { id: "skills", label: "Key Skills", icon: Code },
                    { id: "employment", label: "Employment", icon: Briefcase },
                    { id: "education", label: "Education", icon: GraduationCap },
                    { id: "projects", label: "Projects", icon: Globe },
                    { id: "summary", label: "Profile Summary", icon: User },
                    { id: "accomplishments", label: "Accomplishments", icon: Award },
                    { id: "personal", label: "Personal Details", icon: User },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        activeSection === item.id 
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                      }`}
                      suppressHydrationWarning
                    >
                      <item.icon className={`h-4 w-4 ${
                        activeSection === item.id ? "text-blue-600 dark:text-blue-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                      }`} />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* PROFILE HEADER */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800"
            >
              <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600"></div>
              <div className="px-6 pb-6">
                <div className="relative -mt-12 mb-4 flex flex-col items-start sm:flex-row sm:items-end gap-4">
                  <div className="relative h-24 w-24 rounded-full border-4 border-white bg-white shadow-md dark:border-slate-900 dark:bg-slate-800">
                    <img 
                      src="https://ui-avatars.com/api/?name=Milankumar+Javiya&background=random&size=128" 
                      alt="Profile" 
                      className="h-full w-full rounded-full object-cover" 
                    />
                    <button 
                      className="absolute bottom-0 right-0 rounded-full bg-slate-900 p-1.5 text-white shadow-sm hover:bg-blue-600 transition-colors dark:bg-slate-700"
                      suppressHydrationWarning
                    >
                      <Edit2 size={12} />
                    </button>
                  </div>
                  <div className="flex-1 pb-2">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      Milankumar Javiya 
                      <button className="text-slate-400 hover:text-blue-600 transition-colors" suppressHydrationWarning>
                        <Edit2 size={16} />
                      </button>
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Profile last updated - Today
                    </p>
                    
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800/50">
                          <Phone size={16} className="text-slate-400" /> 
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Mobile Number</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-slate-900 dark:text-white">9876543210</span>
                              <span className="flex items-center gap-0.5 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                <CheckCircle2 size={10} /> Verified
                              </span>
                            </div>
                          </div>
                          <button className="ml-2 text-slate-400 hover:text-blue-600 transition-colors" suppressHydrationWarning>
                            <Edit2 size={14} />
                          </button>
                      </div>

                      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800/50">
                          <Mail size={16} className="text-slate-400" /> 
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Email Address</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-slate-900 dark:text-white">milan@example.com</span>
                              <span className="flex items-center gap-0.5 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                <CheckCircle2 size={10} /> Verified
                              </span>
                            </div>
                          </div>
                          <button className="ml-2 text-slate-400 hover:text-blue-600 transition-colors" suppressHydrationWarning>
                            <Edit2 size={14} />
                          </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 hidden lg:block">
                     {/* Spacer for layout balance */}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin size={16} className="text-slate-400" />
                    <span>Surat, INDIA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Briefcase size={16} className="text-slate-400" />
                    <span>Fresher</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar size={16} className="text-slate-400" />
                    <span>Add availability to join</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PENDING ACTIONS */}
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 dark:border-orange-900/30 dark:bg-orange-950/20">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm dark:bg-slate-900">
                        <AlertCircle size={20} />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">3 Missing Details</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Add details to improve your profile strength</p>
                     </div>
                  </div>
                  <button 
                    className="rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600 transition-colors"
                    suppressHydrationWarning
                  >
                    Add Missing Details
                  </button>
               </div>
            </div>

            {/* PRO BANNER */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-amber-100 to-yellow-100 p-4 dark:from-amber-900/40 dark:to-yellow-900/40 border border-yellow-200 dark:border-yellow-800">
               <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                     <Crown className="text-yellow-700 dark:text-yellow-400" fill="currentColor" />
                     <span className="font-bold text-yellow-900 dark:text-yellow-100">HireX Pro</span>
                     <span className="text-sm text-yellow-800 dark:text-yellow-200 hidden sm:inline">Power up with 3x enhanced profile visibility</span>
                  </div>
                  <button 
                    className="rounded-full bg-yellow-900 px-4 py-2 text-xs font-bold text-white hover:bg-yellow-800 transition-colors dark:bg-yellow-400 dark:text-yellow-950 dark:hover:bg-yellow-300"
                    suppressHydrationWarning
                  >
                    <Link href="/pro_profile">Become a Pro</Link>
                  </button>
               </div>
            </div>

            {/* RESUME SECTION */}
            <section id="resume" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Resume</h2>
                  <button className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400" suppressHydrationWarning>Upload new</button>
               </div>
               
               <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/50">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                     <FileText size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Milankumar_Resume.pdf</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-4 dark:text-slate-400">Uploaded on Feb 15, 2026</p>
                  <div className="flex justify-center gap-3">
                     <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" suppressHydrationWarning>
                        <Download size={14} /> Download
                     </button>
                     <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-red-600 shadow-sm hover:bg-red-50 dark:bg-slate-800 dark:text-red-400 dark:hover:bg-red-900/20" suppressHydrationWarning>
                        Delete
                     </button>
                  </div>
               </div>

               {/* AI Resume Builder Banner */}
               <div className="mt-6 flex items-center justify-between rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div className="flex gap-4">
                     <div className="h-12 w-16 bg-white rounded shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700"></div>
                     <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">We've built a resume based on your profile</h4>
                        <p className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">You can further improve it & use it with one click.</p>
                     </div>
                  </div>
                  <button className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors" suppressHydrationWarning>
                     View Resume
                  </button>
               </div>
            </section>

            {/* RESUME HEADLINE */}
            <section id="headline" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Resume Headline</h2>
                  <button className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400" suppressHydrationWarning>Edit</button>
               </div>
               <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Frontend Developer with expertise in React.js, Next.js, and Tailwind CSS. Passionate about building responsive and user-friendly web applications.
               </p>
            </section>

            {/* KEY SKILLS */}
            <section id="skills" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Key Skills</h2>
                  <button className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400" suppressHydrationWarning>Add details</button>
               </div>
               <div className="flex flex-wrap gap-2">
                  {["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js", "Git", "Redux", "HTML5", "CSS3"].map(skill => (
                     <span key={skill} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:border-blue-200 hover:text-blue-600 transition-colors dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-blue-400">
                        {skill}
                     </span>
                  ))}
               </div>
            </section>

            {/* EMPLOYMENT */}
            <section id="employment" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Employment</h2>
                  <button className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400" suppressHydrationWarning>Add employment</button>
               </div>
               <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-3 rounded-full bg-slate-50 p-3 dark:bg-slate-800">
                     <Briefcase className="text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">No employment details added</p>
                  <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">Add your work experience to boost your profile</p>
               </div>
            </section>

            {/* EDUCATION */}
            <section id="education" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Education</h2>
                  <button className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400" suppressHydrationWarning>Add education</button>
               </div>
               <div className="space-y-6">
                  <div className="relative pl-4 border-l-2 border-slate-100 dark:border-slate-800">
                     <h3 className="font-bold text-slate-900 dark:text-white">B.Tech Computer Engineering</h3>
                     <p className="text-sm text-slate-600 dark:text-slate-400">Gujarat Technological University</p>
                     <p className="text-xs text-slate-500 mt-1 dark:text-slate-500">2020 - 2024 | Full Time</p>
                     <button className="absolute right-0 top-0 text-slate-400 hover:text-blue-600 transition-colors" suppressHydrationWarning>
                        <Edit2 size={14} />
                     </button>
                  </div>
                  <div className="relative pl-4 border-l-2 border-slate-100 dark:border-slate-800">
                     <h3 className="font-bold text-slate-900 dark:text-white">Class XII</h3>
                     <p className="text-sm text-slate-600 dark:text-slate-400">GSEB Board</p>
                     <p className="text-xs text-slate-500 mt-1 dark:text-slate-500">2020</p>
                     <button className="absolute right-0 top-0 text-slate-400 hover:text-blue-600 transition-colors" suppressHydrationWarning>
                        <Edit2 size={14} />
                     </button>
                  </div>
               </div>
            </section>

            {/* IT SKILLS */}
            <section className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">IT Skills</h2>
                  <button className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400" suppressHydrationWarning>Add details</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                     <thead className="text-xs uppercase text-slate-500 dark:text-slate-400">
                        <tr>
                           <th className="pb-3 font-medium">Skill</th>
                           <th className="pb-3 font-medium">Version</th>
                           <th className="pb-3 font-medium">Last Used</th>
                           <th className="pb-3 font-medium">Experience</th>
                           <th className="pb-3 text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {[
                           { name: "React.js", ver: "18", last: "2024", exp: "2 Years" },
                           { name: "Java", ver: "17", last: "2023", exp: "1 Year" },
                           { name: "Python", ver: "3.10", last: "2022", exp: "6 Months" },
                        ].map((row) => (
                           <tr key={row.name} className="group">
                              <td className="py-3 font-medium text-slate-900 dark:text-white">{row.name}</td>
                              <td className="py-3 text-slate-600 dark:text-slate-400">{row.ver}</td>
                              <td className="py-3 text-slate-600 dark:text-slate-400">{row.last}</td>
                              <td className="py-3 text-slate-600 dark:text-slate-400">{row.exp}</td>
                              <td className="py-3 text-right">
                                 <button className="text-slate-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100" suppressHydrationWarning>
                                    <Edit2 size={14} />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Projects</h2>
                  <button className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400" suppressHydrationWarning>Add project</button>
               </div>
               <div className="space-y-6">
                  <div className="group relative">
                     <h3 className="font-bold text-slate-900 dark:text-white">E-Commerce Platform</h3>
                     <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">Full Stack Project | 2023</p>
                     <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Built a scalable e-commerce application using Next.js, Stripe for payments, and Sanity CMS. Implemented cart functionality, user authentication, and order tracking.
                     </p>
                     <button className="absolute right-0 top-0 text-slate-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100" suppressHydrationWarning>
                        <Edit2 size={14} />
                     </button>
                  </div>
               </div>
            </section>

            {/* PROFILE SUMMARY */}
            <section id="summary" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile Summary</h2>
                  <button className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400" suppressHydrationWarning>Add summary</button>
               </div>
               <p className="text-sm text-slate-500 italic dark:text-slate-400">
                  Your profile summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.
               </p>
            </section>

            {/* ACCOMPLISHMENTS */}
            <section id="accomplishments" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Accomplishments</h2>
               </div>
               <div className="grid gap-4 sm:grid-cols-2">
                  {[
                     { title: "Online Profile", desc: "Add link to Online profiles (e.g. Linkedin, etc.)" },
                     { title: "Work Sample", desc: "Add link to your Projects (e.g. Github, Behance, etc.)" },
                     { title: "White Paper / Research Publication", desc: "Add link to your Online publications" },
                     { title: "Presentation", desc: "Add link to your Online presentations" },
                     { title: "Patent", desc: "Add details of patents you have filed" },
                     { title: "Certification", desc: "Add details of certifications you have earned" },
                  ].map((item) => (
                     <div key={item.title} className="flex items-start justify-between rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                        <div>
                           <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h4>
                           <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                        <button className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400" suppressHydrationWarning>Add</button>
                     </div>
                  ))}
               </div>
            </section>

            {/* PERSONAL DETAILS */}
            <section id="personal" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Personal Details</h2>
                  <button className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400" suppressHydrationWarning>Edit</button>
               </div>
               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Date of Birth</p>
                     <p className="font-medium text-slate-900 dark:text-white">15 Aug 2002</p>
                  </div>
                  <div>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Gender</p>
                     <p className="font-medium text-slate-900 dark:text-white">Male</p>
                  </div>
                  <div>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Marital Status</p>
                     <p className="font-medium text-slate-900 dark:text-white">Single / Unmarried</p>
                  </div>
                  <div>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Category</p>
                     <p className="font-medium text-slate-900 dark:text-white">General</p>
                  </div>
                  <div>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Differently Abled</p>
                     <p className="font-medium text-slate-900 dark:text-white">No</p>
                  </div>
                  <div>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Career Break</p>
                     <p className="font-medium text-slate-900 dark:text-white">No</p>
                  </div>
               </div>
               
               <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold text-slate-900 dark:text-white">Languages</h3>
                     <button className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400" suppressHydrationWarning>Add languages</button>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm">
                        <thead className="text-xs uppercase text-slate-500 dark:text-slate-400">
                           <tr>
                              <th className="pb-3 font-medium">Language</th>
                              <th className="pb-3 font-medium">Proficiency</th>
                              <th className="pb-3 font-medium text-center">Read</th>
                              <th className="pb-3 font-medium text-center">Write</th>
                              <th className="pb-3 font-medium text-center">Speak</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                           {[
                              { name: "English", prof: "Professional", r: true, w: true, s: true },
                              { name: "Hindi", prof: "Proficient", r: true, w: true, s: true },
                              { name: "Gujarati", prof: "Native", r: true, w: true, s: true },
                           ].map((lang) => (
                              <tr key={lang.name}>
                                 <td className="py-3 font-medium text-slate-900 dark:text-white">{lang.name}</td>
                                 <td className="py-3 text-slate-600 dark:text-slate-400">{lang.prof}</td>
                                 <td className="py-3 text-center"><CheckCircle2 size={14} className={lang.r ? "text-green-500 mx-auto" : "text-slate-300 mx-auto"} /></td>
                                 <td className="py-3 text-center"><CheckCircle2 size={14} className={lang.w ? "text-green-500 mx-auto" : "text-slate-300 mx-auto"} /></td>
                                 <td className="py-3 text-center"><CheckCircle2 size={14} className={lang.s ? "text-green-500 mx-auto" : "text-slate-300 mx-auto"} /></td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
