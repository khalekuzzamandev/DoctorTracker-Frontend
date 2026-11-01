"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  HeartPulse,
  Home,
  Search,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative w-full max-w-2xl text-center">
       

        {/* 404 Illustration */}
        <div className="relative mx-auto mb-7 flex h-56 w-full max-w-sm items-center justify-center">
          <div className="absolute h-48 w-48 rounded-full border border-blue-200 bg-blue-50/70" />

          <div className="relative z-10 flex items-center gap-2">
            <span className="text-8xl font-black tracking-tighter text-blue-600 sm:text-9xl">
              4
            </span>

            <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-white bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-xl sm:h-28 sm:w-28">
              <Search size={46} strokeWidth={2.5} />
            </div>

            <span className="text-8xl font-black tracking-tighter text-blue-600 sm:text-9xl">
              4
            </span>
          </div>

          {/* Floating Icon */}
          <div className="absolute right-4 top-3 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-white text-blue-600 shadow-md sm:right-8">
            <Stethoscope size={23} />
          </div>

          <div className="absolute bottom-3 left-5 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-100 bg-white text-cyan-500 shadow-md sm:left-10">
            <ShieldAlert size={22} />
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Error 404
          </span>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Oops! Page Not Found
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
            The page you are looking for might have been removed, had its
            name changed, or is temporarily unavailable.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
            >
              <Home size={18} />
              Back to Home
              <ArrowRight size={17} />
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-14 border-t border-slate-200 pt-6">
          <p className="text-xs leading-6 text-slate-400 sm:text-sm">
            © 2026 Doctor Tracker. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Your healthcare management, simplified.
          </p>
        </div>
      </div>
    </main>
  );
}
