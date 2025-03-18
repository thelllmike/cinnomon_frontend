import React from "react";
import { Link, useNavigate } from "react-router-dom";

const GradeResult = ({ results = [] }) => {
    // If no results are provided, use sample data for demonstration
    const sampleResults = [
        {
            id: 1,
            imageSrc:
                "https://th.bing.com/th/id/OIP.VsT9CA776q7viWiiyWIdIAHaHa?rs=1&pid=ImgDetMain",
            imageAlt: "Cinnamon Leaf with grade",
            grade: "Cinnamon Leaf Spot",
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
            grade: "Black Sooty Mold",
            confidenceLevel: "82%",
            suggestions: [
                "Control infestations of sap-sucking insects (e.g., aphids, whiteflies).",
                "Wash leaves with a mild soap solution to remove the mold.",
            ],
        },
        {
            id: 3,
            imageSrc:
                "https://th.bing.com/th/id/R.bf7ea6c464bd98110accbe562efd8556?rik=1GFn3Ka0XH%2bnqQ&pid=ImgRaw&r=0",
            imageAlt: "Leaf with Black Sooty Mold",
            grade: "Black Sooty Mold",
            confidenceLevel: "82%",
            suggestions: [
                "Control infestations of sap-sucking insects (e.g., aphids, whiteflies).",
                "Wash leaves with a mild soap solution to remove the mold.",
            ],
        },
        {
            id: 4,
            imageSrc:
                "https://th.bing.com/th/id/R.bf7ea6c464bd98110accbe562efd8556?rik=1GFn3Ka0XH%2bnqQ&pid=ImgRaw&r=0",
            imageAlt: "Leaf with Black Sooty Mold",
            grade: "Black Sooty Mold",
            confidenceLevel: "82%",
            suggestions: [
                "Control infestations of sap-sucking insects (e.g., aphids, whiteflies).",
                "Wash leaves with a mild soap solution to remove the mold.",
            ],
        },
    ];

    // Use provided results or sample data if no results are provided
    const displayResults = results.length > 0 ? results : sampleResults;
    const navigate = useNavigate();

    const handleIdentifyAnother = () => {
        navigate("/"); // Navigate back to the upload page
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

                        <div className="">
                            <img
                                src={result.imageSrc}
                                alt={result.imageAlt}
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                        </div>
                        <div className="p-4 bg-green-200/40">
                            <p className="mb-2">
                                <span className="font-medium">grade:</span>{" "}
                                <span className="text-green-600 font-medium">
                                    {result.grade}
                                </span>
                            </p>
                            <p className="mb-4">
                                <span className="font-medium">
                                    Confidence Level:
                                </span>{" "}
                                <span className="text-green-600 font-medium">
                                    {result.confidenceLevel}
                                </span>
                            </p>
                            <div>
                                <p className="font-medium mb-2">Suggestions:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    {result.suggestions.map(
                                        (suggestion, idx) => (
                                            <li key={idx}>{suggestion}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-6">
                <Link to="/grade-identifier">
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

export default GradeResult;
