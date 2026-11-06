import { string } from "better-auth";
import { base } from "framer-motion/client";

const baseUrl =process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000";

// Add Patient
export const addPatient = async (patientData: object) => {
  const res = await fetch(`${baseUrl}/api/addpatient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });

  if (!res.ok) {
    throw new Error("Failed to add patient");
  }

  return res.json();
};


// get patients
export const getAllPatient = async () => {
  const res = await fetch(`${baseUrl}/api/get/patient`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch patient");
  return res.json();
};


// find one patient
export const getPatientDetails=async(id:string)=>{
  const res = await fetch(`${baseUrl}/api/get/patient/${id}`)
  return res.json()
}


// Edit patient 
export const editPatient=async(id:string)=>{
  const res=await fetch(`${baseUrl}/api/update/patient/${id}`,{
    method:"PATCH",
    headers:{"content-type" : "application/json"},
    body:JSON.stringify("patient")
  })
  return res.json()
}