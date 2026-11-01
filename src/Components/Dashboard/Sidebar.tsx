
"use client";

import {
  Briefcase,
  Gear,
  House,
} from "@gravity-ui/icons";

import { CircleUser, Menu, X } from "lucide-react";
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
  { icon: CircleUser, label: "Profile", href: "/dashboard/admin/profile" },
  { icon: Gear, label: "Settings", href: "/dashboard/admin/settings" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#071A35] px-5 shadow-lg shadow-black/10 md:hidden">

        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Doctor<span className="text-blue-600">Traker</span>
          </h1>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-200/60">
            Admin Dashboard
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 active:scale-95"
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
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#002855] px-4 py-6 shadow-2xl shadow-slate-950/30 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:sticky md:top-0 md:translate-x-0`}
      >

        {/* Header */}
        <div className="mb-10 flex items-start justify-between px-2">

          <div className="flex items-center gap-3">

            <Link
              href="/"
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-blue-200 shadow-lg transition-all duration-200 hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white"
            >
              <IoReturnUpBackOutline className="text-xl transition-transform duration-200 group-hover:-translate-x-0.5" />
            </Link>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                Doctor<span className="text-blue-600">Traker</span>
              </h1>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Admin Dashboard
              </p>
            </div>

          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Navigation Label */}
        <div className="mb-3 px-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Main Menu
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto">

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActiveRoute = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3.5 text-sm font-medium transition-all duration-200 ${isActiveRoute
                    ? "border-blue-400/20 bg-blue-500/15 text-white shadow-lg shadow-blue-950/20"
                    : "border-transparent text-white hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                  }`}
              >

                {/* Active Indicator */}
                {isActiveRoute && (
                  <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-blue-400" />
                )}

                <Icon
                  className={`size-5 shrink-0 transition-all duration-200 ${isActiveRoute
                      ? "text-blue-400"
                      : "text-slate-500 group-hover:text-blue-300"
                    }`}
                />

                <span className="flex-1">{item.label}</span>

                {isActiveRoute && (
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                )}

              </Link>
            );
          })}

        </nav>

        {/* Profile */}
        <div className="mt-6 border-t border-white/10 pt-5">
          <Profile />
        </div>

      </aside>

      {/* Mobile Top Spacing */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default Sidebar;
