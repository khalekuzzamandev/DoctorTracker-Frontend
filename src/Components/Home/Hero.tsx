import Image from 'next/image';
import {
  ArrowRight,
  Activity,
  ShieldCheck,
  Stethoscope,
  Users,
  CalendarCheck,
} from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* Background Decoration */}
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24 lg:px-8">

        {/* Left Content */}
        <div className="space-y-7">

          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm">
            <Activity size={17} />
            Smart Healthcare Management
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Manage Doctors,
            <span className="block bg-gradient-to-r from-sky-500 to-blue-700 bg-clip-text text-transparent">
              Simplify Healthcare.
            </span>
          </h1>

          <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            DoctorTraker helps you manage doctors, organize patient
            information, and streamline healthcare administration
            with one powerful and easy-to-use platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="group flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-700">
              Get Started
              <ArrowRight size={19} className="transition group-hover:translate-x-1" />
            </button>

            <button className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600">
              Explore Features
            </button>
          </div>

          {/* Trust Features */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-7 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={22} />
              <span className="text-sm font-medium text-slate-600">
                Secure System
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="text-blue-600" size={22} />
              <span className="text-sm font-medium text-slate-600">
                Easy Management
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarCheck className="text-blue-600" size={22} />
              <span className="text-sm font-medium text-slate-600">
                Organized Records
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-8 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white bg-white/60 p-3 shadow-2xl shadow-blue-900/10 backdrop-blur-sm">
            <Image
              src="/banner.png"
              alt="DoctorTraker healthcare management"
              width={1440}
              height={810}
              priority
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-left-8">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Stethoscope size={25} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Doctor Management
              </p>
              <p className="text-xs text-slate-500">
                Everything in one place
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
