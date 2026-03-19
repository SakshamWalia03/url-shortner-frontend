import { useQuery } from "@tanstack/react-query";
import {
  getTotalClicksApi,
  getShortLinkDailyClicksApi,
  getDeviceAnalyticsApi,
  getBrowserAnalyticsApi,
  getCountryAnalyticsApi,
} from "../api/analytics.api.js";
import { getMyUrlsApi } from "../api/urls.api.js";

// ── Total clicks for the whole account (date range) ──────────────────────────
export const useFetchTotalClicks = (token, startDate, endDate, onError) => {
  const isValidRange =
    startDate && endDate && new Date(endDate) >= new Date(startDate);

  return useQuery({
    queryKey: ["url-totalclicks", startDate, endDate],
    queryFn: async () => {
      const res = await getTotalClicksApi(startDate, endDate);
      return res.data;
    },
    enabled: !!token && isValidRange,
    staleTime: 1000 * 60,
    retry: false,
    onError,
    select: (data) => {
      if (!data || data.length === 0) return [];
      return data.sort((a, b) => new Date(a.clickDate) - new Date(b.clickDate));
    },
  });
};

// ── Short URL list for current user ──────────────────────────────────────────
export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ["my-shorturls"],
    queryFn: async () => {
      const res = await getMyUrlsApi();
      return res?.data ?? [];
    },
    enabled: !!token,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: [],
    onError,
    select: (data) => {
      if (!Array.isArray(data)) return [];
      return [...data].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
      );
    },
  });
};

// ── Per-link daily click analytics ───────────────────────────────────────────
export const useFetchShortLinkTotalClicks = (
  token,
  shortLink,
  startDate,
  endDate,
  onError,
) => {
  const isValidRange =
    startDate && endDate && new Date(endDate) >= new Date(startDate);

  return useQuery({
    queryKey: ["shortlink-totalclicks", shortLink, startDate, endDate],
    queryFn: async () => {
      const res = await getShortLinkDailyClicksApi(shortLink, startDate, endDate);
      return res.data;
    },
    enabled: !!token && !!shortLink && isValidRange,
    staleTime: 1000 * 30,
    retry: false,
    onError,
    select: (data) => {
      if (!data || data.length === 0) return [];
      return data.sort((a, b) => new Date(a.clickDate) - new Date(b.clickDate));
    },
  });
};

// ── Device analytics ─────────────────────────────────────────────────────────
export const useFetchDeviceAnalytics = (shortUrl, token, onError) =>
  useQuery({
    queryKey: ["device-analytics", shortUrl],
    queryFn: async () => {
      const res = await getDeviceAnalyticsApi(shortUrl);
      return res?.data ?? [];
    },
    enabled: !!(token && shortUrl),
    staleTime: 1000 * 60,
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: [],
    onError,
    select: (data) => {
      if (Array.isArray(data)) return data;
      if (data && typeof data === "object")
        return Object.entries(data).map(([key, value]) => ({ name: key, value }));
      return [];
    },
  });

// ── Browser analytics ─────────────────────────────────────────────────────────
export const useFetchBrowserAnalytics = (shortUrl, token, onError) =>
  useQuery({
    queryKey: ["browser-analytics", shortUrl],
    queryFn: async () => {
      const res = await getBrowserAnalyticsApi(shortUrl);
      return res?.data ?? [];
    },
    enabled: !!(token && shortUrl),
    staleTime: 1000 * 60,
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: [],
    onError,
    select: (data) => {
      if (Array.isArray(data)) return data;
      if (data && typeof data === "object")
        return Object.entries(data).map(([key, value]) => ({ name: key, value }));
      return [];
    },
  });

// ── Country analytics ─────────────────────────────────────────────────────────
export const useFetchCountryAnalytics = (shortUrl, token, onError) =>
  useQuery({
    queryKey: ["country-analytics", shortUrl],
    queryFn: async () => {
      const res = await getCountryAnalyticsApi(shortUrl);
      return res?.data ?? [];
    },
    enabled: !!(token && shortUrl),
    staleTime: 1000 * 60,
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: [],
    onError,
    select: (data) => {
      if (Array.isArray(data)) return data;
      if (data && typeof data === "object")
        return Object.entries(data).map(([key, value]) => ({ name: key, value }));
      return [];
    },
  });
