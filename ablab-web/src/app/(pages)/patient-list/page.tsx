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
} from "@/components/ui/select"

interface Patient {
  name: string;
  condition: string;
}

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("day");
  const [selectedDay, setSelectedDay] = useState(format(new Date(), "yyyy-MM-dd")); // Default to today
  const [selectedWeek, setSelectedWeek] = useState("1");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        let endpoint = "/report_list";
        if (filterType === "day") {
          endpoint += `?day=${selectedDay}`;
        } else if (filterType === "week") {
          endpoint += `?week=${selectedWeek}`;
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
  }, [filterType, selectedDay, selectedWeek]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Patient List</h1>
      <div className="flex items-center space-x-4">
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
              <SelectItem value={format(new Date(), "yyyy-MM-dd")}>Today</SelectItem>
              <SelectItem value={format(subDays(new Date(), 1), "yyyy-MM-dd")}>Yesterday</SelectItem>
              <SelectItem value={format(subDays(new Date(), 2), "yyyy-MM-dd")}>Day before Yesterday</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            setFilterType("week");
            setSelectedWeek(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Week" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Week</SelectLabel>
              <SelectItem value="1">This Week</SelectItem>
              <SelectItem value="2">Last 2 Weeks</SelectItem>
              <SelectItem value="3">Last 3 Weeks</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <PatientLists data={patients} />
    </div>
  );
};

export default PatientList;
