
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  HeartPulse,
  UserRound,
} from "lucide-react";

const patients = [
  {
    id: "patient-1",
    name: "James Anderson",
    age: 32,
    gender: "Male",
    condition: "Heart Disease",
    date: "October 28, 2026",
    image: "/patients/patient-1.jpg",
  },
  {
    id: "patient-2",
    name: "Sophia Williams",
    age: 26,
    gender: "Female",
    condition: "Skin Allergy",
    date: "October 27, 2026",
    image: "/patients/patient-2.jpg",
  },
  {
    id: "patient-3",
    name: "Robert Johnson",
    age: 45,
    gender: "Male",
    condition: "Diabetes",
    date: "October 26, 2026",
    image: "/patients/patient-3.jpg",
  },
  {
    id: "patient-4",
    name: "Olivia Brown",
    age: 29,
    gender: "Female",
    condition: "Migraine",
    date: "October 25, 2026",
    image: "/patients/patient-4.jpg",
  },
];

const RecentPatients = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Patient Overview
            </p>

            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Recent Patients
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Explore the latest patients and their medical information.
            </p>
          </div>

          <Link
            href="/patients"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
          >
            View All Patients
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
            >
              {/* Patient Image */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24">
                <Image
                  src={patient.image}
                  alt={patient.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {/* Patient Information */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                  {patient.name}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 sm:text-sm">
                  <span className="flex items-center gap-1">
                    <UserRound size={14} />
                    {patient.age} Years
                  </span>

                  <span>{patient.gender}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                  <HeartPulse size={16} />
                  <span className="truncate font-medium">
                    {patient.condition}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                  <CalendarDays size={14} />
                  <span>{patient.date}</span>
                </div>
              </div>

              {/* Details Button */}
              <div className="shrink-0">
                <Link
                  href={`/patients/${patient.id}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 sm:px-4 sm:text-sm"
                >
                  Details
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RecentPatients;
