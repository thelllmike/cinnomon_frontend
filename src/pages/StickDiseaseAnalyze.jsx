// src/pages/StickDiseaseAnalyze.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { predictStickDisease } from "./apiservice";

const StickDiseaseAnalyze = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const files = location.state?.files || [];

  const [results, setResults] = useState(null);

  useEffect(() => {
    // If no files, redirect to identifier
    if (!files.length) {
      navigate("/stick-disease-identifier");
      return;
    }

    const analyze = async () => {
      try {
        // Convert from your "files array" to raw File objects
        const rawFiles = files.map((f) => f.file);
        const apiResults = await predictStickDisease(rawFiles);
        setResults(apiResults);
      } catch (error) {
        console.error("Error predicting stick disease:", error);
      }
    };

    analyze();
  }, [files, navigate]);

  useEffect(() => {
    // Once we have results, optionally show spinner for a few seconds
    if (results !== null) {
      const timerId = setTimeout(() => {
        navigate("/stick-disease-result", { state: { results, files } });
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [results, navigate]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-6">
          Analyzing your cinnamon stick images...
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

export default StickDiseaseAnalyze;
