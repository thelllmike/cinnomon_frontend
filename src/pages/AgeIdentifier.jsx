import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdCloudUpload, MdClose, MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AgeIdentifier = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Separate completed files from uploading files
  const completedFiles = files.filter((file) => file.progress === 100);
  const uploadingFiles = files.filter((file) => file.progress < 100);

  // Simulate file upload progress
  const uploadFile = (file) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;

        setFiles((prevFiles) =>
          prevFiles.map((f) => (f.id === file.id ? { ...f, progress } : f))
        );

        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
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
    // Filter for only image files (JPEG, JPG, PNG)
    const imageFiles = newFiles.filter((file) =>
      file.type.match(/image\/(jpeg|png|jpg)/)
    );

    // Add progress property to each file
    const filesWithProgress = imageFiles.map((file) => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
    }));

    // Add to existing files
    setFiles((prevFiles) => [...prevFiles, ...filesWithProgress]);

    // Start upload simulation for each new file
    filesWithProgress.forEach((file) => {
      uploadFile(file);
    });
  };

  const removeFile = (id) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const getFileTypeLabel = (type) => {
    if (type.includes("jpeg") || type.includes("jpg")) return "JPG";
    if (type.includes("png")) return "PNG";
    return "IMG";
  };

  const formatFileSize = (size) => {
    const kb = size / 1024;
    return kb < 1000 ? `${Math.round(kb)}KB` : `${(kb / 1024).toFixed(1)}MB`;
  };

  // Navigate to AgeAnalyze with the first completed file
  const handleAnalyze = () => {
    if (completedFiles.length > 0) {
      navigate("/age-analyze", {
        state: { file: completedFiles[0].file },
      });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">
          Upload your image to analyze using AI-based Age Identification algorithm
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
            Max file size: 100 MB | Only PNG, JPG, JPEG files are accepted
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
        {/* Display completed files */}
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

        {/* Display uploading files */}
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
                          strokeDasharray={`${2 * Math.PI * 15}`}
                          strokeDashoffset={`${2 * Math.PI * 15 * (1 - file.progress / 100)}`}
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

        {/* Analyze Button */}
        {files.length > 0 && (
          <motion.div
            className="flex justify-end mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={handleAnalyze}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
            >
              Analyze
              <MdArrowForward className="ml-2" size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgeIdentifier;
