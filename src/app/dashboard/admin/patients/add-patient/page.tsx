
"use client";

import React, { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  Droplet,
  HeartPulse,
  FileText,
  Plus,
  RotateCcw,
  UserPlus,
  Stethoscope,
  Activity,
} from "lucide-react";

// Dummy Doctor List
const doctors = [
  {
    doctorId: "DOC-001",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
  },
  {
    doctorId: "DOC-002",
    name: "Dr. Michael Smith",
    specialization: "Neurologist",
  },
  {
    doctorId: "DOC-003",
    name: "Dr. Emily Wilson",
    specialization: "Dermatologist",
  },
  {
    doctorId: "DOC-004",
    name: "Dr. James Anderson",
    specialization: "Orthopedic",
  },
  {
    doctorId: "DOC-005",
    name: "Dr. David Brown",
    specialization: "General Physician",
  },
];

// Initial Form Data
const initialFormData = {
  patientId: "",
  doctorId: "",
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  bloodGroup: "",
  address: "",
  emergencyContact: "",
  medicalHistory: "",
  status: "Active",
};

const AddPatients = () => {
  const [formData, setFormData] = useState(initialFormData);

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
    }));
  };

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedDoctor = doctors.find(
      (doctor) => doctor.doctorId === formData.doctorId
    );

    const patientData = {
      ...formData,
      assignedDoctor: selectedDoctor
        ? {
          doctorId: selectedDoctor.doctorId,
          doctorName: selectedDoctor.name,
          specialization: selectedDoctor.specialization,
        }
        : null,
      createdAt: new Date().toISOString(),
    };

   console.log(patientData,'patient data is here');

    // Reset Form
    setFormData(initialFormData);
  };

  // Reset Form
  const handleReset = () => {
    setFormData(initialFormData);
  };

  // Selected Doctor
  const selectedDoctor = doctors.find(
    (doctor) => doctor.doctorId === formData.doctorId
  );

  // Input Styles
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <UserPlus size={18} />
              Patient Management
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Add New Patient
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Register a new patient and assign a doctor.
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <UserRound size={28} />
          </div>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* Basic Information */}
          <div className="border-b border-slate-100 p-5 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <UserRound size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Basic Information
                </h2>
                <p className="text-xs text-slate-500">
                  Personal details of the patient
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Patient ID */}
              <div>
                <label className={labelClass}>Patient ID *</label>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  placeholder="e.g. PAT-001"
                  className={inputClass}
                  required
                />
              </div>

              {/* Patient Name */}
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter patient's full name"
                  className={inputClass}
                  required
                />
              </div>

              {/* Assign Doctor */}
              <div className="sm:col-span-2">
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Stethoscope size={16} className="text-blue-600" />
                    Assign Doctor *
                  </span>
                </label>

                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select a Doctor</option>

                  {doctors.map((doctor) => (
                    <option
                      key={doctor.doctorId}
                      value={doctor.doctorId}
                    >
                      {doctor.doctorId} - {doctor.name} (
                      {doctor.specialization})
                    </option>
                  ))}
                </select>

                {/* Selected Doctor Preview */}
                {selectedDoctor && (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Stethoscope size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {selectedDoctor.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {selectedDoctor.doctorId} ·{" "}
                        {selectedDoctor.specialization}
                      </p>
                    </div>

                    <span className="ml-auto rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Selected
                    </span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email Address</label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="patient@example.com"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone Number *</label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXXXXXXXX"
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className={labelClass}>Date of Birth *</label>
                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Blood Group */}
              <div>
                <label className={labelClass}>Blood Group</label>
                <div className="relative">
                  <Droplet
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
                  />
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className={`${inputClass} pl-11`}
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className={labelClass}>Patient Status</label>
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
          </div>

          {/* Contact Information */}
          <div className="border-b border-slate-100 p-5 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <MapPin size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Contact Information
                </h2>
                <p className="text-xs text-slate-500">
                  Patient address and emergency contact
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Full Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter patient's full address..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Emergency Contact Number
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Enter emergency contact number"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="p-5 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-rose-50 p-2.5 text-rose-600">
                <HeartPulse size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Medical Information
                </h2>
                <p className="text-xs text-slate-500">
                  Medical history and additional notes
                </p>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Medical History / Notes
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-4 text-slate-400"
                />
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Enter previous diseases, allergies, medications or other medical notes..."
                  className={`${inputClass} resize-none pl-11`}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              <RotateCcw size={17} />
              Reset Form
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30"
            >
              <Plus size={19} />
              Add Patient
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-slate-400">
          DoctorTraker Patient Management System
        </p>
      </div>
    </div>
  );
};

export default AddPatients;
