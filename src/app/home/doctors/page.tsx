
import { Suspense } from "react";
import { getDoctor } from "@/Components/lib/actions/doctors";
import Link from "next/link";
import {
  UserRound,
  Eye,
  Mail,
  BriefcaseMedical,
  Building2,
  Stethoscope,
  ArrowUpRight,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { connection } from "next/server";

interface DoctorType {
  _id: string;
  name: string;
  specialization: string;
  status: string;
  email: string;
  experience: number | string;
  hospital: string;
  doctorId: string;
}

// Loading Skeleton
const DoctorSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="bg-white border border-slate-200 rounded-xl p-4 animate-pulse space-y-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-slate-200 rounded w-24" />
            <div className="h-2 bg-slate-200 rounded w-20" />
          </div>
        </div>
        <div className="h-8 bg-slate-100 rounded-lg" />
        <div className="flex gap-2">
          <div className="h-7 bg-slate-100 rounded-lg flex-1" />
          <div className="h-7 bg-slate-100 rounded-lg w-20" />
        </div>
        <div className="h-9 bg-slate-200 rounded-lg" />
      </div>
    ))}
  </div>
);

// Doctor List
const DoctorList = async () => {
  await connection();

  const doctors: DoctorType[] = await getDoctor();

  return (
    <>
      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="group bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-slate-200/70 hover:border-blue-200 transition-all duration-300"
            >
              {/* Doctor Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <UserRound size={20} className="text-blue-600" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-sm font-bold text-slate-800 truncate">
                      Dr. {doctor.name}
                    </h2>
                    <p className="text-[11px] text-blue-600 font-medium truncate mt-0.5">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2 py-1 rounded-md shrink-0 ${doctor.status === "Active"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                    }`}
                >
                  {doctor.status}
                </span>
              </div>

              {/* Doctor ID */}
              <div className="flex items-center justify-between mt-3 py-2 px-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-[10px] text-slate-400 font-medium">
                  Doctor ID
                </span>
                <span className="text-xs font-bold text-slate-700">
                  #{doctor.doctorId}
                </span>
              </div>

              {/* Compact Information */}
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="flex items-center gap-1.5 min-w-0 max-w-full bg-blue-50 text-blue-700 px-2.5 py-2 rounded-lg">
                  <Mail size={13} className="shrink-0" />
                  <span className="text-[10px] truncate">
                    {doctor.email}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-2.5 py-2 rounded-lg">
                  <BriefcaseMedical size={13} className="shrink-0" />
                  <span className="text-[10px] whitespace-nowrap">
                    {doctor.experience} Years
                  </span>
                </div>

                <div className="flex items-center gap-1.5 min-w-0 max-w-full bg-cyan-50 text-cyan-700 px-2.5 py-2 rounded-lg">
                  <Building2 size={13} className="shrink-0" />
                  <span className="text-[10px] truncate">
                    {doctor.hospital}
                  </span>
                </div>
              </div>

              {/* Details Button */}
              <Link
                href={`/home/doctors/${doctor.doctorId}`}
                className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-xs font-semibold transition-all duration-300"
              >
                <Eye size={14} />
                View Details
                <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl py-16 text-center shadow-sm">
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <Stethoscope size={27} className="text-blue-500" />
          </div>

          <h3 className="text-lg font-bold text-slate-800">
            No Doctors Found
          </h3>

          <p className="text-sm text-slate-400 mt-2">
            No registered doctors available right now.
          </p>
        </div>
      )}
    </>
  );
};

// Main Page
const Doctor = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 md:py-8">
      <section className="max-w-7xl w-full mx-auto space-y-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Stethoscope size={17} className="text-white" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Healthcare Administration
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Doctors Directory
            </h1>

            <p className="text-sm text-slate-500 mt-1.5">
              Manage and explore all registered medical professionals.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm w-fit">
            <ShieldCheck size={18} className="text-green-600" />
            <span className="text-xs font-semibold text-slate-600">
              Medical Directory
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Registered Doctors
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Browse professional details and doctor profiles.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit">
              <Activity size={15} />
              Doctor Records
            </div>
          </div>
        </div>

        {/* Doctor Cards */}
        <Suspense fallback={<DoctorSkeleton />}>
          <DoctorList />
        </Suspense>

      </section>
    </main>
  );
};

export default Doctor;
