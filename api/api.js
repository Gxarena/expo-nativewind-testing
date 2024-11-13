import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "https://chefli-dev-165050008712.us-central1.run.app";

const request = async (url, method = "GET", body = null, token = null, customHeaders = {}) => {
    const headers = {
        "Content-Type": "application/json", 
        ...customHeaders,
    };

  if (!token) {
    token = await AsyncStorage.getItem("access_token");
  }

  if (token) {
      headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) })
  };

  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error ${response.status}: ${errorText}`);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Auth endpoints
export const register = async (email, password) => {
    return request("/api/auth/register", "POST", { email, password });
};

export const login = async (username, password, grant_type = "password") => {
  const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
  };

  // Encode the body as a URL-encoded string
  const body = new URLSearchParams({
      grant_type,
      username,
      password,
  }).toString();

  const response = await request("/api/auth/login", "POST", body, null, headers);

  if (response.access_token) {
      await AsyncStorage.setItem("access_token", response.access_token);
  }

    return response;
};

// Recipe endpoints
export const generateRecipe = async (
    ingredients,
    appliances,
    cookingTimeMinutes,
    difficulty,
    isVegetarian,
    isVegan,
    isGlutenFree,
    token
) => {
    const body = {
        ingredients,
        appliances,
        cooking_time_minutes: cookingTimeMinutes,
        cooking_difficulty: difficulty,
        is_vegetarian: isVegetarian,
        is_vegan: isVegan,
        is_gluten_free: isGlutenFree,
    };
    return request("/api/recipes/generate", "POST", body, token);
};

export const getRecipeHistory = async (token) => {
    return request("/api/recipes/history", "GET", null, token);
};

// Image endpoints
export const getUploadUrl = async (contentType, token) => {
    return request(
        `/api/images/upload-url?content_type=${encodeURIComponent(
            contentType
        )}`,
        "POST",
        null,
        token
    );
};

export const processImage = async (imageId, token) => {
    return request(
        `/api/images/process?image_id=${encodeURIComponent(imageId)}`,
        "POST",
        null,
        token
    );
};

export const getImageHistory = async (token) => {
    return request("/api/images/history", "GET", null, token);
};
