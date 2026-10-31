import React from "react";

export default function DashboardLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar Menu */}
      <aside className="w-64 shrink-0 border-r bg-white">
        Menu
      </aside>

      {/* Right Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Navbar */}
        <header className="h-16 shrink-0 border-b bg-white">
          Navbar
        </header>

        {/* Children */}
        <main className="flex-1 p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t bg-white p-4">
          Footer
        </footer>

      </div>
    </div>
  );
}