// src/pages/DiseaseAnalyze.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { predictDiseases } from "./apiservice"; // Update path as needed

const DiseaseAnalyze = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Files passed from DiseaseIdentifier
  const files = location.state?.files || [];

  const [results, setResults] = useState(null);

  useEffect(() => {
    // If somehow we got here with no files, go back to the identifier page
    if (!files.length) {
      navigate("/disease-identifier");
      return;
    }

    // 1) Call the predictDiseases API immediately
    // 2) Store the results in state
    // 3) Show spinner for at least 3 seconds
    // 4) Navigate to the result page with the API data

    let timerId;
    const analyze = async () => {
      try {
        // "files" in your DiseaseIdentifier are arrays of objects
        // with { file, progress, ... }. We only need the raw File objects.
        const rawFiles = files.map((f) => f.file);

        const apiResults = await predictDiseases(rawFiles);
        setResults(apiResults);
      } catch (error) {
        console.error("Error predicting diseases:", error);
        // You could optionally navigate to an error page or handle it gracefully
      }
    };

    analyze();

    return () => {
      // Cleanup any timer if component unmounts
      if (timerId) clearTimeout(timerId);
    };
  }, [files, navigate]);

  useEffect(() => {
    // Once results is set, wait 3 seconds (spinner time), then navigate
    if (results !== null) {
      const timerId = setTimeout(() => {
        // Navigate to the results page with the predictions
        navigate("/disease-result", { state: { results, files } });
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [results, navigate]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-6">
          Analyzing your images ...
        </h2>
        <div className="w-[18rem] flex items-center justify-center">
          <img
            src="/animation.gif"
            alt="Animation"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DiseaseAnalyze;
