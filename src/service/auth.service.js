import axiosInstance from "./url.service";

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || "Registration failed",
    };
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || "Invalid email or password",
    };
  }
};

// Logout user
export const logout = async () => {
  try {
    const response = await axiosInstance.get("/auth/logout");
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: "Logout failed",
    };
  }
};

// Check user authentication
export const checkUserAuth = async () => {
  try {
    const response = await axiosInstance.get("/users/check-auth");

    if (response.data?.status === "success") {
      return { isAuthenticated: true, user: response.data.data };
    } else {
      return { isAuthenticated: false };
    }
  } catch (error) {
    return { isAuthenticated: false };
  }
};
