import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import "./globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { TanstackQueryClientProvider } from "@/components/tanstack-query-client-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Platinum",
  description: "Top tech-news everyday!",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
         <TanstackQueryClientProvider>
         {children}
         </TanstackQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;