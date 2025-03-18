import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaCompass,
    FaSquareVirus,
    FaSeedling,
    FaChartColumn,
    FaAnglesLeft,
    FaBorderAll,
    FaDroplet,
} from "react-icons/fa6";

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaCompass size={collapsed ? 22 : 20} />,
        },
        {
            path: "/disease-identifier",
            name: "Leaves Disease Identifier",
            icon: <FaSquareVirus size={collapsed ? 22 : 20} />,
            subPaths: ["/disease-analyze", "/disease-result"], // Sub paths for active state
        },
        {
            path: "/stick-disease-identifier",
            name: "Stick Disease identifier",
            icon: <FaSquareVirus size={collapsed ? 22 : 20} />,
        },
        {
            path: "/age-identifier",
            name: "Age Identifier",
            icon: <FaSeedling size={collapsed ? 22 : 20} />,
            subPaths: ["/age-analyze", "/age-result"], // Sub paths for active state
        },
        {
            path: "/price-identifier",
            name: "Price Prediction",
            icon: <FaChartColumn size={collapsed ? 22 : 20} />,
            subPaths: ["/price-analyze", "/price-prediction"], // Sub paths for active state
        },
        {
            path: "/grade-identifier",
            name: "Grading",
            icon: <FaBorderAll size={collapsed ? 22 : 20} />,
            subPaths: ["/grade-analyze", "/grade-result"], // Sub paths for active state
        },
        {
            path: "/condition-identifier",
            name: "Condition Assessment",
            icon: <FaDroplet size={collapsed ? 22 : 20} />,
        },
       
    ];

    // Function to check active state
    const isActive = (item) => {
        if (item.path === "/dashboard") {
            return (
                location.pathname === "/" || location.pathname === "/dashboard"
            );
        }
        if (item.subPaths) {
            return (
                location.pathname === item.path ||
                item.subPaths.includes(location.pathname)
            );
        }
        return location.pathname === item.path;
    };

    return (
        <motion.div
            className="h-auto min-h-screen bg-green-600 text-white py-4 flex flex-col"
            animate={{ width: collapsed ? "85px" : "280px" }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className={`px-4 ${collapsed ? "flex justify-center" : "mb-6"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {collapsed ? (
                    <div className="w-8 h-8 relative">
                        <div className="flex items-center w-40">
                            <img src="./cinna-logo.png" alt="Logo" />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center w-48">
                        <img src="./cinna-logo.png" alt="Logo" />
                    </div>
                )}
            </motion.div>

            <div
                className={`flex-grow overflow-hidden ${
                    collapsed ? "mt-5" : "-mt-5"
                }`}
            >
                {menuItems.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: 0.1 * index, // Stagger the animation for each item
                        }}
                    >
                        <Link
                            to={item.path}
                            className={`flex items-center px-4 py-3 my-2 mx-2 font-medium rounded-lg transition-colors duration-200 
                                ${
                                    isActive(item)
                                        ? "bg-white text-green-600"
                                        : "hover:bg-green-700 hover:text-white"
                                }`}
                        >
                            <div
                                className={`${collapsed ? "mx-auto" : "mr-3"}`}
                            >
                                {item.icon}
                            </div>
                            {!collapsed && (
                                <span className="text-lg">{item.name}</span>
                            )}
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="px-2 mt-auto">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center hover:bg-green-800/20 p-3 rounded-lg transition-colors border-2 border-white"
                >
                    <motion.div
                        animate={{ rotate: collapsed ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ms-2"
                    >
                        <FaAnglesLeft size={collapsed ? 25 : 20} />
                    </motion.div>
                    {!collapsed && (
                        <span className="ml-2 font-semibold">Collapse</span>
                    )}
                </button>
            </div>
        </motion.div>
    );
};

export default SideBar;
