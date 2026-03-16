"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { clearUser } from "@/lib/store/slices/userSlice";
import { signOut, useSession } from "next-auth/react";

export function EmployerNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const { data: userResponse } = useAppSelector((state) => state.user);
  
  const user = session?.user || userResponse?.user || userResponse;
  
  const [isMounted, setIsMounted] = useState(false);
  const [displayUser, setDisplayUser] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    if (user) setDisplayUser(user);
  }, [user]);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUser());
    signOut({ callbackUrl: "/" });
  };

  const ProfileMenuPopUp = () => (
    <AnimatePresence>
      {profileDropdownOpen && (
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 10 }}
           transition={{ duration: 0.15 }}
           className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl dark:border-slate-800 dark:bg-slate-950/95"
        >
           <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                 <img src={`https://ui-avatars.com/api/?name=${displayUser?.fullName || "Recruiter"}&background=random`} alt={displayUser?.fullName || "Recruiter"} className="h-full w-full object-cover" />
              </div>
              <div className="truncate">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">{displayUser?.fullName || "Recruiter"}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role || "Employer"}</p>
              </div>
           </div>
           <div className="p-2 space-y-1">
              <Link onClick={() => setProfileDropdownOpen(false)} href="/employer/dashboard" className="flex flex-col px-3 py-2 hover:bg-slate-50 text-left rounded-lg dark:hover:bg-slate-900/50 transition-colors">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Dashboard</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Go to your dashboard</span>
              </Link>
              <Link onClick={() => setProfileDropdownOpen(false)} href="/employer/profile" className="flex flex-col px-3 py-2 hover:bg-slate-50 text-left rounded-lg dark:hover:bg-slate-900/50 transition-colors">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company Profile</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Update company details</span>
              </Link>
              <Link onClick={() => setProfileDropdownOpen(false)} href="/employer/settings" className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg dark:text-slate-300 dark:hover:bg-slate-900/50 transition-colors">Settings</Link>
           </div>
           <div className="p-2 border-t border-slate-100 dark:border-slate-800">
              <button onClick={handleLogout} className="flex w-full items-center px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors">Logout</button>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 sm:px-6">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
          >
            <RxHamburgerMenu size={20} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
          <FaBell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-950" />
        </button>

        <div className="relative" onMouseEnter={() => setProfileDropdownOpen(true)} onMouseLeave={() => setProfileDropdownOpen(false)}>
          <button className="group flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
            <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700">
              {isMounted && (
                <img
                  src={`https://ui-avatars.com/api/?name=${displayUser?.fullName || "R"}&background=random`}
                  alt={displayUser?.fullName || "Recruiter"}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <IoChevronDown className="text-slate-400 transition-colors group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" />
          </button>
          {isMounted && <ProfileMenuPopUp />}
        </div>
      </div>
    </header>
  );
}
