"use client";

import { LogOut, UserRound } from "lucide-react";
import { authClient, useSession } from "../lib/auth-client";

const Profile = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-white p-3">
        <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-300" />
        <div className="flex-1">
          <div className="h-3 w-24 animate-pulse rounded bg-zinc-300" />
          <div className="mt-2 h-2 w-32 animate-pulse rounded bg-zinc-200" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3">
      {/* User Icon */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        <UserRound size={24} strokeWidth={2} />
      </div>

      {/* User Info */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold leading-5 text-zinc-900">
            {user.name || "User"}
          </h1>

          <p className="truncate text-xs leading-4 text-zinc-500">
            {user.email}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          type="button"
          aria-label="Logout"
          title="Logout"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-95"
        >
          <LogOut size={17} />
        </button>
      </div>
    </div>
  );
};

export default Profile;