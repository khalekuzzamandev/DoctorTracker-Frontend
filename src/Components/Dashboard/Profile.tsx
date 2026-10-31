"use client"

import { LogOut } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { authClient, useSession } from '../lib/auth-client';

const Profile = () => {
  const { data: session, isPending } = useSession()
  const user = session?.user

  // logout
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

  if (!user) {
    return null;
  }
  return (
    <div className='bg-white p-2 rounded-xl flex gap-2'>
      {/* image */}
      <div className="rounded-full overflow-hidden">
        <Image
          className="rounded-full object-cover"
          src={session?.user?.image || "/default-avatar.png"}
          alt="user avatar image"
          width={50}
          height={50}
        />
      </div>
      {/* content */}
      <div className="flex min-w-0 flex-1 items-center gap-3 text-white">
        {/* User Info */}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold leading-5 text-zinc-900">
            {user?.name || "User"}
          </h1>

          <p className="truncate text-xs leading-4 text-zinc-500">
            {user?.email}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          type="button"
          aria-label="Logout"
          title="Logout"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-95 "
        >
          <LogOut className="h-4 w-4 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Profile;