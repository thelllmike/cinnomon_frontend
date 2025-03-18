import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Replace with your FastAPI server URL

// Function to call the predict-image API
export const predictImageAge = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await axios.post(
      `${API_BASE_URL}/age-detection/predict-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error predicting image age:", error);
    throw error;
  }
};
export const predictPrice = async (year, month, grade) => {
    try {
      const payload = {
        year: Number(year),
        month: convertMonthToNumber(month),
        grade: grade,
      };
  
      const response = await axios.post(`${API_BASE_URL}/price/predict-price`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // For example, returns:
      // {
      //   "year": 2015,
      //   "month": 2,
      //   "grade": "C4",
      //   "predicted_category": "Medium",
      //   "predicted_price_LKR": 1641.46
      // }
      return response.data;
    } catch (error) {
      console.error("Error predicting price:", error);
      throw error;
    }
  };
  
  // Optionally convert month name to a numeric month if the API expects a number
  function convertMonthToNumber(monthName) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const index = months.findIndex(
      (m) => m.toLowerCase() === monthName?.toLowerCase()
    );
    return index >= 0 ? index + 1 : 0; // return 0 if not found
  }
  export const predictDiseases = async (files) => {
    try {
      const results = [];
  
      // Process each file one by one (sequentially).
      // If you prefer parallel, you could use Promise.all, but 
      // be mindful of concurrency limits.
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
  
        // Each file hits the same endpoint for a prediction
        // e.g. { predicted_class: "healthy_leaves", confidence: 0.9454 }
        const response = await axios.post(
          `${API_BASE_URL}/disease-detection/predict-disease`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        results.push(response.data);
      }
  
      return results; // e.g. [ { predicted_class, confidence }, { ... }, ... ]
    } catch (error) {
      console.error("Error predicting diseases:", error);
      throw error;
    }
  };

  export const predictCondition = async (files) => {
    try {
      const results = [];
  
      // Process each file one at a time (sequential).
      // If you prefer parallel calls, you can use Promise.all().
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
  
        // Endpoint: /condition_detection/predict-condition
        const response = await axios.post(
          `${API_BASE_URL}/condition_detection/predict-condition`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Each response might be { "predicted_class": "level_1", "confidence": 0.49 }
        results.push(response.data);
      }
  
      return results;
    } catch (error) {
      console.error("Error predicting condition:", error);
      throw error;
    }
  };

  export const predictGrade = async (files) => {
    try {
      const results = [];
  
      // You can process each file sequentially or use Promise.all for parallel
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
  
        const response = await axios.post(
          `${API_BASE_URL}/prediction/predict`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        results.push(response.data);
      }
  
      return results;
    } catch (error) {
      console.error("Error predicting grade:", error);
      throw error;
    }
  };