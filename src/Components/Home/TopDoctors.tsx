
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

interface Doctor {
  _id: string;
  name: string;
  specialization?: string;
  qualification?: string;
  hospital?: string;
  experience?: number;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const TopDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/get/doctor`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await res.json();
        setDoctors(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (error) {
        console.error("Doctor fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section className="bg-slate-50 px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <Stethoscope size={15} />
              Our Medical Experts
            </span>

            <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Meet Our{" "}
              <span className="text-blue-600">Top Doctors</span>
            </h2>

            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Meet our experienced healthcare professionals dedicated
              to providing the best medical care.
            </p>
          </div>

          {/* All Doctors */}
          <Link
            href="home/doctors"
            className="group flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            All Doctors
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
                className="flex animate-pulse items-center gap-4 rounded-xl border border-slate-200 bg-white p-3"
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

        {/* Doctors Grid */}
        {!loading && doctors.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
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

                {/* Doctor Information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                      {doctor.name}
                    </h3>

                    <BadgeCheck
                      size={16}
                      className="shrink-0 text-blue-500"
                    />
                  </div>

                  <p className="mt-1 text-xs font-semibold text-blue-600 sm:text-sm">
                    {doctor.specialization || "General Physician"}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {doctor.qualification || "Medical Professional"}
                  </p>

                  {doctor.experience !== undefined && (
                    <p className="mt-1 text-xs text-slate-500">
                      {doctor.experience} Years Experience
                    </p>
                  )}

                  {doctor.hospital && (
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {doctor.hospital}
                    </p>
                  )}
                </div>

                {/* View Profile */}
                <Link
                  href={`home/doctors/${doctor._id}`}
                  className="flex shrink-0 items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white"
                >
                  View
                  <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && doctors.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-10 text-center">
            <UserRound
              size={36}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-3 text-base font-bold text-slate-800">
              No Doctors Available
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Doctors will appear here once they are added.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default TopDoctors;
