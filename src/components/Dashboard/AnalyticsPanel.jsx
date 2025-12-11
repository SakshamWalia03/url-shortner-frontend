import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Hourglass } from "react-loader-spinner";
import Graph from "./Graph";
import api from "../../api/api";

const AnalyticsPanel = ({ shortUrl, token }) => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loader, setLoader] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      startDate: "2025-01-01",
      endDate: "2025-12-31",
    },
  });

  const fetchAnalytics = async (formData) => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${shortUrl}?startDate=${formData.startDate}T00:00:00&endDate=${formData.endDate}T23:59:59`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const sortedData = [...data].sort(
        (a, b) => new Date(a.clickDate) - new Date(b.clickDate)
      );
      setAnalyticsData(sortedData);
    } catch (error) {
      toast.error("Error fetching details")
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    handleSubmit(fetchAnalytics)();
  }, []);

  return (
    <div className="mt-3 p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 max-w-full font-roboto">

      {/* Panel Header */}
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 tracking-wide">
        Analytics Overview
      </h2>

      {/* FILTER FORM */}
      <form
        onSubmit={handleSubmit(fetchAnalytics)}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-10"
      >
        {/* START DATE */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            {...register("startDate", { required: true })}
            className="border rounded-lg px-3 py-2 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.startDate && (
            <span className="text-red-600 text-sm mt-1">
              Start date is required
            </span>
          )}
        </div>

        {/* END DATE */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            {...register("endDate", { required: true })}
            className="border rounded-lg px-3 py-2 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.endDate && (
            <span className="text-red-600 text-sm mt-1">
              End date is required
            </span>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg shadow-md transition-all w-full sm:w-auto font-semibold"
        >
          Refresh
        </button>
      </form>

      {/* ANALYTICS DISPLAY */}
      {loader ? (
        <div className="flex justify-center items-center h-72">
          <div className="flex flex-col items-center gap-2">
            <Hourglass
              visible={true}
              height="50"
              width="50"
              ariaLabel="hourglass-loading"
              colors={["#4f46e5", "#818cf8"]}
            />
            <p className="text-slate-700 font-medium">Loading analytics...</p>
          </div>
        </div>
      ) : (
        <div className="h-[26rem] relative rounded-xl overflow-hidden p-2 shadow-inner">
          {analyticsData.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 backdrop-blur-xs rounded-xl">
              <h1 className="text-slate-800 font-serif sm:text-2xl text-[20px] font-bold mb-1">
                No Data For This Time Period
              </h1>

              <h3 className="sm:w-96 w-[90%] mx-auto text-center sm:text-lg text-sm text-slate-600">
                Share your short link to start seeing engagement analytics.
              </h3>
            </div>
          )}

          {/* Graph */}
          <div className="h-full w-full animate-fadeIn">
            <Graph graphData={analyticsData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPanel;