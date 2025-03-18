// src/pages/GradeIdentifier.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdCloudUpload, MdClose, MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

const GradeIdentifier = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Fake "upload" progress for local UI
  const uploadFile = (file) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;

        setFiles((prevFiles) => {
          return prevFiles.map((f) => {
            if (f.id === file.id) {
              return { ...f, progress };
            }
            return f;
          });
        });

        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 200); // Adjust speed as needed
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    // Filter only images: .jpg, .jpeg, .png
    const imageFiles = newFiles.filter(
      (file) =>
        file.type.includes("jpeg") ||
        file.type.includes("jpg") ||
        file.type.includes("png")
    );

    // Add ID + progress
    const filesWithProgress = imageFiles.map((file) => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...filesWithProgress]);

    // Start fake "upload" simulation
    filesWithProgress.forEach((f) => {
      uploadFile(f);
    });
  };

  const removeFile = (id) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.id !== id));
  };

  const getFileTypeLabel = (type) => {
    if (type.includes("jpeg") || type.includes("jpg")) return "JPG";
    if (type.includes("png")) return "PNG";
    return "IMG";
  };

  const formatFileSize = (size) => {
    const kb = size / 1024;
    if (kb < 1000) {
      return `${Math.round(kb)}KB`;
    }
    return `${(kb / 1024).toFixed(1)}MB`;
  };

  const completedFiles = files.filter((f) => f.progress === 100);
  const uploadingFiles = files.filter((f) => f.progress < 100);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">
          Upload your images for 
          <span className="text-green-600"> Grade Detection</span>
        </h1>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-green-200/40 border-green-300 transition-all ${
          isDragging ? "border-green-500 bg-green-100" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ minHeight: "200px" }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <MdCloudUpload className="text-green-600 text-4xl" />
          </div>

          <p className="text-lg font-medium mb-2">
            Drag and drop your files or{" "}
            <span
              className="text-green-600 cursor-pointer hover:underline"
              onClick={() => fileInputRef.current.click()}
            >
              choose file
            </span>
          </p>

          <p className="text-gray-500 text-sm">
            Max file size: 100 MB | Only PNG, JPG, JPEG accepted
          </p>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={handleFileInputChange}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {/* Completed Files */}
        {completedFiles.length > 0 && (
          <div className="mt-6 space-y-4">
            {completedFiles.map((file) => (
              <motion.div
                key={file.id}
                className="border border-gray-200 rounded-xl p-3 flex items-center justify-between bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-4">
                    <div
                      className={`text-xs font-bold text-white ${
                        file.type.includes("png")
                          ? "bg-blue-500"
                          : "bg-green-500"
                      } rounded w-8 h-5 flex items-center justify-center`}
                    >
                      {getFileTypeLabel(file.type)}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)} / 5MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    onClick={() => removeFile(file.id)}
                  >
                    <MdClose size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Uploading Files */}
        {uploadingFiles.length > 0 && (
          <div className="mt-6 space-y-4">
            {uploadingFiles.map((file) => (
              <motion.div
                key={file.id}
                className="border border-gray-200 rounded-xl p-3 flex items-center justify-between bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-4">
                    <div
                      className={`text-xs font-bold text-white ${
                        file.type.includes("png")
                          ? "bg-blue-500"
                          : "bg-green-500"
                      } rounded w-8 h-5 flex items-center justify-center`}
                    >
                      {getFileTypeLabel(file.type)}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)} / 5MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  {/* Progress circle */}
                  <div className="flex items-center mr-3">
                    <div className="relative w-10 h-10">
                      <svg className="w-10 h-10 transform -rotate-90">
                        <circle
                          cx="20"
                          cy="20"
                          r="15"
                          fill="none"
                          stroke="#e6e6e6"
                          strokeWidth="3"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="15"
                          fill="none"
                          stroke="#0C9B4F"
                          strokeWidth="3"
                          strokeDasharray={2 * Math.PI * 15}
                          strokeDashoffset={
                            2 * Math.PI * 15 * (1 - file.progress / 100)
                          }
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs">
                        {file.progress}%
                      </div>
                    </div>
                  </div>

                  <button
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    onClick={() => removeFile(file.id)}
                  >
                    <MdClose size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Analyze Button: sends files to GradeAnalyze via router state */}
        {files.length > 0 && (
          <motion.div
            className="flex justify-end mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/grade-analyze"
              state={{ files }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
            >
              Analyze
              <MdArrowForward className="ml-2" size={20} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GradeIdentifier;
