"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface Test {
  test_name_id: string;
  test_name: string;
  amount: string;
}

interface PatientResponse {
  statusCode: string;
  body: {
    message: string;
    patient_id: string;
  };
}

interface ReportResponse {
  statusCode: string;
  body: {
    message: string;
    report_id: string;
  };
}

const TestReport: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTests, setSelectedTests] = useState<{ [key: string]: string }>(
    {}
  );
  const [patientId, setPatientId] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    phone: "",
    address: "",
    blood_group: "",
    date_of_birth: "",
  });
  const [discount, setDiscount] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(
          "https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/test_list"
        );
        setTests(response.data.body.tests);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchTests();
  }, []);

  const handleTestSelection = (test: Test) => {
    setSelectedTests({
      ...selectedTests,
      [test.test_name_id]: test.amount,
    });
  };

  const handleRemoveTest = (testId: string) => {
    const newSelectedTests = { ...selectedTests };
    delete newSelectedTests[testId];
    setSelectedTests(newSelectedTests);
  };

  const calculateGrandTotal = () => {
    return Object.values(selectedTests).reduce(
      (acc, curr) => acc + parseFloat(curr),
      0
    );
  };

  const calculatePayableAmount = () => {
    const grandTotal = calculateGrandTotal();
    return grandTotal - grandTotal * (discount / 100);
  };

  const handlePatientInfoSubmit = async () => {
    try {
      const response = await axios.post<PatientResponse>(
        "https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/patient_entry",
        patientInfo
      );

      console.log("Patient information saved:", response.data.body);
      setPatientId(response.data.body.patient_id);
      handleReportSubmit();
    } catch (error) {
      console.error("Error saving patient info:", error);
    }
  };

  const handleReportSubmit = async () => {
    if (!patientId) return;

    const reportData = {
      bill_informations: selectedTests,
      biller_name: "XYZ Labs",
      date_of_birth: patientInfo.date_of_birth,
      discount: discount.toString(),
      paid_amount: paidAmount.toString(),
      referred_by: "Dr. SmallBang",
      referred_to: "Dr. BigBang",
    };

    try {
      const response = await axios.post<ReportResponse>(
        `https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/report_entry?patient_id=${patientId}`,
        reportData
      );
      console.log("Report saved:", response.data.body);
      alert("Report saved successfully!");
    } catch (error) {
      console.error("Error saving report:", error);
      alert("Error saving report. Please try again.");
    }
  };

  return (
    <div className="p-4 mx-auto rounded-md shadow-md">
      {/* Patient Information */}
      <div className="grid grid-cols-2 gap-4 border-b pb-4">
        <div>
          <h2 className="font-bold text-lg">Patient Information:</h2>
          <div className="mt-2">
            <label className="block">Name:</label>
            <input
              type="text"
              className="bg-inherit border p-2 w-full rounded-md"
              value={patientInfo.name}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, name: e.target.value })
              }
              placeholder="Enter patient name"
            />
          </div>
          <div className="mt-2">
            <label className="block">Age:</label>
            <input
              type="text"
              className="bg-inherit border p-2 w-full rounded-md"
              value={patientInfo.age}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, age: e.target.value })
              }
              placeholder="Enter age"
            />
          </div>
          <div className="mt-2">
            <label className="block">Address:</label>
            <input
              type="text"
              className="bg-inherit border p-2 w-full rounded-md"
              value={patientInfo.address}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, address: e.target.value })
              }
              placeholder="Enter address"
            />
          </div>
          <div className="mt-2">
            <label className="block">Phone:</label>
            <input
              type="text"
              className="bg-inherit border p-2 w-full rounded-md"
              value={patientInfo.phone}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, phone: e.target.value })
              }
              placeholder="Enter phone number"
            />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg">Report Information:</h2>
          <p>Date: {new Date().toLocaleDateString()}</p>
          <div className="mt-2">
            <label className="block">Blood Group:</label>
            <input
              type="text"
              className="bg-inherit border p-2 w-full rounded-md"
              value={patientInfo.blood_group}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, blood_group: e.target.value })
              }
              placeholder="Enter blood group"
            />
          </div>
          <p className="mt-2">Referred by: Dr. XYZ</p>
          <p>Referred to: Dr. XYZ</p>
          <p>Biller name: XYZ</p>
        </div>
      </div>

      {/* Add Test Section */}
      <div className="mt-4 flex items-center gap-4">
        <select
          className="p-2 border border-gray-300 rounded-md"
          onChange={(e) =>
            handleTestSelection(
              tests.find((test) => test.test_name_id === e.target.value)!
            )
          }
        >
          <option value="">Add Test</option>
          {tests.map((test) => (
            <option key={test.test_name_id} value={test.test_name_id}>
              {test.test_name}
            </option>
          ))}
        </select>
      </div>

      {/* Test List Table */}
      <div className="mt-4">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border p-2">No</th>
              <th className="border p-2">Test Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(selectedTests).map((testId, index) => (
              <tr key={testId}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">
                  {
                    tests.find((test) => test.test_name_id === testId)
                      ?.test_name
                  }
                </td>
                <td className="border p-2 text-right">
                  {selectedTests[testId]}
                </td>
                <td className="border p-2 text-center">
                  <button
                    className="bg-red-500 text-white p-1 rounded-md"
                    onClick={() => handleRemoveTest(testId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Details */}
      <div className="mt-4 flex flex-col items-end space-y-2">
        <p className="text-right">Grand Total: {calculateGrandTotal()}</p>
        <div className="flex items-center">
          <label className="mr-2">Discount %: </label>
          <input
            type="number"
            className="bg-inherit border p-2 rounded-md"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value))}
          />
        </div>
        <p className="text-right">Total Payable: {calculatePayableAmount()}</p>
        <div className="flex items-center">
          <label className="mr-2">Paid Amount: </label>
          <input
            type="number"
            className="bg-inherit border p-2 rounded-md"
            value={paidAmount}
            onChange={(e) => setPaidAmount(parseFloat(e.target.value))}
          />
        </div>
        <p className="text-right">
          Due Amount: {calculatePayableAmount() - paidAmount}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-end">
        <Button className="bg-green-500" onClick={handlePatientInfoSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default TestReport;
