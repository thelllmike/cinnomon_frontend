// src/pages/GradeAnalyze.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { predictGrade } from "./apiservice"; // adjust path if needed

const GradeAnalyze = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const files = location.state?.files || [];

  const [results, setResults] = useState(null);

  useEffect(() => {
    // If no files, redirect back
    if (!files.length) {
      navigate("/grade-identifier");
      return;
    }

    let timerId;
    const analyze = async () => {
      try {
        // Convert from your local "file object" to raw File
        const rawFiles = files.map((f) => f.file);
        const apiResponse = await predictGrade(rawFiles);
        setResults(apiResponse);
      } catch (error) {
        console.error("Error predicting grade:", error);
      }
    };

    analyze();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [files, navigate]);

  useEffect(() => {
    // Once we have results, wait 3s, then navigate
    if (results !== null) {
      const timerId = setTimeout(() => {
        navigate("/grade-prediction", { state: { results, files } });
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [results, navigate, files]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-6">Analyzing your images ...</h2>
        <div className="w-[18rem] flex items-center justify-center">
          <img src="/animation.gif" alt="Animation" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default GradeAnalyze;
