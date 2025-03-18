// src/pages/PriceAnalyze.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { predictPrice } from "./apiservice";

const PriceAnalyze = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // We expect { year, month, grade } in location.state
    const { year, month, grade } = location.state || {};

    // If the user arrives with no data, send them back to the form
    if (!year || !month || !grade) {
      navigate("/price-identifier");
      return;
    }

    // Immediately call our backend
    const fetchPrediction = async () => {
      try {
        const result = await predictPrice(year, month, grade);
        console.log("Prediction result from API:", result);

        // Navigate to /price-result with the entire result object
        navigate("/price-result", { state: result });
      } catch (error) {
        console.error("Error predicting price:", error);
        // Optionally navigate to an error page or show a friendly message
      }
    };

    fetchPrediction();
  }, [navigate, location]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-6">
          Predicting the prices...
        </h2>
        <div className="w-[18rem] flex items-center justify-center">
          <img src="/animation.gif" alt="Animation" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default PriceAnalyze;
