
"use client";

import React from "react";
import { useSession } from "@/Components/lib/auth-client";
import { motion } from "framer-motion";
import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  Clock,
  Fingerprint,
  BadgeCheck,
  Activity,
  Shield,
  CircleCheck,
  Loader2,
  Copy,
  UserCog,
} from "lucide-react";

const Profile = () => {
  const { data: userSession, isPending } = useSession();
  const user = userSession?.user || null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const formatDate = (date?: string | Date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-blue-600" size={35} />
          <p className="text-sm text-slate-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-sm">
        <UserRound size={45} className="mb-3 text-slate-400" />
        <h2 className="text-xl font-bold text-slate-800">
          Profile Not Found
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Please login to view your profile information.
        </p>
      </div>
    );
  }

  const isAdmin = user.role === "admin";

  const profileItems = [
    {
      label: "Full Name",
      value: user.name || "Not provided",
      icon: UserRound,
    },
    {
      label: "Email Address",
      value: user.email || "Not provided",
      icon: Mail,
    },
    {
      label: "User Role",
      value: user.role || "User",
      icon: ShieldCheck,
      capitalize: true,
    },
    {
      label: "Account ID",
      value: user.id || "Not available",
      icon: Fingerprint,
    },
  ];

  const accountItems = [
    {
      label: "Account Created",
      value: formatDate(user.createdAt),
      icon: CalendarDays,
    },
    {
      label: "Last Updated",
      value: formatDate(user.updatedAt),
      icon: Clock,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen space-y-6 bg-slate-50 p-4 md:p-6 lg:p-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <p className="text-sm font-semibold tracking-wider text-blue-600">
          ACCOUNT SETTINGS
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-800 md:text-3xl">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your personal information and account details.
        </p>
      </motion.div>

      {/* Profile Hero */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -3 }}
        className="relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 text-white shadow-xl md:p-9"
      >
        {/* Background Decoration */}
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[35px] border-blue-400/10" />
        <div className="absolute -bottom-24 right-32 h-52 w-52 rounded-full bg-blue-500/10 blur-2xl" />

        <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row">
          {/* Avatar */}
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-blue-400/40 bg-gradient-to-br from-blue-500 to-indigo-700 text-4xl font-bold text-white shadow-xl">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-slate-950 bg-green-500 text-white">
              <CircleCheck size={17} />
            </span>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {user.name || "User"}
              </h2>
              <BadgeCheck size={22} className="text-blue-400" />
            </div>

            <p className="mt-2 text-sm text-slate-300">
              {user.email}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              <span className="inline-flex items-center gap-2 rounded-lg border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-xs font-semibold text-blue-300">
                <Shield size={14} />
                {user.role?.toUpperCase() || "USER"}
              </span>

              <span className="inline-flex items-center gap-2 rounded-lg border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-400">
                <Activity size={14} />
                Account Active
              </span>
            </div>
          </div>

          {/* Profile Badge */}
          <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm md:block">
            <ShieldCheck size={30} className="mx-auto text-blue-400" />
            <p className="mt-2 text-xs font-semibold text-slate-300">
              Secure Account
            </p>
          </div>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <UserRound size={23} />
            </div>
            <span className="text-xs font-medium text-slate-400">PROFILE</span>
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-800">
            Personal Account
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Your personal information
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
              <ShieldCheck size={23} />
            </div>
            <span className="text-xs font-medium text-slate-400">ACCESS</span>
          </div>
          <h3 className="mt-4 text-lg font-bold capitalize text-slate-800">
            {user.role || "User"} Role
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Account permission level
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <BadgeCheck size={23} />
            </div>
            <span className="text-xs font-medium text-slate-400">STATUS</span>
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-800">
            Verified Account
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Email verification: {user.emailVerified ? "Verified" : "Not verified"}
          </p>
        </motion.div>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex items-center gap-3 border-b border-slate-100 p-6">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
            <UserCog size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">
              Personal Information
            </h2>
            <p className="text-xs text-slate-500">
              Your basic account information
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-2">
          {profileItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.1 }}
                className="flex min-w-0 items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="rounded-lg bg-white p-2.5 text-blue-600 shadow-sm">
                  <Icon size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-400">
                    {item.label}
                  </p>
                  <p className={`mt-1 break-all text-sm font-semibold text-slate-800 ${item.capitalize ? "capitalize" : ""}`}>
                    {item.value}
                  </p>
                </div>

                {item.label === "Account ID" && user.id && (
                  <button
                    type="button"
                    title="Copy Account ID"
                    onClick={() => navigator.clipboard.writeText(user.id)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-100 hover:text-blue-600"
                  >
                    <Copy size={16} />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Account Timeline */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
            <Clock size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Account Activity</h2>
            <p className="text-xs text-slate-500">
              Important account dates
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {accountItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="rounded-full bg-blue-100 p-2.5 text-blue-600">
                    <Icon size={18} />
                  </div>
                  {index === 0 && (
                    <div className="mt-2 h-7 w-px bg-slate-200" />
                  )}
                </div>

                <div className="pb-2">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        variants={itemVariants}
        className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-center"
      >
        <p className="text-sm font-medium text-blue-800">
          Your account information is managed securely by Doctor Tracker.
        </p>
        <p className="mt-1 text-xs text-blue-600">
          For account assistance, please contact the administrator.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
