
import { Suspense } from "react";
import Link from "next/link";
import { getPatientDetails } from "@/Components/lib/actions/patient";

const PatientDetailsContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const patientDetails = await getPatientDetails(id);

  const patient =
    patientDetails?.data ?? patientDetails?.patient ?? patientDetails;

  if (!patient || !patient._id) {
    return (
      <div className="p-6">
        <Link
          href="/dashboard/admin/patients"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1"
        >
          ← Back to Patients
        </Link>

        <p className="mt-6 text-lg font-semibold">Patient not found!</p>
      </div>
    );
  }

  const formatValue = (value: unknown) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  };

  const formatLabel = (key: string) =>
    key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/^./, (str) => str.toUpperCase());

  const formatDate = (value: unknown) => {
    if (!value) return "N/A";

    const date = new Date(String(value));

    if (isNaN(date.getTime())) return String(value);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Doctor related data
  const doctorRaw =
    patient.doctor ??
    patient.doctorInfo ??
    patient.doctorDetails ??
    patient.assignedDoctor ??
    patient.doctorId ??
    null;

  const doctor =
    doctorRaw && typeof doctorRaw === "object" ? doctorRaw : null;

  // Doctor & Appointment fields
  const doctorIdValue =
    (typeof patient.doctorId === "string" ? patient.doctorId : null) ??
    patient.doctor_id ??
    doctor?._id ??
    doctor?.id ??
    (typeof doctorRaw === "string" ? doctorRaw : null);

  const doctorNameValue =
    patient.doctorName ?? patient.doctor_name ?? doctor?.name ?? null;

  const doctorEmailValue =
    patient.doctorEmail ?? patient.doctor_email ?? doctor?.email ?? null;

  const appointmentDateValue =
    patient.appointmentDate ??
    patient.appointment_date ??
    patient.appointment?.date ??
    null;

  const doctorCardFields = [
    {
      label: "Doctor Id",
      value: formatValue(doctorIdValue),
      icon: "🆔",
      color: "text-violet-600 dark:text-violet-400",
    },
    {
      label: "Doctor Name",
      value: formatValue(doctorNameValue),
      icon: "👨‍⚕️",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Doctor Email",
      value: formatValue(doctorEmailValue),
      icon: "✉️",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Appointment Date",
      value: formatDate(appointmentDateValue),
      icon: "📅",
      color: "text-orange-600 dark:text-orange-400",
    },
  ];

  // Excluded fields from Patient Information
  const excludedFields = [
    "__v",
    "doctor",
    "doctorInfo",
    "doctorDetails",
    "assignedDoctor",
    "doctorId",
    "doctor_id",
    "doctorName",
    "doctor_name",
    "doctorEmail",
    "doctor_email",
    "appointmentDate",
    "appointment_date",
    "appointment",
  ];

  const patientFields = Object.entries(patient).filter(
    ([key]) => !excludedFields.includes(key)
  );

  // First column priority fields
  const getPriority = (key: string) => {
    const name = key.toLowerCase().replace(/[^a-z0-9]/g, "");

    if (name === "id" || name === "patientid" || name.endsWith("id")) {
      return 0;
    }

    if (name.includes("name")) return 1;
    if (name.includes("email")) return 2;
    if (name.includes("phone")) return 3;

    if (
      name.includes("medicalcondition") ||
      name.includes("condition")
    ) {
      return 4;
    }

    return 99;
  };

  const firstColumnFields = patientFields
    .filter(([key]) => getPriority(key) !== 99)
    .sort(
      ([keyA], [keyB]) => getPriority(keyA) - getPriority(keyB)
    );

  const firstColumnKeys = new Set(
    firstColumnFields.map(([key]) => key)
  );

  const secondColumnFields = patientFields.filter(
    ([key]) => !firstColumnKeys.has(key)
  );

  const getFieldColor = (key: string) => {
    const name = key.toLowerCase();

    if (name.includes("id")) {
      return "text-violet-600 dark:text-violet-400";
    }

    if (name.includes("email") || name.includes("phone")) {
      return "text-blue-600 dark:text-blue-400";
    }

    if (name.includes("date") || name.includes("time")) {
      return "text-orange-600 dark:text-orange-400";
    }

    if (name.includes("status")) {
      return "text-emerald-600 dark:text-emerald-400";
    }

    if (name.includes("blood") || name.includes("medical")) {
      return "text-rose-600 dark:text-rose-400";
    }

    if (name.includes("address")) {
      return "text-amber-600 dark:text-amber-400";
    }

    return "text-indigo-600 dark:text-indigo-400";
  };

  // Reusable Patient Field
  const renderPatientFields = (
    fields: [string, unknown][]
  ) => (
    <div className="divide-y divide-blue-100 dark:divide-blue-900/30">
      {fields.map(([key, value]) => (
        <div
          key={key}
          className="flex min-w-0 items-center justify-between gap-3 px-3 py-3 transition hover:bg-indigo-500/5 sm:px-4"
        >
          <span
            className={`shrink-0 text-[10px] font-bold uppercase tracking-wider ${getFieldColor(key)}`}
          >
            {formatLabel(key)}
          </span>

          <span className="min-w-0 break-words text-right text-xs font-semibold text-gray-800 dark:text-gray-100">
            {formatValue(value)}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4 sm:p-6">
      {/* Back Button */}
      <Link
        href="/dashboard/admin/patients"
        className="group inline-flex items-center gap-2 rounded-xl bg-[#0466c8]  text-white hover:-translate-y-1 hover:bg-blue-700 px-4 py-2 text-sm font-semibold  shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl active:scale-95"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
        Back to Patients
      </Link>

      {/* Main Patient Card */}
      <div className="space-y-4 overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 p-3 shadow-lg shadow-blue-200/30 sm:p-4 dark:border-blue-900/50 dark:from-blue-950/30 dark:to-indigo-950/20 dark:shadow-none">

        {/* Patient Information Heading */}
        <div className="flex items-center justify-between px-1">
          <h2 className="border-b-2 border-indigo-500 pb-1 text-sm font-bold text-gray-800 dark:text-gray-100">
            Patient Information
          </h2>

          <span className="rounded-md bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            {patientFields.length} Fields
          </span>
        </div>

        {/* Patient Information - Two Columns in One Card */}
        <div className="overflow-hidden rounded-xl border border-blue-200 bg-white/60 dark:border-blue-900/50 dark:bg-gray-950/40">
          <div className="grid grid-cols-1 sm:grid-cols-2">

            {/* First Column: ID, Name, Email, Phone, Medical Condition */}
            <div className="min-w-0">
              {renderPatientFields(firstColumnFields)}
            </div>

            {/* Second Column: Remaining Fields */}
            <div className="min-w-0 border-t border-blue-100 sm:border-l sm:border-t-0 dark:border-blue-900/30">
              {renderPatientFields(secondColumnFields)}
            </div>

          </div>
        </div>

        {/* Doctor & Appointment Card */}
        <div className="overflow-hidden rounded-xl border border-blue-200 bg-white/60 dark:border-blue-900/50 dark:bg-gray-950/40">

          {/* Doctor Card Header */}
          <div className="flex items-center justify-between border-b border-blue-200/70 px-3 py-3 sm:px-4 dark:border-blue-900/40">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0466c8] text-white shadow">
                🩺
              </span>

              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">
                Doctor & Appointment
              </h2>
            </div>

            <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              {doctorCardFields.length} Fields
            </span>
          </div>

          {/* Doctor Information Table */}
          <div className="p-3 sm:p-4">
            <div className="overflow-x-auto rounded-lg border border-blue-200 bg-white/70 dark:border-blue-900/40 dark:bg-gray-950/50">
              <table className="w-full text-left text-sm">
                <thead className="bg-blue-50 dark:bg-blue-950/40">
                  <tr>
                    <th className="w-1/3 px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Field
                    </th>

                    <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Value
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-blue-100 dark:divide-blue-900/30">
                  {doctorCardFields.map((field) => (
                    <tr
                      key={field.label}
                      className="transition-colors hover:bg-blue-500/5"
                    >
                      <td
                        className={`whitespace-nowrap px-3 py-3 text-[11px] font-bold uppercase tracking-wider ${field.color}`}
                      >
                        <span className="mr-1.5">{field.icon}</span>
                        {field.label}
                      </td>

                      <td className="break-words px-3 py-3 text-xs font-semibold text-gray-800 dark:text-gray-100">
                        {field.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientDetails = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl animate-pulse space-y-4 p-4 sm:p-6">
          <div className="h-9 w-36 rounded-xl bg-gray-200 dark:bg-gray-800" />

          {/* Patient Card Skeleton */}
          <div className="space-y-4 rounded-2xl border border-gray-200 p-3 sm:p-4 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-800" />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-3 dark:border-gray-800"
                >
                  <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              ))}
            </div>

            {/* Doctor Card Skeleton */}
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 border-b p-3 dark:border-gray-800">
                <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-800" />
              </div>

              <div className="space-y-3 p-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-3 w-36 rounded bg-gray-200 dark:bg-gray-800" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <PatientDetailsContent params={params} />
    </Suspense>
  );
};

export default PatientDetails;
