import { Routes, Route, useLocation } from "react-router-dom";
import ShortenUrlPage from "./components/ShortenUrlPage";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  const location = useLocation();

  // hide navbar & footer on redirect page
  const hideLayout = location.pathname.startsWith("/s/");

  return (
    <>
      {!hideLayout && <Navbar />}
      <Toaster />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route
            path="/register"
            element={
              <PrivateRoute publicPage={true}>
                <RegisterPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PrivateRoute publicPage={true}>
                <LoginPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute publicPage={false}>
                <DashboardLayout />
              </PrivateRoute>
            }
          />

          {/* Add SubDomain routes here */}
          <Route path="/s/:shortUrl" element={<ShortenUrlPage />} />

          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </>
  );
};

export default AppRouter;

export const SubDomainRouter = () => {
  return (
    <Routes>
      <Route path="/s/:shortUrl" element={<ShortenUrlPage />} />
    </Routes>
  );
};
