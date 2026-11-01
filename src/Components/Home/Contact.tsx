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
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Number",
      value: "+880 1XXXXXXXXX",
      description: "Call us for immediate assistance",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Mail,
      title: "Email Address",
      value: "support@doctortracker.com",
      description: "Send us your questions anytime",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: MapPin,
      title: "Office Address",
      value: "Dhaka, Bangladesh",
      description: "Visit our office for support",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Sat - Thu: 9 AM - 6 PM",
      description: "Friday: Closed",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen space-y-8 bg-slate-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div>
        <p className="mb-2 text-sm font-semibold text-blue-600">
          SUPPORT CENTER
        </p>
        <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
          Contact Us
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Have questions or need assistance? We are here to help you.
        </p>
      </div>

      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 p-7 text-white md:p-10">
        <div className="relative z-10 max-w-xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <Headset size={26} />
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">
            We are Always Here to Help!
          </h2>
          <p className="mt-3 text-sm leading-7 text-blue-100">
            Contact our support team for any questions, technical issues,
            feedback, or assistance with Doctor Tracker.
          </p>
        </div>
        <MessageCircle
          size={180}
          className="absolute -right-5 -bottom-10 text-white/10"
        />
      </div>

      {/* Contact Information */}
      <div>
        <h2 className="mb-5 text-xl font-bold text-slate-800">
          Contact Information
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon size={23} />
                </div>
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>
                <p className="mt-2 break-words text-sm font-semibold text-blue-600">
                  {item.value}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Form + Additional Info */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Send Us a Message
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill out the form and we will get back to you.
            </p>
          </div>

          <form className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Subject
              </label>
              <input
                type="text"
                placeholder="What is this about?"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message here..."
                className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              <Send size={17} />
              Send Message
            </button>
          </form>
        </div>

        {/* Support Details */}
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Globe size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Doctor Tracker Support
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Our support team is ready to help you manage doctors, patients,
              appointments, and other platform-related issues.
            </p>

            <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MessageCircle size={18} className="text-blue-600" />
                Technical Support
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Headset size={18} className="text-blue-600" />
                Account Assistance
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={18} className="text-blue-600" />
                General Enquiries
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-blue-50 p-6">
            <h3 className="font-bold text-slate-800">
              Need Quick Assistance?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              For urgent technical issues, contact the support team through
              the official email or phone number.
            </p>
            <p className="mt-4 text-xs font-medium text-blue-700">
              We appreciate your feedback!
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 pt-5 text-center">
        <p className="text-sm text-slate-500">
          © 2026 Doctor Tracker. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Contact;