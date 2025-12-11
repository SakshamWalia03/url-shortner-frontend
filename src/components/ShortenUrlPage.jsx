import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

const ShortenUrlPage = () => {
  const { shortUrl } = useParams();

  useEffect(() => {
    if (shortUrl) {
      window.location.href = import.meta.env.VITE_BACKEND_URL + `/${shortUrl}`;
    }
  }, [shortUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-6 px-4 font-roboto">
      {/* Logo */}
      <img
        src="/images/image1.png"
        alt="BitLeap Logo"
        className="w-[60%] sm:w-[45%] md:w-[15%] object-contain"
      />

      {/* Tagline */}
      <p className="text-gray-700 text-center font-medium text-sm sm:text-base md:text-lg">
        BitLeap – Shorten links, track clicks, and stay in control
      </p>

      {/* Loader */}
      <TailSpin
        height={50}
        width={50}
        color="#3498db"
        ariaLabel="loading"
      />

      {/* Redirect Text */}
      <p className="text-gray-600 text-sm sm:text-base md:text-lg">Redirecting...</p>
    </div>
  );
};

export default ShortenUrlPage;