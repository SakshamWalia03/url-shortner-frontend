import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useFetchTotalClicks = (token, startDate, endDate, onError) => {
  const isValidRange =
    startDate &&
    endDate &&
    new Date(endDate) >= new Date(startDate);

  return useQuery({
    queryKey: ["url-totalclicks", startDate, endDate],
    queryFn: async () => {
      const res = await api.get(
        `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    enabled: !!token && isValidRange,
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