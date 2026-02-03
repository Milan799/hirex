"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/auth/login", label: "Sign In" },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-slate-900/70 px-3 py-1.5 text-sm font-semibold text-slate-100 shadow-lg shadow-blue-500/20"
          onClick={close}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-tr from-blue-600 to-cyan-500 text-sm font-bold text-white">
            H
          </span>
          <span className="tracking-tight">
            Hire<span className="text-blue-400">X</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            const baseClasses =
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors";

            const activeClasses =
              "bg-blue-600/90 text-white shadow-md shadow-blue-500/40";
            const inactiveClasses =
              "text-slate-300 hover:text-white hover:bg-slate-800/80";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${baseClasses} ${
                  isActive ? activeClasses : inactiveClasses
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 p-2 text-slate-200 hover:border-slate-500 hover:bg-slate-800 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <IoClose className="h-5 w-5" /> : <RxHamburgerMenu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="border-t border-slate-800/60 bg-slate-950/95 md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pb-4 pt-3 sm:px-6 lg:px-8">
              {links.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className={`rounded-xl px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "bg-blue-600/90 text-white shadow-md shadow-blue-500/40"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

