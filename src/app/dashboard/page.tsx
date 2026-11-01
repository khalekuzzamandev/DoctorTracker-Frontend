"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Users,
  Building2,
  Activity,
  ArrowUpRight,
  ChevronRight,
  CalendarDays,
  UserRound,
  HeartPulse,
  Loader2,
  RefreshCw,
  TrendingUp,
  Hospital,
} from "lucide-react";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

// Supports MongoDB Date, ISO string, timestamp and common date formats.
type DateInput =
  | string
  | number
  | Date
  | { $date?: string | number }
  | null;

interface Doctor {
  _id: string;
  name: string;
  specialization?: string;
  hospital?: string;
  email?: string;
  createdAt?: DateInput;
}

interface Patient {
  _id: string;
  name: string;
  age?: number;
  gender?: string;
  phone?: string;
  medicalCondition?: string;
  doctorId?: string;
  doctorName?: string;
  status?: string;
  createdAt?: DateInput;
  appointmentDate?: DateInput;
}

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const conditionColors = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

// Date parser: handles multiple database date formats.
const parseDate = (value?: DateInput): Date | null => {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (typeof value === "object" && value.$date) {
    return parseDate(value.$date);
  }

  if (typeof value !== "string") return null;

  const input = value.trim();
  if (!input) return null;

  // YYYY-MM-DD
  const isoDate = input.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  if (isoDate) {
    const [, year, month, day] = isoDate;
    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    return Number.isNaN(date.getTime()) ? null : date;
  }

  // DD/MM/YYYY or DD-MM-YYYY
  const banglaDate = input.match(
    /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/
  );

  if (banglaDate) {
    const [, day, month, year] = banglaDate;
    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    return Number.isNaN(date.getTime()) ? null : date;
  }

  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDate = (value?: DateInput) => {
  const date = parseDate(value);

  if (!date) return "Recently added";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getLatestDate = (patient: Patient) => {
  return (
    parseDate(patient.createdAt) ||
    parseDate(patient.appointmentDate)
  );
};

// Pure helper: takes `now` as an argument so it never calls new Date() during render.
const getMonthlyData = (
  data: { createdAt?: DateInput }[],
  now: Date | null
) => {
  if (!now) return [];

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - 5 + index,
      1
    );

    const count = data.filter((item) => {
      const created = parseDate(item.createdAt);

      if (!created) return false;

      return (
        created.getMonth() === date.getMonth() &&
        created.getFullYear() === date.getFullYear()
      );
    }).length;

    return {
      month: months[date.getMonth()],
      count,
    };
  });
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Current date lives in state (set after mount) to avoid new Date() during prerender.
  const [now, setNow] = useState<Date | null>(null);

  // Fetch Dashboard Data
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [doctorRes, patientRes] = await Promise.all([
        fetch(`${baseUrl}/api/get/doctor`, {
          cache: "no-store",
        }),
        fetch(`${baseUrl}/api/get/patient`, {
          cache: "no-store",
        }),
      ]);

      if (!doctorRes.ok || !patientRes.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const doctorData = await doctorRes.json();
      const patientData = await patientRes.json();

      setDoctors(Array.isArray(doctorData) ? doctorData : []);
      setPatients(Array.isArray(patientData) ? patientData : []);
      setNow(new Date());
    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Failed to load dashboard data. Please try again.");
      setNow(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Statistics
  const totalDoctors = doctors.length;
  const totalPatients = patients.length;

  const patientsPerDoctor = totalDoctors
    ? Math.round(totalPatients / totalDoctors)
    : 0;

  const totalHospitals = new Set(
    doctors
      .map((doctor) => doctor.hospital?.trim().toLowerCase())
      .filter(Boolean)
  ).size;

  const statistics = [
    {
      title: "Total Doctors",
      value: totalDoctors,
      icon: Stethoscope,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      gradient: "from-blue-500 to-indigo-600",
      description: "Registered doctors",
    },
    {
      title: "Total Patients",
      value: totalPatients,
      icon: Users,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      gradient: "from-emerald-500 to-teal-600",
      description: "Registered patients",
    },
    {
      title: "Patients per Doctor",
      value: patientsPerDoctor,
      icon: Activity,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      gradient: "from-violet-500 to-purple-600",
      description: "Average patient load",
    },
    {
      title: "Total Hospitals",
      value: totalHospitals,
      icon: Building2,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      gradient: "from-orange-400 to-amber-500",
      description: "Connected hospitals",
    },
  ];

  // Top Doctors
  const topDoctors = useMemo(() => {
    return doctors
      .map((doctor) => {
        const assignedPatients = patients.filter((patient) => {
          if (patient.doctorId) {
            return patient.doctorId === doctor._id;
          }

          return (
            patient.doctorName?.trim().toLowerCase() ===
            doctor.name?.trim().toLowerCase()
          );
        }).length;

        return {
          ...doctor,
          patients: assignedPatients,
        };
      })
      .sort((a, b) => b.patients - a.patients)
      .slice(0, 5);
  }, [doctors, patients]);

  // Recent Patients
  const recentPatients = useMemo(() => {
    return [...patients]
      .sort((a, b) => {
        const dateA = getLatestDate(a)?.getTime() || 0;
        const dateB = getLatestDate(b)?.getTime() || 0;
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [patients]);

  // Patient Condition Distribution
  const conditions = useMemo(() => {
    const counts = patients.reduce<Record<string, number>>(
      (acc, patient) => {
        const condition =
          patient.medicalCondition?.trim() || "Not specified";

        acc[condition] = (acc[condition] || 0) + 1;
        return acc;
      },
      {}
    );

    const sorted = Object.entries(counts).sort(
      (a, b) => b[1] - a[1]
    );

    const visible = sorted.slice(0, 4);

    const otherCount = sorted
      .slice(4)
      .reduce((total, [, count]) => total + count, 0);

    return [
      ...visible.map(([label, value], index) => ({
        label,
        value,
        percentage: totalPatients
          ? (value / totalPatients) * 100
          : 0,
        color: conditionColors[index],
      })),
      ...(otherCount > 0
        ? [
          {
            label: "Other",
            value: otherCount,
            percentage: totalPatients
              ? (otherCount / totalPatients) * 100
              : 0,
            color: "#8B5CF6",
          },
        ]
        : []),
    ];
  }, [patients, totalPatients]);

  // Monthly Registration Trend (depends on `now` state, not on new Date() in render)
  const patientTrend = useMemo(
    () => getMonthlyData(patients, now),
    [patients, now]
  );
  const doctorTrend = useMemo(
    () => getMonthlyData(doctors, now),
    [doctors, now]
  );

  const chartMax = Math.max(
    ...patientTrend.map((item) => item.count),
    ...doctorTrend.map((item) => item.count),
    1
  );

  const getChartPoints = (data: { count: number }[]) =>
    data
      .map((item, index) => {
        const x = 65 + index * 100;
        const y = 180 - (item.count / chartMax) * 130;
        return `${x},${y}`;
      })
      .join(" ");

  // Donut Chart Gradient
  let currentPercentage = 0;

  const donutGradient = conditions.length
    ? `conic-gradient(${conditions
      .map((item) => {
        const start = currentPercentage;
        currentPercentage += item.percentage;
        return `${item.color} ${start}% ${currentPercentage}%`;
      })
      .join(", ")})`
    : "#E2E8F0";

  // Loading State
  if (loading || !now) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
            <Stethoscope className="text-blue-600" size={30} />
            <Loader2
              className="absolute -right-2 -top-2 animate-spin text-blue-600"
              size={23}
            />
          </div>

          <div className="text-center">
            <p className="font-semibold text-slate-800">
              Loading Dashboard
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Please wait while we prepare your data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl bg-slate-50 p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <Activity size={30} />
        </div>

        <h2 className="mt-4 text-xl font-bold text-slate-800">
          Something went wrong
        </h2>

        <p className="mt-2 max-w-sm text-sm text-slate-500">
          {error}
        </p>

        <button
          onClick={fetchDashboardData}
          className="mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08 },
        },
      }}
      className="min-h-screen space-y-6 bg-slate-50/80 p-4 sm:p-6"
    >
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-blue-800 p-6 shadow-xl shadow-blue-950/10 sm:p-8"
      >
        <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="mb-3 flex items-center gap-2 text-blue-200">
              <HeartPulse size={17} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Healthcare Management
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Dashboard Overview
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-6 text-blue-100/80">
              Monitor your doctors, patients and healthcare activities
              from one place.
            </p>
          </div>

          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </div>

        <div className="relative z-10 mt-7 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5 text-xs text-blue-100/80">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            System Online
          </span>
          <span className="flex items-center gap-2">
            <Hospital size={14} />
            DoctorTracker Admin
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays size={14} />
            {formatDate(now)}
          </span>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-900/5"
            >
              <div
                className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br ${item.gradient} opacity-[0.06] transition-all duration-300 group-hover:scale-150`}
              />

              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <motion.h2
                    key={item.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900"
                  >
                    {item.value.toLocaleString()}
                  </motion.h2>

                  <p className="mt-2 text-xs text-slate-400">
                    {item.description}
                  </p>
                </div>

                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor} transition duration-300 group-hover:rotate-6 group-hover:scale-110`}
                >
                  <Icon size={27} strokeWidth={1.8} />
                </div>
              </div>

              <div
                className={`mt-5 h-1 w-full rounded-full bg-gradient-to-r ${item.gradient} opacity-70`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        {/* Monthly Trend */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-lg xl:col-span-3 sm:p-6"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <TrendingUp size={19} />
                </div>
                <h2 className="text-base font-bold text-slate-800">
                  Registration Trend
                </h2>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Monthly doctor and patient registrations
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                Doctors
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Patients
              </span>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <svg
              viewBox="0 0 600 240"
              className="h-auto w-full"
              role="img"
              aria-label="Monthly doctors and patients registration trend"
            >
              {[50, 90, 130, 170].map((y) => (
                <line
                  key={y}
                  x1="55"
                  y1={y}
                  x2="580"
                  y2={y}
                  stroke="#E2E8F0"
                  strokeDasharray="4 5"
                />
              ))}

              <motion.polyline
                points={getChartPoints(doctorTrend)}
                fill="none"
                stroke="#2563EB"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              <motion.polyline
                points={getChartPoints(patientTrend)}
                fill="none"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0.3,
                  ease: "easeInOut",
                }}
              />

              {doctorTrend.map((item, index) => (
                <motion.circle
                  key={`doctor-${index}`}
                  cx={65 + index * 100}
                  cy={180 - (item.count / chartMax) * 130}
                  r="5"
                  fill="#2563EB"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                />
              ))}

              {patientTrend.map((item, index) => (
                <motion.circle
                  key={`patient-${index}`}
                  cx={65 + index * 100}
                  cy={180 - (item.count / chartMax) * 130}
                  r="5"
                  fill="#10B981"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                />
              ))}

              {patientTrend.map((item, index) => (
                <text
                  key={`${item.month}-${index}`}
                  x={65 + index * 100}
                  y="210"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="12"
                >
                  {item.month}
                </text>
              ))}
            </svg>
          </div>

          <p className="mt-2 text-center text-xs text-slate-400">
            Based on valid createdAt dates in your database
          </p>
        </motion.div>

        {/* Condition Distribution */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-lg xl:col-span-2 sm:p-6"
        >
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <HeartPulse size={19} />
              </div>
              <h2 className="text-base font-bold text-slate-800">
                Patient Conditions
              </h2>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Distribution of registered patient conditions
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-7 py-3 sm:flex-row">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -40 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full"
              style={{ background: donutGradient }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                <span className="text-2xl font-extrabold text-slate-800">
                  {totalPatients.toLocaleString()}
                </span>
                <span className="mt-1 text-xs text-slate-400">
                  Total Patients
                </span>
              </div>
            </motion.div>

            <div className="w-full space-y-4 sm:w-auto sm:flex-1">
              {conditions.length > 0 ? (
                conditions.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="truncate text-xs font-medium text-slate-600">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-slate-800">
                        {Math.round(item.percentage)}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{
                          duration: 0.9,
                          delay: index * 0.1,
                        }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No patient condition data found.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Doctors and Patients */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Top Doctors */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-lg sm:p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Stethoscope size={19} />
                </div>
                <h2 className="text-base font-bold text-slate-800">
                  Top Doctors
                </h2>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Doctors with the most assigned patients
              </p>
            </div>

            <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
              Top 5
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {topDoctors.length > 0 ? (
              topDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between gap-3 rounded-xl py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700">
                      <UserRound size={22} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-slate-800">
                        {doctor.name}
                      </h3>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {doctor.specialization || "General Doctor"}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
                    {doctor.patients} Patients
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="py-8 text-center text-sm text-slate-400">
                No doctors found.
              </p>
            )}
          </div>
        </motion.div>

        {/* Recent Patients */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-lg sm:p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Users size={19} />
                </div>
                <h2 className="text-base font-bold text-slate-800">
                  Recent Patients
                </h2>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Recently registered patients
              </p>
            </div>

            <Link
              href="/dashboard/admin/patients"
              className="flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              View All
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentPatients.length > 0 ? (
              recentPatients.map((patient, index) => (
                <motion.div
                  key={patient._id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700">
                      <UserRound size={22} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-slate-800">
                        {patient.name}
                      </h3>

                      <p className="mt-1 flex flex-wrap items-center gap-1 text-xs text-slate-500">
                        <HeartPulse
                          size={12}
                          className="shrink-0 text-emerald-500"
                        />
                        <span className="max-w-[110px] truncate">
                          {patient.medicalCondition || "Not specified"}
                        </span>
                        <span>·</span>
                        <span className="shrink-0">
                          {formatDate(patient.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/admin/patients/${patient._id}`}
                    aria-label={`View ${patient.name}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:bg-blue-600 hover:text-white"
                  >
                    <ChevronRight size={19} />
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="py-8 text-center text-sm text-slate-400">
                No patients found.
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-3 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
            <HeartPulse size={20} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-800">
              DoctorTracker Admin Overview
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Healthcare management made simple.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live data · Connected to MongoDB
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;