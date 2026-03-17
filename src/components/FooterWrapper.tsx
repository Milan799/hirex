"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Hide footer on all employer portal pages and certain auth/util pages
  const shouldHideFooter =
    pathname.startsWith("/employer") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/mnjuser") ||
    ["/privacy", "/terms", "/fraud-alert"].includes(pathname);

  if (shouldHideFooter) return null;

  return <Footer />;
}
