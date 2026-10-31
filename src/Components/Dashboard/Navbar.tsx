
"use client";

import { useSession } from "../lib/auth-client";
import Link from "next/link";
import {
  Bell,
  Search,
  ChevronDown,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const { data: userSession, isPending } = useSession();

  const user = userSession?.user || null;

  const userName = user?.name || "Admin";
  const userEmail = user?.email || "admin@example.com";
  const userImage = user?.image;

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0]?.toUpperCase())
    .join("");

  return (
    <div className="flex h-16 w-full items-center justify-between gap-4 bg-white px-4 sm:px-6">

      {/* Left Section */}
      <div className="min-w-0">
        <h2 className="truncate text-lg font-bold text-slate-800 sm:text-xl">
          Welcome back, {isPending ? "..." : userName}!
        </h2>

        <p className="hidden text-xs text-slate-500 sm:block">
          Manage your doctors and patients from here.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
        </button>

        {/* Divider */}
        <div className="hidden h-9 w-px bg-slate-200 sm:block" />

        {/* User Profile */}
        <Link
          href="/dashboard/admin/profile"
          className="group flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-2 transition hover:bg-slate-50 sm:gap-3"
        >

          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-100 bg-blue-50 text-sm font-bold text-blue-700">
            {!isPending && userImage ? (
              <Image
                width={80}
                height={80}
                src={userImage}
                alt={userName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{isPending ? "..." : initials || <UserRound size={20} />}</span>
            )}
          </div>

          {/* User Details */}
          <div className="hidden min-w-0 text-left sm:block">
            <p className="max-w-32 truncate text-sm font-semibold text-slate-800">
              {isPending ? "Loading..." : userName}
            </p>

            <div className="mt-0.5 flex items-center gap-1">
              <ShieldCheck size={12} className="text-blue-600" />

              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                Admin
              </span>
            </div>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 transition group-hover:text-blue-600 sm:block"
          />

        </Link>
      </div>
    </div>
  );
};

export default Navbar;
