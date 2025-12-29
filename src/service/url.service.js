import axios from "axios";

const ApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://backendfacebook-kki3.onrender.com";

const axiosInstance = axios.create({
  baseURL: ApiUrl,
  withCredentials: true, // 👈 VERY IMPORTANT for auth cookies
});

export default axiosInstance;
