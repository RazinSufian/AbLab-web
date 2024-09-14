"use client";
import Link from "next/link";
import { BellElectric, ClipboardPen, Users, LogOut } from "lucide-react"; // Add LogOut icon
import { Separator } from "../ui/separator";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <div
      className={`h-screen bg-slate-50 dark:bg-slate-900 md:w-64 w-20 flex fixed top-0 left-0 flex-col justify-between`}
    >
      <nav className="w-full flex-1">
        {/* Company Logo Section */}
        <div className="p-4 h-20 flex justify-between items-center">
          <h1 className="text-slate-900 dark:text-white text-2xl font-bold hidden md:block">
            Path Lab
          </h1>
          {/* Placeholder Image for Company Logo */}
          <img
            src="ab_logo_3 copy.png" // Replace this with your logo path
            alt="Company Logo"
            className="h-10 w-10 md:h-[3.75rem] md:w-[3.75rem] rounded-full rotate-custom md:mt-2 md:mr-2" // Make the logo round and a bit smaller
          />
        </div>

        {/* Nav Links with Custom Colors */}
        <Link
          className="flex items-center p-2 text-[#3363D4] dark:text-white hover:bg-[#7CA2F8] hover:text-white dark:hover:text-white dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/patient-entry"
        >
          <BellElectric size={24} />
          <span className="ml-4 hidden md:block">Report Entry</span>
        </Link>

        <Link
          className="flex items-center p-2 text-[#3363D4] dark:text-white hover:bg-[#7CA2F8] hover:text-white dark:hover:text-white dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/patient-list"
        >
          <ClipboardPen size={24} />
          <span className="ml-4 hidden md:block">Report List</span>
        </Link>

        <Link
          className="flex items-center p-2 text-[#3363D4] dark:text-white hover:bg-[#7CA2F8] hover:text-white dark:hover:text-white dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/total-sales"
        >
          <Users size={24} />
          <span className="ml-4 hidden md:block">Total Sales</span>
        </Link>

        <Link
          className="flex items-center p-2 text-[#3363D4] dark:text-white hover:bg-[#7CA2F8] hover:text-white dark:hover:text-white dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/tests"
        >
          <Users size={24} />
          <span className="ml-4 hidden md:block">Tests</span>
        </Link>

        <Link
          className="flex items-center p-2 text-[#3363D4] dark:text-white hover:bg-[#7CA2F8] hover:text-white dark:hover:text-white dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/settings"
        >
          <Users size={24} />
          <span className="ml-4 hidden md:block">Settings</span>
        </Link>
      </nav>

      {/* Logout Button and Theme Toggle Section */}
      <div className="p-4 w-full flex flex-col space-y-4">
        {/* Separator for visual separation */}
        <Separator />
        <div className="flex items-center justify-between w-full">
          {/* Logout Button */}
          <Button
            variant="outline"
            size="sm"
            className="flex-1 flex items-center justify-between bg-[#3363D4] text-white hover:bg-[#7CA2F8] dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500"
          >
            Logout
            <LogOut className="ml-2 h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="ml-2 bg-[#3363D4] hover:bg-[#7CA2F8] text-white dark:bg-gray-700 dark:hover:bg-gray-500 dark:text-white"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
