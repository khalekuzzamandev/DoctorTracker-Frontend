
import { getAllPatient, getPatientDetails } from "@/Components/lib/actions/patient";


const PatientDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const allPatients = await getAllPatient();
  const patientDetails = await getPatientDetails(id);


  return <div>hello its dynamic</div>;
};

export default PatientDetails;
