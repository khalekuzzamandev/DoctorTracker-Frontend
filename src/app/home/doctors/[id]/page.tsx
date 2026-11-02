import { getDoctorDetails } from "@/Components/lib/actions/doctors";
import { Suspense } from "react";

const DoctorContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const doctor = await getDoctorDetails(id);

  return (
    <div>
      <h1>{doctor.name}</h1>
      <p>{doctor.specialization}</p>
      <p>{doctor.email}</p>
      <p>{doctor.phone}</p>
      <p>{doctor.hospital}</p>
    </div>
  );
};

export default async function DoctorDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading doctor details...</p>}>
      <DoctorContent params={params} />
    </Suspense>
  );
}