
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  HeartPulse,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Users,
  Activity,
  CheckCircle2,
  Loader2,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";

import { authClient } from "@/Components/lib/auth-client";

const DEMO_EMAIL = "admin@gmail.com";
const DEMO_PASSWORD = "12345678";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDemoLogin = () => {
    setFormData({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    });

    setError("");
  };

  const handleCopy = async (value: string, type: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch {
      setError("Unable to copy. Please copy manually.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const email = formData.email.trim();
    const password = formData.password;

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Invalid email or password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f1f5f9] px-4 py-10 sm:px-6">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_25px_80px_-20px_rgba(15,23,42,0.18)] lg:grid-cols-2">

        {/* LEFT SIDE */}
        <section className="relative hidden min-h-[720px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0756c9] via-[#0875df] to-[#06b6d4] p-10 text-white lg:flex xl:p-14">

          {/* Decorative Circles */}
          <div className="absolute -right-32 -top-24 h-96 w-96 rounded-full border-[45px] border-white/[0.07]" />
          <div className="absolute -bottom-40 -left-28 h-[450px] w-[450px] rounded-full border-[55px] border-white/[0.07]" />
          <div className="absolute right-10 top-1/2 h-32 w-32 rounded-full bg-cyan-300/20 blur-2xl" />

          {/* Brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-xl">
              <HeartPulse size={29} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                DoctorTracker
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[2.5px] text-blue-100">
                Healthcare Management
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={15} />
              Smart Healthcare Platform
            </div>

            <h2 className="text-5xl font-extrabold leading-[1.15] tracking-tight xl:text-6xl">
              Healthcare
              <br />
              Management
              <br />
              <span className="text-cyan-200">
                Made Simple.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-8 text-blue-100">
              Manage doctors, organize patient records, and streamline
              healthcare operations with one intelligent platform.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <Stethoscope size={21} />
                </div>
                <h3 className="text-sm font-bold">Doctor Management</h3>
                <p className="mt-1 text-xs text-blue-100">
                  Manage medical professionals.
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <Users size={21} />
                </div>
                <h3 className="text-sm font-bold">Patient Records</h3>
                <p className="mt-1 text-xs text-blue-100">
                  Organize patient information.
                </p>
              </div>

            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-6">
            <p className="text-xs text-blue-100">
              © 2026 DoctorTracker. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-blue-100">
              <ShieldCheck size={16} />
              Secure Platform
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-14 xl:px-16">

          {/* Mobile Brand */}
          <div className="mb-9 flex items-center gap-3 lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
              <HeartPulse size={27} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Doctor<span className="text-blue-600">Tracker</span>
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Healthcare Management
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <LockKeyhole size={23} />
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome Back!
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to your account and access your healthcare dashboard.
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mb-7 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50">

            <div className="flex items-center justify-between border-b border-blue-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Demo Admin Account
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Test the admin dashboard
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
                DEMO
              </span>
            </div>

            <div className="space-y-3 p-4">

              {/* Demo Email */}
              <div>
                <p className="mb-1.5 text-[11px] font-semibold text-slate-500">
                  EMAIL ADDRESS
                </p>

                <div className="flex items-center justify-between gap-2 rounded-lg border border-blue-100 bg-white px-3 py-2.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {DEMO_EMAIL}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopy(DEMO_EMAIL, "email")}
                    className="text-slate-400 transition hover:text-blue-600"
                    aria-label="Copy demo email"
                  >
                    {copied === "email" ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Demo Password */}
              <div>
                <p className="mb-1.5 text-[11px] font-semibold text-slate-500">
                  PASSWORD
                </p>

                <div className="flex items-center justify-between gap-2 rounded-lg border border-blue-100 bg-white px-3 py-2.5">
                  <span className="text-xs font-bold tracking-widest text-slate-700">
                    {DEMO_PASSWORD}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopy(DEMO_PASSWORD, "password")}
                    className="text-slate-400 transition hover:text-blue-600"
                    aria-label="Copy demo password"
                  >
                    {copied === "password" ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 active:scale-[0.98]"
              >
                <Sparkles size={15} />
                Use Demo Account
              </button>

            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className={inputClass}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={inputClass}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                <Activity size={17} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

          </form>

          {/* Security Note */}
          <div className="mt-7 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
            <CheckCircle2 size={15} className="text-green-500" />
            Your account information is protected and secure.
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-slate-400">
            © 2026 DoctorTracker. All rights reserved.
          </p>

        </section>
      </div>
    </main>
  );
};

export default Login;
