
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Stethoscope } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    description: 'Heart and cardiovascular specialist.',
    image: '/doctors/doctor-1.jpg',
  },
  {
    id: 2,
    name: 'Dr. Michael Smith',
    specialty: 'Neurologist',
    description: 'Brain and nervous system specialist.',
    image: '/doctors/doctor-2.jpg',
  },
  {
    id: 3,
    name: 'Dr. Emily Wilson',
    specialty: 'Dermatologist',
    description: 'Skin and hair care specialist.',
    image: '/doctors/doctor-3.jpg',
  },
  {
    id: 4,
    name: 'Dr. James Anderson',
    specialty: 'Orthopedic Surgeon',
    description: 'Bone and joint specialist.',
    image: '/doctors/doctor-4.jpg',
  },
];

const TopDoctors = () => {
  return (
    <section className="bg-slate-50 px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <Stethoscope size={17} />
            Our Medical Experts
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Meet Our <span className="text-blue-600">Top Doctors</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            Meet our experienced healthcare professionals dedicated
            to providing the best medical care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-5 md:grid-cols-2">

          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:gap-5 sm:p-4"
            >

              {/* Doctor Image */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-blue-50 sm:h-28 sm:w-28">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="112px"
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Doctor Information */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                    {doctor.name}
                  </h3>
                  <BadgeCheck
                    size={17}
                    className="shrink-0 text-blue-500"
                  />
                </div>

                <p className="mt-1 text-sm font-semibold text-blue-600">
                  {doctor.specialty}
                </p>

                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500 sm:text-sm">
                  {doctor.description}
                </p>
              </div>

              {/* View Profile */}
              <Link
                href={`/ doctors / ${ doctor.id } `}
                className="flex shrink-0 items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <span className="hidden sm:inline">View Profile</span>
                <span className="sm:hidden">View</span>
                <ArrowRight size={15} />
              </Link>

            </div>
          ))}

        </div>

        {/* View All */}
        <div className="mt-9 text-center">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            View All Doctors
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TopDoctors;
