
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  Users,
  UserRound,
  Activity,
  Loader2,
  Trash2,
  Pencil,
} from "lucide-react";
import Link from "next/link";

import { getAllPatient } from "@/Components/lib/actions/patient";

interface PatientType {
  _id: string;
  name: string;
  age: number;
  gender: string;
  medicalCondition: string;
  doctorName: string;
  doctorEmail: string;
  phone: string;
  status: string;
}

const Patient = () => {
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [conditionFilter, setConditionFilter] = useState("All Conditions");
  const [doctorFilter, setDoctorFilter] = useState("All Doctors");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Fetch Patients
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

  // Statistics
  const totalPatients = patients.length;

  const malePatients = patients.filter(
    (patient) => patient.gender?.toLowerCase() === "male"
  ).length;

  const femalePatients = patients.filter(
    (patient) => patient.gender?.toLowerCase() === "female"
  ).length;

  const malePercentage = totalPatients
    ? ((malePatients / totalPatients) * 100).toFixed(1)
    : "0";

  const femalePercentage = totalPatients
    ? ((femalePatients / totalPatients) * 100).toFixed(1)
    : "0";

  // Dynamic Filter Options
  const conditions = [
    ...new Set(
      patients
        .map((patient) => patient.medicalCondition)
        .filter(Boolean)
    ),
  ];

  const doctors = [
    ...new Set(
      patients
        .map((patient) => patient.doctorName)
        .filter(Boolean)
    ),
  ];

  // Search & Filter
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        patient.name?.toLowerCase().includes(searchText) ||
        patient.phone?.toLowerCase().includes(searchText) ||
        patient.doctorName?.toLowerCase().includes(searchText);

      const matchesCondition =
        conditionFilter === "All Conditions" ||
        patient.medicalCondition === conditionFilter;

      const matchesDoctor =
        doctorFilter === "All Doctors" ||
        patient.doctorName === doctorFilter;

      return matchesSearch && matchesCondition && matchesDoctor;
    });
  }, [patients, search, conditionFilter, doctorFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const currentPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startItem =
    filteredPatients.length === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    filteredPatients.length
  );

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "P";
  };

  const avatarColors = [
    "bg-blue-100 text-blue-700",
    "bg-pink-100 text-pink-700",
    "bg-emerald-100 text-emerald-700",
    "bg-violet-100 text-violet-700",
    "bg-amber-100 text-amber-700",
  ];

  const getConditionColor = (condition: string) => {
    const value = condition?.toLowerCase();

    if (value?.includes("heart") || value?.includes("critical")) {
      return "bg-red-500";
    }

    if (value?.includes("fever") || value?.includes("hypertension")) {
      return "bg-amber-500";
    }

    return "bg-emerald-500";
  };

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 sm:p-6">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Users size={22} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Patients Management
            </h1>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Manage and monitor all patients in your healthcare system.
          </p>
        </div>

        <Link
          href="/dashboard/admin/patients/add-patient"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0466c8] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Patient
        </Link>

      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {/* Total Patients */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Patients
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {loading ? "..." : totalPatients.toLocaleString()}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Total registered patients
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={25} />
            </div>
          </div>
        </div>

        {/* Male Patients */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Male Patients
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {loading ? "..." : malePatients.toLocaleString()}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {malePercentage}% of total patients
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <UserRound size={25} />
            </div>
          </div>
        </div>

        {/* Female Patients */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Female Patients
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {loading ? "..." : femalePatients.toLocaleString()}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {femalePercentage}% of total patients
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
              <UserRound size={25} />
            </div>
          </div>
        </div>

      </div>

      {/* Patients Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Table Heading */}
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              All Patients
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              View and manage registered patient information.
            </p>
          </div>

          <span className="w-fit rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
            {filteredPatients.length.toLocaleString()} Total Patients
          </span>

        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 gap-3 border-b border-slate-100 bg-slate-50/50 p-4 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_auto]">

          {/* Search */}
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, phone, doctor..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400"
            />
          </div>

          {/* Condition Filter */}
          <select
            value={conditionFilter}
            onChange={(e) => {
              setConditionFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-400"
          >
            <option>All Conditions</option>

            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>

          {/* Doctor Filter */}
          <select
            value={doctorFilter}
            onChange={(e) => {
              setDoctorFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-400"
          >
            <option>All Doctors</option>

            {doctors.map((doctor) => (
              <option key={doctor} value={doctor}>
                Dr. {doctor}
              </option>
            ))}
          </select>

          {/* Reset Filter */}
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setConditionFilter("All Conditions");
              setDoctorFilter("All Doctors");
              setCurrentPage(1);
            }}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
          >
            <Filter size={16} />
            Reset Filter
          </button>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-60 items-center justify-center gap-2 text-sm font-medium text-blue-600">
            <Loader2 size={20} className="animate-spin" />
            Loading patients...
          </div>
        ) : (

          <>
            {/* Table */}
            <div className="w-full overflow-x-auto">

              <table className="w-full min-w-[950px] border-collapse text-left">

                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">#</th>
                    <th className="px-5 py-4">Patient Name</th>
                    <th className="px-5 py-4">Age</th>
                    <th className="px-5 py-4">Condition</th>
                    <th className="px-5 py-4">Doctor</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {currentPatients.map((patient, index) => (

                    <tr
                      key={patient._id}
                      className="transition-colors duration-200 hover:bg-blue-50/40"
                    >

                      <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      {/* Patient Name */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-3">

                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${avatarColors[index % avatarColors.length]
                              }`}
                          >
                            {getInitials(patient.name)}
                          </div>

                          <span className="text-sm font-semibold text-slate-800">
                            {patient.name}
                          </span>

                        </div>
                      </td>

                      {/* Age */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {patient.age ?? "N/A"}
                      </td>


                      {/* Condition */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-2">

                          <span
                            className={`h-2 w-2 rounded-full ${getConditionColor(
                              patient.medicalCondition
                            )}`}
                          />

                          <span className="text-sm font-medium text-slate-700">
                            {patient.medicalCondition || "N/A"}
                          </span>

                        </div>
                      </td>

                      {/* Doctor */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-600">
                        {patient.doctorName
                          ? `Dr. ${patient.doctorName}`
                          : "Not Assigned"}
                      </td>

                      {/* Phone */}
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        {patient.phone || "N/A"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">

                          <Link
                            href={`/dashboard/admin/patients/${patient._id}`}
                            title="View Patient Details"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            href={`/dashboard/admin/patients/${patient._id}`}
                            title="View Patient Details"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          >
                            <Pencil size={16} />
                          </Link>
                          <Link
                            href={`/dashboard/admin/patients/${patient._id}`}
                            title="View Patient Details"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                          >
                            <Trash2 size={16} />
                          </Link>

                        </div>
                      </td>

                    </tr>

                  ))}

                  {currentPatients.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-5 py-12 text-center"
                      >
                        <Activity
                          size={32}
                          className="mx-auto mb-2 text-slate-300"
                        />

                        <p className="text-sm font-semibold text-slate-600">
                          No Patients Found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try changing your search or filters.
                        </p>
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

            {/* Pagination */}
            <div className="flex flex-col justify-between gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">

              <p className="text-xs text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {startItem}–{endItem}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {filteredPatients.length} patients
                </span>
              </p>

              <div className="flex items-center gap-1.5">

                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={17} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                )
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 &&
                        page - array[index - 1] > 1 && (
                          <span className="px-1 text-slate-400">
                            ...
                          </span>
                        )}

                      <button
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${currentPage === page
                            ? "bg-[#0466c8] text-white"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages || totalPages === 0}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={17} />
                </button>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Patient;
