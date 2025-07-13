// src/api/courseService.js
import axiosInstance from "./axiosInstance";

export const getCourses = async () => {
  const response = await axiosInstance.get("/director/courses/");
  return response.data;
};

export const addCourse = async (newCourse) => {
  const response = await axiosInstance.post("/director/courses/", newCourse);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axiosInstance.delete(`/director/courses/${id}/`);
  return response.data;
};
