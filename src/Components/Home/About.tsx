
import React from "react";
import {
  HeartPulse,
  Target,
  Eye,
  ShieldCheck,
  Users,
  Stethoscope,
  CalendarCheck,
  Activity,
  ClipboardList,
  CheckCircle2,
  Award,
  Clock,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Stethoscope,
      title: "Doctor Management",
      description:
        "Manage doctor profiles, qualifications, specializations and contact information in one place.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      title: "Patient Management",
      description:
        "Keep patient information, medical conditions and personal records organized.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: CalendarCheck,
      title: "Appointment Tracking",
      description:
        "Track appointment dates and maintain organized patient schedules.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: ShieldCheck,
      title: "Secure Management",
      description:
        "Provide authenticated access to help protect important healthcare information.",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const benefits = [
    "Easy-to-use dashboard",
    "Organized doctor and patient records",
    "Quick access to information",
    "Efficient record management",
    "Responsive and modern interface",
    "Secure authentication system",
  ];

  return (
    <main
      id="about"
      className="w-full min-w-0 scroll-mt-24 overflow-hidden bg-slate-50 py-10 sm:py-12"
    >
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <section>
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-blue-600 sm:text-sm">
            ABOUT OUR PLATFORM
          </p>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            About Doctor Tracker
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Learn more about our platform and how we simplify healthcare
            record management.
          </p>
        </section>

        {/* Hero Section */}
        <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-6 text-white shadow-lg sm:p-8 lg:p-12">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 sm:h-14 sm:w-14 sm:rounded-2xl">
              <HeartPulse size={28} />
            </div>

            <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              Smarter Healthcare Management Starts Here
            </h2>

            <p className="mt-4 text-sm leading-7 text-blue-100 sm:text-base">
              Doctor Tracker is a healthcare management platform designed
              to simplify doctor and patient record management. Our goal
              is to make healthcare information easier to organize, access
              and manage.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
              {["Modern Dashboard", "Easy Management", "User Friendly"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-xs font-medium sm:px-4"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <HeartPulse
            size={230}
            className="pointer-events-none absolute -bottom-16 -right-12 -z-0 hidden text-white/10 sm:block"
          />
        </section>

        {/* Mission & Vision */}
        <section className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-7 lg:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Target size={25} />
            </div>

            <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
              Our Mission
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Our mission is to make healthcare record management simple,
              organized and accessible. We aim to help administrators
              manage doctor and patient information efficiently through
              a centralized digital platform.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-7 lg:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Eye size={25} />
            </div>

            <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
              Our Vision
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Our vision is to create a reliable and user-friendly
              healthcare management experience where important records
              can be organized and accessed easily, supporting better
              administrative workflows.
            </p>
          </div>
        </section>

        {/* Core Features */}
        <section>
          <div className="mb-6">
            <p className="text-xs font-bold tracking-wider text-blue-600 sm:text-sm">
              WHAT WE OFFER
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
              Our Core Features
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Everything you need to organize healthcare records.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6"
                >
                  <div
                    className={`mb - 4 flex h - 12 w - 12 items - center justify - center rounded - xl ${ feature.color } `}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="font-bold text-slate-800">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
            <p className="text-xs font-bold tracking-wider text-blue-600 sm:text-sm">
              WHY CHOOSE US
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
              Designed for Simplicity and Efficiency
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Doctor Tracker brings essential healthcare management tools
              together in one organized dashboard.
            </p>

            <div className="mt-6 space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex min-w-0 items-start gap-3"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <span className="text-sm font-medium leading-6 text-slate-700">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlight Card */}
          <div className="flex flex-col justify-between rounded-2xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                <Activity size={25} />
              </div>

              <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                Better Organization, Better Experience
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                From doctor profiles to patient information, Doctor
                Tracker helps keep essential records structured and
                easy to manage.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <ClipboardList className="mb-3 text-blue-400" size={24} />

                <h3 className="font-semibold">Organized</h3>

                <p className="mt-1 text-xs text-slate-400">
                  Centralized records
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <Clock className="mb-3 text-cyan-400" size={24} />

                <h3 className="font-semibold">Efficient</h3>

                <p className="mt-1 text-xs text-slate-400">
                  Easy information access
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-8 text-center sm:px-8 sm:py-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Award size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
            Thank You for Choosing Doctor Tracker
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            We are committed to making healthcare record management easier
            through a simple, modern and organized digital experience.
          </p>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-5 text-center">
          <p className="text-xs text-slate-500 sm:text-sm">
            © 2026 Doctor Tracker. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default About;
