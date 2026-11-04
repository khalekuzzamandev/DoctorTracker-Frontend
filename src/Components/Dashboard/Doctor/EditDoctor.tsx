"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import {
  Pencil,
  X,
  Stethoscope,
  CalendarDays,
  UserRound,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

interface DoctorType {
  _id: string;
  name: string;
  doctorId: string;
  specialization: string;
  gender: string;
  hospital: string;
  phone: string;
  email: string;
  chamberAddress: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  joiningDate: string;
  availableDays: string[];
  status: string;
  profileImage: string | null;
}

interface EditDoctorProps {
  DoctorData: DoctorType;
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/* Shared input styles */
const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

const labelClass =
  "text-[11px] font-bold uppercase tracking-wide text-slate-500";

const EditDoctor = ({ DoctorData }: EditDoctorProps) => {
  const [formData, setFormData] = useState<Partial<DoctorType>>({});

  const handleChange = (
    field: keyof DoctorType,
    value: string | number | string[] | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDayChange = (day: string) => {
    const currentDays =
      formData.availableDays ?? DoctorData.availableDays ?? [];

    const updatedDays = currentDays.includes(day)
      ? currentDays.filter((item) => item !== day)
      : [...currentDays, day];

    handleChange("availableDays", updatedDays);
  };

  const selectedDays =
    formData.availableDays ?? DoctorData.availableDays ?? [];

  const fields = [
    {
      label: "Doctor Name",
      field: "name",
      value: DoctorData.name.trim(),
      type: "text",
    },
    {
      label: "Doctor ID",
      field: "doctorId",
      value: DoctorData.doctorId.trim(),
      type: "text",
    },
    {
      label: "Specialization",
      field: "specialization",
      value: DoctorData.specialization,
      type: "text",
    },
    {
      label: "Hospital",
      field: "hospital",
      value: DoctorData.hospital.trim(),
      type: "text",
    },
    {
      label: "Phone Number",
      field: "phone",
      value: DoctorData.phone.trim(),
      type: "text",
    },
    {
      label: "Email Address",
      field: "email",
      value: DoctorData.email,
      type: "email",
    },
    {
      label: "Chamber Address",
      field: "chamberAddress",
      value: DoctorData.chamberAddress.trim(),
      type: "text",
    },
    {
      label: "Qualification",
      field: "qualification",
      value: DoctorData.qualification.trim(),
      type: "text",
    },
    {
      label: "Experience (Years)",
      field: "experience",
      value: String(DoctorData.experience),
      type: "number",
    },
    {
      label: "Consultation Fee",
      field: "consultationFee",
      value: String(DoctorData.consultationFee),
      type: "number",
    },
  ] as const;

  const handleSubmit = () => {
    const updatedDoctor = {
      ...formData,
      _id: DoctorData._id,
    };

    console.log("Updated Doctor Data:", updatedDoctor);
  };

  return (
    <Modal>
      {/* Edit Button */}
      <Button
        isIconOnly
        variant="secondary"
        aria-label="Edit doctor"
        className="flex h-8 w-8 min-w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-all hover:bg-emerald-100 hover:shadow-md"
      >
        <Pencil size={15} />
      </Button>

      <Modal.Backdrop className="bg-slate-950/60 backdrop-blur-sm">
        <Modal.Container placement="center" className="p-3">
          <Modal.Dialog className="w-full max-w-[680px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            {/* Header */}
            <Modal.Header className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-[#002855] to-[#0a4a8f] px-5 py-4 text-white">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/10">
                {DoctorData.profileImage ? (
                  <Image
                    width={100}
                    height={100}
                    src={DoctorData.profileImage}
                    alt={DoctorData.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={22} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <Modal.Heading className="truncate text-base font-bold text-white">
                  {DoctorData.name.trim()}
                </Modal.Heading>

                <p className="mt-1 text-xs text-blue-200">
                  Edit Doctor Information · {DoctorData.doctorId.trim()}
                </p>
              </div>

              {/* Red Close Button */}
              <Modal.CloseTrigger className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500 text-white shadow-md shadow-red-950/20 transition-all duration-200 hover:scale-110 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/40 active:scale-95">
                <X size={18} strokeWidth={2.5} />
              </Modal.CloseTrigger>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="max-h-[65vh] overflow-y-auto px-5 py-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                  <Stethoscope size={16} className="text-blue-600" />
                </div>

                <h3 className="text-sm font-bold text-slate-800">
                  Personal & Professional Information
                </h3>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.field} className="flex flex-col gap-1.5">
                    <label className={labelClass}>{field.label}</label>

                    <input
                      type={field.type}
                      placeholder={field.value}
                      className={inputClass}
                      onChange={(e) => {
                        const rawValue = e.target.value;

                        if (field.type === "number") {
                          if (rawValue === "") {
                            setFormData((prev) => {
                              const updated = { ...prev };
                              delete updated[field.field];
                              return updated;
                            });
                          } else {
                            handleChange(field.field, Number(rawValue));
                          }
                        } else {
                          handleChange(field.field, rawValue);
                        }
                      }}
                    />
                  </div>
                ))}

                {/* Gender */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Gender</label>

                  <div className="relative">
                    <select
                      value={formData.gender ?? ""}
                      onChange={(e) =>
                        handleChange("gender", e.target.value)
                      }
                      className={`${inputClass} cursor-pointer appearance-none pr-10`}
                    >
                      <option value="">
                        {"Select Gender"}
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>

                {/* Joining Date */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Joining Date</label>

                  <input
                    type="date"
                    className={inputClass}
                    onChange={(e) =>
                      handleChange("joiningDate", e.target.value)
                    }
                  />

                  <p className="text-[11px] text-slate-400">
                    Current Date:{" "}
                    <span className="font-semibold text-slate-500">
                      {DoctorData.joiningDate}
                    </span>
                  </p>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Doctor Status</label>

                  <div className="relative">
                    <select
                      value={formData.status ?? ""}
                      onChange={(e) =>
                        handleChange("status", e.target.value)
                      }
                      className={`${inputClass} cursor-pointer appearance-none pr-10`}
                    >
                      <option value="">
                        {DoctorData.status || "Select Status"}
                      </option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>

                {/* Profile Image */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Profile Image URL</label>

                  <input
                    type="text"
                    className={inputClass}
                    placeholder={
                      DoctorData.profileImage ?? "No profile image"
                    }
                    onChange={(e) =>
                      handleChange("profileImage", e.target.value || null)
                    }
                  />
                </div>
              </div>

              {/* Available Days */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                    <CalendarDays size={16} className="text-blue-600" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-800">
                    Available Days
                  </h3>

                  <span className="ml-auto rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                    {selectedDays.length} Selected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {weekDays.map((day) => {
                    const checked = selectedDays.includes(day);

                    return (
                      <label
                        key={day}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all ${checked
                            ? "border-blue-300 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50/40"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleDayChange(day)}
                          className="h-4 w-4 cursor-pointer accent-blue-600"
                        />

                        {day}
                      </label>
                    );
                  })}
                </div>
              </div>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
              <Button
                slot="close"
                variant="secondary"
                className="rounded-lg px-5 text-slate-600"
              >
                Cancel
              </Button>

              <Button
                onPress={handleSubmit}
                className="rounded-lg bg-[#002855] px-6 font-semibold text-white shadow-md shadow-blue-900/20 transition-all hover:bg-blue-900"
              >
                Update Doctor
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditDoctor;