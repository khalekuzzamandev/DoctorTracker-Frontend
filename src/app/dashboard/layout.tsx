
import Sidebar from "@/Components/Dashboard/Sidebar";
import Navbar from "@/Components/Dashboard/Navbar";

export default function DashboardLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col pt-16 md:pt-0">

        <header className="sticky top-0 z-30 shrink-0 border-b bg-white">
          <Navbar />
        </header>

        <main className="min-w-0 flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}
