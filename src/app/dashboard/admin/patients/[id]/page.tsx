import { getAllPatient, getPatientDetails } from '@/Components/lib/actions/patient';
import React from 'react';

const PatientDetails = async ({ params }: { params: { id: string } }) => {
  const allPatients = await getAllPatient();
  const patientDetails = await getPatientDetails(params.id);

  console.log(allPatients, patientDetails);

  return <div>hello its dynamic</div>;
};

export default PatientDetails;