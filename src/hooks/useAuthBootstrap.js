import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAccessToken } from "../store/authSlice";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const useAuthBootstrap = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    if (accessToken) {
      setBootstrapping(false);
      return;
    }

    const tryRefresh = async () => {
      try {
        // Use plain axios (not api instance) to avoid circular interceptor loop
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/public/refresh`,
          {},
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        const newAccessToken = data.accessToken ?? data.data?.accessToken;

        if (newAccessToken) {
          dispatch(setAccessToken(newAccessToken));
        }
      } catch {
        // Cookie missing or expired — user is not logged in
      } finally {
        setBootstrapping(false);
      }
    };

    tryRefresh();
  }, [accessToken, dispatch]);

  return { bootstrapping };
};

export default useAuthBootstrap;
