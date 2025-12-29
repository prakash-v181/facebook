import axiosInstance from "./url.service";

// CREATE POST
export const createPost = async (postData) => {
  try {
    const result = await axiosInstance.post("/posts/posts", postData);
    return result?.data?.data;
  } catch (error) {
    console.error("Create Post Error:", error);
    throw error;
  }
};

// GET ALL POSTS
export const getAllPosts = async () => {
  try {
    const result = await axiosInstance.get("/posts/posts");
    return result?.data?.data;
  } catch (error) {
    console.error("Get All Posts Error:", error);
    throw error;
  }
};

// LIKE POST
export const likePost = async (postId) => {
  try {
    const result = await axiosInstance.post(`/posts/posts/likes/${postId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("Like Post Error:", error);
    throw error;
  }
};

// COMMENT ON POST
export const commentsPost = async (postId, comment) => {
  try {
    const result = await axiosInstance.post(`/posts/posts/comments/${postId}`, comment);
    return result?.data?.data;
  } catch (error) {
    console.error("Comment Error:", error);
    throw error;
  }
};

// SHARE POST
export const sharePost = async (postId) => {
  try {
    const result = await axiosInstance.post(`/posts/posts/share/${postId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("Share Post Error:", error);
    throw error;
  }
};

// GET ALL POSTS OF A USER
export const getAllUserPosts = async (userId) => {
  try {
    const result = await axiosInstance.get(`/posts/posts/user/${userId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("Get User Posts Error:", error);
    throw error;
  }
};

// STORY ENDPOINTS

// CREATE STORY
export const createStory = async (storyData) => {
  try {
    const result = await axiosInstance.post("/posts/story", storyData);
    return result?.data?.data;
  } catch (error) {
    console.error("Create Story Error:", error);
    throw error;
  }
};

// GET ALL STORIES
export const getAllStory = async () => {
  try {
    const result = await axiosInstance.get("/posts/story");
    return result?.data?.data;
  } catch (error) {
    console.error("Get All Story Error:", error);
    throw error;
  }
};
