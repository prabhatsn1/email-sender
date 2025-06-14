"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelUploader() {
  const [data, setData] = useState<{ email: string; company: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

    //   // Assuming columns named 'Email' and 'Company'
    //   const uniqueData = Array.from(
    //     new Map(
    //       jsonData.map((item) => [
    //         item.Email,
    //         { email: item.Email, company: item.Company },
    //       ])
    //     ).values()
    //   );

    //   setData(uniqueData);
    // };

    // Assuming columns named 'Email' and 'Company'
    const allData = jsonData.map((item) => ({
      email: item.Email,
      company: item.Company,
    }));

    setData(allData);
  };

  const sendEmails = async () => {
    setLoading(true);
    console.log("Sending emails with data:", JSON.stringify(data));
    // Simulate API call
    //   await fetch('/api/sendEmails', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });
    // };
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    alert("Emails sent successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Excel Email Sender
        </h1>
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Excel File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFile}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 file:hover:bg-gray-200"
          />
          {fileName && (
            <p className="mt-2 text-sm text-green-600">Uploaded: {fileName}</p>
          )}
        </div>
        {data.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Uploaded Data</h2>
            <div className="max-h-100 overflow-y-auto border border-gray-300 rounded">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Company
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.company}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <button
          onClick={sendEmails}
          disabled={loading || data.length === 0}
          className={`w-full py-2 px-4 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Sending Emails..." : "Send Emails"}
        </button>
      </div>
    </div>
  );
}
