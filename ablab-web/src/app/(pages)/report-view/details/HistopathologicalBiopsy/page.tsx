"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const ReportPage = () => {
  const params = useSearchParams();
  const testId = params.get("test_id");
  const reportId = params.get("report_id");
  const mode = params.get("mode");
  const isEditMode = mode === "edit";
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/HB07_details?test_id=${testId}&report_id=${reportId}`;
      if (testId && reportId) {
        try {
          const response = await axios.get(apiUrl);
          const combinedData = {
            ...response.data.patient,
            ...response.data.histopatho_biopsy,
            billing_date: response.data.billing_date,
            report_printing_date: response.data.report_printing_date,
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

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedData = new FormData(event.currentTarget);
    const formattedData = Object.fromEntries(updatedData);
    // Ensure required fields are included
    formattedData["patient_id"] = reportData.patient_id;
    formattedData["report_status"] = "1";

    const apiUrl = `https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/HB07_update?test_id=${testId}&report_id=${reportId}`;
    try {
      await axios.put(apiUrl, formattedData);
      alert("Report updated successfully!");
    } catch (err) {
      alert("Failed to update report");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container w-full max-w-5xl mx-auto p-10 shadow-xl bg-white text-black">
      <h1 className="text-2xl font-bold text-center mb-8">
        Histopathology Biopsy Report
      </h1>
      <div className="border p-4 flex justify-between items-center">
        <div>
          <p className="text-left">
            <strong>ABLab Bill No:</strong> {reportData?.ablab_bill_no}
          </p>
          <p className="text-left">
            <strong>Lab ID No:</strong> {reportData?.lab_id_no}
          </p>
          <p className="text-left">
            <strong>Patient Name:</strong> {reportData?.patient_name}
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
          <p className="text-left">
            <strong>Report Printing Date:</strong>{" "}
            {reportData?.report_printing_date}
          </p>
        </div>
      </div>
      {isEditMode ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">
                Gross Description:
              </strong>
            </p>
            <textarea
              name="h_gross_description"
              className="form-textarea mt-1 block w-full bg-inherit"
              defaultValue={reportData?.h_gross_description}
              required
            />
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">
                Microscopic Appearance:
              </strong>
            </p>
            <textarea
              name="h_microscopic_appearance"
              className="form-textarea mt-1 block w-full bg-inherit"
              defaultValue={reportData?.h_microscopic_appearance}
              required
            />
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">Comment:</strong>
            </p>
            <textarea
              name="comment"
              className="form-textarea mt-1 block w-full bg-inherit"
              defaultValue={reportData?.comment}
              required
            />
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">Recommendation:</strong>
            </p>
            <textarea
              name="recomandation"
              className="form-textarea mt-1 block w-full bg-inherit"
              defaultValue={reportData?.recomandation}
              required
            />
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">Note:</strong>
            </p>
            <textarea
              name="note"
              className="form-textarea mt-1 block w-full bg-inherit"
              defaultValue={reportData?.note}
              required
            />
          </div>
          <div className="p-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">
                Gross Description:
              </strong>
            </p>
            <p>{reportData?.h_gross_description}</p>
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">
                Microscopic Appearance:
              </strong>
            </p>
            <p>{reportData.h_microscopic_appearance}</p>
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">Comment:</strong>
            </p>
            <p>{reportData.comment}</p>
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">Recommendation:</strong>
            </p>
            <p>{reportData?.recomandation}</p>
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">Note:</strong>
            </p>
            <p>{reportData.note}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
