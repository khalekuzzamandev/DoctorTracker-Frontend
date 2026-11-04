
import { Suspense } from "react";
import { getDoctor } from "@/Components/lib/actions/doctors";
import Link from "next/link";
import {
  Plus,
  Search,
  Eye,
  Stethoscope,
  Users,
} from "lucide-react";
import EditDoctor from "@/Components/Dashboard/Doctor/EditDoctor";
import DeleteDoctor from "@/Components/Dashboard/Doctor/DeleteDoctor";

// Doctor Type
interface DoctorType {
  _id: string;
  name: string;
  doctorId: string;
  specialization: string;
  hospital: string;
  status: string;
  email: string;
  phone: string;
  experience: number | string;
}

// Loading Skeleton
const DoctorSkeleton = () => (
  <div className="p-6 space-y-5 animate-pulse">
    <div className="h-8 w-52 bg-slate-200 rounded" />

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="h-28 bg-slate-200 rounded-2xl" />
      ))}
    </div>

    <div className="h-96 bg-slate-200 rounded-2xl" />
  </div>
);

// Avatar Colors
const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-cyan-100 text-cyan-700",
];

// Doctor Data
const DoctorData = async () => {
  const doctors = (await getDoctor()) as DoctorType[];

  // Dynamic Summary
  const totalDoctors = doctors.length;

  const activeDoctors = doctors.filter(
    (doctor) => doctor.status === "Active"
  ).length;

  const specializationList: string[] = Array.from(new Set<string>(doctors.map((doctor) =>doctor.specialization)));

  const hospitalList: string[] = Array.from(
    new Set<string>(
      doctors.map((doctor) => doctor.hospital)
    )
  );

  const specializations = specializationList.length;
  const hospitals = hospitalList.length;

  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Doctors
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {totalDoctors}
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                Registered doctors
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Stethoscope size={25} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Doctors
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {activeDoctors}
              </h2>
              <p className="mt-2 text-xs text-emerald-600">
                Currently active
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Users size={25} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Specializations
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {specializations}
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                Medical departments
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Stethoscope size={25} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Hospitals
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {hospitals}
              </h2>
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

      {/* Doctors Table */}
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
            {totalDoctors} Total Doctors
          </span>
        </div>

        {/* Filters UI */}
        <div className="grid grid-cols-1 gap-3 border-b border-slate-100 bg-slate-50/50 p-4 md:grid-cols-2 xl:grid-cols-3">
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

          <select
            defaultValue=""
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none"
          >
            <option value="">All Specializations</option>

            {specializationList.map((specialization: string) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>

          <select
            defaultValue=""
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none"
          >
            <option value="">All Hospitals</option>

            {hospitalList.map((hospital: string) => (
              <option key={hospital} value={hospital}>
                {hospital}
              </option>
            ))}
          </select>
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
               
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {doctors.map((doctor, index) => {
                const initials = doctor.name
                  .split(" ")
                  .map((word: string) => word[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                return (
                  <tr
                    key={doctor._id}
                    className="transition-colors duration-200 hover:bg-blue-50/40"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                      {index + 1}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${avatarColors[index % avatarColors.length]
                            }`}
                        >
                          {initials}
                        </div>

                        <span className="text-sm font-semibold text-slate-800">
                          Dr. {doctor.name}
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

                  

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/home/doctors/${doctor._id}`}
                          title="View Doctor"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <Eye size={16} />
                        </Link>

                        {/* Edit Button */}
                        <EditDoctor
                          DoctorData={doctor as Parameters<typeof EditDoctor>[0]["DoctorData"]}
                        />

                       <DeleteDoctor/>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {doctors.length === 0 && (
          <div className="py-14 text-center">
            <Stethoscope
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-3 font-semibold text-slate-700">
              No Doctors Found
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Add a doctor to see the list here.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {doctors.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {totalDoctors}
            </span>{" "}
            doctors
          </p>
        </div>
      </div>
    </>
  );
};

// Main Page
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

        <Link
          href="/dashboard/admin/doctors/add-doctor"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0466c8] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Doctor
        </Link>
      </div>

      {/* Suspense */}
      <Suspense fallback={<DoctorSkeleton />}>
        <DoctorData />
      </Suspense>
    </div>
  );
};

export default DoctorsPage;
