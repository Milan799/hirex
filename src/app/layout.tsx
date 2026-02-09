import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/provider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Footer } from "@/components/Footer";
import { ClientLoader } from "@/components/ClientLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HireX",
  description: "Job Hunting Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.className} antialiased bg-linear-to-br from-indigo-50/40 via-white to-cyan-50/40 text-slate-900 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100`}
      >
        <SessionProvider>
          <ReduxProvider>
            <ClientLoader>
              {children}
              <Footer />
            </ClientLoader>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}