import Hero from "@/Components/Home/Hero";
import RecentPatients from "@/Components/Home/RecentPatients";
import TopDoctors from "@/Components/Home/TopDoctors";

export default function Home() {
  return (
   <div>
    <Hero/>
    <TopDoctors/>
    <RecentPatients/>
   </div>
  );
}
