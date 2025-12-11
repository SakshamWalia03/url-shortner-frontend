import dayjs from "dayjs";
import { useState } from "react";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import AnalyticsPanel from "./AnalyticsPanel";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);

  const finalShortUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`;
  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(/^https?:\/\//, "");

  // 📌 Native copy handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalShortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="bg-white shadow-xl border border-gray-200 px-6 py-6 rounded-xl mb-6 transition-all hover:shadow-2xl">
      <div className="flex sm:flex-row flex-col justify-between w-full gap-5">
        
        <div className="flex-1 space-y-3">
          {/* Short URL */}
          <div className="flex items-center gap-2">
            <Link
              target="_blank"
              to={finalShortUrl}
              className="text-base sm:text-lg lg:text-xl font-semibold font-montserrat text-blue-700 hover:underline"
            >
              {subDomain + "/s/" + shortUrl}
            </Link>
            <FaExternalLinkAlt className="text-blue-700 text-xs sm:text-sm" />
          </div>

          {/* Original URL */}
          <p className="text-gray-700 font-medium break-all text-sm sm:text-base">
            {originalUrl}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-10 pt-4 text-sm sm:text-[17px]">
            
            <div className="flex gap-2 items-center font-semibold text-green-700">
              <MdOutlineAdsClick className="text-xl sm:text-2xl" />
              <span>{clickCount}</span>
              <span>{clickCount === 1 ? "Click" : "Clicks"}</span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <FaRegCalendarAlt className="text-base sm:text-lg" />
              <span>{dayjs(createdDate).format("MMM DD, YYYY")}</span>
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="sm:flex sm:justify-end gap-4 grid grid-cols-1 w-full h-fit sm:w-auto">

          {/* Copy Button (native API) */}
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all font-semibold text-sm sm:text-base"
          >
            {isCopied ? "Copied" : "Copy"}
            {isCopied ? <LiaCheckSolid /> : <IoCopy />}
          </button>

          <button
            onClick={() => setAnalyticToggle((prev) => !prev)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg shadow-md transition-all font-semibold text-sm sm:text-base"
          >
            Analytics
            <MdAnalytics />
          </button>

        </div>
      </div>

      {analyticToggle && (
        <AnalyticsPanel shortUrl={shortUrl} token={token} />
      )}
    </div>
  );
};

export default ShortenItem;