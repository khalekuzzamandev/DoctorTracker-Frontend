
import Sidebar from "@/Components/Dashboard/Sidebar";
import Navbar from "@/Components/Dashboard/Navbar";

export default function DashboardLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="min-h-screen md:ml-64">

        {/* Navbar */}
        <header className="flex h-16 items-center border-b border-white/10 px-8">
          <Navbar/>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
