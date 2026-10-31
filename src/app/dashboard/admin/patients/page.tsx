
import React from "react";
import {
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users,
  UserRound,
  Activity,
} from "lucide-react";
import Link from "next/link";

const patients = [
  {
    id: 1,
    name: "Rahim Ahmed",
    age: 45,
    gender: "Male",
    condition: "Heart Disease",
    doctor: "Dr. Sarah Wilson",
    phone: "01711111111",
    initials: "RA",
    color: "bg-blue-100 text-blue-700",
    status: "Critical",
  },
  {
    id: 2,
    name: "Ayesha Khan",
    age: 32,
    gender: "Female",
    condition: "Fever",
    doctor: "Dr. Michael Brown",
    phone: "01722222222",
    initials: "AK",
    color: "bg-pink-100 text-pink-700",
    status: "Recovering",
  },
  {
    id: 3,
    name: "Ali Hasan",
    age: 60,
    gender: "Male",
    condition: "Diabetes",
    doctor: "Dr. Emily Davis",
    phone: "01733333333",
    initials: "AH",
    color: "bg-emerald-100 text-emerald-700",
    status: "Stable",
  },
  {
    id: 4,
    name: "Fatema Begum",
    age: 28,
    gender: "Female",
    condition: "Pregnancy",
    doctor: "Dr. Jessica Taylor",
    phone: "01744444444",
    initials: "FB",
    color: "bg-violet-100 text-violet-700",
    status: "Stable",
  },
  {
    id: 5,
    name: "Tanvir Hasan",
    age: 50,
    gender: "Male",
    condition: "Hypertension",
    doctor: "Dr. Sarah Wilson",
    phone: "01755555555",
    initials: "TH",
    color: "bg-amber-100 text-amber-700",
    status: "Recovering",
  },
];

const Patient = () => {
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

        <Link href={'/dashboard/admin/patients/add-patient'} className="flex items-center justify-center gap-2 rounded-xl bg-[#0466c8] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
          <Plus size={18} />
          Add Patient
        </Link>

      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Patients
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                1,248
              </h2>
              <p className="mt-2 text-xs font-medium text-emerald-600">
                +8% from last month
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={25} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Male Patients
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                685
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                54.9% of total patients
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <UserRound size={25} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Female Patients
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                563
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                45.1% of total patients
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
            1,248 Total Patients
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
              placeholder="Search by name, phone..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400"
            />
          </div>

          {/* Condition Filter */}
          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-400">
            <option>All Conditions</option>
            <option>Heart Disease</option>
            <option>Fever</option>
            <option>Diabetes</option>
            <option>Pregnancy</option>
            <option>Hypertension</option>
          </select>

          {/* Doctor Filter */}
          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-400">
            <option>All Doctors</option>
            <option>Dr. Sarah Wilson</option>
            <option>Dr. Michael Brown</option>
            <option>Dr. Emily Davis</option>
            <option>Dr. Jessica Taylor</option>
          </select>

          {/* Filter Button */}
          <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-5 text-sm font-semibold text-blue-600">
            <Filter size={16} />
            Filter
          </button>

        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[950px] border-collapse text-left">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Patient Name</th>
                <th className="px-5 py-4">Age</th>
                <th className="px-5 py-4">Gender</th>
                <th className="px-5 py-4">Condition</th>
                <th className="px-5 py-4">Doctor</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="transition-colors duration-200 hover:bg-blue-50/40"
                >

                  <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                    {patient.id}
                  </td>

                  {/* Patient Name */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-3">

                      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${patient.color}`}>
                        {patient.initials}
                      </div>

                      <span className="text-sm font-semibold text-slate-800">
                        {patient.name}
                      </span>

                    </div>
                  </td>

                  {/* Age */}
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {patient.age}
                  </td>

                  {/* Gender */}
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {patient.gender}
                  </td>

                  {/* Condition */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${patient.status === "Critical"
                            ? "bg-red-500"
                            : patient.status === "Recovering"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                      />

                      <span className="text-sm font-medium text-slate-700">
                        {patient.condition}
                      </span>
                    </div>
                  </td>

                  {/* Doctor */}
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-600">
                    {patient.doctor}
                  </td>

                  {/* Phone */}
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {patient.phone}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">

                      <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Pencil size={15} />
                      </button>

                      <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">
                        <Trash2 size={15} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>

        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">

          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">1–5</span> of{" "}
            <span className="font-semibold text-slate-700">
              1,248 patients
            </span>
          </p>

          <div className="flex items-center gap-1.5">

            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
              <ChevronLeft size={17} />
            </button>

            <button className="h-9 min-w-9 rounded-lg bg-[#0466c8] px-3 text-sm font-semibold text-white">
              1
            </button>

            <button className="h-9 min-w-9 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600">
              2
            </button>

            <button className="h-9 min-w-9 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600">
              3
            </button>

            <span className="px-1 text-slate-400">...</span>

            <button className="h-9 min-w-9 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600">
              250
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Patient;
