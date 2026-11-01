
"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headset,
  Globe,
  ArrowRight,
  ShieldCheck,
  LifeBuoy,
  CheckCircle2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Number",
    value: "+880 1XXXXXXXXX",
    description: "Call us for immediate assistance",
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: Mail,
    title: "Email Address",
    value: "support@doctortracker.com",
    description: "Send us your questions anytime",
    color: "bg-violet-50 text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    icon: MapPin,
    title: "Office Address",
    value: "Dhaka, Bangladesh",
    description: "Visit our office for support",
    color: "bg-emerald-50 text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Sat - Thu: 9 AM - 6 PM",
    description: "Friday: Closed",
    color: "bg-amber-50 text-amber-600",
    iconBg: "bg-amber-100",
  },
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50";

const Contact = () => {
  return (
    <main className="min-h-screen  min-w-0 overflow-x-hidden bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Support Center
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Contact Us
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Have questions or need assistance? Connect with our support
              team. We&apos;re always happy to help.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-700">
              Support Available
            </span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 p-6 text-white shadow-xl shadow-blue-900/10 sm:p-8 lg:p-10">
          {/* Decorative Shapes */}
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[40px] border-white/5" />
          <div className="absolute -bottom-32 right-28 h-80 w-80 rounded-full border-[45px] border-white/5" />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-inner">
                <Headset size={26} />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                We&apos;re Here For You
              </span>

              <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                We&apos;re Always Here
                <br className="hidden sm:block" /> to Help You!
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100">
                Contact our support team for questions, technical issues,
                feedback, or assistance with your Doctor Tracker platform.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:support@doctortracker.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  <Mail size={17} />
                  Email Support
                  <ArrowRight size={15} />
                </a>

                <a
                  href="tel:+8801XXXXXXXXX"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <Phone size={17} />
                  Call Us
                </a>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white/15">
                  <Headset size={76} strokeWidth={1.2} className="text-white" />
                </div>

                <div className="absolute -right-2 top-7 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-lg">
                  <MessageCircle size={24} />
                </div>

                <div className="absolute -bottom-2 left-0 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400 text-white shadow-lg">
                  <ShieldCheck size={24} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Contact Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose your preferred way to reach us.
              </p>
            </div>

            <span className="hidden rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 sm:inline-block">
              4 Contact Options
            </span>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} ${item.color.split(" ")[1]} transition duration-300 group-hover:scale-105`}>
                    <Icon size={23} />
                  </div>

                  <h3 className="text-sm font-semibold text-slate-700">
                    {item.title}
                  </h3>

                  <p className="mt-2 break-words text-sm font-bold text-slate-900">
                    {item.value}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Form + Support Information */}
        <section className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-5">

          {/* Contact Form */}
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:col-span-3">
            <div className="mb-7 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Send size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Send Us a Message
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Fill out the form and we&apos;ll get back to you.
                </p>
              </div>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is this about?"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
                <p className="text-xs leading-5 text-slate-400">
                  Your information will be kept private.
                </p>

                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Support Details */}
          <div className="flex min-w-0 flex-col gap-5 lg:col-span-2">

            {/* Support Card */}
            <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Globe size={23} />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Doctor Tracker Support
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Our support team is ready to help you manage doctors,
                patients, appointments, and other platform-related issues.
              </p>

              <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <MessageCircle size={17} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Technical Support
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <Headset size={17} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Account Assistance
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Mail size={17} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    General Enquiries
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Assistance Card */}
            <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-100/50" />

              <div className="relative z-10">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <LifeBuoy size={22} />
                </div>

                <h3 className="font-bold text-slate-900">
                  Need Quick Assistance?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  For urgent technical issues, contact the support team
                  through the official email or phone number.
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-700">
                  <CheckCircle2 size={15} />
                  We appreciate your feedback!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500 sm:text-sm">
            © 2026 Doctor Tracker. All rights reserved.
          </p>

          <p className="text-xs text-slate-400">
            Healthcare Management Made Simple
          </p>
        </footer>

      </div>
    </main>
  );
};

export default Contact;
