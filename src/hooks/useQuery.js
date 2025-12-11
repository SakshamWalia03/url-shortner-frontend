import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

// Fetch total clicks
export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["url-totalclicks"],
    queryFn: async () => {
      const res = await api.get(
        "/api/urls/totalClicks?startDate=2025-01-01&endDate=2025-12-31",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    enabled: !!token,
    staleTime: 5000,
    retry: false,
    onError,
    select: (data) => {
      if (!data || Object.keys(data).length === 0) return [];
      return Object.keys(data)
        .sort((a, b) => new Date(a) - new Date(b))
        .map((key) => ({
          clickDate: key,
          count: data[key],
        }));
    },
  });
};

// Fetch user's short URLs
export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ["my-shorturls"],
    queryFn: async () => {
      const res = await api.get("/api/urls/myurls", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!token,
    staleTime: 5000,
    retry: false,
    onError,
    select: (data) =>
      [...data].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      ),
  });
};