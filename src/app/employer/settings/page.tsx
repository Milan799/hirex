"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { useState } from "react";
import { Bell, Shield, Wallet, Users, LayoutTemplate, Settings } from "lucide-react";

export default function EmployerSettings() {
  const { data: user } = useAppSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("notifications");

  return (
    <div className="w-full">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your notifications, security, and billing.</p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          
          {/* Settings Sidebar */}
          <div className="w-full shrink-0 md:w-64">
            <nav className="flex flex-col space-y-1">
              {[
                { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
                { id: "security", label: "Security & Login", icon: <Shield size={18} /> },
                { id: "billing", label: "Billing & Plans", icon: <Wallet size={18} /> },
                { id: "team", label: "Team Members", icon: <Users size={18} /> },
                { id: "preferences", label: "Preferences", icon: <LayoutTemplate size={18} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Email Notifications</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Choose what updates you want to receive.</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: "New Job Applications", desc: "Get notified when a candidate applies to your jobs." },
                    { title: "Candidate Messages", desc: "Receive email when candidates reply to your messages." },
                    { title: "Weekly Newsletter", desc: "Tips and insights for recruiters." },
                    { title: "Account Alerts", desc: "Security and billing updates (cannot be disabled)." }
                  ].map((item, i) => (
                      <div key={i} className="flex flex-row items-center justify-between rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                          <div className="space-y-0.5">
                              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
                              <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">{item.desc}</p>
                          </div>
                          <div>
                            <label className="relative inline-flex cursor-pointer items-center">
                              <input type="checkbox" defaultChecked={i !== 2} disabled={i === 3} className="peer sr-only" />
                              <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/30 peer-disabled:opacity-50 dark:border-gray-600 dark:bg-slate-700 dark:peer-focus:ring-purple-800"></div>
                            </label>
                          </div>
                      </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-6">
                 <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Current Plan</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Manage your subscription and billing cycle.</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-6 border border-purple-100 dark:from-purple-950/20 dark:to-indigo-950/20 dark:border-purple-900/40">
                    <div className="flex items-center justify-between">
                        <div>
                         <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 mb-2 dark:bg-purple-900/60 dark:text-purple-300">Basic Tier</span>
                         <h3 className="text-2xl font-bold dark:text-white">Free Trial</h3>
                         <p className="text-sm font-medium text-slate-600 mt-1 dark:text-slate-400">Limited to 3 active job postings.</p>
                        </div>
                        <button className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                            Upgrade Plan
                        </button>
                    </div>
                </div>
              </div>
            )}

            {/* Placeholder for others */}
            {["security", "team", "preferences"].includes(activeTab) && (
                <div className="flex h-64 flex-col items-center justify-center text-center">
                    <div className="mb-4 h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center dark:bg-slate-800">
                        <Settings size={24} className="text-slate-400" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white capitalize">{activeTab} Settings</h2>
                    <p className="text-sm text-slate-500 mt-2 dark:text-slate-400 max-w-md">This section is currently under development. Additional configuration options will be available soon.</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
