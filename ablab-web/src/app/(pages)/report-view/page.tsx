'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

interface TestInformation {
  report_status: string;
  report_by: string;
}

interface Patient {
  patient_delete_flag: string;
  extra1: string;
  address: string;
  date_of_birth: string;
  phone: string;
  name: string;
  blood_group: string;
  gender: string;
  patient_id: string;
  age: string;
}

interface Report {
  referred_to: string;
  entry_date: string;
  patient_name: string;
  date_of_birth: string;
  discount: string;
  referred_by: string;
  test_report_status: { [key: string]: string };
  estimated_total: string;
  paid_amount: string;
  delivery_date: string;
  biller_name: string;
  report_delete_flag: string;
  extra1: string;
  bill_informations: { [key: string]: string };
  entry_time: string;
  patient_id: string;
  report_id: string;
}

const TestReport: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [testInfos, setTestInfos] = useState<{ [key: string]: TestInformation }>({});
  const searchParams = useSearchParams();
  const report_id = searchParams.get('report_id');
  const patient_id = searchParams.get('patient_id');

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        if (report_id && patient_id) {
          if (typeof report_id === 'string' && typeof patient_id === 'string') {
              const response = await axios.get(`https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/report_details?report_id=${report_id}&patient_id=${patient_id}`);
              const data = response.data.body;
              setPatient(data.patient);
              setReport(data.report);
              setTestInfos(data.testes_informations);
            }
      } else {
          alert('Invalid report ID or patient ID');
        console.error('Invalid report ID or patient ID');
      }
      } catch (error) {
        console.error('Error fetching report details:', error);
      }
    };

    fetchReportDetails();
  }, [report_id, patient_id]);

  return (
    <div className="p-4 mx-auto rounded-md shadow-md">
      {/* Patient Information */}
      {patient && (
        <div className="grid grid-cols-2 gap-4 border-b pb-4">
          <div>
            <h2 className="font-bold text-lg">Patient Information:</h2>
            <p>Name: {patient.name}</p>
            <p>Age: {patient.age}</p>
            <p>Address: {patient.address}</p>
            <p>Phone: {patient.phone}</p>
            <p>Blood Group: {patient.blood_group}</p>
            <p>DOB: {patient.date_of_birth}</p>
          </div>
          <div>
            <h2 className="font-bold text-lg">Report Information:</h2>
            <p>Date: {report?.entry_date || new Date().toLocaleDateString()}</p>
            <p>Referred by: {report?.referred_by}</p>
            <p>Biller name: {report?.biller_name}</p>
          </div>
        </div>
      )}

      {/* Test Information Table */}
      {report && (
        <div className="mt-4">
          <h2 className="font-bold text-lg">Test Information:</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="border p-2">Test ID</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(report.bill_informations).map(([testId, amount]) => (
                <tr key={testId}>
                  <td className="border p-2">{testId}</td>
                  <td className="border p-2">{amount}</td>
                  <td className="border p-2">{testInfos[testId]?.report_status || 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detailed Test Reports */}
      {report && (
        <div className="w-full max-w-4xl shadow-md rounded-lg">
          <h1 className="text-center text-2xl font-semibold my-4">Test Reports</h1>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-black text-left">
                <th className="px-4 py-2 font-medium">View</th>
                <th className="px-4 py-2 font-medium">Test name</th>
                <th className="px-4 py-2 font-medium">Test ID</th>
                <th className="px-4 py-2 font-medium">Report by</th>
                <th className="px-4 py-2 font-medium">Report Status</th>
                <th className="px-4 py-2 font-medium">Edit Reports</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(testInfos).map(([testId, { report_status, report_by }]) => (
                <tr key={testId} className="border-t">
                  <td className="px-4 py-2">
                    <button className="text-blue-500 font-semibold">View</button>
                  </td>
                  <td className="px-4 py-2 text-blue-500 font-semibold">{testId}</td>
                  <td className="px-4 py-2 text-blue-500">{report_status}</td>
                  <td className="px-4 py-2">{report_by === '' ? 'N/A' : report_by}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${report_status === '1' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {report_status === '1' ? 'Complete' : 'Incomplete'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="px-4 py-2 bg-purple-100 text-purple-600 font-semibold rounded-lg mr-2">
                      Edit
                    </button>
                    <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg">
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between">
        <button className="bg-blue-500 text-white p-2 rounded-md">
          Print
        </button>
        <button className="bg-green-500 text-white p-2 rounded-md">
          Save Changes
        </button>
        <button className="bg-red-500 text-white p-2 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TestReport;
