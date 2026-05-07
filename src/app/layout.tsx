import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Ops Dashboard",
  description: "Real-time platform engineering operations dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex h-screen overflow-hidden bg-slate-950">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
