"use client"

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import {
  Menu,
  X,
  Stethoscope,
  Users,
  Info,
  Phone,
  LogIn,
  House,
  type LucideIcon,
 
} from 'lucide-react';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: '/', icon: House },
    { name: 'Doctors', href: '/doctors', icon: Stethoscope },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/icon.png"
            alt="DoctorTraker Logo"
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
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              <link.icon size={16} />
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <LogIn size={17} />
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <MobileMenu navLinks={navLinks} />
        </div>

      </nav>
    </header>
  );
};

const MobileMenu = ({ navLinks }: { navLinks: { name: string; href: string; icon: LucideIcon }[] }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="rounded-xl bg-blue-50 p-3 text-blue-700 transition hover:bg-blue-100"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 w-64 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 text-center text-sm font-bold text-slate-700 hover:bg-blue-50"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
