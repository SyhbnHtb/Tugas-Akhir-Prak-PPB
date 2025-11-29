import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { AuthProvider, useAuth } from "./context/AuthContext";

import MobileNavbar from "./components/navbar/MobileNavbar";
import DesktopNavbar from "./components/navbar/DesktopNavbar";

import SplashScreen from "./pages/SplashScreen";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import GenrePage from "./pages/GenrePage";
import WatchlistPage from "./pages/WatchlistPage";
import AnimeDetailPage from "./pages/AnimeDetailPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
}

function Layout() {
  const location = useLocation();

  const noNavbarRoutes = ["/login", "/register", "/splash"];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <MobileNavbar />}
      {!hideNavbar && <DesktopNavbar />}

      <Routes>
        {/* Splash Screen */}
        <Route path="/splash" element={<SplashScreen />} />

        {/* Guest default → Dashboard */}
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Public */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/genre" element={<GenrePage />} />
        <Route path="/anime/:id" element={<AnimeDetailPage />} />

        {/* Protected */}
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchlistPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}
