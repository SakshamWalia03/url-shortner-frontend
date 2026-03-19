import axios from "axios";

// ─────────────────────────────────────────────────────────────────────────────
// TOKEN STRATEGY
//
// accessToken  → Lives only in Redux memory (set via setAccessToken action).
//                Attached to every request via the request interceptor below.
//                Never written to localStorage — lost on page refresh intentionally.
//
// refreshToken → httpOnly cookie managed entirely by the backend.
//                Browser sends it automatically with withCredentials: true.
//                Frontend cannot read it at all — that's the security guarantee.
//
// SILENT REFRESH FLOW:
//   page load / accessToken missing → first protected request gets 401
//   → response interceptor fires
//   → POST /api/auth/public/refresh  (browser auto-sends httpOnly cookie)
//   → backend validates cookie, returns new accessToken (+ rotates cookie)
//   → Redux updated, failed request retried
//   → if cookie is expired/invalid → forceLogout()
//
// REQUIRES: backend must set Access-Control-Allow-Credentials: true
//           and Access-Control-Allow-Origin: <exact frontend origin> (not *)
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// ── Main axios instance ───────────────────────────────────────────────────────
const api = axios.create({
  baseURL:         BASE_URL,
  withCredentials: true,                          // sends httpOnly cookies on every request
  headers:         { "Content-Type": "application/json" },
});

// ── Request interceptor — attach accessToken from Redux memory ────────────────
api.interceptors.request.use(
  async (config) => {
    try {
      const { store }            = await import("../store/store.js");
      const { selectAccessToken } = await import("../store/authSlice.js");
      const token = selectAccessToken(store.getState());
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // store not ready yet — continue without token (will 401 → refresh)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — silent token refresh on 401 ────────────────────────
let isRefreshing = false;
let failedQueue  = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

const forceLogout = async () => {
  // Clear React Query cache
  try { window.__queryClient?.clear(); } catch { /* */ }

  // Clear Redux access token
  try {
    const { store }       = await import("../store/store.js");
    const { clearTokens } = await import("../store/authSlice.js");
    store.dispatch(clearTokens());
  } catch { /* */ }

  window.location.href = "/login";
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Only intercept 401s that haven't already been retried
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If the refresh endpoint itself returns 401 → session is truly dead
    if (originalRequest.url?.includes("/api/auth/public/refresh")) {
      await forceLogout();
      return Promise.reject(error);
    }

    // If a refresh is already running, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Call refresh — no body needed, browser sends httpOnly cookie automatically
      // Use plain axios (not our api instance) to avoid triggering this interceptor again
      const { data } = await axios.post(
        `${BASE_URL}/api/auth/public/refresh`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Normalise response — support both flat and nested shapes:
      //   { accessToken: "..." }
      //   { data: { accessToken: "..." } }
      const newAccessToken = data.accessToken ?? data.data?.accessToken;

      if (!newAccessToken) throw new Error("Refresh response missing accessToken");

      // Store new access token in Redux memory only
      const { store }          = await import("../store/store.js");
      const { setAccessToken } = await import("../store/authSlice.js");
      store.dispatch(setAccessToken(newAccessToken));

      // Unblock all queued requests
      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);

    } catch (refreshError) {
      processQueue(refreshError, null);
      await forceLogout();
      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
