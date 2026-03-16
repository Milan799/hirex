"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { updateProfile } from "@/lib/store/slices/userSlice";
import { notify } from "@/lib/utils";
import { Building2, Mail, Phone, MapPin, Globe, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function EmployerProfile() {
  const { data: user, status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: user?.companyName || "",
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    location: user?.location || "",
    website: user?.website || "",
    bio: user?.bio || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData)).unwrap();
      notify("Profile updated successfully", "success");
      setIsEditing(false);
    } catch (error: any) {
      notify(error.error || "Failed to update profile", "error");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Company Profile</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your company details and recruiter identity.</p>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="rounded-xl bg-purple-100 px-6 py-2 text-sm font-bold text-purple-700 hover:bg-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:hover:bg-purple-900/60"
              >
                Edit Profile
              </button>
            )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
        >
            <div className="mb-8 flex items-start gap-6">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-slate-50 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                   {user?.companyName ? (
                       <img src={`https://ui-avatars.com/api/?name=${user.companyName}&background=random&size=100`} alt="Company Logo" className="rounded-xl object-cover" />
                   ) : (
                       <Building2 size={40} className="text-slate-400" />
                   )}
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.companyName || "Your Company Name"}</h2>
                   <p className="font-medium text-slate-500 dark:text-slate-400">{user?.fullName}</p>
                   <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                       <span className="flex items-center gap-1.5"><Mail size={14} /> {user?.email}</span>
                       <span className="flex items-center gap-1.5"><Phone size={14} /> {user?.phone || "No phone added"}</span>
                   </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Company Name</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-purple-500 focus:bg-white disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-purple-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Recruiter Name</label>
                        <input 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium outline-none focus:border-purple-500 focus:bg-white disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-purple-500"
                        />
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Phone</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-purple-500 focus:bg-white disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-purple-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                              disabled={!isEditing}
                              placeholder="e.g. Bangalore, India"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-purple-500 focus:bg-white disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Company Website</label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="https://example.com"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-purple-500 focus:bg-white disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-purple-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Company Description</label>
                    <textarea 
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Tell candidates about your company culture, mission, and what you do..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium outline-none focus:border-purple-500 focus:bg-white disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-purple-500"
                    />
                </div>

                {isEditing && (
                    <div className="mt-8 flex items-center justify-end gap-4 border-t border-slate-100 pt-6 dark:border-slate-800">
                        <button 
                          type="button"
                          onClick={() => {
                              setIsEditing(false);
                              setFormData({
                                  companyName: user?.companyName || "",
                                  fullName: user?.fullName || "",
                                  phone: user?.phone || "",
                                  location: user?.location || "",
                                  website: user?.website || "",
                                  bio: user?.bio || ""
                              });
                          }}
                          className="text-sm font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                        >
                            Cancel
                        </button>
                        <button 
                          type="submit"
                          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-colors"
                        >
                            <Save size={16} /> Save Changes
                        </button>
                    </div>
                )}
            </form>
        </motion.div>
      </main>
    </div>
  );
}
