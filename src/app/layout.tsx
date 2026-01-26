import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/provider";
import { ThemeProvider } from "@/components/theme-provider"; // Import kiya

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
    // 'suppressHydrationWarning' add karna zaroori hai
    <html lang="en" suppressHydrationWarning> 
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
             <ReduxProvider>
          {children}
        </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}