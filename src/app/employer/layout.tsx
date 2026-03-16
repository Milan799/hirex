"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { EmployerNavbar } from "@/components/layout/EmployerNavbar";
import { EmployerSidebar } from "@/components/layout/EmployerSidebar";
import { useAppSelector } from "@/lib/store/hooks";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session, status: sessionStatus } = useSession();
  const { data: userResponse, status: userStatus } = useAppSelector((state) => state.user);
  
  const user = session?.user || userResponse?.user || userResponse;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Basic Client-Side Route Protection (will be reinforced by middleware)
    if (sessionStatus !== "loading" && userStatus !== "loading") {
      if (!user) {
        // Not logged in
        router.push("/auth/login?callbackUrl=" + encodeURIComponent(pathname));
      } else if (user.role !== "recruiter") {
        // Not a recruiter
        router.push("/mnjuser/homepage");
      }
    }
  }, [user, sessionStatus, userStatus, router, pathname]);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (sessionStatus === "loading" || userStatus === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user || user.role !== "recruiter") {
    return null; // The useEffect above handles redirection
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <EmployerSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <EmployerNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-950 shadow-xl md:hidden"
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <IoClose size={24} />
              </button>
              <EmployerSidebar className="w-full border-r-0" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
