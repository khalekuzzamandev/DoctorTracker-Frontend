
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDoctor } from "@/Components/lib/actions/doctors";
import { addPatient } from "@/Components/lib/actions/patient";

import {
  UserRound,
  Phone,
  HeartPulse,
  Save,
  Stethoscope,
  ArrowLeft,
  ClipboardList,
  Mail,
  MapPin,
  CalendarDays,
  Droplet,
  ShieldCheck,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface DoctorType {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  status: string;
}

interface PatientFormData {
  name: string;
  gender: string;
  age: string;
  phone: string;
  email: string;
  bloodGroup: string;
  address: string;
  medicalCondition: string;
  otherCondition: string;
  doctorId: string;
  doctorName: string;
  doctorEmail: string;
  appointmentDate: string;
  status: string;
}

const AddPatient = () => {
  const router = useRouter();

  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<PatientFormData>({
    name: "",
    gender: "",
    age: "",
    phone: "",
    email: "",
    bloodGroup: "",
    address: "",
    medicalCondition: "",
    otherCondition: "",
    doctorId: "",
    doctorName: "",
    doctorEmail: "",
    appointmentDate: "",
    status: "Active",
  });

  // Styles
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50";

  const labelClass =
    "mb-1.5 block text-sm font-semibold text-slate-700";

  // Fetch Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctor();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to load doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "medicalCondition" && value !== "Other"
        ? { otherCondition: "" }
        : {}),
    }));
  };

  // Handle Doctor Selection
  const handleDoctorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDoctor = doctors.find(
      (doctor) => doctor._id === e.target.value
    );

    setFormData((prev) => ({
      ...prev,
      doctorId: selectedDoctor?._id || "",
      doctorName: selectedDoctor?.name || "",
      doctorEmail: selectedDoctor?.email || "",
    }));
  };

  // Submit Form
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");

    try {
      const { otherCondition, ...rest } = formData;

      const patientData = {
        ...rest,
        age: Number(formData.age),
        medicalCondition:
          formData.medicalCondition === "Other"
            ? otherCondition.trim()
            : formData.medicalCondition,
      };

      const result = await addPatient(patientData);

      if (result.insertedId) {
        setSuccess("Patient added successfully!");

        setTimeout(() => {
          router.push("/dashboard/admin/patients");
          router.refresh();
        }, 1200);
      } else {
        throw new Error("Patient was not added");
      }
    } catch (error) {
      console.error("Failed to add patient:", error);
      alert("Failed to add patient. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const activeDoctors = doctors.filter(
    (doctor) => doctor.status === "Active"
  );

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-5 lg:p-7">

      <div className="mx-auto max-w-4xl space-y-5">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <Link
              href="/dashboard/admin/patients"
              className="mb-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-95"
            >
              <ArrowLeft size={16} />
              Back to Patients
            </Link>

            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Add New Patient
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Register a patient and assign a healthcare professional.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
            <ShieldCheck size={16} />
            Secure Patient Registration
          </div>

        </div>

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-700">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* Personal Information */}
          <section className="border-b border-slate-100 p-4 sm:p-6">

            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <UserRound size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Personal Information
                </h2>
                <p className="text-xs text-slate-400">
                  Basic details about the patient
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Name */}
              <div>
                <label className={labelClass}>
                  Patient Name *
                </label>

                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={inputClass}
                />
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>
                  Gender *
                </label>

                <select
                  required
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className={labelClass}>
                  Age *
                </label>

                <input
                  required
                  type="number"
                  min="0"
                  max="150"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className={inputClass}
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className={labelClass}>
                  Blood Group
                </label>

                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select blood group</option>

                  {[
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "O+",
                    "O-",
                  ].map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </section>

          {/* Contact Information */}
          <section className="border-b border-slate-100 p-4 sm:p-6">

            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-50 p-2.5 text-green-600">
                <Phone size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Contact Information
                </h2>
                <p className="text-xs text-slate-400">
                  Patient contact details and address
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Phone */}
              <div>
                <label className={labelClass}>
                  Phone Number *
                </label>

                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="017XXXXXXXX"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="patient@example.com"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Full Address
                </label>

                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter patient address..."
                    className={`${inputClass} resize-none pl-9`}
                  />
                </div>
              </div>

            </div>
          </section>

          {/* Medical Information */}
          <section className="border-b border-slate-100 p-4 sm:p-6">

            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-red-50 p-2.5 text-red-500">
                <HeartPulse size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Medical Information
                </h2>
                <p className="text-xs text-slate-400">
                  Medical condition and doctor assignment
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Medical Condition */}
              <div>
                <label className={labelClass}>
                  Medical Condition *
                </label>

                <select
                  required
                  name="medicalCondition"
                  value={formData.medicalCondition}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select condition</option>
                  <option value="General">General</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Heart Disease">Heart Disease</option>
                  <option value="Fever">Fever</option>
                  <option value="Hypertension">Hypertension</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Other Condition */}
              {formData.medicalCondition === "Other" && (
                <div>
                  <label className={labelClass}>
                    Specify Medical Condition *
                  </label>

                  <input
                    required
                    type="text"
                    name="otherCondition"
                    value={formData.otherCondition}
                    onChange={handleChange}
                    placeholder="Enter medical condition"
                    className={inputClass}
                  />
                </div>
              )}

              {/* Doctor Dropdown */}
              <div>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-2">
                    <Stethoscope size={15} className="text-blue-600" />
                    Assign Doctor *
                  </span>
                </label>

                <select
                  required
                  value={formData.doctorId}
                  onChange={handleDoctorChange}
                  disabled={loading}
                  className={inputClass}
                >
                  <option value="">
                    {loading ? "Loading doctors..." : "Select doctor"}
                  </option>

                  {activeDoctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.name} - {doctor.specialization}
                    </option>
                  ))}
                </select>

                <p className="mt-1.5 text-xs text-slate-400">
                  {loading
                    ? "Loading doctor records..."
                    : `${activeDoctors.length} active doctors available`}
                </p>
              </div>

              {/* Selected Doctor Details */}
              {formData.doctorId && (
                <div className="sm:col-span-2 overflow-hidden rounded-xl border border-blue-100 bg-blue-50/70">

                  <div className="flex items-center gap-2 border-b border-blue-100 px-4 py-3">
                    <div className="rounded-lg bg-blue-100 p-1.5 text-blue-700">
                      <Stethoscope size={17} />
                    </div>

                    <h3 className="text-sm font-bold text-blue-800">
                      Selected Doctor Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">

                    <div>
                      <p className="mb-1 text-xs font-medium text-slate-500">
                        Doctor Name
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        Dr. {formData.doctorName}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-xs font-medium text-slate-500">
                        Doctor Email
                      </p>

                      <p className="break-all text-sm font-semibold text-slate-800">
                        {formData.doctorEmail || "No email available"}
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <p className="mb-1 text-xs font-medium text-slate-500">
                        Doctor MongoDB ID
                      </p>

                      <p className="break-all text-xs text-slate-600">
                        {formData.doctorId}
                      </p>
                    </div>

                  </div>
                </div>
              )}

              {/* Appointment Date */}
              <div>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={15} className="text-blue-600" />
                    Appointment Date
                  </span>
                </label>

                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Status */}
              <div>
                <label className={labelClass}>
                  Patient Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

            </div>
          </section>

          {/* Form Footer */}
          <div className="flex flex-col-reverse justify-end gap-3 bg-slate-50 px-4 py-4 sm:flex-row sm:px-6">

            <Link
              href="/dashboard/admin/patients"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting || loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Saving Patient...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Add Patient
                </>
              )}
            </button>

          </div>

        </form>

        {/* Footer Note */}
        <div className="flex items-center justify-center gap-2 pb-2 text-xs text-slate-400">
          <ClipboardList size={14} />
          Doctor Tracker · Secure Patient Management
        </div>

      </div>
    </div>
  );
};

export default AddPatient;
