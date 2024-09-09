"use client";

import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const data: Payment[] = [
  {
    name: "Md. Rafiqul Islam",
    patientId: "PBD001",
    reportId: "RBD1001",
    date: "2024-08-27",
    total: 5000, // in BDT
    discount: 500, // in BDT
    reportStatus: "completed",
    paymentDue: "2024-09-01",
  },
  {
    name: "Shakila Akhter",
    patientId: "PBD002",
    reportId: "RBD1002",
    date: "2024-08-26",
    total: 7500, // in BDT
    discount: 1000, // in BDT
    reportStatus: "pending",
    paymentDue: "2024-09-02",
  },
  {
    name: "Abdur Rahman",
    patientId: "PBD003",
    reportId: "RBD1003",
    date: "2024-08-25",
    total: 6200, // in BDT
    discount: 800, // in BDT
    reportStatus: "processing",
    paymentDue: "2024-09-03",
  },
  {
    name: "Fatema Begum",
    patientId: "PBD004",
    reportId: "RBD1004",
    date: "2024-08-24",
    total: 4500, // in BDT
    discount: 450, // in BDT
    reportStatus: "failed",
    paymentDue: "2024-09-04",
  },
  {
    name: "Hasan Mahmud",
    patientId: "PBD005",
    reportId: "RBD1005",
    date: "2024-08-23",
    total: 8800, // in BDT
    discount: 1200, // in BDT
    reportStatus: "completed",
    paymentDue: "2024-09-05",
  },
  {
    name: "Ayesha Siddiqua",
    patientId: "PBD006",
    reportId: "RBD1006",
    date: "2024-08-22",
    total: 5200, // in BDT
    discount: 700, // in BDT
    reportStatus: "completed",
    paymentDue: "2024-09-06",
  },
  {
    name: "Jamal Uddin",
    patientId: "PBD007",
    reportId: "RBD1007",
    date: "2024-08-21",
    total: 3900, // in BDT
    discount: 300, // in BDT
    reportStatus: "processing",
    paymentDue: "2024-09-07",
  },
  {
    name: "Nasima Khatun",
    patientId: "PBD008",
    reportId: "RBD1008",
    date: "2024-08-20",
    total: 6200, // in BDT
    discount: 800, // in BDT
    reportStatus: "pending",
    paymentDue: "2024-09-08",
  },
  {
    name: "Mizanur Rahman",
    patientId: "PBD009",
    reportId: "RBD1009",
    date: "2024-08-19",
    total: 7300, // in BDT
    discount: 950, // in BDT
    reportStatus: "completed",
    paymentDue: "2024-09-09",
  },
  {
    name: "Parveen Sultana",
    patientId: "PBD010",
    reportId: "RBD1010",
    date: "2024-08-18",
    total: 6700, // in BDT
    discount: 600, // in BDT
    reportStatus: "failed",
    paymentDue: "2024-09-10",
  },
  {
    name: "Rahim Khan",
    patientId: "PBD011",
    reportId: "RBD1011",
    date: "2024-08-17",
    total: 8400, // in BDT
    discount: 1100, // in BDT
    reportStatus: "completed",
    paymentDue: "2024-09-11",
  },
  {
    name: "Rubina Akhter",
    patientId: "PBD012",
    reportId: "RBD1012",
    date: "2024-08-16",
    total: 9300, // in BDT
    discount: 1200, // in BDT
    reportStatus: "processing",
    paymentDue: "2024-09-12",
  },
  {
    name: "Rafiq Ahmed",
    patientId: "PBD013",
    reportId: "RBD1013",
    date: "2024-08-15",
    total: 5100, // in BDT
    discount: 700, // in BDT
    reportStatus: "pending",
    paymentDue: "2024-09-13",
  },
  {
    name: "Sultana Begum",
    patientId: "PBD014",
    reportId: "RBD1014",
    date: "2024-08-14",
    total: 4700, // in BDT
    discount: 500, // in BDT
    reportStatus: "completed",
    paymentDue: "2024-09-14",
  },
  {
    name: "Kamal Hossain",
    patientId: "PBD015",
    reportId: "RBD1015",
    date: "2024-08-13",
    total: 8200, // in BDT
    discount: 1000, // in BDT
    reportStatus: "failed",
    paymentDue: "2024-09-15",
  },
  {
    name: "Taslima Akhter",
    patientId: "PBD016",
    reportId: "RBD1016",
    date: "2024-08-12",
    total: 6000, // in BDT
    discount: 800, // in BDT
    reportStatus: "completed",
    paymentDue: "2024-09-16",
  },
  {
    name: "Nayeem Hossain",
    patientId: "PBD017",
    reportId: "RBD1017",
    date: "2024-08-11",
    total: 9100, // in BDT
    discount: 1300, // in BDT
    reportStatus: "pending",
    paymentDue: "2024-09-17",
  },
  {
    name: "Hasina Khatun",
    patientId: "PBD018",
    reportId: "RBD1018",
    date: "2024-08-10",
    total: 7300, // in BDT
    discount: 900, // in BDT
    reportStatus: "processing",
    paymentDue: "2024-09-18",
  },
  {
    name: "Md. Yusuf",
    patientId: "PBD019",
    reportId: "RBD1019",
    date: "2024-08-09",
    total: 5400, // in BDT
    discount: 600, // in BDT
    reportStatus: "completed",
    paymentDue: "2024-09-19",
  },
  {
    name: "Salma Rahman",
    patientId: "PBD020",
    reportId: "RBD1020",
    date: "2024-08-08",
    total: 6800, // in BDT
    discount: 800, // in BDT
    reportStatus: "failed",
    paymentDue: "2024-09-20",
  },
];

export type Payment = {
  name: string;
  patientId: string;
  reportId: string;
  date: string; // Assuming date as a string in "YYYY-MM-DD" format
  total: number;
  discount: number;
  reportStatus: string; // Define specific status types if needed
  paymentDue: string; // Assuming date as a string in "YYYY-MM-DD" format
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "patientId",
    header: "Patient ID",
    cell: ({ row }) => <div>{row.getValue("patientId")}</div>,
  },
  {
    accessorKey: "reportId",
    header: "Report ID",
    cell: ({ row }) => <div>{row.getValue("reportId")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "total",
    header: "Total (BDT)",
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
      }).format(total);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "discount",
    header: "Discount (BDT)",
    cell: ({ row }) => {
      const discount = parseFloat(row.getValue("discount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
      }).format(discount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "reportStatus",
    header: "Report Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("reportStatus")}</div>
    ),
  },
  {
    accessorKey: "paymentDue",
    header: "Payment Due",
    cell: ({ row }) => <div>{row.getValue("paymentDue")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.reportId)}
            >
              Copy report ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View patient details</DropdownMenuItem>
            <DropdownMenuItem>View report details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
