"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/Navbar";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchJobs } from "@/lib/store/slices/jobSlice";
import { fetchJobApplications, updateApplicationStatus } from "@/lib/store/slices/applicationSlice";
import { motion, AnimatePresence } from "framer-motion";
import { notify } from "@/lib/utils";
import { 
  Building2, Briefcase, Users, Activity, 
  MapPin, Clock, CheckCircle2, XCircle, ChevronRight, Plus
} from "lucide-react";

export default function EmployerDashboard() {
  const dispatch = useAppDispatch();
  const { data: user, status: userStatus } = useAppSelector((state) => state.user);
  const { jobs, status: jobStatus } = useAppSelector((state) => state.job);
  const { applications, status: appStatus } = useAppSelector((state) => state.application);
  
  const [activeTab, setActiveTab] = useState("jobs");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchJobs({ employerId: user._id }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (selectedJobId) {
      dispatch(fetchJobApplications(selectedJobId));
      setActiveTab("ats");
    }
  }, [dispatch, selectedJobId]);

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      await dispatch(updateApplicationStatus({ applicationId, status: newStatus })).unwrap();
      notify(`Status updated to ${newStatus}`, "success");
    } catch (err: any) {
      notify(err.error || "Failed to update status", "error");
    }
  };

  // Group applications by status for Kanban Board
  const columns = [
    { title: "Pending", status: "Pending", accent: "amber", borderClasses: "border-amber-500", bgClasses: "bg-linear-to-b from-amber-50/80 to-transparent dark:from-amber-950/20" },
    { title: "Shortlisted", status: "Shortlisted", accent: "blue", borderClasses: "border-blue-500", bgClasses: "bg-linear-to-b from-blue-50/80 to-transparent dark:from-blue-950/20" },
    { title: "Interview", status: "Interview", accent: "purple", borderClasses: "border-purple-500", bgClasses: "bg-linear-to-b from-purple-50/80 to-transparent dark:from-purple-950/20" },
    { title: "Rejected", status: "Rejected", accent: "red", borderClasses: "border-red-500", bgClasses: "bg-linear-to-b from-red-50/80 to-transparent dark:from-red-950/20" },
  ];

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // If user is loaded but not a recruiter, we could show an error, but for now we let them see the UI 
  // or at least wait for the user to be fetched if it's null.
  if (!user && userStatus !== "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-xl font-bold">Please login to view Employer Dashboard</h2>
          <Link href="/auth/login" className="text-blue-500 hover:underline mt-2 inline-block">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <PublicNavbar />
      
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Employer Dashboard</h1>
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50">Recruiter Portal</span>
            </div>
            <p className="text-sm font-medium text-slate-500 mt-1 dark:text-slate-400">
              Manage your job postings and track candidates seamlessly.
            </p>
          </div>
          <Link href="/employer/jobs/new" className="flex items-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all">
            <Plus size={18} /> Post a New Job
          </Link>
        </div>

        {/* Quick Stats Row */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Active Jobs", value: jobs.length, icon: <Briefcase className="h-5 w-5 text-blue-500" />, bg: "bg-blue-50 dark:bg-blue-900/10" },
            { label: "Total Applicants", value: applications.length || 0, icon: <Users className="h-5 w-5 text-purple-500" />, bg: "bg-purple-50 dark:bg-purple-900/10" },
            { label: "Interviews", value: applications.filter(a => a.status === 'Interview').length || 0, icon: <Clock className="h-5 w-5 text-orange-500" />, bg: "bg-orange-50 dark:bg-orange-900/10" },
            { label: "Hired", value: applications.filter(a => a.status === 'Hired').length || 0, icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, bg: "bg-green-50 dark:bg-green-900/10" },
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Tabs */}
        <div className="mb-6 flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-px">
          <button
            onClick={() => { setActiveTab("jobs"); setSelectedJobId(null); }}
            className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-colors ${
              activeTab === "jobs" 
                ? "border-b-2 border-purple-600 text-purple-600 dark:border-purple-500 dark:text-purple-400" 
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            }`}
          >
            Active Jobs
          </button>
          {selectedJobId && (
            <button
              onClick={() => setActiveTab("ats")}
              className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-colors ${
                activeTab === "ats" 
                  ? "border-b-2 border-purple-600 text-purple-600 dark:border-purple-500 dark:text-purple-400" 
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              }`}
            >
              ATS Board
            </button>
          )}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "jobs" && (
            <motion.div
              key="jobs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {jobStatus === "loading" && <p className="text-slate-500">Loading your jobs...</p>}
              {jobStatus === "succeeded" && jobs.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
                  <Briefcase className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
                  <h3 className="mt-4 text-lg font-bold">No jobs posted yet.</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Get started by posting your first opening.</p>
                </div>
              )}
              {jobs.map((job: any) => (
                <div 
                  key={job._id}
                  onClick={() => setSelectedJobId(job._id)}
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors dark:group-hover:text-blue-400">{job.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1 dark:text-slate-400">{job.location} • {job.experienceLevel}</p>
                    </div>
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {job.status}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2 mb-4">
                    {job.skillsRequired?.slice(0, 3).map((skill: string) => (
                      <span key={skill} className="rounded bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {skill}
                      </span>
                    ))}
                    {(job.skillsRequired?.length || 0) > 3 && <span className="text-[10px] text-slate-400">+{job.skillsRequired.length - 3}</span>}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-500">View Applicants <ChevronRight className="inline h-3 w-3" /></p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={12}/> {new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "ats" && (
            <motion.div
              key="ats"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="text-blue-500" /> Applicant Tracking Area
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Move candidates through your hiring pipeline.</p>
              </div>

              {appStatus === "loading" ? (
                <div className="flex justify-center p-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-4 overflow-x-auto pb-6 pt-4 px-2 snap-x">
                  {columns.map((col) => {
                    const colApps = applications.filter((a: any) => a.status === col.status);
                    
                    return (
                      <div key={col.title} className={`flex flex-col rounded-3xl border border-slate-200/50 p-5 shadow-sm min-w-72 snap-center transition-colors dark:border-slate-800 ${col.bgClasses} ring-1 ring-slate-900/5 dark:ring-white/5`}>
                        <div className="mb-5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <span className={`h-2.5 w-2.5 rounded-full bg-${col.accent}-500 shadow-[0_0_8px_rgba(0,0,0,0.3)] shadow-${col.accent}-500/50`}></span>
                             <h3 className="font-bold text-sm tracking-wide text-slate-800 dark:text-slate-200 uppercase">{col.title}</h3>
                          </div>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-slate-700 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:text-slate-300 dark:ring-white/10">
                            {colApps.length}
                          </span>
                        </div>
                        
                        <div className="flex flex-col gap-4 min-h-[50vh]">
                          {colApps.map((app: any) => (
                            <motion.div 
                              layoutId={app._id}
                              key={app._id} 
                              className={`group cursor-grab active:cursor-grabbing rounded-2xl border-l-4 ${col.borderClasses} border-r border-t border-b border-r-slate-200 border-t-slate-200 border-b-slate-200 bg-white p-5 shadow-sm hover:shadow-lg transition-all dark:border-r-slate-800 dark:border-t-slate-800 dark:border-b-slate-800 dark:bg-slate-900 dark:hover:shadow-black/40`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{app.candidateId?.fullName || "Unknown Candidate"}</h4>
                                  <p className="text-xs font-medium text-slate-500 mt-1 dark:text-slate-400 truncate max-w-[180px]">{app.candidateId?.email}</p>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex flex-wrap gap-1.5">
                                {app.candidateId?.skills?.slice(0, 3).map((s: string) => (
                                  <span key={s} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{s}</span>
                                ))}
                                {(app.candidateId?.skills?.length || 0) > 3 && <span className="text-[10px] font-medium text-slate-400 self-center ml-1">+{app.candidateId.skills.length - 3}</span>}
                              </div>
                              
                              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                  {app.resumeUrl ? (
                                    <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 hover:bg-blue-100 transition-colors dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                                      View CV
                                    </a>
                                  ) : <span className="text-[10px] text-slate-400">No CV</span>}
                                  
                                  <select 
                                    value={app.status}
                                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                    className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-700 outline-none cursor-pointer hover:border-blue-300 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-colors"
                                  >
                                    <option value="Pending">Move to Pending</option>
                                    <option value="Shortlisted">Shortlist candidate</option>
                                    <option value="Interview">Schedule Interview</option>
                                    <option value="Rejected" className="text-red-500">Reject candidate</option>
                                  </select>
                              </div>
                            </motion.div>
                          ))}
                          
                          {colApps.length === 0 && (
                            <div className="flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200/50 bg-white/50 dark:border-slate-800/50 dark:bg-slate-900/20 text-slate-400 dark:text-slate-500 text-xs font-semibold">
                              Drop here
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
