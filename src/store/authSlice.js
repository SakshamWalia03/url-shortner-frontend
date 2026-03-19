import { createSlice } from "@reduxjs/toolkit";

// ─────────────────────────────────────────────────────────────────────────────
// TOKEN STORAGE STRATEGY
//
// accessToken  → Redux state only (in-memory).
//                Short-lived (e.g. 15 min). Never written to localStorage.
//                Lost on page refresh — re-hydrated via the /refresh call below.
//
// refreshToken → httpOnly cookie set BY THE BACKEND on login/refresh response.
//                The browser sends it automatically with every request to the
//                same origin. The frontend NEVER reads or writes it directly.
//                This is the secure pattern — XSS cannot steal httpOnly cookies.
//
// On page refresh: accessToken is gone from memory → api.js intercepts the
// first 401 → calls /refresh → backend validates the httpOnly cookie →
// returns a new accessToken → stored in Redux memory → user stays logged in.
// ─────────────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null, // in-memory only — intentionally not persisted
  },
  reducers: {
    // Called after login or silent refresh — stores access token in memory only
    setAccessToken(state, { payload }) {
      state.accessToken = payload;
    },

    // Clears access token from memory on logout or refresh failure
    clearTokens(state) {
      state.accessToken = null;
      // Also clean up any legacy keys that may exist from older versions
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("JWT_TOKEN");
    },
  },
});

export const { setAccessToken, clearTokens } = authSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsLoggedIn  = (state) => !!state.auth.accessToken;

// Backward-compat alias
export const selectToken = selectAccessToken;

export default authSlice.reducer;
