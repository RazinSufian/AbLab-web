"use client";
import Link from "next/link";
import { BellElectric, ClipboardPen, Users } from "lucide-react";
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
      className={`h-screen bg-slate-50 dark:bg-slate-900 md:w-64 w-20 flex fixed top-0 left-0`}
    >
      <nav className="w-full">
        <div className="p-4 h-20 flex justify-between items-center">
          <h1 className="text-slate-900 dark:text-white text-2xl font-bold hidden md:block">
            Path Lab
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
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

        <Link
          className="flex items-center p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/patient-entry"
        >
          <BellElectric size={24} />
          <span className="ml-4 hidden md:block">Patient Entry</span>
        </Link>

        <Link
          className="flex items-center p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/patient-list"
        >
          <ClipboardPen size={24} />
          <span className="ml-4 hidden md:block">Patient List</span>
        </Link>
        <Link
          className="flex items-center p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/tests"
        >
          <Users size={24} />
          <span className="ml-4 hidden md:block">Tests</span>
        </Link>
        <Link
          className="flex items-center p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-gray-700 m-4 rounded-sm"
          href="/total-sales"
        >
          <Users size={24} />
          <span className="ml-4 hidden md:block">Total Sales</span>
        </Link>
        <Link
          className="flex items-center p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-gray-700 m-4 rounded-sm"
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
