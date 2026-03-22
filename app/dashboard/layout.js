"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token) {
      router.replace("/login");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));

      if(!decoded?.id) {
        localStorage.removeItem("token");
        router.replace("/login");
        return;
      }
    } catch(e) {
       localStorage.removeItem("token");
       router.replace("/login");
       return;
    }

    setAuthorized(true);
  }, [router])

  if(!authorized) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen">
        {/* Mobile overlay */}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar wrapper */}
        <aside
          className={`
            fixed top-0 left-0 z-50 h-screen w-64 bg-zinc-900 border-r border-zinc-800
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:static md:h-auto md:shrink-0
          `}
        >
          <Sidebar closeSidebar={() => setOpen(false)} />
        </aside>

        {/* Main area */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800">
            <button onClick={() => setOpen(true)} aria-label="Open menu">
              <FaBars size={20} />
            </button>
            <h2 className="font-semibold">Dashboard</h2>
            <div className="w-5" />
          </div>

          <main className="flex-1 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}