"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Stethoscope,
  Loader2,
} from "lucide-react";

interface Doctor {
  _id: string;
  name: string;
  specialization?: string;
  qualification?: string;
  hospital?: string;
  experience?: number;
  consultationFee?: number;
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
    <section className="bg-slate-50 px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <Stethoscope size={17} />
            Our Medical Experts
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Meet Our <span className="text-blue-600">Top Doctors</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            Meet our experienced healthcare professionals dedicated
            to providing the best medical care.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-200">
                  <Stethoscope className="text-slate-400" size={35} />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="h-3 w-24 rounded bg-slate-200" />
                  <div className="h-3 w-full rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && doctors.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:gap-5"
              >
                {/* Doctor Icon */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-blue-50 transition duration-300 group-hover:bg-blue-100 sm:h-28 sm:w-28">
                  <Stethoscope
                    size={42}
                    strokeWidth={1.5}
                    className="text-blue-600 transition duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Doctor Information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                      {doctor.name}
                    </h3>

                    <BadgeCheck
                      size={17}
                      className="shrink-0 text-blue-500"
                    />
                  </div>

                  <p className="mt-1 text-sm font-semibold text-blue-600">
                    {doctor.specialization || "General Physician"}
                  </p>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500 sm:text-sm">
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
                  href={`/doctors/${doctor._id}`}
                  className="flex shrink-0 items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  <span className="hidden sm:inline">View Profile</span>
                  <span className="sm:hidden">View</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && doctors.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
            <Stethoscope
              className="mx-auto text-slate-400"
              size={40}
            />

            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No Doctors Available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Doctors will appear here once they are added.
            </p>
          </div>
        )}

        {/* View All */}
        <div className="mt-9 text-center">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            View All Doctors
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TopDoctors;