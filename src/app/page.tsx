import About from "@/Components/Home/About";
import Contact from "@/Components/Home/Contact";
import Hero from "@/Components/Home/Hero";
import RecentPatients from "@/Components/Home/RecentPatients";
import TopDoctors from "@/Components/Home/TopDoctors";

export default function Home() {
  return (
   <div>
    <Hero/>
    <About/>
    <TopDoctors/>
    <RecentPatients/>
    <Contact/>
   </div>
  );
}
