import { useQuery } from "react-query";
import api from "../api/api";

// Fetch total clicks
export const useFetchTotalClicks = (token, onError) => {
  return useQuery(
    ["url-totalclicks"], // Unique key
    async () => {
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
    {
      select: (data) => {
        if (!data || Object.keys(data).length === 0) {
          return []; 
        }

        return Object.keys(data)
          .sort()
          .map((key) => ({
            clickDate: key,
            count: data[key],
          }));
      },
      onError,
      staleTime: 5000,
    }
  );
};

// Fetch user's short URLs
export const useFetchMyShortUrls = (token, onError) => {
  return useQuery(
    ["my-shorturls"], // IMPORTANT: unique key
    async () => {
      const res = await api.get("/api/urls/myurls", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    {
      select: (data) =>
        [...data].sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        ),
      onError,
      staleTime: 5000,
    }
  );
};
