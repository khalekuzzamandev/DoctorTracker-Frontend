"use client";

import {
  Briefcase,
  Code,
  Envelope,
  FileText,
  Folder,
  Gear,
  GraduationCap,
  House,
} from "@gravity-ui/icons";
import { Award, CircleUser, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Profile from "./Profile";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { FaBriefcaseMedical } from "react-icons/fa";

const navItems = [
  { icon: House, label: "Home", href: "/dashboard" },
  { icon: Briefcase, label: "Doctors", href: "/dashboard/admin/doctors" },
  { icon: FaBriefcaseMedical, label: "Patients", href: "/dashboard/admin/patients" },
  { icon: CircleUser, label: "Profile", href: "/dashboard/admin/Profile" },
  { icon: Gear, label: "Settings", href: "/dashboard/admin/settings" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();


  return (
    <>
      {/* Mobile Header */}
      <header className="fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/10 bg-zinc-950 px-4 md:hidden">
        <div>

          <h1 className="text-lg font-bold tracking-tight text-white">
            Portfolio<span className="text-purple-500">.</span>
          </h1>

          <p className="text-[10px] text-zinc-500">Admin Dashboard</p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white active:scale-95"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-zinc-950 px-5 py-6 shadow-2xl shadow-black/40 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        {/* Header */}
        <div className="mb-10 flex items-start justify-between px-3">
          <div className="flex items-center gap-4">
            <Link href={'/'}
              type="button"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] text-zinc-400 shadow-lg shadow-black/20 transition-all duration-200 hover:border-purple-500/40 hover:text-purple-400 cursor-pointer"
            >
              <IoReturnUpBackOutline className="text-lg " />
            </Link>

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white">
                Portfolio<span className="text-purple-500">.</span>
              </h1>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* Close button - Mobile only */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/5 hover:text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActiveRoute = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${isActiveRoute
                  ? "border-orange-500/8 text-white shadow"
                  : "border-transparent text-zinc-400 hover:border-white/10 hover:text-white"
                  }`}
              >
                <Icon
                  className={`size-5 shrink-0 transition-colors duration-200 ${isActiveRoute
                    ? "text-orange-500"
                    : "text-zinc-500 group-hover:text-orange-400"
                    }`}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="mt-6 border-t border-white/5 pt-4">
          <Profile />
        </div>
      </aside>

      {/* Mobile top spacing */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default Sidebar;