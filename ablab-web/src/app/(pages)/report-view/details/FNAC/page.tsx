"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const FNACPage = () => {
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

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedData = new FormData(event.currentTarget);
    const formattedData = Object.fromEntries(updatedData);
    // Ensure required fields are included
    formattedData["patient_id"] = reportData.patient_id;
    formattedData["report_status"] = "1";

    const apiUrl = `https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/FN02_update?test_id=${testId}&report_id=${reportId}`;
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

      {isEditMode ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">Aspiration Note:</strong>
            </p>
            <textarea
              name="aspiration_note"
              className="form-textarea mt-1 block w-full bg-inherit"
              defaultValue={reportData?.aspiration_note}
              required
            />
          </div>
          <div className="p-4">
            <p>
              <strong className="block font-bold mb-2">
                Microscopic Examination:
              </strong>
            </p>
            <textarea
              name="microscopic_diagnosis"
              className="form-textarea mt-1 block w-full bg-inherit"
              defaultValue={reportData?.microscopic_diagnosis}
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
              name="recommendation"
              className="form-textarea mt-1 block w-full bg-inherit"
              defaultValue={reportData?.recommendation}
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
      )}
    </div>
  );
};

export default FNACPage;
