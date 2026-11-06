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

  // Doctor related data (nested object / populated field / flat id)
  const doctorRaw =
    patient.doctor ??
    patient.doctorInfo ??
    patient.doctorDetails ??
    patient.assignedDoctor ??
    patient.doctorId ??
    null;

  const doctor =
    doctorRaw && typeof doctorRaw === "object" ? doctorRaw : null;

  // Doctor-er info alada kora hoyeche, tai patient table theke bad
  const doctorKeys = [
    "doctor",
    "doctorInfo",
    "doctorDetails",
    "assignedDoctor",
    "doctorId",
    "doctor_id",
  ];

  const excludedFields = ["__v", ...doctorKeys];

  const patientFields = Object.entries(patient).filter(
    ([key]) => !excludedFields.includes(key)
  );

  const doctorExcluded = ["__v", "password", "token"];

  const doctorFields: [string, unknown][] = doctor
    ? Object.entries(doctor).filter(([key]) => !doctorExcluded.includes(key))
    : typeof doctorRaw === "string" && doctorRaw
      ? [["doctorId", doctorRaw]]
      : [];

  const getFieldColor = (key: string) => {
    const name = key.toLowerCase();

    if (name.includes("id")) return "text-violet-600 dark:text-violet-400";
    if (name.includes("email") || name.includes("phone"))
      return "text-blue-600 dark:text-blue-400";
    if (name.includes("date") || name.includes("time"))
      return "text-orange-600 dark:text-orange-400";
    if (name.includes("status"))
      return "text-emerald-600 dark:text-emerald-400";
    if (name.includes("blood") || name.includes("medical"))
      return "text-rose-600 dark:text-rose-400";
    if (name.includes("address")) return "text-amber-600 dark:text-amber-400";

    return "text-indigo-600 dark:text-indigo-400";
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4 sm:p-6">
      {/* Back Button */}
      <Link
        href="/dashboard/admin/patients"
        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
        Back to Patients
      </Link>

      {/* ===== Card 1: Patient Information (TOP) ===== */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/40 dark:border-gray-800 dark:bg-gray-950 dark:shadow-none">
        {/* Header */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 overflow-hidden border-b border-gray-200 bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-500/10 px-4 py-3 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-lg font-bold text-white shadow-md">
              {String(patient.name ?? "P").charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-base font-bold leading-tight">
                {patient.name ?? "Patient"}
              </h1>
              <p className="text-[11px] text-gray-500">
                ID: {String(patient._id)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold capitalize text-emerald-600 dark:text-emerald-400">
              {patient.status ?? "Patient Record"}
            </span>
          </div>
        </div>

        {/* Title row */}
        <div className="flex items-center justify-between px-4 pt-3">
          <h2 className="text-sm font-bold">Patient Information</h2>
          <span className="rounded-md bg-indigo-500/10 px-2 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            {patientFields.length} Fields
          </span>
        </div>

        {/* Table */}
        <div className="px-4 pb-4 pt-2">
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900/60">
                <tr>
                  <th className="w-1/3 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Field
                  </th>
                  <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Value
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {patientFields.map(([key, value]) => (
                  <tr
                    key={key}
                    className="transition-colors hover:bg-indigo-500/5"
                  >
                    <td
                      className={`whitespace-nowrap px-3 py-2 text-[11px] font-bold uppercase tracking-wider ${getFieldColor(
                        key
                      )}`}
                    >
                      {formatLabel(key)}
                    </td>
                    <td className="break-words px-3 py-2 font-semibold text-gray-800 dark:text-gray-100">
                      {formatValue(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-800 dark:bg-gray-900/50">
          <p className="text-[11px] text-gray-500">Complete Patient Record</p>
          <p className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
            Patient Management System
          </p>
        </div>
      </div>

      {/* ===== Card 2: Doctor Information (BOTTOM) ===== */}
      <div className="overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 shadow-lg shadow-blue-200/30 dark:border-blue-900/50 dark:from-blue-950/30 dark:to-indigo-950/20 dark:shadow-none">
        <div className="flex items-center justify-between border-b border-blue-200/70 px-4 py-3 dark:border-blue-900/40">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-sm text-white shadow">
              🩺
            </span>
            <h2 className="text-sm font-bold">Doctor Information</h2>
          </div>

          <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            {doctorFields.length} Fields
          </span>
        </div>

        {doctorFields.length > 0 ? (
          <dl className="grid grid-cols-1 gap-x-6 px-4 py-2 sm:grid-cols-2">
            {doctorFields.map(([key, value]) => (
              <div
                key={key}
                className="flex min-w-0 items-baseline justify-between gap-3 border-b border-blue-100 py-2 last:border-0 dark:border-blue-900/30"
              >
                <dt
                  className={`shrink-0 text-[10px] font-bold uppercase tracking-wider ${getFieldColor(
                    key
                  )}`}
                >
                  {formatLabel(key)}
                </dt>

                <dd className="min-w-0 truncate text-right text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {formatValue(value)}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="px-4 py-4 text-sm text-gray-500">
            No doctor assigned yet.
          </p>
        )}
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

          {/* Patient card skeleton */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 border-b p-4 dark:border-gray-800">
              <div className="h-11 w-11 rounded-xl bg-gray-200 dark:bg-gray-800" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-3 w-44 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>

            <div className="space-y-2 p-4">
              <div className="h-8 rounded-lg bg-gray-200 dark:bg-gray-800" />
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b py-2 dark:border-gray-800"
                >
                  <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              ))}
            </div>
          </div>

          {/* Doctor card skeleton */}
          <div className="h-36 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>
      }
    >
      <PatientDetailsContent params={params} />
    </Suspense>
  );
};

export default PatientDetails;