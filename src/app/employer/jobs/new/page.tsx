"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PublicNavbar } from "@/components/layout/Navbar";
import { useAppSelector } from "@/lib/store/hooks";
import { notify } from "@/lib/utils";
import axiosClient from "@/lib/axios/axiosClientInstance";
import { Briefcase, Building2, MapPin, DollarSign, ListChecks, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PostJob() {
  const router = useRouter();
  const { data: user } = useAppSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    title: "",
    company: user?.companyName || "",
    location: "Remote",
    salaryRange: "",
    experienceLevel: "0-2 Yrs",
    skillsRequired: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== "recruiter") {
      notify("Only recruiters can post jobs.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        skillsRequired: formData.skillsRequired.split(",").map(s => s.trim()).filter(Boolean),
      };

      await axiosClient.post("/jobs", payload);
      notify("Job posted successfully!", "success");
      router.push("/employer/dashboard");
    } catch (err: any) {
      notify(err.response?.data?.error || err.message || "Failed to post job", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || user.role !== "recruiter") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-slate-500">Loading or unauthorized...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <PublicNavbar />
      
      <main className="mx-auto max-w-3xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Post a New Job
          </h1>
          <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">
            Reach thousands of potential candidates with just a few clicks.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Job Title & Company */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Briefcase size={16} className="text-blue-500" /> Job Title
                </label>
                <input 
                  required
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Engineer" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Building2 size={16} className="text-blue-500" /> Company Name
                </label>
                <input 
                  required
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. TechCorp" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>

            {/* Location & Salary */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <MapPin size={16} className="text-blue-500" /> Location / Type
                </label>
                <select 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                >
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site (Bangalore)</option>
                  <option>On-site (Mumbai)</option>
                  <option>On-site (Delhi)</option>
                </select>
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <DollarSign size={16} className="text-blue-500" /> Salary Range (Optional)
                </label>
                <input 
                  type="text" 
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  placeholder="e.g. ₹15,00,000 - ₹25,00,000" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>

            {/* Experience & Skills */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <ListChecks size={16} className="text-blue-500" /> Experience Level
                </label>
                <select 
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                >
                  <option>0-2 Yrs</option>
                  <option>2-5 Yrs</option>
                  <option>5-8 Yrs</option>
                  <option>8+ Yrs</option>
                </select>
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <ListChecks size={16} className="text-blue-500" /> Required Skills
                </label>
                <input 
                  required
                  type="text" 
                  name="skillsRequired"
                  value={formData.skillsRequired}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, TypeScript" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
                <p className="mt-1 text-[10px] text-slate-400">Comma separated format</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                Job Description
              </label>
              <textarea 
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the role, responsibilities, and ideal candidate..." 
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button 
                type="button"
                onClick={() => router.back()}
                className="font-bold text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <CheckCircle2 size={18} /> {isSubmitting ? "Posting..." : "Publish Job Post"}
              </button>
            </div>

          </form>
        </motion.div>
      </main>
    </div>
  );
}
