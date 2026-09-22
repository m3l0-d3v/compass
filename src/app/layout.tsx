import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/header";
import { cn } from "@/lib/shadcn";
import { Sidebar } from "./_components/sidebar";
import { LayoutProvider } from "@/contexts/layout";
import { Toaster } from "@/components/ui/toast";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Compass",
  description: "Armazene, organize e acesse seus arquivos de qualquer lugar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-br"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        dmSans.variable,
      )}
    >
      <body className="flex w-screen h-screen overflow-hidden flex-col dark">
        <LayoutProvider>
          <Header />
          <div className="w-full flex-1 h-[calc(100dvh-64px)] flex flex-row">
            <Sidebar />
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              {children}
            </div>
          </div>
          <Toaster />
        </LayoutProvider>
      </body>
    </html>
  );
}
