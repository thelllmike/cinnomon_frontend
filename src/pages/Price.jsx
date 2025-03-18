// src/pages/PriceIdentifier.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Example grade + month lists
const GRADES = ["Alba", "C4", "C5", "M4", "M5", "H1"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const PriceIdentifier = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState(MONTHS[0]); // default to "January"
  const [grade, setGrade] = useState(GRADES[0]); // default to "Alba"
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!year) {
      alert("Please enter a valid year, e.g. 2023.");
      return;
    }

    // On submit, navigate to the analyze page, passing data in "state"
    navigate("/price-analyze", {
      state: { year, month, grade },
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Cinnamon Price Prediction</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
        {/* Year Input */}
        <div>
          <label htmlFor="year" className="block mb-1 font-medium">
            Year
          </label>
          <input
            id="year"
            type="number"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder="e.g. 2023"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        {/* Month Dropdown */}
        <div>
          <label htmlFor="month" className="block mb-1 font-medium">
            Month
          </label>
          <select
            id="month"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Grade Dropdown */}
        <div>
          <label htmlFor="grade" className="block mb-1 font-medium">
            Grade
          </label>
          <select
            id="grade"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mt-4"
        >
          Predict Price
        </button>
      </form>
    </div>
  );
};

export default PriceIdentifier;
