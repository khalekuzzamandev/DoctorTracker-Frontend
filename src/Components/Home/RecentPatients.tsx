
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  HeartPulse,
  UserRound,
} from "lucide-react";

interface Patient {
  _id: string;
  name: string;
  age?: number;
  gender?: string;
  medicalCondition?: string;
  createdAt?: string;
  appointmentDate?: string;
  status?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const formatDate = (date?: string) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const RecentPatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/get/patient`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch patients");
        }

        const data = await res.json();

        const sortedPatients: Patient[] = Array.isArray(data)
          ? [...data].sort((a, b) => {
            const dateA = new Date(
              a.createdAt || a.appointmentDate || 0
            ).getTime();

            const dateB = new Date(
              b.createdAt || b.appointmentDate || 0
            ).getTime();

            return dateB - dateA;
          })
          : [];

        setPatients(sortedPatients.slice(0, 4));
      } catch (error) {
        console.error("Patient fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <section className="bg-white px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <HeartPulse size={15} />
              Patient Overview
            </span>

            <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Recent <span className="text-blue-600">Patients</span>
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Explore the latest patients and their medical information.
            </p>
          </div>

          {/* All Patients */}
          <Link
            href="/patients"
            className="group flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            All Patients
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"
              >
                <div className="h-16 w-16 shrink-0 rounded-lg bg-slate-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-36 rounded bg-slate-200" />
                  <div className="h-3 w-24 rounded bg-slate-200" />
                  <div className="h-3 w-full rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Patients Grid */}
        {!loading && patients.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {patients.map((patient) => (
              <div
                key={patient._id}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:gap-4"
              >
                {/* User Icon */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-blue-50 transition group-hover:bg-blue-100 sm:h-[72px] sm:w-[72px]">
                  <UserRound
                    size={32}
                    strokeWidth={1.7}
                    className="text-blue-600"
                  />
                </div>

                {/* Patient Information */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                    {patient.name}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    {patient.age !== undefined && (
                      <span>{patient.age} Years</span>
                    )}

                    {patient.gender && (
                      <span>{patient.gender}</span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-blue-600">
                    <HeartPulse size={14} />
                    <span className="truncate">
                      {patient.medicalCondition || "No condition added"}
                    </span>
                  </div>

                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
                    <CalendarDays size={13} />
                    <span>
                      {formatDate(
                        patient.createdAt || patient.appointmentDate
                      )}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <Link
                  href={`/patients/${patient._id}`}
                  className="flex shrink-0 items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white"
                >
                  Details
                  <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && patients.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-10 text-center">
            <UserRound
              size={36}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-3 text-base font-bold text-slate-800">
              No Patients Available
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Patients will appear here once they are added.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default RecentPatients;
