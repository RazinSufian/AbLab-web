"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const FNACReportPage = () => {
  const params = useSearchParams();
  const testId = params.get("test_id");
  const reportId = params.get("report_id");
  const mode = params.get("mode");
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleAfterPrint = () => {
      window.close(); // This will close the popup window after printing
    };

    if (mode === "print") {
      setTimeout(() => window.print(), 2000); // Delay print dialog to ensure content loads
      window.addEventListener("afterprint", handleAfterPrint);
    }

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [mode]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/FN02_details?test_id=${testId}&report_id=${reportId}`;
      if (testId && reportId) {
        try {
          const response = await axios.get(apiUrl);
          const combinedData = {
            ...response.data.patient,
            ...response.data.fnac,
            billing_date: response.data.billing_date,
          };
          setReportData(combinedData);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch data");
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [testId, reportId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="print-content mx-auto p-0 w-full h-auto">
      <div className="p-10">
        <h1 className="text-2xl font-bold text-center mb-8">FNAC Report</h1>
        <div className="border p-4 flex justify-between items-center">
          <div>
            <p className="text-left">
              <strong>ABLab Bill No:</strong> {reportData?.ablab_bill_no}
            </p>
            <p className="text-left">
              <strong>Lab ID No:</strong> {reportData?.lab_id_no}
            </p>
            <p className="text-left">
              <strong>Patient Name:</strong> {reportData?.name}
            </p>
            <p className="text-left">
              <strong>Address:</strong> {reportData?.address}
            </p>
            <p className="text-left">
              <strong>Blood Group:</strong> {reportData?.blood_group}
            </p>
            <p className="text-left">
              <strong>Referred By:</strong> {reportData?.referred_by}
            </p>
          </div>
          <div className="text-left">
            <p className="text-left">
              <strong>Report ID:</strong> {reportData?.report_id}
            </p>
            <p className="text-left">
              <strong>Test ID:</strong> {reportData?.test_id}
            </p>
            <p className="text-left">
              <strong>Patient ID:</strong> {reportData?.patient_id}
            </p>
            <p className="text-left">
              <strong>Billing Date:</strong> {reportData?.billing_date}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">Aspiration Note:</strong>
            </p>
            <p>{reportData?.aspiration_note}</p>
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">
                Microscopic Examination:
              </strong>
            </p>
            <p>{reportData?.microscopic_diagnosis}</p>
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">Comment:</strong>
            </p>
            <p>{reportData?.comment}</p>
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">Recommendation:</strong>
            </p>
            <p>{reportData?.recommendation}</p>
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">Note:</strong>
            </p>
            <p>{reportData?.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FNACReportPage;
