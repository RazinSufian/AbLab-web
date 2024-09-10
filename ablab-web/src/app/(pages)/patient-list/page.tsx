"use client";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
interface Patient {
  name: string;
  condition: string;
}
const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosInstance.get("/patient_list");
        console.log(response.data.body);
        setPatients(response.data.body);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Patient List</h1>
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>{patient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
