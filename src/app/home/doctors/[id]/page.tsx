
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
  CalendarCheck,
  ShieldCheck,
  Hash,
} from "lucide-react";

type DoctorContentProps = {
  params: Promise<{ id: string }>;
};

const DoctorContent = async ({ params }: DoctorContentProps) => {
  const { id } = await params;
  const doctor = await getDoctorDetails(id);

  const doctorInfo = [
    { label: "Full Name", value: doctor.name, icon: UserRound },
    { label: "Doctor ID", value: doctor.doctorId, icon: Hash },
    { label: "Gender", value: doctor.gender, icon: VenusAndMars },
    { label: "Specialization", value: doctor.specialization, icon: Stethoscope },
    { label: "Qualification", value: doctor.qualification, icon: GraduationCap },
    { label: "Experience", value: `${doctor.experience} Years`, icon: BriefcaseMedical },
    { label: "Email Address", value: doctor.email, icon: Mail },
    { label: "Consultation Fee", value: `৳ ${doctor.consultationFee}`, icon: Banknote },
    { label: "Joining Date", value: doctor.joiningDate, icon: CalendarDays },
    { label: "Status", value: doctor.status, icon: BadgeCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50/80 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Back Navigation */}
        <Link
          href="/home/doctors"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Doctors
        </Link>

        {/* Doctor Profile Header */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-6 md:p-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">

              {/* Profile Image */}
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-blue-100 shadow-lg">
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

              {/* Basic Details */}
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                    {doctor.name}
                  </h1>

                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${doctor.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                    }`}>
                    {doctor.status}
                  </span>
                </div>

                <p className="font-semibold text-blue-600">
                  {doctor.specialization}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
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

                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <ShieldCheck size={15} className="text-emerald-600" />
                  Doctor profile information
                </div>
              </div>

              {/* Consultation Fee */}
              <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm md:min-w-40">
                <p className="text-xs font-medium text-slate-500">
                  Consultation Fee
                </p>
                <p className="mt-1 text-2xl font-bold text-blue-600">
                  ৳ {doctor.consultationFee}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Per consultation
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-7 border-t border-slate-100 px-6">
            <div className="flex items-center gap-2 border-b-2 border-blue-600 py-4 text-sm font-bold text-blue-600">
              <UserRound size={16} />
              Overview
            </div>

            <div className="flex items-center gap-2 border-b-2 border-transparent py-4 text-sm font-medium text-slate-400">
              <CalendarDays size={16} />
              Availability
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Doctor Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7 lg:col-span-2">

            <div className="mb-7 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <UserRound size={21} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Doctor Information
                </h2>
                <p className="text-xs text-slate-400">
                  Personal and professional information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {doctorInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex min-w-0 gap-3 border-b border-slate-100 pb-4"
                  >
                    <div className="h-fit rounded-lg bg-slate-50 p-2 text-blue-500">
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-xs font-medium text-slate-400">
                        {item.label}
                      </p>
                      <p className="break-words text-sm font-semibold text-slate-700">
                        {item.value || "N/A"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chamber Address */}
            <div className="mt-7">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
                <MapPin size={18} className="text-blue-500" />
                Chamber Address
              </h3>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm leading-6 text-slate-600">
                  {doctor.chamberAddress || "Address not available"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Professional Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-bold text-slate-800">
                Professional Details
              </h2>

              <div className="space-y-5">

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <GraduationCap size={21} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Qualification</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {doctor.qualification || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                    <Stethoscope size={21} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Specialization</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {doctor.specialization || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <BriefcaseMedical size={21} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Experience</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {doctor.experience} Years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                    <Banknote size={21} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Consultation Fee</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      ৳ {doctor.consultationFee}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">
                    Available Days
                  </h2>
                  <p className="text-xs text-slate-400">
                    Doctor&apos;s weekly schedule
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {doctor.availableDays?.length > 0 ? (
                  doctor.availableDays.map((day: string) => (
                    <span
                      key={day}
                      className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
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

              {/* Book Doctor Button */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <Link
                  href={`/home/patients/book-appointment?doctorId=${doctor._id}`}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-md transition duration-300 ${doctor.status === "Active"
                      ? "bg-blue-600 shadow-blue-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
                      : "pointer-events-none bg-slate-400"
                    }`}
                  aria-disabled={doctor.status !== "Active"}
                  tabIndex={doctor.status === "Active" ? 0 : -1}
                >
                  <CalendarCheck size={19} />
                  Book Doctor
                </Link>

                <p className="mt-3 text-center text-xs text-slate-400">
                  {doctor.status === "Active"
                    ? "Book your appointment with this doctor"
                    : "This doctor is currently unavailable"}
                </p>
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
        <div className="flex min-h-96 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
            <p className="text-sm font-medium text-slate-500">
              Loading doctor details...
            </p>
          </div>
        </div>
      }
    >
      <DoctorContent params={params} />
    </Suspense>
  );
}
