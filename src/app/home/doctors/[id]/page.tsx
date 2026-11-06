
import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  Stethoscope,
  CalendarDays,
  MapPin,
  BadgeCheck,
  Wallet,
  BriefcaseMedical,
  Clock,
  GraduationCap,
  Hash,
  CalendarCheck,
} from "lucide-react";
import { getDoctorDetails } from "@/Components/lib/actions/doctors";

type DoctorContentProps = {
  params: Promise<{ id: string }>;
};

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "N/A";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
};

const formatDate = (date: unknown) => {
  if (!date) return "N/A";

  const parsedDate = new Date(String(date));

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getFieldIcon = (key: string) => {
  const icons: Record<
    string,
    { icon: React.ReactNode; color: string; bg: string }
  > = {
    doctorId: {
      icon: <Hash size={15} />,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/50",
    },
    name: {
      icon: <UserRound size={15} />,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-950/50",
    },
    email: {
      icon: <Mail size={15} />,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/50",
    },
    phone: {
      icon: <Phone size={15} />,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
    },
    specialization: {
      icon: <Stethoscope size={15} />,
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-950/50",
    },
    gender: {
      icon: <UserRound size={15} />,
      color: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50 dark:bg-pink-950/50",
    },
    qualification: {
      icon: <GraduationCap size={15} />,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/50",
    },
    experience: {
      icon: <BriefcaseMedical size={15} />,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/50",
    },
    consultationFee: {
      icon: <Wallet size={15} />,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/50",
    },
    joiningDate: {
      icon: <CalendarDays size={15} />,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950/50",
    },
    status: {
      icon: <BadgeCheck size={15} />,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-950/50",
    },
    hospital: {
      icon: <MapPin size={15} />,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/50",
    },
    availableDays: {
      icon: <CalendarCheck size={15} />,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/50",
    },
  };

  return (
    icons[key] || {
      icon: <Clock size={15} />,
      color: "text-[#0466c8]",
      bg: "bg-blue-50 dark:bg-blue-950/50",
    }
  );
};

const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

const DoctorContent = async ({ params }: DoctorContentProps) => {
  const { id } = await params;

  const doctorResponse = await getDoctorDetails(id);

  const doctor =
    doctorResponse?.data ??
    doctorResponse?.doctor ??
    doctorResponse;

  if (!doctor || !doctor._id) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-blue-200 bg-white p-8 text-center shadow-lg dark:border-blue-900 dark:bg-slate-950">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#0466c8] dark:bg-blue-950">
            <UserRound size={32} />
          </div>

          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Doctor Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            The doctor information could not be found.
          </p>

          <Link
            href="/home/doctors"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0466c8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0353a4]"
          >
            <ArrowLeft size={16} />
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  const doctorFields: [string, unknown][] = [
    ["doctorId", doctor.doctorId ?? doctor._id],
    ["name", doctor.name],
    ["email", doctor.email],
    ["phone", doctor.phone],
    ["specialization", doctor.specialization],
    ["gender", doctor.gender],
    ["qualification", doctor.qualification],
    [
      "experience",
      doctor.experience != null
        ? `${doctor.experience} Years`
        : null,
    ],
    [
      "consultationFee",
      doctor.consultationFee != null
        ? `৳ ${doctor.consultationFee}`
        : null,
    ],
    ["joiningDate", formatDate(doctor.joiningDate)],
    ["status", doctor.status],
    ["hospital", doctor.hospital],
    ["availableDays", doctor.availableDays],
  ];

  // Left Column - 6 Items
  const firstColumnPriority = [
    "doctorId",
    "name",
    "email",
    "phone",
    "specialization",
    "gender",
  ];

  // Right Column - 7 Items
  const secondColumnPriority = [
    "qualification",
    "experience",
    "consultationFee",
    "joiningDate",
    "status",
    "hospital",
    "availableDays",
  ];

  const firstColumnFields = doctorFields.filter(([key]) =>
    firstColumnPriority.includes(key),
  );

  const secondColumnFields = doctorFields.filter(([key]) =>
    secondColumnPriority.includes(key),
  );

  const isActive =
    String(doctor.status || "").toLowerCase() === "active";

  const renderFields = (fields: [string, unknown][]) => (
    <div className="divide-y divide-blue-100 dark:divide-slate-800">
      {fields.map(([key, value]) => {
        const iconData = getFieldIcon(key);

        return (
          <div
            key={key}
            className="group flex items-center gap-2.5 py-2.5 first:pt-0 last:pb-0"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconData.bg} ${iconData.color} transition-transform duration-200 group-hover:scale-110`}
            >
              {iconData.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {formatLabel(key)}
              </p>

              <p className="mt-0.5 break-words text-[13px] font-semibold text-slate-800 dark:text-slate-100">
                {key === "status" ? (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${isActive
                        ? "bg-blue-100 text-[#0466c8] dark:bg-blue-950 dark:text-blue-300"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#0466c8]" : "bg-slate-400"
                        }`}
                    />
                    {formatValue(value)}
                  </span>
                ) : (
                  formatValue(value)
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50/50 p-3 sm:p-5 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl space-y-3">
        <Link
          href="/home/doctors"
          className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-[#0466c8] shadow-sm transition hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={16} />
          Back to Doctors
        </Link>

        <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-[0_8px_35px_rgba(4,102,200,0.09)] dark:border-blue-900/60 dark:bg-slate-900">

          {/* Profile Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#0466c8] via-[#0353a4] to-[#003f88] p-4 sm:p-5">
            <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[25px] border-white/10" />
            <div className="absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/40 bg-white/15 text-white shadow-lg">
                {doctor.image || doctor.profileImage ? (
                  <img
                    src={doctor.image || doctor.profileImage}
                    alt={doctor.name || "Doctor"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={38} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-white sm:text-2xl">
                    {formatValue(doctor.name)}
                  </h1>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${isActive
                        ? "border-white/40 bg-white/20 text-white"
                        : "border-white/30 bg-black/10 text-blue-100"
                      }`}
                  >
                    {formatValue(doctor.status)}
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-blue-100">
                  {formatValue(doctor.specialization)}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-blue-100">
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} />
                    {formatValue(doctor.email)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Phone size={14} />
                    {formatValue(doctor.phone)}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-sm">
                <p className="text-xs text-blue-100">
                  Consultation Fee
                </p>
                <p className="mt-1 text-xl font-bold text-white">
                  ৳ {formatValue(doctor.consultationFee)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-3 sm:p-4">

            {/* Doctor Information */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-800 dark:text-white">
                    Doctor Information
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Complete personal and professional details
                  </p>
                </div>

                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#0466c8] dark:bg-blue-950 dark:text-blue-300">
                  {doctorFields.length} Fields
                </span>
              </div>

              {/* Two Column Information Card */}
              <div className="grid grid-cols-1 gap-3 rounded-xl border border-blue-100 bg-white p-3 sm:grid-cols-2 sm:gap-4 sm:p-4 dark:border-slate-800 dark:bg-slate-950">
                {/* Left Column - 6 Items */}
                <div>
                  {renderFields(firstColumnFields)}
                </div>

                {/* Right Column - 7 Items */}
                <div className="border-t border-blue-100 pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0 dark:border-slate-800">
                  {renderFields(secondColumnFields)}
                </div>
              </div>
            </div>

            {/* Chamber Address */}
            {doctor.chamberAddress && (
              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 dark:border-blue-900/50 dark:bg-blue-950/20">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                      Chamber Address
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Doctor&apos;s chamber location
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {formatValue(doctor.chamberAddress)}
                </p>
              </div>
            )}

            {/* Book Appointment */}
            <div className="flex flex-col justify-between gap-3 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-3 sm:flex-row sm:items-center dark:border-blue-900/50 dark:from-blue-950/40 dark:to-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0466c8] dark:bg-blue-950">
                  <CalendarCheck size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Book an Appointment
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Schedule a consultation with this doctor
                  </p>
                </div>
              </div>

              {isActive ? (
                <Link
                  href={`/home/patients/book-appointment?doctorId=${doctor._id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0466c8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-[#0353a4] dark:shadow-none"
                >
                  Book Appointment
                  <ArrowLeft className="rotate-180" size={16} />
                </Link>
              ) : (
                <button
                  disabled
                  className="cursor-not-allowed rounded-xl bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                >
                  Currently Unavailable
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorDetails = ({ params }: DoctorContentProps) => {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl animate-pulse space-y-4 p-4">
          <div className="h-10 w-36 rounded-xl bg-blue-100 dark:bg-slate-800" />
          <div className="h-44 rounded-2xl bg-blue-100 dark:bg-slate-800" />
          <div className="h-80 rounded-2xl bg-blue-50 dark:bg-slate-900" />
        </div>
      }
    >
      <DoctorContent params={params} />
    </Suspense>
  );
};

export default DoctorDetails;
