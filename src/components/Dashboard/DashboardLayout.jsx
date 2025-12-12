import { useState } from "react";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../../hooks/useQuery";
import Graph from "./Graph";
import ShortenPopUp from "./ShortenPopUp";
import ShortenUrlList from "./ShortenUrlList";
import { FaLink } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// MUI Components
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DashboardLayout = () => {
  const { token } = useStoreContext();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  // AUTOFILL DATES
  const currentYear = new Date().getFullYear();
  const defaultStartDate = dayjs(`${currentYear}-01-01`);
  const defaultEndDate = dayjs();

  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  function onError() {
    toast.error("Error fetching details");
  }

  const { isLoading, data: myShortenUrls, refetch } =
    useFetchMyShortUrls(token, onError);

  const {
    isLoading: loader,
    data: totalClicks,
    refetch: refetchClicks,
  } = useFetchTotalClicks(
    token,
    dayjs(startDate).format("YYYY-MM-DD"),
    dayjs(endDate).format("YYYY-MM-DD"),
    onError
  );

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form className="flex flex-col sm:flex-row justify-center gap-4 pt-8">

          {/* START DATE PICKER */}
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setValue("startDate", newValue)}
            maxDate={endDate} // Prevent selecting after endDate
            slotProps={{
              textField: {
                size: "small",
                error: false,
              },
            }}
          />

          {/* END DATE PICKER */}
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setValue("endDate", newValue)}
            minDate={startDate} // BLOCKS ALL DATES BEFORE START DATE
            slotProps={{
              textField: {
                size: "small",
                error: false,
              },
            }}
          />

        </form>
      </LocalizationProvider>

      {loader ? (
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <Loader2 className="animate-spin text-blue-500" size={50} />
        </div>
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-16">
          <div className="h-96 relative">
            {totalClicks?.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 bg-white/80 rounded-xl">
                <h1 className="text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                  No Data For This Time Period
                </h1>
                <h3 className="sm:w-96 w-[90%] text-center sm:text-lg text-sm text-slate-600">
                  Share your short link to view analytics
                </h3>
              </div>
            )}
            <Graph graphData={totalClicks} />
          </div>

          <div className="py-5 sm:text-end text-center">
            <button
              className="btn-gradient px-4 py-2 rounded-md text-white font-roboto"
              onClick={() => setShortenPopUp(true)}
            >
              Create a New Short URL
            </button>
          </div>

          <div>
            {!isLoading && myShortenUrls.length === 0 ? (
              <div className="flex justify-center pt-16">
                <div className="flex gap-2 items-center justify-center py-6 sm:px-8 px-5 rounded-md shadow-lg bg-gray-50">
                  <h1 className="text-slate-800 font-montserrat sm:text-[18px] text-[14px] font-semibold">
                    You haven't created any short link yet
                  </h1>
                  <FaLink className="text-blue-500 sm:text-xl text-sm" />
                </div>
              </div>
            ) : (
              <ShortenUrlList data={myShortenUrls} />
            )}
          </div>
        </div>
      )}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
};

export default DashboardLayout;