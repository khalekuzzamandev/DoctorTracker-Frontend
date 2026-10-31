"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UserRound,
  Stethoscope,
  Building2,
  Phone,
  Mail,
  GraduationCap,
  BriefcaseBusiness,
  MapPin,
  Wallet,
  CalendarDays,
  Camera,
  ArrowLeft,
  Save,
  Upload,
  HeartPulse,
  BadgeCheck,
  Clock,
  Hash,
} from "lucide-react";

type DoctorFormData = {
  name: string;
  specialization: string;
  gender: string;
  doctorId: string;
  hospital: string;
  phone: string;
  email: string;
  chamberAddress: string;
  qualification: string;
  experience: string;
  consultationFee: string;
  joiningDate: string;
  availableDays: string[];
  status: string;
  profileImage: File | null;
};

const initialFormData: DoctorFormData = {
  name: "",
  specialization: "",
  gender: "",
  doctorId: "",
  hospital: "",
  phone: "",
  email: "",
  chamberAddress: "",
  qualification: "",
  experience: "",
  consultationFee: "",
  joiningDate: "",
  availableDays: [],
  status: "Active",
  profileImage: null,
};

const Section = ({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
    <div className="flex items-center gap-4 border-b border-cyan-100 bg-cyan-50 px-6 py-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-700 text-white shadow-sm">
        <Icon size={23} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-cyan-950">{title}</h2>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>

    <div className="p-6 sm:p-8">{children}</div>
  </section>
);

const Field = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {title}
    </label>

    <div className="relative">
      <Icon
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-700"
        size={18}
      />
      {children}
    </div>
  </div>
);

