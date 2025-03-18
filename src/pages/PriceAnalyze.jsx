import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { predictPrice } from "./apiservice";

const PriceAnalyze = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { year, month, grade } = location.state || {};

    // If no data was passed, redirect back
    if (!year || !month || !grade) {
      navigate("/price-prediction");
      return;
    }

    // Call the API
    const fetchPrediction = async () => {
      try {
        const result = await predictPrice(year, month, grade);
        console.log("Prediction result from API:", result);

        // Once we have the result, navigate to the results page
        navigate("/price-result", { state: result });
      } catch (error) {
        console.error("Error predicting price:", error);
        // Optionally show an error message or navigate to an error page
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

export default PriceAnalyze;
