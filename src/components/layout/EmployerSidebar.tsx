"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  Briefcase, 
  Users, 
  Settings, 
  FileText,
  Activity,
  PlusCircle,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    title: "Overview",
    links: [
      { href: "/employer/dashboard", label: "Dashboard", icon: <Activity className="h-4 w-4" /> },
      { href: "/employer/profile", label: "Company Profile", icon: <Building2 className="h-4 w-4" /> },
    ]
  },
  {
    title: "Hiring",
    links: [
      { href: "/employer/jobs/new", label: "Post a Job", icon: <PlusCircle className="h-4 w-4" /> },
      { href: "/employer/jobs", label: "Manage Jobs", icon: <Briefcase className="h-4 w-4" /> },
      { href: "/employer/applications", label: "Applications", icon: <FileText className="h-4 w-4" /> },
    ]
  },
  {
    title: "Network",
    links: [
      { href: "/employer/resdex", label: "Candidate Search (Resdex)", icon: <Search className="h-4 w-4" /> },
      { href: "/employer/candidates", label: "Saved Candidates", icon: <Users className="h-4 w-4" /> },
    ]
  },
  {
    title: "Account",
    links: [
      { href: "/employer/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
    ]
  }
];

export function EmployerSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={cn("flex h-full w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950", className)}>
      <div className="flex h-16 items-center border-b border-slate-200 px-6 dark:border-slate-800">
        <Link href="/employer/dashboard" className="flex items-center gap-2">
           <span className="flex flex-col leading-tight">
             <span className="bg-linear-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-xl font-bold tracking-tight text-transparent">
               Hire<span className="text-slate-950 dark:text-slate-50">X</span>
               <span className="ml-1 inline-block -translate-y-2 transform rounded-full bg-purple-100 px-1.5 py-0.5 text-[10px] uppercase text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">Employer</span>
             </span>
           </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {sidebarLinks.map((group, i) => (
          <div key={i} className="mb-6 px-4">
            <h4 className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {group.title}
            </h4>
            <ul className="space-y-1">
              {group.links.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400" 
                          : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50"
                      )}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
