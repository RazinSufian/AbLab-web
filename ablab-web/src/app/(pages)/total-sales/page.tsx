"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface SummaryData {
  total_patients: string;
  estimated_total: string;
  unpaid_count: string;
  discount_count: string;
  income: string;
}

interface ReportData {
  referred_to: string;
  entry_date: string;
  patient_name: string;
  date_of_birth: string;
  test_report_status: Record<string, string>;
  discount: string;
  referred_by: string;
  paid_amount: string;
  estimated_total: string;
  biller_name: string;
  patient_id: string;
  report_id: string;
}

export default function ReportTable() {
  const [summaryData, setSummaryData] = useState<Record<string, SummaryData>>(
    {}
  );
  const [detailedData, setDetailedData] = useState<
    Record<string, ReportData[]>
  >({});
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [filter, setFilter] = useState<"day" | "month">("month");
  const [selectedDate, setSelectedDate] = useState<string>("2024-09");

  useEffect(() => {
    fetchSummaryData(selectedDate);
  }, [selectedDate]);

  const fetchSummaryData = async (date: string) => {
    const response = await axios.get(
      `https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/report_list?${filter}=${date}`
    );
    setSummaryData(response.data.summary);
  };

  const fetchDetailedData = async (date: string) => {
    const response = await axios.get(
      `https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/report_list?day=${date}`
    );
    setDetailedData((prev) => ({ ...prev, [date]: response.data.reports }));
  };

  const handleRowClick = (date: string) => {
    if (expandedRow === date) {
      setExpandedRow(null); // Collapse the row
    } else {
      if (!detailedData[date]) fetchDetailedData(date);
      setExpandedRow(date); // Expand the row
    }
  };

  return (
    <div className="dark:bg-gray-900 p-4">
      <div className="mb-4 flex justify-between">
        <label htmlFor="filter" className="text-gray-700 dark:text-gray-300">
          Filter by:
        </label>
        <select
          id="filter"
          className="ml-2 p-2 border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
          onChange={(e) => setFilter(e.target.value as "day" | "month")}
        >
          <option value="month">Month</option>
          <option value="day">Day</option>
        </select>
        <input
          type="text"
          className="ml-2 p-2 border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
          placeholder={`Select ${filter}`}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <table className="min-w-full table-auto bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Total Patients</th>
            <th className="px-4 py-2">Estimated Total</th>
            <th className="px-4 py-2">Unpaid</th>
            <th className="px-4 py-2">Discounts</th>
            <th className="px-4 py-2">Income</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(summaryData).map((date) => (
            <React.Fragment key={date}>
              <tr
                className="bg-gray-100 dark:bg-gray-900 cursor-pointer"
                onClick={() => handleRowClick(date)}
              >
                <td className="px-4 py-2">{date}</td>
                <td className="px-4 py-2">
                  {summaryData[date].total_patients}
                </td>
                <td className="px-4 py-2">
                  {summaryData[date].estimated_total}
                </td>
                <td className="px-4 py-2">{summaryData[date].unpaid_count}</td>
                <td className="px-4 py-2">
                  {summaryData[date].discount_count}
                </td>
                <td className="px-4 py-2">{summaryData[date].income}</td>
              </tr>
              {expandedRow === date && (
                <tr>
                  <td colSpan={6} className="bg-gray-50 dark:bg-gray-800">
                    {detailedData[date] ? (
                      <table className="min-w-full table-auto bg-gray-50 dark:bg-gray-800">
                        <thead>
                          <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="px-4 py-2">Patient Name</th>
                            <th className="px-4 py-2">Patient ID</th>
                            <th className="px-4 py-2">Report ID</th>
                            <th className="px-4 py-2">Estimated Total</th>
                            <th className="px-4 py-2">Paid</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detailedData[date].map((report) => (
                            <tr
                              key={report.report_id}
                              className="bg-gray-100 dark:bg-gray-900"
                            >
                              <td className="px-4 py-2">
                                {report.patient_name}
                              </td>
                              <td className="px-4 py-2">{report.patient_id}</td>
                              <td className="px-4 py-2">{report.report_id}</td>
                              <td className="px-4 py-2">
                                {report.estimated_total}
                              </td>
                              <td className="px-4 py-2">
                                {report.paid_amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Loading details...</p>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
