import api from "./api.js";

// Auth API

export const loginApi = (data) =>
  api.post("/api/auth/public/login", data);

export const registerApi = (data) =>
  api.post("/api/auth/public/register", data);

export const logoutApi = () =>
  api.post("/api/auth/logout");

export const refreshTokenApi = () =>
  api.post("/api/auth/public/refresh", {});
