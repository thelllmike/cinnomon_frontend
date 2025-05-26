// src/pages/GradeResult.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const GradeResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Real results + uploaded files
  const apiResults    = location.state?.results || [];
  const uploadedFiles = location.state?.files   || [];

  // (Optional) sample fallback
  const sampleResults = [
    { predicted_class: "C4", confidence: 0.85 },
    { predicted_class: "M5", confidence: 0.72 },
  ];

  // Map each grade to its specific suggestions
  const suggestionsMap = {
    Alba: [
      "Moisture content = 0.02%",
      "Color = bright green",
    ],
    C4: [
      "Moisture content = 0.04%",
      "Color = yellow",
    ],
    C5: [
      "Moisture content = 0.06%",
      "Color = light brown",
    ],
    M4: [
      "Moisture content = 0.08%",
      "Color = orange",
    ],
    M5: [
      "Moisture content = 0.10%",
      "Color = red",
    ],
    H1: [
      "Moisture content = 0.12%",
      "Color = dark brown",
    ],
  };

  // Transform raw results into UI-friendly objects, injecting image & suggestions
  const transformResults = (results) =>
    results.map((item, idx) => {
      const confidencePct = item.confidence
        ? (item.confidence * 100).toFixed(2) + "%"
        : "Unknown";

      // Create a blob URL for the corresponding uploaded file
      const fileObj  = uploadedFiles[idx]?.file;
      const imageSrc = fileObj
        ? URL.createObjectURL(fileObj)
        : "/no-image.png";
      const imageAlt = fileObj?.name || "Uploaded leaf image";

      // Derive gradeClass from API
      const rawClass = item.predicted_class || "";
      // Normalize class names (e.g. "class8" => "C8" if needed)
      // Here we assume API already returns "Alba", "C4", etc.
      const gradeClass = rawClass;

      // Look up suggestions, fallback if missing
      const suggestions = suggestionsMap[gradeClass] || [
        "No specific suggestions available.",
      ];

      return {
        id:         idx,
        gradeClass,
        confidence: confidencePct,
        imageSrc,
        imageAlt,
        suggestions,
      };
    });

  // Choose real vs sample
  const displayResults =
    apiResults.length > 0
      ? transformResults(apiResults)
      : transformResults(sampleResults);

  const handleIdentifyAnother = () => {
    navigate("/grade-identifier");
  };

  return (
    <div className="p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">Grade Prediction Results</h2>

      {displayResults.length === 0 ? (
        <p className="text-center text-gray-500">
          No predictions available. Please upload an image.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayResults.map((result, index) => (
            <div
              key={result.id ?? index}
              className="bg-green-50 rounded-lg overflow-hidden"
            >
              {/* Render the uploaded image */}
              <img
                src={result.imageSrc}
                alt={result.imageAlt}
                className="w-full h-auto max-h-[50vh] object-contain"
              />

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
                    {result.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
