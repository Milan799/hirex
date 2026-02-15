"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function LogoutPage() {
  useEffect(() => {
    localStorage.clear();
    signOut({ callbackUrl: "/" });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Logging out...</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Please wait while we redirect you.</p>
      </div>
    </div>
  );
}
