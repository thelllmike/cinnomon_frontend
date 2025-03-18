// src/pages/GradeResult.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const GradeResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Real results from GradeAnalyze
  const apiResults = location.state?.results || [];

  // Fallback sample data if no real results
  const sampleResults = [
    {
      predicted_class: "class8",
      confidence: 0.9997636675,
    },
    {
      predicted_class: "class3",
      confidence: 0.75,
    },
  ];

  // Transform them to a more UI-friendly format
  const transformResults = (results) =>
    results.map((item, idx) => {
      // e.g. predicted_class: "class8"
      const confidencePct = item.confidence
        ? (item.confidence * 100).toFixed(2) + "%"
        : "Unknown";

      return {
        id: idx,
        gradeClass: item.predicted_class || "Unknown Class",
        confidence: confidencePct,
      };
    });

  const displayResults =
    apiResults.length > 0 ? transformResults(apiResults) : transformResults(sampleResults);

  const handleIdentifyAnother = () => {
    navigate("/grade-identifier");
  };

  return (
    <div className="p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">Grade Prediction Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayResults.map((result, index) => (
          <div
            key={result.id || index}
            className="bg-green-50 rounded-lg overflow-hidden"
          >
            <div className="p-4 bg-green-200/40">
              <h3 className="text-lg text-green-800 font-semibold mb-4">
                Image {index + 1} Result
              </h3>
              <p className="mb-2">
                <span className="font-medium">Predicted Class:</span>{" "}
                <span className="text-green-600 font-medium">
                  {result.gradeClass}
                </span>
              </p>
              <p className="mb-4">
                <span className="font-medium">Confidence Level:</span>{" "}
                <span className="text-green-600 font-medium">
                  {result.confidence}
                </span>
              </p>
              <div>
                <p className="font-medium mb-2">Suggestions:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Ensure consistent leaf moisture.</li>
                  <li>Harvest or handle according to recommended guidelines.</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Link to="/grade-identifier">
          <button
            onClick={handleIdentifyAnother}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
          >
            Identify Another
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GradeResult;
