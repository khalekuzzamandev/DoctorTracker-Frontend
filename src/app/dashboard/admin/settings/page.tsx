"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  UserRound,
  Bell,
  ShieldCheck,
  LockKeyhole,
  Eye,
  Palette,
  Globe,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Save,
  ChevronRight,
  CheckCircle2,
  Monitor,
  KeyRound,
} from "lucide-react";

const Setting = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    appointment: true,
    updates: false,
    security: true,
  });

  const [appearance, setAppearance] = useState("light");
  const [language, setLanguage] = useState("English");

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const notificationItems = [
    {
      key: "email" as const,
      title: "Email Notifications",
      description: "Receive important updates through email.",
      icon: Mail,
    },
    {
      key: "appointment" as const,
      title: "Appointment Reminders",
      description: "Get notified about upcoming appointments.",
      icon: Bell,
    },
    {
      key: "updates" as const,
      title: "System Updates",
      description: "Receive announcements and new feature updates.",
      icon: Smartphone,
    },
    {
      key: "security" as const,
      title: "Security Alerts",
      description: "Get alerts about important account activities.",
      icon: ShieldCheck,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen space-y-6 bg-slate-50 p-4 md:p-6 lg:p-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <p className="text-sm font-semibold tracking-wider text-blue-600">
          PREFERENCES & CONFIGURATION
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-800 md:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your account preferences and application settings.
        </p>
      </motion.div>

      {/* Hero */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 text-white shadow-lg md:p-8"
      >
        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-blue-400/10" />

        <div className="relative z-10 flex items-center gap-5">
          <div className="rounded-2xl border border-blue-400/30 bg-blue-500/15 p-4 text-blue-400">
            <Settings size={32} />
          </div>

          <div>
            <h2 className="text-xl font-bold md:text-2xl">
              Customize Your Experience
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
              Personalize your Doctor Tracker account, manage notifications
              and configure your preferred settings.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Settings */}
        <div className="space-y-6 lg:col-span-2">
          {/* Account Settings */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <UserRound size={22} />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">
                  Account Settings
                </h2>
                <p className="text-xs text-slate-500">
                  Manage your account information
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: UserRound,
                  title: "Personal Information",
                  description: "Manage your name and profile details",
                },
                {
                  icon: Mail,
                  title: "Email Address",
                  description: "Manage your registered email",
                },
                {
                  icon: KeyRound,
                  title: "Password & Authentication",
                  description: "Manage your account password",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    type="button"
                    key={item.title}
                    className="flex w-full items-center gap-4 rounded-xl border border-slate-100 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/50"
                  >
                    <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
                      <Icon size={19} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </button>
                );
              })}
            </div>
          </motion.section>

          {/* Notifications */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <Bell size={22} />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">
                  Notification Preferences
                </h2>
                <p className="text-xs text-slate-500">
                  Choose which notifications you want to receive
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {notificationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.key}
                    className="flex items-center gap-4"
                  >
                    <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
                      <Icon size={19} />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={notifications[item.key]}
                      onClick={() => toggleNotification(item.key)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${notifications[item.key]
                          ? "bg-blue-600"
                          : "bg-slate-300"
                        }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${notifications[item.key]
                            ? "left-6"
                            : "left-1"
                          }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Security */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">
                  Security & Privacy
                </h2>
                <p className="text-xs text-slate-500">
                  Keep your account protected
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                <LockKeyhole size={21} className="text-green-600" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Account Protection
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Your account authentication is enabled.
                  </p>
                </div>
                <CheckCircle2 size={19} className="text-green-600" />
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                <Eye size={21} className="text-blue-600" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Privacy
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Manage your account privacy preferences.
                  </p>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Settings */}
        <div className="space-y-6">
          {/* Appearance */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <Palette size={22} />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">Appearance</h2>
                <p className="text-xs text-slate-500">
                  Choose your preferred theme
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "light", label: "Light", icon: Sun },
                { id: "dark", label: "Dark", icon: Moon },
              ].map((theme) => {
                const Icon = theme.icon;

                return (
                  <button
                    type="button"
                    key={theme.id}
                    onClick={() => setAppearance(theme.id)}
                    className={`flex flex-col items-center gap-3 rounded-xl border p-4 transition ${appearance === theme.id
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                  >
                    <Icon size={23} />
                    <span className="text-sm font-semibold">
                      {theme.label}
                    </span>
                    {appearance === theme.id && (
                      <CheckCircle2 size={16} />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Monitor size={15} />
              <span>Current selection: {appearance}</span>
            </div>
          </motion.section>

          {/* Language */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <Globe size={22} />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">Language</h2>
                <p className="text-xs text-slate-500">
                  Application language
                </p>
              </div>
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="English">English</option>
              <option value="Bangla">বাংলা</option>
            </select>
          </motion.section>

          {/* Save */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-gradient-to-br from-slate-950 to-blue-950 p-6 text-white shadow-lg"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
              <Settings size={23} />
            </div>

            <h3 className="font-bold">Your Preferences</h3>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              Customize your experience to make Doctor Tracker work better
              for you.
            </p>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <Save size={17} />
              Save Preferences
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        variants={itemVariants}
        className="border-t border-slate-200 pt-5 text-center"
      >
        <p className="text-xs text-slate-500">
          © 2026 Doctor Tracker. All rights reserved.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Setting;