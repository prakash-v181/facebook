import axios from "axios";

const ApiUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://backendfacebook-kki3.onrender.com");

const axiosInstance = axios.create({
  baseURL: ApiUrl,
  withCredentials: true,
});

export default axiosInstance;
