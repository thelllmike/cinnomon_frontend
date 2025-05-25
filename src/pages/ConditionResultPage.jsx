// src/pages/ConditionResultPage.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ConditionResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // The real results from the condition detection API
  const apiResults = location.state?.results || [];
  const uploadedFiles = location.state?.files || [];

  // If no real results, fallback to sample
  const sampleResults = [
    {
      id: 1,
      predicted_class: "level_1",
      confidence: 0.4982,
    },
    {
      id: 2,
      predicted_class: "level_3",
      confidence: 0.8321,
    },
  ];

  // We'll transform results into a structure your UI can handle
  // For example:
  // { predicted_class: "level_1", confidence: 0.49 }
  // => { condition: "Level 1", confidencePct: "49%" }
 const transformResults = (results) => {
    return results.map((item, idx) => {
      const conditionName = item.predicted_class
        ? item.predicted_class
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
        : "Unknown Condition";

      const confidencePct = item.confidence
        ? (item.confidence * 100).toFixed(2) + "%"
        : "Unknown";

      // — NEW: grab the matching uploaded file and make a blob URL
      const fileObj  = uploadedFiles[idx]?.file;
      const imageSrc = fileObj
        ? URL.createObjectURL(fileObj)
        : "/no-image.png";
      const imageAlt = fileObj?.name || "Uploaded stick image";

      return {
        id: idx,
        condition: conditionName,
        confidence: confidencePct,
        imageSrc,
        imageAlt,
      };
    });
  };

  // Decide what to display: real or sample
  const displayResults =
    apiResults.length > 0 ? transformResults(apiResults) : transformResults(sampleResults);

  const handleIdentifyAnother = () => {
    navigate("/condition-identifier");
  };

  return (
    <div className="p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">Condition Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayResults.map((result, index) => (
          <div
            key={result.id || index}
            className="bg-green-50 rounded-lg overflow-hidden"
          >
             {/* SHOW UPLOADED IMAGE */}
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
                <span className="font-medium">Predicted Condition:</span>{" "}
                <span className="text-green-600 font-medium">
                  {result.condition}
                </span>
              </p>

              <p className="mb-4">
                <span className="font-medium">Confidence Level:</span>{" "}
                <span className="text-green-600 font-medium">
                  {result.confidence}
                </span>
              </p>

              {/* Optional: any suggestions or next steps */}
              <div>
                <p className="font-medium mb-2">Suggestions:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Monitor plants and remove heavily infected areas.</li>
                  <li>Apply recommended treatments if needed.</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Link to="/condition-identifier">
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

export default ConditionResultPage;
