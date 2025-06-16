"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelUploader() {
  const [data, setData] = useState<{ email: string; company: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [subject, setSubject] = useState("Test Subject");
  const [emailContent, setEmailContent] = useState("Testing Content");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

    const allData = jsonData.map((item) => ({
      email: item.Email,
      company: item.Company,
    }));

    setData(allData);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const sendEmails = async () => {
    if (!resumeFile) {
      alert("Please upload a resume file.");
      return;
    }

    if (data.length === 0) {
      alert("Please upload an Excel file with email data.");
      return;
    }

    setLoading(true);

    const emailData = data.map((item) => ({
      email: item.email,
      company: item.company,
      subject: subject,
      content: emailContent,
    }));

    const formData = new FormData();
    formData.append("requests", JSON.stringify(emailData));
    formData.append("resume", resumeFile); // This was missing the file itself

    try {
      console.log("Sending emails to:", emailData.length, "recipients");
      const url: string = process.env.API_URL || "/api/sendEmails";
      console.log("API URL:", url);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Success: ${result.message}`);
        console.log("Results:", result);
      } else {
        alert(`Error: ${result.error}`);
        console.error("Error details:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error occurred while sending emails.");
    } finally {
      setLoading(false);
    }
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
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="block w-full text-sm border border-gray-300 rounded py-2 px-4"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email-content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Content
          </label>
          <textarea
            id="email-content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="block w-full text-sm border border-gray-300 rounded py-2 px-4"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="resume-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Resume (PDF)
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf"
            onChange={handleResumeUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 file:hover:bg-gray-200"
          />
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
