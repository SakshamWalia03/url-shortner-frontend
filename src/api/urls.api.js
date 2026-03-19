import api from "./api.js";

// ── URL API ───────────────────────────────────────────────────────────────────

export const createShortUrlApi = (data) =>
  api.post("/api/urls/shorten", data);

export const getMyUrlsApi = () =>
  api.get("/api/urls/myurls");
