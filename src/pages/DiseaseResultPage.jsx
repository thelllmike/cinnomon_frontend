// src/pages/DiseaseResults.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const DiseaseResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Real results from the API, if any
  const apiResults = location.state?.results || [];
  const uploadedFiles = location.state?.files || [];

  // If no real results, we’ll fall back to your sample data:
  const sampleResults = [
    {
      id: 1,
      imageSrc:
        "https://th.bing.com/th/id/OIP.VsT9CA776q7viWiiyWIdIAHaHa?rs=1&pid=ImgDetMain",
      imageAlt: "Cinnamon Leaf with Disease",
      disease: "Cinnamon Leaf Spot",
      confidenceLevel: "87%",
      suggestions: [
        "Use fungicide spray every 14 days.",
        "Remove affected leaves to prevent spread.",
      ],
    },
    {
      id: 2,
      imageSrc:
        "https://th.bing.com/th/id/R.bf7ea6c464bd98110accbe562efd8556?rik=1GFn3Ka0XH%2bnqQ&pid=ImgRaw&r=0",
      imageAlt: "Leaf with Black Sooty Mold",
      disease: "Black Sooty Mold",
      confidenceLevel: "82%",
      suggestions: [
        "Control infestations of sap-sucking insects (e.g., aphids, whiteflies).",
        "Wash leaves with a mild soap solution to remove the mold.",
      ],
    },
  ];

  // Transform your API results into the structure needed by this UI:
  // e.g. { predicted_class: "healthy_leaves", confidence: 0.98 }
  // becomes { disease: "healthy leaves", confidenceLevel: "98%", ... }
  const transformResults = (results) => {
    return results.map((item, idx) => {
      const diseaseName = item.predicted_class
        ? item.predicted_class.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Unknown Disease";

      const confidencePct = item.confidence
        ? (item.confidence * 100).toFixed(2) + "%"
        : "Unknown";

      // create a blob URL for the uploaded image
const fileObj = uploadedFiles[idx]?.file;
const imageSrc = fileObj
  ? URL.createObjectURL(fileObj)
  : "/no-image.png";

      return {
        id: idx,
        imageSrc,
        imageAlt: fileObj?.name || "Leaf image",
        disease: diseaseName,
        confidenceLevel: confidencePct,
        suggestions: [
          "Remove or isolate infected leaves to prevent spread.",
          "Use recommended fungicide or pesticide if needed.",
        ],
      };
    });
  };

  // Decide what to actually display in this UI:
  const displayResults =
    apiResults.length > 0 ? transformResults(apiResults) : sampleResults;

  const handleIdentifyAnother = () => {
    navigate("/disease-identifier"); // or "/" if that's your main upload route
  };

  return (
    <div className="p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">Got your results!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayResults.map((result, index) => (
          <div
            key={result.id || index}
            className="bg-green-50 rounded-lg overflow-hidden"
          >
            <h3 className="text-lg text-green-800 font-semibold mb-4 p-4">
              Image {index + 1} result
            </h3>

          <img
       src={result.imageSrc}
       alt={result.imageAlt}
       className="w-full h-auto max-h-[40vh] object-contain"
     />

            <div className="p-4 bg-green-200/40">
              <p className="mb-2">
                <span className="font-medium">Disease:</span>{" "}
                <span className="text-green-600 font-medium">
                  {result.disease}
                </span>
              </p>
              <p className="mb-4">
                <span className="font-medium">Confidence Level:</span>{" "}
                <span className="text-green-600 font-medium">
                  {result.confidenceLevel}
                </span>
              </p>
              <div>
                <p className="font-medium mb-2">Suggestions:</p>
                <ul className="list-disc pl-5 space-y-2">
                  {result.suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Link to="/disease-identifier">
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

export default DiseaseResults;
