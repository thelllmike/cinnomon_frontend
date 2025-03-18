import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GradeAnalyze = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigate("/grade-prediction");
        }, 3000);

        // Clean up the timer if the component unmounts
        return () => clearTimeout(redirectTimer);
    }, [navigate]);

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

export default GradeAnalyze;
