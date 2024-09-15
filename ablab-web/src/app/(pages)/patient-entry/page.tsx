"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [discount, setDiscount] = useState<number | null>(null);
  const [paidAmount, setPaidAmount] = useState<number | null>(null);
  const currentDate = format(new Date(), "MM/dd/yyyy"); // or 'dd/MM/yyyy' based on your preference
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(
          "https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/test_list"
        );
        setTests(response.data.body.tests);
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
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
    return grandTotal - grandTotal * (discount ? discount / 100 : 0);
  };

  const handlePatientInfoSubmit = async () => {
    const totalPayable = calculatePayableAmount();

    if (paidAmount && paidAmount > totalPayable) {
      toast({
        title: "Error",
        description: "Paid amount cannot exceed the total payable amount",
        variant: "destructive",
      });
      return; // Prevent API call if paidAmount > totalPayable
    }

    try {
      const response = await axios.post<PatientResponse>(
        "https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/patient_entry",
        patientInfo
      );
      const patient_id = response.data.body.patient_id;
      if (patient_id) {
        const reportData = {
          bill_informations: selectedTests,
          biller_name: "XYZ Labs",
          date_of_birth: patientInfo.date_of_birth,
          discount: discount?.toString() || "0",
          paid_amount: paidAmount?.toString() || "0",
          referred_by: "Dr. SmallBang",
          referred_to: "Dr. BigBang",
        };
        const response = await axios.post<ReportResponse>(
          `https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev/report_entry?patient_id=${patient_id}`,
          reportData
        );
        console.log("Report saved:", response.data.body);
        toast({
          title: "Report saved",
          description: "Report saved successfully",
        });

        setPatientId(patient_id);
      } else {
        console.error("Error saving patient info:", response.data.body);
        toast({
          title: "Error",
          description: response.data.body.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving patient info:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mx-auto animate-spin w-32 h-32" />
      </div>
    );
  }

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
          <p>Date: {currentDate}</p>
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
            value={discount || ""}
            onChange={(e) => setDiscount(parseFloat(e.target.value) || null)}
          />
        </div>
        <p className="text-right">Total Payable: {calculatePayableAmount()}</p>
        <div className="flex items-center">
          <label className="mr-2">Paid Amount: </label>
          <input
            type="number"
            className="bg-inherit border p-2 rounded-md"
            value={paidAmount || ""}
            onChange={(e) => setPaidAmount(parseFloat(e.target.value) || null)}
          />
        </div>
        <p className="text-right">
          Due Amount: {calculatePayableAmount() - (paidAmount || 0)}
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
