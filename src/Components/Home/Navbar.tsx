
"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

import {
  Menu,
  X,
  Stethoscope,
  Users,
  Info,
  Phone,
  House,
  type LucideIcon,
  Search,
  LayoutDashboard,
} from "lucide-react";
import { useSession } from "../lib/auth-client";
import { usePathname } from "next/navigation";

const navLinks: {
  name: string;
  href: string;
  icon: LucideIcon;
}[] = [
    { name: "Home", href: "/", icon: House },
    { name: "Doctors", href: "/doctors", icon: Stethoscope },
    { name: "Patients", href: "/patients", icon: Users },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

const SearchBar = () => {
  return (
    <form
      action="/search"
      method="GET"
      className="relative w-full sm:w-52"
    >
      <input
        type="search"
        name="q"
        placeholder="Search..."
        aria-label="Search doctors and patients"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
      />

      <button
        type="submit"
        aria-label="Submit search"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

const Navbar = () => {

  

  // get user session
  const { data: userSession, isPending } = useSession();
  const user = userSession?.user || null
  console.log(isPending, user, 'herre is user');

  const pathname = usePathname()
  if (pathname.includes('dashboard')) {
    return null
  }
  
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/icon.png"
            alt="DoctorTracker Logo"
            width={58}
            height={58}
            priority
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
          />

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Doctor<span className="text-blue-600">Traker</span>
            </h1>

            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-slate-500">
              Healthcare Management
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
              >
                <Icon size={16} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <SearchBar />
          {
            isPending ? (
              <div className="h-10 w-[110px] animate-pulse rounded-xl bg-gray-200" />
            ) : user ? (
              <Link
                href="/dashboard"
                className="group relative inline-flex h-10 w-[110px] items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
              >
                {/* Shine Animation */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Icon */}
                <LayoutDashboard
                  size={18}
                  strokeWidth={2.3}
                  className="relative z-10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
                />

                <span className="relative z-10">Dashboard</span>

                {/* Glow */}
                <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20 transition-all duration-300 group-hover:ring-white/40" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex h-10 w-[110px] items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg active:scale-95"
              >
                Login
              </Link>
            )
          }
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu />
        </div>

      </nav>
    </header>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">

      {/* Menu Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="rounded-xl bg-blue-50 p-3 text-blue-700 transition hover:bg-blue-100"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-14 z-50 w-[min(340px,calc(100vw-32px))] rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl">

          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Search & Login */}
          <div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-4">
            <SearchBar />

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Login
            </Link>
          </div>

        </div>
      )}
    </div>
  );
};

export default Navbar;
