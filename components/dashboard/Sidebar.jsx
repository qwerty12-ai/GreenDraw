"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaChartLine,
  FaGift,
  FaHeart,
  FaTrophy,
} from "react-icons/fa";

export default function Sidebar({ closeSidebar }) {
  const path = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  }

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: <FaHome /> },
    { name: "Scores", href: "/dashboard/scores", icon: <FaChartLine /> },
    { name: "Draw", href: "/dashboard/draw", icon: <FaGift /> },
    { name: "Charity", href: "/dashboard/charity", icon: <FaHeart /> },
    { name: "Winnings", href: "/dashboard/winnings", icon: <FaTrophy /> },
  ];

  return (
    <div className="h-full w-64 p-6 flex flex-col gap-6 bg-zinc-900">
      <h2 className="text-xl font-bold text-green-500"><Link href={"/"}>GreenDraw</Link></h2>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const active = path === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                active
                  ? "bg-green-500/20 text-green-400"
                  : "text-gray-300 hover:bg-zinc-800"
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <button onClick={handleLogout} className="mt-auto bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-white">Logout</button>
    </div>
  );
}