const AddDoctor = () => {
  const [doctorData, setDoctorData] =
    useState<DoctorFormData>(initialFormData);

  const specializations = [
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
    "Medicine Specialist",
    "Orthopedic",
    "Gynecologist",
    "Pediatrician",
    "Dentist",
    "Psychiatrist",
    "Ophthalmologist",
    "ENT Specialist",
    "Urologist",
  ];

  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const input =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-600/10";

  const label = "mb-2 block text-sm font-semibold text-slate-700";

  // Handle all input and select fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setDoctorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle available days
  const handleDayChange = (day: string) => {
    setDoctorData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((item) => item !== day)
        : [...prev.availableDays, day],
    }));
  };

  // Handle profile image
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    if (file && file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      e.target.value = "";
      return;
    }

    setDoctorData((prev) => ({
      ...prev,
      profileImage: file,
    }));
  };

  // Submit form and show all data in console
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submittedData = {
      ...doctorData,
      experience: Number(doctorData.experience) || 0,
      consultationFee: Number(doctorData.consultationFee) || 0,
    };

    console.log("Doctor Form Data:", submittedData);

    
   
  };

  // Reset form
  const handleReset = () => {
    setDoctorData(initialFormData);
  };

  return (
    <div className="min-h-screen bg-[#f0fafa] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-cyan-800 p-7 text-white shadow-lg shadow-cyan-900/10 sm:p-9">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <Link
                href="/dashboard/doctors"
                className="mb-5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20"
              >
                <ArrowLeft size={16} />
                Back to Doctors
              </Link>

              <div className="flex items-center gap-2 text-sm font-medium text-cyan-100">
                <HeartPulse size={17} />
                Doctor Management
              </div>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Add New Doctor
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-cyan-100">
                Register a new healthcare professional and manage their
                information, qualifications and availability.
              </p>
            </div>

            <div className="hidden h-28 w-28 items-center justify-center rounded-3xl border border-white/20 bg-white/10 sm:flex">
              <Stethoscope size={58} strokeWidth={1.5} />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold">
              <BadgeCheck className="mr-1 inline" size={14} />
              Secure Registration
            </span>

            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold">
              <UserRound className="mr-1 inline" size={14} />
              Doctor Profile
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-7">

          {/* Personal Information */}
          <Section
            icon={UserRound}
            title="Personal Information"
            subtitle="Basic information about the doctor"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field title="Doctor Name *" icon={UserRound}>
                <input
                  required
                  name="name"
                  type="text"
                  value={doctorData.name}
                  onChange={handleChange}
                  placeholder="Dr. John Smith"
                  className={`${input} pl-11`}
                />
              </Field>

              <Field title="Specialization *" icon={Stethoscope}>
                <select
                  required
                  name="specialization"
                  value={doctorData.specialization}
                  onChange={handleChange}
                  className={`${input} pl-11`}
                >
                  <option value="" disabled>
                    Select specialization
                  </option>

                  {specializations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>

              <Field title="Gender" icon={UserRound}>
                <select
                  name="gender"
                  value={doctorData.gender}
                  onChange={handleChange}
                  className={`${input} pl-11`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </Field>

              <Field title="Doctor ID" icon={Hash}>
                <input
                  name="doctorId"
                  type="text"
                  value={doctorData.doctorId}
                  onChange={handleChange}
                  placeholder="DOC-1001"
                  className={`${input} pl-11`}
                />
              </Field>
            </div>
          </Section>

          {/* Contact Information */}
          <Section
            icon={Phone}
            title="Contact Information"
            subtitle="Hospital, phone and communication details"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field title="Hospital Name *" icon={Building2}>
                <input
                  required
                  name="hospital"
                  value={doctorData.hospital}
                  onChange={handleChange}
                  placeholder="Enter hospital name"
                  className={`${input} pl-11`}
                />
              </Field>

              <Field title="Phone Number *" icon={Phone}>
                <input
                  required
                  name="phone"
                  type="tel"
                  value={doctorData.phone}
                  onChange={handleChange}
                  placeholder="+880 1XXXXXXXXX"
                  className={`${input} pl-11`}
                />
              </Field>

              <Field title="Email Address *" icon={Mail}>
                <input
                  required
                  name="email"
                  type="email"
                  value={doctorData.email}
                  onChange={handleChange}
                  placeholder="doctor@example.com"
                  className={`${input} pl-11`}
                />
              </Field>

              <Field title="Chamber Address" icon={MapPin}>
                <input
                  name="chamberAddress"
                  value={doctorData.chamberAddress}
                  onChange={handleChange}
                  placeholder="Dhanmondi, Dhaka"
                  className={`${input} pl-11`}
                />
              </Field>
            </div>
          </Section>

          {/* Professional Information */}
          <Section
            icon={GraduationCap}
            title="Professional Information"
            subtitle="Qualifications, experience and consultation details"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field title="Qualification" icon={GraduationCap}>
                <input
                  name="qualification"
                  value={doctorData.qualification}
                  onChange={handleChange}
                  placeholder="MBBS, FCPS, MD"
                  className={`${input} pl-11`}
                />
              </Field>

              <Field title="Experience (Years)" icon={BriefcaseBusiness}>
                <input
                  name="experience"
                  type="number"
                  min="0"
                  value={doctorData.experience}
                  onChange={handleChange}
                  placeholder="8 Years"
                  className={`${input} pl-11`}
                />
              </Field>

              <Field title="Consultation Fee (৳)" icon={Wallet}>
                <input
                  name="consultationFee"
                  type="number"
                  min="0"
                  value={doctorData.consultationFee}
                  onChange={handleChange}
                  placeholder="800"
                  className={`${input} pl-11`}
                />
              </Field>

              <Field title="Joining Date" icon={CalendarDays}>
                <input
                  name="joiningDate"
                  type="date"
                  value={doctorData.joiningDate}
                  onChange={handleChange}
                  className={`${input} pl-11`}
                />
              </Field>
            </div>
          </Section>

          {/* Availability */}
          <Section
            icon={Clock}
            title="Availability & Status"
            subtitle="Manage doctor's weekly schedule"
          >
            <label className={label}>Available Days</label>

            <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {days.map((day) => (
                <label
                  key={day}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-cyan-100 bg-cyan-50/60 p-3 text-sm font-medium text-slate-700 transition hover:border-cyan-500 hover:bg-cyan-100"
                >
                  <input
                    type="checkbox"
                    checked={doctorData.availableDays.includes(day)}
                    onChange={() => handleDayChange(day)}
                    className="h-4 w-4 accent-cyan-700"
                  />
                  {day}
                </label>
              ))}
            </div>

            <label className={label}>Doctor Status</label>

            <select
              name="status"
              value={doctorData.status}
              onChange={handleChange}
              className={input}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </Section>

          {/* Profile Image */}
          <Section
            icon={Camera}
            title="Doctor Profile Image"
            subtitle="Upload a professional profile photograph"
          >
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cyan-300 bg-cyan-50/60 px-5 py-12 text-center transition hover:border-cyan-600 hover:bg-cyan-50">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-700 text-white shadow-md shadow-cyan-700/20">
                <Upload size={28} />
              </div>

              <h3 className="font-bold text-slate-800">
                {doctorData.profileImage
                  ? doctorData.profileImage.name
                  : "Click to upload doctor's photo"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Drag and drop or browse your files
              </p>

              <span className="mt-4 rounded-full bg-cyan-100 px-4 py-2 text-xs font-semibold text-cyan-800">
                PNG, JPG or JPEG • Maximum 5MB
              </span>

              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </Section>

          {/* Buttons */}
          <div className="flex flex-col-reverse justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row">
            <button
              type="reset"
              className="rounded-xl border border-slate-200 px-7 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
            >
              Reset Form
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-800 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-800/20 transition hover:-translate-y-0.5 hover:bg-cyan-900"
            >
              <Save size={18} />
              Add Doctor
            </button>
          </div>
        </form>

        <p className="py-6 text-center text-xs text-slate-400">
          Doctor Tracker • Healthcare Management System
        </p>
      </div>
    </div>
  );
};

export default AddDoctor;