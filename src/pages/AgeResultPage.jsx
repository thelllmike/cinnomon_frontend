import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AgeResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const apiResult = location.state?.result;

  // Transform the API result into the expected format if available.
  // Otherwise, fallback to sample data.
  const displayResults = apiResult
    ? [
        {
          id: 1,
          imageSrc: "https://via.placeholder.com/150", // Optionally, display the analyzed image if available.
          imageAlt: "Analyzed image",
          disease: apiResult.predicted_class,
          confidenceLevel: `${apiResult.confidence * 100}%`,
          suggestions: ["Additional suggestions based on prediction."],
        },
      ]
    : [
        // Sample data fallback.
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
      ];

  const handleIdentifyAnother = () => {
    navigate("/age-identifier");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Got your results!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayResults.map((result, index) => (
          <div
            key={result.id || index}
            className="bg-green-50 rounded-lg overflow-hidden"
          >
            <h3 className="text-lg text-green-800 font-semibold mb-4">
              Image {index + 1} result
            </h3>
            <div>
              <img
                src={result.imageSrc}
                alt={result.imageAlt}
                className="w-full h-40 object-cover rounded-t-lg"
              />
            </div>
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
        <button
          onClick={handleIdentifyAnother}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
        >
          Identify Another
        </button>
      </div>
    </div>
  );
};

export default AgeResults;
