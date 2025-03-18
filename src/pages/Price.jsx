import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PricePredictionPage = () => {
  const navigate = useNavigate();

  // State for selected values
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);

  // Dropdown states
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [gradeDropdownOpen, setGradeDropdownOpen] = useState(false);

  // Generate array of years (1950 to 2050)
  const years = Array.from({ length: 101 }, (_, i) => 1950 + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const grades = ["Alba", "C4", "C5", "M4", "M5", "H1"];

  // Refs for closing dropdowns on outside click
  const yearDropdownRef = useRef(null);
  const monthDropdownRef = useRef(null);
  const gradeDropdownRef = useRef(null);

  // Close dropdowns if user clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(e.target)) {
        setYearDropdownOpen(false);
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(e.target)) {
        setMonthDropdownOpen(false);
      }
      if (gradeDropdownRef.current && !gradeDropdownRef.current.contains(e.target)) {
        setGradeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to current year when dropdown opens
  useEffect(() => {
    if (yearDropdownOpen) {
      const currentYearElement = document.getElementById(
        `year-${new Date().getFullYear()}`
      );
      if (currentYearElement) {
        currentYearElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [yearDropdownOpen]);

  // Toggle dropdowns
  const toggleYearDropdown = () => {
    setYearDropdownOpen(!yearDropdownOpen);
    setMonthDropdownOpen(false);
    setGradeDropdownOpen(false);
  };
  const toggleMonthDropdown = () => {
    setMonthDropdownOpen(!monthDropdownOpen);
    setYearDropdownOpen(false);
    setGradeDropdownOpen(false);
  };
  const toggleGradeDropdown = () => {
    setGradeDropdownOpen(!gradeDropdownOpen);
    setYearDropdownOpen(false);
    setMonthDropdownOpen(false);
  };

  // Selection handlers
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
  };
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setMonthDropdownOpen(false);
  };
  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setGradeDropdownOpen(false);
  };

  // Handle final predict button
  const handlePredict = () => {
    // Basic validation
    if (!selectedYear || !selectedMonth || !selectedGrade) {
      alert("Please select a year, month, and grade first.");
      return;
    }

    // Navigate to /price-analyze, passing user’s selections as state
    navigate("/price-analyze", {
      state: {
        year: selectedYear,     // e.g. 2025
        month: selectedMonth,   // e.g. "March"
        grade: selectedGrade,   // e.g. "C4"
      },
    });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-8 text-gray-800 mt-2">
          Select a year, month, and grade to predict prices
        </h1>
      </div>

      <div className="p-8 flex flex-col">
        <motion.div
          className="p-8 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-8">
            {/* Year Selection */}
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
              <label className="w-full md:w-32 text-gray-700 font-medium">
                Select year
              </label>
              <div className="relative w-full md:w-64" ref={yearDropdownRef}>
                <button
                  onClick={toggleYearDropdown}
                  className="w-full p-3 text-left border border-gray-300 rounded-lg flex justify-between items-center bg-white hover:border-green-600"
                >
                  <span className={selectedYear ? "text-gray-800" : "text-gray-500"}>
                    {selectedYear || "Choose a year"}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      yearDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" strokeWidth="2" />
                  </svg>
                </button>
                {yearDropdownOpen && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-2 max-h-60 overflow-y-auto">
                      {years.map((year) => (
                        <button
                          id={`year-${year}`}
                          key={year}
                          onClick={() => handleYearSelect(year)}
                          className={`w-full p-2 text-left rounded-md transition-colors ${
                            selectedYear === year
                              ? "bg-green-600 text-white"
                              : "hover:bg-green-100 text-gray-800"
                          } ${
                            year === new Date().getFullYear()
                              ? "border-l-4 border-green-600 font-medium"
                              : ""
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Month Selection */}
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
              <label className="w-full md:w-32 text-gray-700 font-medium">
                Select month
              </label>
              <div className="relative w-full md:w-64" ref={monthDropdownRef}>
                <button
                  onClick={toggleMonthDropdown}
                  className="w-full p-3 text-left border border-gray-300 rounded-lg flex justify-between items-center bg-white hover:border-green-600"
                >
                  <span className={selectedMonth ? "text-gray-800" : "text-gray-500"}>
                    {selectedMonth || "Choose a month"}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      monthDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" strokeWidth="2" />
                  </svg>
                </button>
                {monthDropdownOpen && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-3 grid grid-cols-2 gap-2">
                      {months.map((month) => (
                        <button
                          key={month}
                          onClick={() => handleMonthSelect(month)}
                          className={`p-2 text-center rounded-md transition-colors ${
                            selectedMonth === month
                              ? "bg-green-600 text-white"
                              : "hover:bg-green-100 text-gray-800"
                          }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Grade Selection */}
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
              <label className="w-full md:w-32 text-gray-700 font-medium">
                Select grade
              </label>
              <div className="relative w-full md:w-64" ref={gradeDropdownRef}>
                <button
                  onClick={toggleGradeDropdown}
                  className="w-full p-3 text-left border border-gray-300 rounded-lg flex justify-between items-center bg-white hover:border-green-600"
                >
                  <span className={selectedGrade ? "text-gray-800" : "text-gray-500"}>
                    {selectedGrade || "Choose the grade"}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      gradeDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" strokeWidth="2" />
                  </svg>
                </button>
                {gradeDropdownOpen && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="py-2">
                      {grades.map((grade) => (
                        <button
                          key={grade}
                          onClick={() => handleGradeSelect(grade)}
                          className={`w-full p-3 text-left transition-colors ${
                            selectedGrade === grade
                              ? "bg-green-600 text-white"
                              : "hover:bg-green-100 text-gray-800"
                          }`}
                        >
                          {grade}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Predict Button */}
      <AnimatePresence>
        <motion.div
          className="flex justify-end mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={handlePredict}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
          >
            Predict prices
            <MdArrowForward className="ml-2" size={20} />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PricePredictionPage;
