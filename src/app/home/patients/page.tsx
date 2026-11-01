
"use client";

import React, { useEffect, useState } from "react";
import {
  UserRound,
  HeartPulse,
  Stethoscope,
  CalendarDays,
  Users,
  ShieldCheck,
  Loader2,
  Mail,
} from "lucide-react";

import { getAllPatient } from "@/Components/lib/actions/patient";

interface PatientType {
  _id: string;
  name: string;
  gender: string;
  age: number;
  medicalCondition: string;
  doctorName: string;
  doctorEmail: string;
  appointmentDate: string;
  status: string;
}

const Patients = () => {
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatient();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-5">
      <div className="mx-auto max-w-7xl space-y-4">

        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-blue-600 p-2 text-white">
                <HeartPulse size={17} />
              </div>

              <span className="text-xs font-bold tracking-wider text-blue-600">
                HEALTHCARE ADMINISTRATION
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              Patients Directory
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage and explore all registered patients.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <ShieldCheck size={17} className="text-green-500" />
            <span className="text-sm font-medium text-slate-700">
              Patient Directory
            </span>
          </div>
        </div>

        {/* Directory Header */}
        <div className="flex flex-col justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Registered Patients
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Browse patient profiles and assigned doctors.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-600">
            <HeartPulse size={14} />
            Patient Records
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-52 items-center justify-center">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
              <Loader2 size={19} className="animate-spin" />
              Loading patients...
            </div>
          </div>
        ) : patients.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center">
            <Users size={36} className="mx-auto mb-3 text-slate-300" />

            <h3 className="font-semibold text-slate-700">
              No Patients Found
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Patient records will appear here after registration.
            </p>
          </div>
        ) : (

          /* Patient Cards */
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {patients.map((patient) => (
              <div
                key={patient._id}
                className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >

                {/* Patient Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                      <UserRound size={18} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-slate-800">
                        {patient.name}
                      </h3>

                      <p className="mt-0.5 text-[11px] text-blue-600">
                        {patient.gender || "N/A"} · {patient.age ?? "N/A"} Years
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ${patient.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-500"
                      }`}
                  >
                    {patient.status || "Active"}
                  </span>
                </div>

                {/* Medical Condition */}
                <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-2.5 py-2">
                  <span className="text-[11px] text-slate-400">
                    Medical Condition
                  </span>

                  <span className="max-w-[60%] truncate text-[11px] font-semibold text-slate-700">
                    {patient.medicalCondition || "Not specified"}
                  </span>
                </div>

                {/* Doctor Information - Flex */}
                <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50/60 p-2.5">
                  <div className="mb-2 flex items-center gap-1.5">
                    <Stethoscope size={13} className="text-blue-600" />

                    <span className="text-[11px] font-bold text-blue-800">
                      Assigned Doctor
                    </span>
                  </div>

                  <div className="flex items-center gap-3">

                    {/* Doctor Name */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-slate-500">
                        Doctor Name
                      </p>

                      <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-800">
                        {patient.doctorName
                          ? `Dr. ${patient.doctorName}`
                          : "Not Assigned"}
                      </p>
                    </div>

                    {/* Doctor Email */}
                    <div className="min-w-0 flex-1 border-l border-blue-100 pl-3">
                      <p className="text-[10px] text-slate-500">
                        Doctor Email
                      </p>

                      <div className="mt-0.5 flex min-w-0 items-center gap-1">
                        <Mail size={11} className="shrink-0 text-blue-600" />

                        <span className="truncate text-[11px] text-slate-700">
                          {patient.doctorEmail || "No email"}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Appointment Date - Single Line */}
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-purple-50 px-2.5 py-2">
                  <CalendarDays
                    size={13}
                    className="shrink-0 text-purple-600"
                  />

                  <span className="whitespace-nowrap text-[10px] text-purple-600">
                    Appointment:
                  </span>

                  <span className="truncate text-[11px] font-semibold text-purple-800">
                    {patient.appointmentDate || "Not scheduled"}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Patients;
