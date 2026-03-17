"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchJobs, fetchEmployerStats } from "@/lib/store/slices/jobSlice";
import { fetchJobApplications, updateApplicationStatus } from "@/lib/store/slices/applicationSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Briefcase, FileText, CheckCircle2, ChevronRight,
  TrendingUp, Clock, MapPin, XCircle, Loader2, Play
} from "lucide-react";
import { notify } from "@/lib/utils";

// Kanban Statuses
const STATUSES = ["Applied", "Screening", "Interview", "Offer", "Rejected"];

function DashboardContent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const atsJobId = searchParams.get("jobId");

  const { data: user } = useAppSelector((state) => state.user);
  const { jobs, stats, status: jobStatus } = useAppSelector((state) => state.job);
  const { applications, status: appStatus } = useAppSelector((state) => state.application);

  const [activeTab, setActiveTab] = useState<"overview" | "ats">(atsJobId ? "ats" : "overview");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(atsJobId);
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEmployerStats());
      dispatch(fetchJobs({ employerId: user._id }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (atsJobId && jobs.length > 0) {
      setActiveTab("ats");
      setSelectedJobId(atsJobId);
    } else if (!atsJobId && activeTab === "ats" && !selectedJobId && jobs.length > 0) {
      setSelectedJobId(jobs[0]._id);
    }
  }, [atsJobId, jobs]);

  useEffect(() => {
    if (activeTab === "ats" && selectedJobId) {
      dispatch(fetchJobApplications(selectedJobId));
    }
  }, [dispatch, activeTab, selectedJobId]);

  const handleStatusChange = async (appId: string, newStatus: string) => {
    setUpdatingAppId(appId);
    try {
      await dispatch(updateApplicationStatus({ applicationId: appId, status: newStatus })).unwrap();
    } catch (err) {
      notify("Failed to update status", "error");
    } finally {
      setUpdatingAppId(null);
    }
  };

  const statCards = [
    { label: "Active Jobs", value: stats?.activeJobs || 0, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-500/10", border: "border-blue-200 dark:border-blue-500/20" },
    { label: "Total Applications", value: stats?.totalApplications || 0, icon: FileText, color: "text-violet-500", bg: "bg-violet-100 dark:bg-violet-500/10", border: "border-violet-200 dark:border-violet-500/20" },
    { label: "Candidates Hired", value: stats?.hiredCandidates || 0, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-500/20" },
    { label: "Total Views", value: stats?.totalViews || 0, icon: Users, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/20" },
  ];

  if (jobStatus === "loading" && !stats) {
    return (
      <div className="min-h-full bg-slate-50 px-5 py-6 sm:px-8 dark:bg-[#0f0f13] transition-colors duration-300">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[1,2,3,4].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-white border border-slate-200 dark:bg-white/5 dark:border-white/5" />)}
        </div>
        <div className="h-96 w-full animate-pulse rounded-2xl bg-white border border-slate-200 dark:bg-white/5 dark:border-white/5" />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 px-5 py-6 sm:px-8 dark:bg-[#0f0f13] transition-colors duration-300">
      
      {/* Tab Nav */}
      <div className="mb-6 flex items-center gap-1 rounded-xl bg-slate-200/50 p-1 w-fit dark:bg-white/5 transition-colors duration-300">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
            activeTab === "overview" ? "bg-white text-slate-900 shadow-sm dark:bg-violet-600 dark:text-white dark:shadow-violet-900/50" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          <TrendingUp size={16} /> Overview
        </button>
        <button
          onClick={() => setActiveTab("ats")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
            activeTab === "ats" ? "bg-white text-slate-900 shadow-sm dark:bg-violet-600 dark:text-white dark:shadow-violet-900/50" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          <Users size={16} /> Tracker (ATS)
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {statCards.map((s, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-5 hover:border-violet-300 transition-all dark:bg-white/3 dark:border-white/8 dark:hover:border-violet-500/30 dark:hover:bg-white/5">
                  <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-opacity opacity-0 group-hover:opacity-100 ${s.bg}`} />
                  <div className="relative flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${s.bg} ${s.border} ${s.color}`}>
                      <s.icon size={22} />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white transition-colors duration-300">{s.value}</p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 transition-colors duration-300">{s.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recents */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Recent Jobs */}
              <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-6 dark:bg-white/3 dark:border-white/8 transition-colors duration-300">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300">Active Postings</h3>
                  <Link href="/employer/jobs" className="text-xs font-bold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 flex items-center gap-1 transition-colors">
                    View All <ChevronRight size={14} />
                  </Link>
                </div>
                
                {jobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/3 transition-colors duration-300">
                    <Briefcase className="text-slate-300 dark:text-slate-600 mb-3" size={32} />
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No active jobs</p>
                    <Link href="/employer/jobs/new" className="mt-3 text-sm font-bold text-violet-600 dark:text-violet-400 hover:underline">Post your first job</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {jobs.slice(0, 4).map((job: any) => (
                      <div key={job._id} className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 hover:border-violet-200 transition-colors dark:border-white/5 dark:bg-white/5 dark:hover:border-violet-500/30">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">{job.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs font-semibold text-slate-500 dark:text-slate-500">
                            <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {new Date(job.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400">
                          {job.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-800 p-6 text-white shadow-xl shadow-purple-900/20 dark:shadow-purple-900/50">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Play size={18} className="fill-white" /> Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/employer/jobs/new" className="flex w-full items-center justify-between rounded-xl bg-white/10 p-4 font-bold hover:bg-white/20 transition-colors border border-white/5">
                    Post a New Job <ChevronRight size={16} />
                  </Link>
                  <button onClick={() => setActiveTab("ats")} className="flex w-full items-center justify-between rounded-xl bg-white/10 p-4 font-bold hover:bg-white/20 transition-colors border border-white/5">
                    Review Applicants <ChevronRight size={16} />
                  </button>
                  <Link href="/employer/resdex" className="flex w-full items-center justify-between rounded-xl bg-white/10 p-4 font-bold hover:bg-white/20 transition-colors border border-white/5">
                    Search Candidates <ChevronRight size={16} />
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ATS KANBAN BOARD */}
        {activeTab === "ats" && (
          <motion.div key="ats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="h-full flex flex-col">
            
            {/* Job Selector Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white border border-slate-200 p-5 dark:bg-white/3 dark:border-white/8 transition-colors duration-300">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 transition-colors duration-300">
                  <Users className="text-violet-600 dark:text-violet-400" /> Applicant Tracking
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-0.5">Move candidates across the board to update their status.</p>
              </div>
              
              <select
                value={selectedJobId || ""}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full sm:w-64 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-bold text-slate-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-[#18181f] dark:text-white dark:focus:border-violet-500/50 transition-colors"
              >
                {jobs.length === 0 ? (
                  <option value="" disabled>No active jobs</option>
                ) : (
                  jobs.map((j: any) => (
                    <option key={j._id} value={j._id}>{j.title}</option>
                  ))
                )}
              </select>
            </div>

            {/* Kanban Board */}
            {!selectedJobId ? (
              <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 py-20 dark:border-white/10 transition-colors duration-300">
                <p className="font-semibold text-slate-400 dark:text-slate-500">Please select or post a job to track applicants.</p>
              </div>
            ) : appStatus === "loading" ? (
              <div className="flex flex-1 items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-violet-500" />
              </div>
            ) : (
              <div className="flex flex-1 gap-6 overflow-x-auto pb-4 custom-scrollbar">
                {STATUSES.map((status) => {
                  const colApps = applications.filter((a: any) => a.status === status);
                  
                  // Status Colors
                  const colors: Record<string, string> = {
                    "Applied":   "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400",
                    "Screening": "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-purple-400",
                    "Interview": "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400",
                    "Offer":     "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400",
                    "Rejected":  "border-red-200 bg-red-50 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400",
                  };

                  return (
                    <div key={status} className="flex w-80 shrink-0 flex-col rounded-2xl bg-slate-100 p-4 dark:bg-white/3 border border-slate-200 dark:border-transparent transition-colors duration-300">
                      
                      {/* Column Header */}
                      <div className="mb-4 flex items-center justify-between">
                        <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${colors[status]}`}>
                          {status}
                        </span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-400">
                          {colApps.length}
                        </span>
                      </div>

                      {/* Cards */}
                      <div className="flex flex-1 flex-col gap-3 overflow-y-auto min-h-[150px]">
                        {colApps.map((app: any) => (
                          <div key={app._id} className="group relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-violet-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-violet-500/40 transition-all duration-200">
                            
                            <div className="mb-3 flex items-start gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-violet-900/50 border border-slate-200 dark:border-violet-700/30 overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(app.candidateId?.fullName || "A")}&background=6d28d9&color=fff&size=80`} alt="" className="h-full w-full" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-bold text-slate-900 dark:text-white truncate transition-colors duration-300">{app.candidateId?.fullName || "Anonymous"}</p>
                                <p className="text-[10px] text-slate-500 truncate transition-colors duration-300">{app.candidateId?.email}</p>
                              </div>
                            </div>

                            <div className="mb-3 border-t border-slate-100 pt-3 dark:border-white/5 transition-colors duration-300">
                              <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 transition-colors duration-300">
                                <Clock size={11} /> Applied {new Date(app.appliedAt).toLocaleDateString()}
                              </p>
                              {app.coverLetter && (
                                <p className="mt-1.5 line-clamp-2 text-xs text-slate-500 italic dark:text-slate-500 transition-colors duration-300">"{app.coverLetter}"</p>
                              )}
                            </div>

                            {/* Status Mover Dropdown */}
                            <div className="relative">
                              <select
                                disabled={updatingAppId === app._id}
                                value={app.status}
                                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none hover:bg-slate-100 focus:border-violet-500 disabled:opacity-50 dark:border-white/10 dark:bg-[#18181f] dark:text-slate-300 dark:hover:bg-white/5 dark:focus:border-violet-500/50 transition-colors"
                              >
                                {STATUSES.map(s => (
                                  <option key={s} value={s}>Move to {s}</option>
                                ))}
                              </select>
                              {updatingAppId === app._id && (
                                <Loader2 size={12} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-violet-500" />
                              )}
                            </div>

                          </div>
                        ))}
                        
                        {colApps.length === 0 && (
                          <div className="rounded-xl border border-dashed border-slate-200 py-8 text-center dark:border-white/10 transition-colors duration-300">
                            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500">No candidates</p>
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

    </div>
  );
}

export default function EmployerDashboard() {
  return (
    <Suspense fallback={<div className="min-h-full bg-[#0f0f13] flex items-center justify-center"><Loader2 className="animate-spin text-violet-500" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
