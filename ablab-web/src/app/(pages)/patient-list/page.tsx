"use client";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import PatientLists from "./data-table";
import { format, subDays } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/customUi/DatePickerWithRange";

interface Patient {
  name: string;
  condition: string;
}

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState("day");
  const [selectedDay, setSelectedDay] = useState(
    format(new Date(), "yyyy-MM-dd")
  ); // Default to today
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        let endpoint =
          "https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/report_list";
        if (filterType === "day") {
          endpoint += `?day=${selectedDay}`;
        } else if (filterType === "week") {
          // Format for range selection
          if (selectedDateRange.from && selectedDateRange.to) {
            endpoint += `?day_range=${format(
              selectedDateRange.from,
              "yyyy-MM-dd"
            )}_to_${format(selectedDateRange.to, "yyyy-MM-dd")}`;
          }
        }

        const response = await axiosInstance.get(endpoint);
        console.log(response.data.reports);
        setPatients(response.data.reports);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [filterType, selectedDay, selectedDateRange]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Patient List</h1>
      <div className="flex items-center space-x-4">
        <DatePickerWithRange
          onSelectRange={(range: any) => {
            setSelectedDateRange(range);
            setFilterType("week"); // Change to 'week' or a different identifier as suitable
          }}
        />
        <Select
          onValueChange={(value) => {
            setFilterType("day");
            setSelectedDay(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Day" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Day</SelectLabel>
              <SelectItem value={format(new Date(), "yyyy-MM-dd")}>
                Today
              </SelectItem>
              <SelectItem value={format(subDays(new Date(), 1), "yyyy-MM-dd")}>
                Yesterday
              </SelectItem>
              <SelectItem value={format(subDays(new Date(), 2), "yyyy-MM-dd")}>
                Day before Yesterday
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <PatientLists data={patients} />
    </div>
  );
};

export default PatientList;
