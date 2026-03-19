import api from "./api.js";

// ── Analytics API ─────────────────────────────────────────────────────────────

export const getTotalClicksApi = (startDate, endDate) =>
  api.get(`/api/analytics/totalClicks?startDate=${startDate}&endDate=${endDate}`);

export const getShortLinkDailyClicksApi = (shortUrl, startDate, endDate) =>
  api.get(`/api/analytics/${shortUrl}/daily?startDate=${startDate}&endDate=${endDate}`);

export const getDeviceAnalyticsApi = (shortUrl) =>
  api.get(`/api/analytics/${shortUrl}/device`);

export const getBrowserAnalyticsApi = (shortUrl) =>
  api.get(`/api/analytics/${shortUrl}/browser`);

export const getCountryAnalyticsApi = (shortUrl) =>
  api.get(`/api/analytics/${shortUrl}/country`);
