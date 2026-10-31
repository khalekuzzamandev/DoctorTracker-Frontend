
"use client";

import React from "react";
import {
  Stethoscope,
  Users,
  Building2,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ChevronRight,
  CalendarDays,
  UserRound,
} from "lucide-react";
import Image from "next/image";

// Demo Statistics
const statistics = [
  {
    title: "Total Doctors",
    value: "24",
    growth: "12%",
    icon: Stethoscope,
    color: "blue",
    showGrowth: true,
  },
  {
    title: "Total Patients",
    value: "1,248",
    growth: "8%",
    icon: Users,
    color: "emerald",
    showGrowth: true,
  },
  {
    title: "Patients per Doctor",
    value: "52",
    icon: Activity,
    color: "violet",
    showGrowth: false,
  },
  {
    title: "Total Hospitals",
    value: "12",
    icon: Building2,
    color: "orange",
    showGrowth: false,
  },
];

// Demo Doctors
const topDoctors = [
  {
    name: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    patients: "120 Patients",
    image: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Dr. Michael Brown",
    specialty: "Neurologist",
    patients: "98 Patients",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Dr. Emily Johnson",
    specialty: "Dermatologist",
    patients: "85 Patients",
    image: "https://i.pravatar.cc/100?img=44",
  },
];

// Demo Patients
const recentPatients = [
  {
    name: "Rahim Ahmed",
    condition: "Fever",
    time: "2h ago",
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Ayesha Khan",
    condition: "Checkup",
    time: "3h ago",
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Sabbir Hossain",
    condition: "Headache",
    time: "5h ago",
    image: "https://i.pravatar.cc/100?img=13",
  },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const Dashboard = () => {
  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 sm:p-6">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your healthcare management system
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {statistics.map((item) => {
          const Icon = item.icon;

          const colorStyles: Record<string, string> = {
            blue: "bg-blue-50 text-blue-600",
            emerald: "bg-emerald-50 text-emerald-600",
            violet: "bg-violet-50 text-violet-600",
            orange: "bg-orange-50 text-orange-600",
          };

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="flex items-center justify-between gap-3">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
                    {item.value}
                  </h2>

                  {item.showGrowth && (
                    <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <TrendingUp size={14} />
                      <span> {item.growth} from last month</span>
                    </div>
                  )}
                </div>

                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${colorStyles[item.color]}`}
                >
                  <Icon size={27} strokeWidth={2.2} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">

        {/* Doctors & Patients Trend */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm xl:col-span-3">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Doctors & Patients Trend
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Monthly statistics overview
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

          {/* Line Chart */}
          <div className="w-full overflow-hidden">
            <svg
              viewBox="0 0 600 240"
              className="h-auto w-full"
              role="img"
              aria-label="Monthly doctors and patients trend chart"
            >
              {/* Grid Lines */}
              {[30, 80, 130, 180].map((y) => (
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

              {/* Y Axis Labels */}
              {["1500", "1000", "500", "0"].map((label, index) => (
                <text
                  key={label}
                  x="43"
                  y={35 + index * 50}
                  textAnchor="end"
                  fill="#94A3B8"
                  fontSize="11"
                >
                  {label}
                </text>
              ))}

              {/* Doctors Line */}
              <polyline
                points="65,120 165,108 265,65 365,55 465,82 565,65"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Patients Line */}
              <polyline
                points="65,145 165,135 265,112 365,125 465,100 565,85"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Doctors Points */}
              {[
                [65, 120],
                [165, 108],
                [265, 65],
                [365, 55],
                [465, 82],
                [565, 65],
              ].map(([x, y], index) => (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#2563EB"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}

              {/* Patients Points */}
              {[
                [65, 145],
                [165, 135],
                [265, 112],
                [365, 125],
                [465, 100],
                [565, 85],
              ].map(([x, y], index) => (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#10B981"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}

              {/* X Axis Labels */}
              {months.map((month, index) => (
                <text
                  key={month}
                  x={65 + index * 100}
                  y="210"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="12"
                >
                  {month}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Patient Condition Distribution */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm xl:col-span-2">

          <div className="mb-6">
            <h2 className="text-base font-bold text-slate-800">
              Patient Condition Distribution
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Current patient health status
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-7 py-4 sm:flex-row">

            {/* Donut Chart */}
            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#2563EB 0% 45%, #10B981 45% 70%, #F59E0B 70% 85%, #EF4444 85% 100%)",
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                <span className="text-2xl font-bold text-slate-800">
                  1,248
                </span>
                <span className="text-xs text-slate-400">
                  Total Patients
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full space-y-4 sm:w-auto">

              {[
                {
                  label: "Stable",
                  value: "45%",
                  color: "bg-blue-600",
                },
                {
                  label: "Recovering",
                  value: "25%",
                  color: "bg-emerald-500",
                },
                {
                  label: "Critical",
                  value: "15%",
                  color: "bg-amber-500",
                },
                {
                  label: "Other",
                  value: "15%",
                  color: "bg-red-500",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-5"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium text-slate-600">
                      {item.label}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-slate-800">
                    {item.value}
                  </span>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* Doctors & Patients Lists */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Top Doctors */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Top Doctors
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Our most active doctors
              </p>
            </div>

            <Stethoscope className="text-blue-500" size={21} />
          </div>

          <div className="divide-y divide-slate-100">

            {topDoctors.map((doctor, index) => (
              <div
                key={doctor.name}
                className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-3">

                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-11 w-11 shrink-0 rounded-full border border-slate-200 object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-800">
                      {doctor.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-600">
                  {doctor.patients}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* Recent Patients */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Recent Patients
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Recently registered patients
              </p>
            </div>

            <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700">
              View All
              <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="divide-y divide-slate-100">

            {recentPatients.map((patient) => (
              <div
                key={patient.name}
                className="group flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <Image
                    width={80}
                    height={80}
                    src={patient.image}
                    alt={patient.name}
                    className="h-11 w-11 shrink-0 rounded-full border border-slate-200 object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-800">
                      {patient.name}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <Activity size={12} className="text-emerald-500" />
                      {patient.condition}
                      <span>·</span>
                      {patient.time}
                    </p>
                  </div>
                </div>

                <button
                  aria-label={`View ${patient.name}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <ChevronRight size={18} />
                </button>

              </div>
            ))}

          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="flex flex-col justify-between gap-2 rounded-xl border border-blue-100 bg-blue-50/60 px-5 py-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={17} className="text-blue-600" />
          <span>DoctorTracker Admin Overview</span>
        </div>

        <p className="text-xs text-slate-500">
          Demo data · Connect your API to see live statistics
        </p>
      </div>

    </div>
  );
};

export default Dashboard;
