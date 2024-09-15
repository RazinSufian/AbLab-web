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
import Link from "next/link";

export type Payment = {
  patient_name: string;
  patient_id: string;
  report_id: string;
  entry_date: string; // Assuming entry_date as a string in "YYYY-MM-DD" format
  estimated_total: number;
  discount: number;
  paid_amount: number;
  test_report_status: Record<string, string>; // Updated type for dynamic test report statuses
  paymentDue: string; // Assuming paymentDue as a string in "YYYY-MM-DD" format
};

export const data: Payment[] = [
  // Sample data with the new test_report_status field
  {
    patient_name: "Md. Rafiqul Islam",
    patient_id: "PBD001",
    report_id: "RBD1001",
    entry_date: "2024-08-27",
    estimated_total: 5000, // in BDT
    discount: 500, // in BDT
    paid_amount: 500, // in BDT
    test_report_status: {
      NB000006: "1",
      HB000009: "2",
    },
    paymentDue: "2024-09-01",
  },
  // Add more entries similarly with updated test_report_status
];

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
    accessorKey: "patient_name",
    header: "Patient Name",
    cell: ({ row }) => <div>{row.getValue("patient_name")}</div>,
  },
  {
    accessorKey: "patient_id",
    header: "Patient ID",
    cell: ({ row }) => <div>{row.getValue("patient_id")}</div>,
  },
  {
    accessorKey: "report_id",
    header: "Report ID",
    cell: ({ row }) => (
      <div>
        <Link
          href={{
            pathname: "/report-view",
            query: {
              report_id: row.getValue("report_id"),
              patient_id: row.getValue("patient_id"),
            },
          }}
          className="text-blue-500" // Add this class to make the text blue
        >
          {row.getValue("report_id")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "entry_date",
    header: "Entry Date",
    cell: ({ row }) => <div>{row.getValue("entry_date")}</div>,
  },
  {
    accessorKey: "estimated_total",
    header: "Estimated Total (BDT)",
    cell: ({ row }) => {
      const estimated_total = parseFloat(row.getValue("estimated_total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
      }).format(estimated_total);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "discount",
    header: "Discount (%)",
    cell: ({ row }) => {
      const discount = parseFloat(row.getValue("discount"));

      return <div className="text-left font-medium">{discount}%</div>;
    },
  },
  {
    accessorKey: "paid_amount",
    header: "Paid Amount (BDT)",
    cell: ({ row }) => {
      const paid_amount = parseFloat(row.getValue("paid_amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
      }).format(paid_amount);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "test_report_status",
    header: "Report Remaining",
    cell: ({ row }) => {
      // Get the test_report_status object from the current row
      const testStatus = row.getValue("test_report_status") as Record<
        string,
        string
      >;

      // Count tests where the status value is not equal to "1"
      const incompleteTestsCount = Object.values(testStatus).filter(
        (status) => status !== "1"
      ).length;

      return <div className="text-center">{incompleteTestsCount}</div>;
    },
  },

  {
    accessorKey: "estimated_total", // This is used as a key just for identification
    header: "Remaining Payment (BDT)",
    cell: ({ row }) => {
      const estimatedTotal = row.original.estimated_total; // Accessing from the original data
      const paidAmount = row.original.paid_amount; // Accessing from the original data
      const discount = row.original.discount; // Accessing the discount from the original data

      // Calculate the discounted total
      const discountedTotal = estimatedTotal * (1 - discount / 100);

      // Check if the difference is within ±5
      const difference = Math.abs(discountedTotal - paidAmount);

      // Determine remaining payment
      let remainingPayment;
      if (difference <= 5) {
        remainingPayment = 0; // If the difference is within ±5, consider it paid
      } else {
        remainingPayment = discountedTotal - paidAmount;
      }

      // Format the remaining payment
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
      }).format(remainingPayment);

      return (
        <div className="text-left font-medium text-center">{formatted}</div>
      );
    },
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
              onClick={() => navigator.clipboard.writeText(payment.report_id)}
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
