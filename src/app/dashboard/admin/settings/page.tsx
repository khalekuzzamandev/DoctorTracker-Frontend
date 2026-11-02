
"use client";

import React, { useCallback, useEffect, useState } from "react";
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
  Laptop,
  Tablet,
  RefreshCw,
  LogOut,
  Clock,
  MapPin,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";

import { authClient } from "@/Components/lib/auth-client";

type SessionType = {
  token: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  expiresAt: string | Date;
  ipAddress?: string | null;
  userAgent?: string | null;
};

type DeviceInfo = {
  browser: string;
  os: string;
  device: "Desktop" | "Mobile" | "Tablet";
};

const getDeviceInfo = (userAgent = ""): DeviceInfo => {
  const ua = userAgent.toLowerCase();

  let browser = "Unknown Browser";
  let os = "Unknown OS";
  let device: DeviceInfo["device"] = "Desktop";

  if (ua.includes("edg/")) browser = "Microsoft Edge";
  else if (ua.includes("opr/")) browser = "Opera";
  else if (ua.includes("firefox/")) browser = "Mozilla Firefox";
  else if (ua.includes("chrome/")) browser = "Google Chrome";
  else if (ua.includes("safari/")) browser = "Safari";

  if (ua.includes("ipad")) {
    os = "iPadOS";
    device = "Tablet";
  } else if (/iphone|ipod/.test(ua)) {
    os = "iOS";
    device = "Mobile";
  } else if (ua.includes("android")) {
    os = "Android";
    device = /mobile/.test(ua) ? "Mobile" : "Tablet";
  } else if (ua.includes("windows")) {
    os = "Windows";
  } else if (ua.includes("mac os")) {
    os = "macOS";
  } else if (ua.includes("linux")) {
    os = "Linux";
  }

  return { browser, os, device };
};

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const Setting = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    appointment: true,
    updates: false,
    security: true,
  });

  const [appearance, setAppearance] = useState("light");
  const [language, setLanguage] = useState("English");

  // Login Settings Modal
  const [showLoginSettings, setShowLoginSettings] = useState(false);

  // Active Sessions
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [currentToken, setCurrentToken] = useState("");
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [revoking, setRevoking] = useState("");
  const [sessionError, setSessionError] = useState("");
  const [sessionSuccess, setSessionSuccess] = useState("");

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

  // Load Active Sessions
  const loadSessions = useCallback(async () => {
    setSessionsLoading(true);
    setSessionError("");
    setSessionSuccess("");

    try {
      const [currentResult, sessionsResult] = await Promise.all([
        authClient.getSession(),
        authClient.listSessions(),
      ]);

      if (currentResult.error) {
        setSessionError(
          currentResult.error.message || "Unable to identify current device."
        );
        return;
      }

      if (sessionsResult.error) {
        setSessionError(
          sessionsResult.error.message || "Unable to load active sessions."
        );
        return;
      }

      setCurrentToken(currentResult.data?.session?.token || "");
      setSessions((sessionsResult.data || []) as SessionType[]);
    } catch {
      setSessionError("Something went wrong while loading devices.");
    } finally {
      setSessionsLoading(false);
    }
  }, []);

  // Load sessions only when Login Settings opens
  useEffect(() => {
    if (!showLoginSettings) return;

    const timeoutId = window.setTimeout(() => {
      void loadSessions();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [showLoginSettings, loadSessions]);

  // Logout One Device
  const handleRevokeSession = async (token: string) => {
    if (token === currentToken) {
      setSessionError("You cannot logout your current device from here.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to logout this device?"
    );

    if (!confirmed) return;

    setRevoking(token);
    setSessionError("");
    setSessionSuccess("");

    try {
      const { error } = await authClient.revokeSession({ token });

      if (error) {
        setSessionError(error.message || "Unable to logout this device.");
        return;
      }

      setSessions((previous) =>
        previous.filter((session) => session.token !== token)
      );

      setSessionSuccess("Device successfully logged out.");
    } catch {
      setSessionError("Failed to logout this device.");
    } finally {
      setRevoking("");
    }
  };

  // Logout All Other Devices
  const handleRevokeOthers = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout all other devices?"
    );

    if (!confirmed) return;

    setRevoking("all");
    setSessionError("");
    setSessionSuccess("");

    try {
      const { error } = await authClient.revokeOtherSessions();

      if (error) {
        setSessionError(error.message || "Unable to logout other devices.");
        return;
      }

      await loadSessions();
      setSessionSuccess("All other devices have been logged out.");
    } catch {
      setSessionError("Failed to logout other devices.");
    } finally {
      setRevoking("");
    }
  };

  const otherSessions = sessions.filter(
    (session) => session.token !== currentToken
  );

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
                  description: "Manage your password and logged-in devices",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => {
                      if (item.title === "Password & Authentication") {
                        setSessionError("");
                        setSessionSuccess("");
                        setShowLoginSettings(true);
                      }
                    }}
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
                  <div key={item.key} className="flex items-center gap-4">
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
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${notifications[item.key] ? "left-6" : "left-1"
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

                    {appearance === theme.id && <CheckCircle2 size={16} />}
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

          {/* Save Preferences */}
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

      {/* Login & Security Settings Modal */}
      {showLoginSettings && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowLoginSettings(false);
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
          >
            {/* Modal Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <LockKeyhole size={23} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Login & Security Settings
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Manage your password and logged-in devices.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowLoginSettings(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close login settings"
              >
                <X size={21} />
              </button>
            </div>

            {/* Password Section */}
            <div className="mb-6 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2.5 text-purple-600">
                  <KeyRound size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Password & Authentication
                  </h3>

                  <p className="text-xs text-slate-500">
                    Keep your account password secure.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-6 text-slate-500">
                Your account uses Better Auth for authentication. Password
                changes should be handled through its configured password
                management flow.
              </p>
            </div>

            {/* Active Devices */}
            <div>
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-bold text-slate-800">
                    Where You&apos;re Logged In
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Devices currently accessing your account.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => void loadSessions()}
                  disabled={sessionsLoading || !!revoking}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <RefreshCw
                    size={14}
                    className={sessionsLoading ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
              </div>

              {/* Summary */}
              <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
                  <p className="text-[10px] font-semibold text-blue-700 sm:text-xs">
                    Total Sessions
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-slate-800">
                    {sessionsLoading ? "..." : sessions.length}
                  </h3>
                </div>

                <div className="rounded-xl border border-green-100 bg-green-50 p-3">
                  <p className="text-[10px] font-semibold text-green-700 sm:text-xs">
                    Current Device
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-slate-800">
                    {sessionsLoading ? "..." : currentToken ? "1" : "0"}
                  </h3>
                </div>

                <div className="rounded-xl border border-purple-100 bg-purple-50 p-3">
                  <p className="text-[10px] font-semibold text-purple-700 sm:text-xs">
                    Other Devices
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-slate-800">
                    {sessionsLoading ? "..." : otherSessions.length}
                  </h3>
                </div>
              </div>

              {/* Error */}
              {sessionError && (
                <div
                  role="alert"
                  className="mb-4 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-red-600"
                >
                  <AlertCircle size={16} className="shrink-0" />
                  {sessionError}
                </div>
              )}

              {/* Success */}
              {sessionSuccess && (
                <div className="mb-4 rounded-xl border border-green-100 bg-green-50 p-3 text-xs text-green-700">
                  {sessionSuccess}
                </div>
              )}

              {/* Device List */}
              {sessionsLoading ? (
                <div className="flex items-center justify-center gap-3 py-12 text-sm text-slate-400">
                  <Loader2 size={20} className="animate-spin" />
                  Loading devices...
                </div>
              ) : sessions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center">
                  <Monitor
                    size={32}
                    className="mx-auto mb-3 text-slate-300"
                  />

                  <p className="text-sm font-semibold text-slate-600">
                    No active sessions found.
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Refresh to check your active devices.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => {
                    const info = getDeviceInfo(session.userAgent || "");
                    const isCurrent = session.token === currentToken;

                    const DeviceIcon =
                      info.device === "Mobile"
                        ? Smartphone
                        : info.device === "Tablet"
                          ? Tablet
                          : Laptop;

                    return (
                      <div
                        key={session.token}
                        className={`rounded-xl border p-4 transition ${isCurrent
                            ? "border-green-200 bg-green-50/40"
                            : "border-slate-200 bg-white hover:border-blue-200"
                          }`}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isCurrent
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-50 text-blue-600"
                              }`}
                          >
                            <DeviceIcon size={22} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-800">
                                {info.os} - {info.device}
                              </h4>

                              {isCurrent && (
                                <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
                                  This Device
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-xs text-slate-500">
                              {info.browser}
                            </p>

                            <div className="mt-3 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                              <div className="flex items-center gap-2 break-all">
                                <MapPin size={13} className="shrink-0" />
                                IP: {session.ipAddress || "Unavailable"}
                              </div>

                              <div className="flex items-center gap-2">
                                <Clock size={13} className="shrink-0" />
                                Login: {formatDate(session.createdAt)}
                              </div>

                              <div className="flex items-center gap-2">
                                <Clock size={13} className="shrink-0" />
                                Expires: {formatDate(session.expiresAt)}
                              </div>
                            </div>
                          </div>

                          {!isCurrent && (
                            <button
                              type="button"
                              onClick={() =>
                                void handleRevokeSession(session.token)
                              }
                              disabled={!!revoking}
                              className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                            >
                              {revoking === session.token ? (
                                <Loader2
                                  size={14}
                                  className="animate-spin"
                                />
                              ) : (
                                <LogOut size={14} />
                              )}
                              Logout
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Logout All Other Devices */}
              {!sessionsLoading && otherSessions.length > 0 && (
                <button
                  type="button"
                  onClick={() => void handleRevokeOthers()}
                  disabled={!!revoking}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                >
                  {revoking === "all" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <LogOut size={16} />
                  )}
                  Logout All Other Devices
                </button>
              )}
            </div>

            {/* Security Tip */}
            <div className="mt-6 rounded-xl bg-blue-50 p-4">
              <div className="flex items-center gap-2 text-blue-700">
                <ShieldCheck size={18} />
                <span className="text-sm font-bold">Security Tip</span>
              </div>

              <p className="mt-2 text-xs leading-6 text-blue-600">
                If you see an unfamiliar device, logout that device and
                consider changing your account password immediately.
              </p>
            </div>
          </motion.div>
        </div>
      )}

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
