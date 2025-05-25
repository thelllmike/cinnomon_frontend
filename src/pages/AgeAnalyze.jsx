import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { predictImageAge } from "../pages/apiservice";

const AgeAnalyze = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const file = location.state?.file; // File passed from AgeIdentifier

  useEffect(() => {
    console.log("Received file in AgeAnalyze:", file);
    if (!file) {
      // If no file is provided, navigate back to the upload page
      navigate("/age-identifier");
      return;
    }
    // This function is called only once and sends the file once to your backend.
    const analyze = async () => {
      try {
        const result = await predictImageAge(file);
        console.log("API result:", result);
        // Once the result is received, navigate to the AgeResults page,
        // passing the API result via state.
        navigate("/age-result", { state: { result, file } });

      } catch (error) {
        console.error("Error during image analysis:", error);
        // Optionally, navigate to an error page or display an error message.
      }
    };

    analyze();
  }, [file, navigate]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-6">Analyzing your image...</h2>
        <div className="w-[18rem] flex items-center justify-center">
          <img src="/animation.gif" alt="Processing animation" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default AgeAnalyze;
