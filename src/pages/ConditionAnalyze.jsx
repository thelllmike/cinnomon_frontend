// src/pages/ConditionAnalyze.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { predictCondition } from "./apiservice"; // <-- adjust the path as needed

const ConditionAnalyze = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const files = location.state?.files || [];

  const [results, setResults] = useState(null);

  useEffect(() => {
    // If no files, redirect to ConditionIdentifier
    if (!files.length) {
      navigate("/condition-identifier");
      return;
    }

    // 1) Call the API
    // 2) Save results to state
    // 3) After the call finishes, optionally wait 3 seconds
    // 4) Navigate to result page

    let timerId;
    const analyze = async () => {
      try {
        // Convert your "files" (which have .file, .progress, etc.) 
        // to plain File objects.
        const rawFiles = files.map((f) => f.file);

        const apiResponse = await predictCondition(rawFiles);
        setResults(apiResponse);
      } catch (error) {
        console.error("Error predicting condition:", error);
        // Optionally navigate to an error page or show a message
      }
    };

    analyze();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [files, navigate]);

  useEffect(() => {
    // Once we have "results", show spinner for 3 more seconds
    if (results !== null) {
      const timerId = setTimeout(() => {
        navigate("/condition-result", { state: { results, files } });
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [results, navigate]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-6">Analyzing your images ...</h2>
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

export default ConditionAnalyze;
