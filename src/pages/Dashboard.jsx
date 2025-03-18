// pages/Dashboard.jsx
import { motion } from "framer-motion";
import Header from "../components/Header";

const Dashboard = () => {
    return (
        <div>
            <Header title="Dashboard" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-green-50 p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">
                            Recent Analysis
                        </h2>
                        <p className="text-gray-600">
                            View your recent cinnamon leaf analysis results
                        </p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">
                            Health Status
                        </h2>
                        <p className="text-gray-600">
                            Overall health status of your cinnamon plants
                        </p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">
                            Recommendations
                        </h2>
                        <p className="text-gray-600">
                            Custom recommendations for your cinnamon garden
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
