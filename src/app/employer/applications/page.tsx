"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchJobs } from "@/lib/store/slices/jobSlice";
import { fetchJobApplications, updateApplicationStatus } from "@/lib/store/slices/applicationSlice";
import Link from "next/link";
import { Briefcase, Clock, MapPin, Users, Filter, Search, ChevronRight, XCircle } from "lucide-react";
import { notify } from "@/lib/utils";

export default function EmployerApplicationsList() {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const { jobs, status: jobStatus } = useAppSelector((state) => state.job);
  
  // To avoid having to fetch applications for EVERY job at once, we'll list the Jobs first 
  // and show basic stats, then user clicks to view the ATS for that specific job on the dashboard.
  // This page acts as a "Directory of Jobs & Application Counts" for ATS management.

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchJobs({ employerId: user._id }));
    }
  }, [dispatch, user]);

  return (
    <div className="w-full">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Active Applications</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Select a job below to open the ATS Applicant Board.</p>
            </div>
            <div className="flex gap-2">
               <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800 focus-within:ring-1 focus-within:border-blue-500 focus-within:ring-blue-500">
                   <Search size={16} className="text-slate-400" />
                   <input 
                      type="text" 
                      placeholder="Search jobs..."
                      className="bg-transparent text-sm outline-none dark:text-white"
                   />
               </div>
               <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
                   <Filter size={16} /> Filter
               </button>
            </div>
        </div>

        {jobStatus === "loading" && (
            <div className="flex justify-center p-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
            </div>
        )}

        {jobStatus === "succeeded" && jobs.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 p-16 text-center dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
               <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                   <Users size={24} className="text-slate-400" />
               </div>
               <h3 className="text-lg font-bold text-slate-900 dark:text-white">No applications yet</h3>
               <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto dark:text-slate-400">You need to post a job before you can receive applications from candidates.</p>
               <Link href="/employer/jobs/new" className="mt-6 inline-block rounded-full bg-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-purple-700 transition">
                   Post a Job
               </Link>
            </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {jobs.map((job: any) => (
                <div key={job._id} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-purple-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-purple-800">
                    <div className="mb-4">
                        <div className="flex items-start justify-between">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">{job.title}</h3>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                job.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                            }`}>
                                {job.status}
                            </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase size={14}/> {job.experienceLevel}</span>
                            <span className="flex items-center gap-1"><Clock size={14}/> Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-3">
                                {/* Mock applicant avatars to show it's active */}
                                {[1,2,3].map((i) => (
                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 dark:border-slate-900 dark:bg-slate-700 overflow-hidden">
                                        <img src={`https://ui-avatars.com/api/?name=Candidate+${i}&background=random`} alt="Candidate" />
                                    </div>
                                ))}
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-bold text-slate-600 dark:border-slate-900 dark:bg-slate-800 dark:text-slate-300">
                                    +
                                </div>
                            </div>
                            
                            <Link 
                              href={`/employer/dashboard?jobId=${job._id}`} 
                              className="group/btn flex items-center gap-2 rounded-xl bg-purple-50 px-4 py-2 text-sm font-bold text-purple-700 transition hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/40"
                            >
                                Open ATS Board <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
