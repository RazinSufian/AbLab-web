import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://3p3xvw09xg.execute-api.ap-south-1.amazonaws.com/dev",
  headers: {
    "Content-Type": "application/json",
    // Add more headers here if needed
  },
});

export default axiosInstance;
