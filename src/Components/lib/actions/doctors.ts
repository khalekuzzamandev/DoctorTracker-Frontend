"use server";

import { revalidatePath } from "next/cache";

export type DoctorGender = "Male" | "Female" | "Other";
export type DoctorStatus = "Active" | "Inactive";

export type Doctor = {
  name: string;
  specialization: string;
  gender: DoctorGender | "";
  doctorId: string;
  hospital: string;
  phone: string;
  email: string;
  chamberAddress: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  joiningDate: string;
  availableDays: string[];
  status: DoctorStatus;
  profileImage: string | null;
};

export type ActionResult = {
  success: boolean;
  message?: string;
};


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000"


// add doctor
export async function addDoctor(doctor: Doctor): Promise<ActionResult> {
  try {
    const res = await fetch(`${baseUrl}/api/adddoctor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
      return {
        success: false,
        message: data?.message || "Failed to add doctor",
      };
    }

    revalidatePath("/dashboard/doctors");

    return {
      success: true,
      message: data.message || "Doctor added successfully!",
    };
  } catch {
    return {
      success: false,
      message: "Cannot connect to the server. Please try again.",
    };
  }
}


// get doctor
export const getDoctor = async () => {
  const res = await fetch(`${baseUrl}/api/get/doctor`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch doctors");

  return res.json();
};

// get dynamic doctor
export const getDoctorDetails=async (id:string)=>{
  const res = await fetch(`${baseUrl}/api/get/doctor/${id}`,{

    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch doctors");

  return res.json();
}



// edit doctor
export async function editDoctor(id: string, doctor: Partial<Doctor>) {
  const res = await fetch(`${baseUrl}/api/update/doctor/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doctor),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    return { success: false, message: data.message };
  }

  revalidatePath("/");

  return { success: true, message: data.message };
}

// Delete Doctor
export const DeleteDoctor = async (id: string): Promise<ActionResult> => {
  const res = await fetch(`${baseUrl}/api/delete/doctor/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  revalidatePath("/dashboard/admin/doctors");

  return {
    success: res.ok && data.success,
    message: data.message,
  };
};