// src/pages/StickDiseaseResultPage.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const StickDiseaseResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // The results from the API, e.g. 
  // [ { predicted_class: "striper_cank", confidence: 0.59 }, ... ]
  const apiResults = location.state?.results || [];
  const uploadedFiles = location.state?.files   || [];

  // If no real results, define some sample data or show a message
  const sampleResults = [
    {
      predicted_class: "striper_cank",
      confidence: 0.5961,
    },
    {
      predicted_class: "healthy_stick",
      confidence: 0.88,
    },
  ];

  // Transform your results for the UI
 const transformResults = (results) =>
    results.map((item, idx) => {
      const diseaseName = item.predicted_class
        ? item.predicted_class
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
        : "Unknown Disease";

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
        diseaseName,
        confidencePct,
        imageSrc,
        imageAlt,
      };
    });

  const displayResults =
    apiResults.length > 0
      ? transformResults(apiResults)
      : transformResults(sampleResults);

  const handleIdentifyAnother = () => {
    navigate("/stick-disease-identifier");
  };

  return (
    <div className="p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">
        Stick Disease Detection Results
      </h2>

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
                <span className="font-medium">Predicted Disease:</span>{" "}
                <span className="text-green-600 font-medium">
                  {result.diseaseName}
                </span>
              </p>
              <p className="mb-4">
                <span className="font-medium">Confidence Level:</span>{" "}
                <span className="text-green-600 font-medium">
                  {result.confidencePct}
                </span>
              </p>
              <div>
                <p className="font-medium mb-2">Suggestions:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Prune or remove heavily infected sticks.</li>
                  <li>Apply recommended fungicide if needed.</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Link to="/stick-disease-identifier">
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

export default StickDiseaseResultPage;
