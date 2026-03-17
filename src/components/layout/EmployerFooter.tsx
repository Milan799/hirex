import Link from "next/link";

export function EmployerFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-4 dark:border-white/5 dark:bg-[#0f0f13] transition-colors duration-300">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-600 transition-colors duration-300">
          &copy; {new Date().getFullYear()} HireX Technologies. Employer Portal.
        </p>
        <div className="flex gap-4 text-xs font-semibold text-slate-500 dark:text-slate-600 transition-colors duration-300">
          <Link href="/terms" className="hover:text-slate-800 dark:hover:text-slate-400 transition-colors">Terms</Link>
          <span className="opacity-50">•</span>
          <Link href="/privacy" className="hover:text-slate-800 dark:hover:text-slate-400 transition-colors">Privacy</Link>
          <span className="opacity-50">•</span>
          <Link href="/help" className="hover:text-slate-800 dark:hover:text-slate-400 transition-colors">Help Center</Link>
        </div>
      </div>
    </footer>
  );
}
