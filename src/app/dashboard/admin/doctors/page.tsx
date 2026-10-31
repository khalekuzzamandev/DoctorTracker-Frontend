
import {
  Plus,
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    specialization: "Cardiologist",
    hospital: "City Hospital",
    phone: "01711111111",
    email: "sarah@hospital.com",
    color: "bg-blue-100 text-blue-700",
    initials: "SW",
  },
  {
    id: 2,
    name: "Dr. Michael Brown",
    specialization: "Neurologist",
    hospital: "Metro Hospital",
    phone: "01722222222",
    email: "michael@hospital.com",
    color: "bg-purple-100 text-purple-700",
    initials: "MB",
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialization: "Pediatrician",
    hospital: "City Hospital",
    phone: "01733333333",
    email: "emily@hospital.com",
    color: "bg-pink-100 text-pink-700",
    initials: "ED",
  },
  {
    id: 4,
    name: "Dr. James Miller",
    specialization: "Orthopedic",
    hospital: "North Hospital",
    phone: "01744444444",
    email: "james@hospital.com",
    color: "bg-amber-100 text-amber-700",
    initials: "JM",
  },
  {
    id: 5,
    name: "Dr. Jessica Taylor",
    specialization: "Dermatologist",
    hospital: "Metro Hospital",
    phone: "01755555555",
    email: "jessica@hospital.com",
    color: "bg-emerald-100 text-emerald-700",
    initials: "JT",
  },
  {
    id: 6,
    name: "Dr. David Wilson",
    specialization: "Cardiologist",
    hospital: "Green Life Hospital",
    phone: "01766666666",
    email: "david@hospital.com",
    color: "bg-cyan-100 text-cyan-700",
    initials: "DW",
  },
  {
    id: 7,
    name: "Dr. Olivia Martin",
    specialization: "Neurologist",
    hospital: "City Hospital",
    phone: "01777777777",
    email: "olivia@hospital.com",
    color: "bg-indigo-100 text-indigo-700",
    initials: "OM",
  },
  {
    id: 8,
    name: "Dr. Daniel Thomas",
    specialization: "Pediatrician",
    hospital: "North Hospital",
    phone: "01788888888",
    email: "daniel@hospital.com",
    color: "bg-rose-100 text-rose-700",
    initials: "DT",
  },
];

const DoctorsPage = () => {
  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 sm:p-6">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Stethoscope size={22} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Doctors Management
            </h1>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Manage and monitor all doctors in your healthcare system.
          </p>
        </div>

        <Link href={'/dashboard/admin/doctors/add-doctor'} className="flex items-center justify-center gap-2 rounded-xl bg-[#0466c8] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
          <Plus size={18} />
          Add Doctor
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Doctors</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">24</h2>
              <p className="mt-2 text-xs font-medium text-emerald-600">
                +12% from last month
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Stethoscope size={25} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Doctors</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">21</h2>
              <p className="mt-2 text-xs font-medium text-emerald-600">
                87.5% active rate
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Users size={25} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Specializations</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">08</h2>
              <p className="mt-2 text-xs text-slate-400">
                Medical departments
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Stethoscope size={25} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Hospitals</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">12</h2>
              <p className="mt-2 text-xs text-slate-400">
                Registered hospitals
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Users size={25} />
            </div>
          </div>
        </div>

      </div>

      {/* Doctors Table Section */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Table Header */}
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              All Doctors
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              A complete list of registered medical professionals
            </p>
          </div>

          <span className="w-fit rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
            24 Total Doctors
          </span>
        </div>

        {/* Filters UI */}
        <div className="grid grid-cols-1 gap-3 border-b border-slate-100 bg-slate-50/50 p-4 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_auto]">

          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by name, specialization..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400"
            />
          </div>

          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none">
            <option>All Specializations</option>
            <option>Cardiologist</option>
            <option>Neurologist</option>
            <option>Pediatrician</option>
          </select>

          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none">
            <option>All Hospitals</option>
            <option>City Hospital</option>
            <option>Metro Hospital</option>
            <option>North Hospital</option>
          </select>

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
                <th className="px-5 py-4">Doctor Name</th>
                <th className="px-5 py-4">Specialization</th>
                <th className="px-5 py-4">Hospital</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Email Address</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {doctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="transition-colors duration-200 hover:bg-blue-50/40"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                    {doctor.id}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${doctor.color}`}>
                        {doctor.initials}
                      </div>

                      <span className="text-sm font-semibold text-slate-800">
                        {doctor.name}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                      {doctor.specialization}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {doctor.hospital}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {doctor.phone}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {doctor.email}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">

                      <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Eye size={16} />
                      </button>

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

        {/* Pagination UI */}
        <div className="flex flex-col justify-between gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">

          <p className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-700">1–8</span> of{" "}
            <span className="font-semibold text-slate-700">24 doctors</span>
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
              5
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

export default DoctorsPage;
