
import { getDoctorDetails } from "@/Components/lib/actions/doctors";
import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  UserRound,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  Building2,
  GraduationCap,
  CalendarDays,
  Clock,
  BadgeCheck,
  Banknote,
  VenusAndMars,
  BriefcaseMedical,
} from "lucide-react";

const DoctorContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const doctor = await getDoctorDetails(id);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-5">

        {/* Back Button */}
        <Link
          href="/home/doctors"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} />
          Back to Doctors
        </Link>

        {/* Doctor Header */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-5 md:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

              {/* Profile Image */}
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-100 shadow-md">
                {doctor.profileImage ? (
                  <img
                    src={doctor.profileImage}
                    alt={doctor.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={55} className="text-blue-500" />
                )}
              </div>

              {/* Doctor Information */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">
                    {doctor.name}
                  </h1>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${doctor.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}>
                    {doctor.status}
                  </span>
                </div>

                <p className="font-semibold text-blue-600">
                  {doctor.specialization}
                </p>

                <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <VenusAndMars size={16} className="text-blue-500" />
                    {doctor.gender}
                  </p>

                  <p className="flex items-center gap-2">
                    <Phone size={16} className="text-blue-500" />
                    {doctor.phone}
                  </p>

                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-blue-500" />
                    {doctor.email}
                  </p>

                  <p className="flex items-center gap-2">
                    <Building2 size={16} className="text-blue-500" />
                    {doctor.hospital}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-t border-slate-200 px-6">
            <button className="flex items-center gap-2 border-b-2 border-blue-600 py-4 text-sm font-semibold text-blue-600">
              <UserRound size={16} />
              Overview
            </button>

            <button className="flex items-center gap-2 border-b-2 border-transparent py-4 text-sm font-medium text-slate-500">
              <Clock size={16} />
              Availability
            </button>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="grid gap-5 lg:grid-cols-3">

          {/* Personal Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-800">
              <UserRound size={20} className="text-blue-600" />
              Doctor Information
            </h2>

            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {[
                ["Full Name", doctor.name],
                ["Doctor ID", doctor.doctorId],
                ["Gender", doctor.gender],
                ["Specialization", doctor.specialization],
                ["Qualification", doctor.qualification],
                ["Experience", `${doctor.experience} Years`],
                ["Hospital", doctor.hospital],
                ["Phone Number", doctor.phone],
                ["Email Address", doctor.email],
                ["Consultation Fee", `৳ ${doctor.consultationFee}`],
                ["Joining Date", doctor.joiningDate],
                ["Status", doctor.status],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-slate-100 pb-3">
                  <p className="mb-1 text-xs font-medium text-slate-400">
                    {label}
                  </p>
                  <p className="break-words text-sm font-semibold text-slate-700">
                    {value || "N/A"}
                  </p>
                </div>
              ))}
            </div>

            {/* Chamber Address */}
            <div className="mt-6">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                <MapPin size={17} className="text-blue-500" />
                Chamber Address
              </p>
              <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                {doctor.chamberAddress || "Address not available"}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-5">

            {/* Professional Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 flex items-center gap-2 font-bold text-slate-800">
                <BriefcaseMedical size={19} className="text-blue-600" />
                Professional Details
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Qualification</p>
                    <p className="text-sm font-semibold text-slate-700">
                      {doctor.qualification || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Specialization</p>
                    <p className="text-sm font-semibold text-slate-700">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-green-50 p-2 text-green-600">
                    <BadgeCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Experience</p>
                    <p className="text-sm font-semibold text-slate-700">
                      {doctor.experience} Years
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                    <Banknote size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Consultation Fee</p>
                    <p className="text-sm font-semibold text-slate-700">
                      ৳ {doctor.consultationFee}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Days */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
                <CalendarDays size={19} className="text-blue-600" />
                Available Days
              </h2>

              <div className="flex flex-wrap gap-2">
                {doctor.availableDays?.length > 0 ? (
                  doctor.availableDays.map((day: string) => (
                    <span
                      key={day}
                      className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
                    >
                      {day}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No available days
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default function DoctorDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-sm text-slate-500">
          Loading doctor details...
        </div>
      }
    >
      <DoctorContent params={params} />
    </Suspense>
  );
}
