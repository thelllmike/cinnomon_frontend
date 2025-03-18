import { useLocation, Link } from "react-router-dom";

const PriceResultsPage = () => {
  const location = useLocation();

  // The backend likely returns: year, month, grade, predicted_category, predicted_price_LKR
  const {
    year,
    month,
    grade,
    predicted_category,
    predicted_price_LKR,
  } = location.state || {};

  // If no data was passed, handle that case
  if (!year || !month || !grade) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-8">No prediction data found.</h1>
        <Link to="/price-prediction">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-8">Got your prediction!</h1>

        <div className="bg-green-600/10 p-8 rounded-lg mb-8">
          <div className="space-y-6">
            <div>
              <span className="text-gray-700 font-medium">Year: </span>
              <span className="text-green-600 font-medium">{year}</span>
            </div>

            <div>
              <span className="text-gray-700 font-medium">Month: </span>
              <span className="text-green-600 font-medium">{month}</span>
            </div>

            <div>
              <span className="text-gray-700 font-medium">Grade: </span>
              <span className="text-green-600 font-medium">{grade}</span>
            </div>

            <div>
              <span className="text-gray-700 font-medium">Category: </span>
              <span className="text-green-600 font-medium">{predicted_category}</span>
            </div>

            <div>
              <span className="text-gray-700 font-medium">Predicted price (LKR): </span>
              <span className="text-green-600 font-medium">{predicted_price_LKR}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Link to="/price-prediction">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Predict Another
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PriceResultsPage;
