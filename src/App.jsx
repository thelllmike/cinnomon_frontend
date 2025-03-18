// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import SideBar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import DiseaseIdentifier from "./pages/DiseaseIdentifier";
import AgeIdentifier from "./pages/AgeIdentifier";
import "./App.css";
import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

// Disease-related pages
import DiseaseAnalyze from "./pages/DiseaseAnalyze";
import DiseaseResultPage from "./pages/DiseaseResultPage";

// Stick Disease pages
import StickDiseaseAnalyze from "./pages/StickDiseaseAnalyze"; // New page
import StickDiseaseIdentifier from "./pages/StickDiseaseIdentifier"; // New page
import StickDiseaseResultPage from "./pages/StickDiseaseResultPage"; // New page

// Age-related pages
import AgeAnalyze from "./pages/AgeAnalyze";
import AgeResults from "./pages/AgeResultPage";

// Price-related pages
import CinnamonPricePrediction from "./pages/Price";
import PriceResultsPage from "./pages/PriceResult";
import PriceAnalyze from "./pages/PriceAnalyze";

// Grade-related pages
import GradeIdentifier from "./pages/GradeIdentifier";
import GradeAnalyze from "./pages/GradeAnalyze";
import GradeResult from "./pages/GradeResult";

// Condition-related pages (NEW)
import ConditionIdentifier from "./pages/ConditionIdentifier";
import ConditionAnalyze from "./pages/ConditionAnalyze";
import ConditionResultPage from "./pages/ConditionResultPage";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="flex bg-green-600">
        <SideBar />
        <div className="flex-1 p-4">
          {/* USER MENU */}
          <div className="flex justify-end mb-4">
            <motion.div
              className="flex items-center cursor-pointer rounded-full text-white px-2"
              whileHover={{ scale: 1.05 }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaCircleUser />
              <span className="mx-2">Jon Doe</span>
              {menuOpen ? <MdArrowDropUp size={24} /> : <MdArrowDropDown size={24} />}
            </motion.div>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="absolute bg-white right-0 top-12 w-48 rounded-lg shadow-xl z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 rounded-t-lg cursor-pointer">
                      Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Settings
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 text-red-500 rounded-b-lg cursor-pointer">
                      Logout
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MAIN CONTENT */}
          <div className="w-full h-[92%] mt-10 bg-[#F6F6F6] rounded-3xl p-6 shadow-lg">
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Disease Pages */}
              <Route path="/disease-identifier" element={<DiseaseIdentifier />} />
              <Route path="/disease-analyze" element={<DiseaseAnalyze />} />
              <Route path="/disease-result" element={<DiseaseResultPage />} />

              {/* Stick Disease Pages */}
              <Route path="/stick-disease-identifier" element={<StickDiseaseIdentifier />} />
              <Route path="/stick-disease-analyze" element={<StickDiseaseAnalyze />} />
              <Route path="/stick-disease-result" element={<StickDiseaseResultPage />} />

              {/* Age Pages */}
              <Route path="/age-identifier" element={<AgeIdentifier />} />
              <Route path="/age-analyze" element={<AgeAnalyze />} />
              <Route path="/age-result" element={<AgeResults />} />

              {/* Price Pages */}
              <Route path="/price-identifier" element={<CinnamonPricePrediction />} />
              <Route path="/price-analyze" element={<PriceAnalyze />} />
              <Route path="/price-result" element={<PriceResultsPage />} />

              {/* Grade Pages */}
              <Route path="/grade-identifier" element={<GradeIdentifier />} />
              <Route path="/grade-analyze" element={<GradeAnalyze />} />
              <Route path="/grade-prediction" element={<GradeResult />} />

              {/* NEW: Condition Pages */}
              <Route path="/condition-identifier" element={<ConditionIdentifier />} />
              <Route path="/condition-analyze" element={<ConditionAnalyze />} />
              <Route path="/condition-result" element={<ConditionResultPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
