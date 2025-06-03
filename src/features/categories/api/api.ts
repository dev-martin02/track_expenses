import type { CategoryFormData } from "../types";

const backendUrl = "http://localhost:3000/";

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${backendUrl}categories`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const createCategory = async (category: CategoryFormData) => {
  try {
    const response = await fetch(`${backendUrl}categories`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    const { message } = await response.json();
    console.log(message);
    return message;
  } catch (error) {
    console.error("there was an error", error);
  }
};

export const updateCategory = async (category: CategoryFormData) => {
  try {
    const response = await fetch(`${backendUrl}categories`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    const { message } = await response.json();
    console.log(message);
    return message;
  } catch (error) {
    console.error("there was an error", error);
  }
};

export const deleteCategory = async (category: CategoryFormData) => {
  try {
    const response = await fetch(`${backendUrl}categories`, {
      method: "delete",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    const { message } = await response.json();
    console.log(message);
    return message;
  } catch (error) {
    console.error("there was an error", error);
  }
};
