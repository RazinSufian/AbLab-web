"use client";
import Link from "next/link";
import { BellElectric, ClipboardPen, Users } from "lucide-react";
import { Separator } from "../ui/separator";

const Navbar = () => {
  return (
    <div
      className={`h-screen dark:bg-gray-800 md:w-64 w-20 flex fixed top-0 left-0`}
    >
      <nav className="w-full">
        <div className="p-4 h-20 flex justify-between items-center">
          <h1 className="text-2xl font-bold hidden md:block">Path Lab</h1>
        </div>

        <Link
          className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/patient-entry"
        >
          <BellElectric size={24} />
          <span className="ml-4 hidden md:block">Patient Entry</span>
        </Link>

        <Link
          className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/patient-list"
        >
          <ClipboardPen size={24} />
          <span className="ml-4 hidden md:block">Patient List</span>
        </Link>
        <Link
          className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/tests"
        >
          <Users size={24} />
          <span className="ml-4 hidden md:block">Tests</span>
        </Link>
        <Link
          className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/total-sales"
        >
          <Users size={24} />
          <span className="ml-4 hidden md:block">Total Sales</span>
        </Link>
        <Link
          className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/settings"
        >
          <Users size={24} />
          <span className="ml-4 hidden md:block">Settings</span>
        </Link>
      </nav>
      <Separator orientation="vertical"></Separator>
    </div>
  );
};

export default Navbar;
