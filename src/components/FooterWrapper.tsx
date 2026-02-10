"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function FooterWrapper() {
  const pathname = usePathname();
  
  // Paths where the footer should be hidden
  const hiddenPaths = ["/privacy", "/terms", "/blog", "/auth/login", "/auth/register", "/auth/forgot"];
  
  // Check if the current path is one of the hidden paths
  const shouldHideFooter = hiddenPaths.includes(pathname);

  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}
