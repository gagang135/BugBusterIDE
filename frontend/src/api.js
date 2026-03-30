import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

// Function to send code for autocorrection
export const autoCorrectCode = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/autocorrect`, payload);
    return response.data;
  } catch (error) {
    console.error("Autocorrect API Error:", error.message);
    return { error: error.message };
  }
};

// Function to run code via Docker backend
export const runCode = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/run`, payload);
    return response.data;
  } catch (error) {
    console.error("Run API Error:", error.message);
    return { error: error.message };
  }
};

// Optional: function to check backend health
export const checkBackend = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Backend health check failed:", error.message);
    return { status: "unreachable" };
  }
};
