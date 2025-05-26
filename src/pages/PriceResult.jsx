// src/pages/PriceResultsPage.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const PriceResultsPage = () => {
  const location = useLocation();

  // The back end now returns: { predictions: [ { year, month, grade, predicted_category, predicted_price_LKR }, … ] }
  const { predictions } = location.state || {};

  if (!predictions || !Array.isArray(predictions) || predictions.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-8">No prediction data found.</h1>
        <Link to="/price-identifier">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  // Format data for the chart
  const chartData = predictions.map((p) => ({
    year: p.year,
    price: p.predicted_price_LKR,
    category: p.predicted_category,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-8 text-center">5-Year Price Trend</h1>

      <div className="h-64 mb-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tick={{ fill: "#4A5568", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              tickFormatter={(val) => val.toLocaleString()}
              tick={{ fill: "#4A5568", fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip
              formatter={(value) => `LKR ${value.toLocaleString()}`}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#059669"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10B981" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Year", "Month", "Grade", "Category", "Price (LKR)"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {predictions.map((p) => (
              <tr key={p.year}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {p.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {p.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {p.grade}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {p.predicted_category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {p.predicted_price_LKR.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-8">
        <Link to="/price-identifier">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Predict Another
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PriceResultsPage;
