import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

import "./App.css";
import MainNavigation from "./components/NavigationBar/MainNavigation";
import Footer from "./components/BottomNavigation/Footer";
import FloatingWidget from "./games/FloatingWidget";
import AppRoutes from "./routes/routing";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:3000";

const Thumbnail = () => {
  const location = useLocation();

  const navigateTo = (path) => {
    window.location.href = `${FRONTEND_URL}${path}`;
  };

  return (
    <>
      {location.pathname !== "/tile-game" && (
        <div className="thumbnail-container" onClick={() => navigateTo("/tile-game")}>
          <img
            src="https://i.pinimg.com/736x/78/ec/2d/78ec2d2ab3f94458cc857260efa32b10.jpg"
            alt="Tiles Game"
          />
          <div className="overlay-text">Tiles Game</div>
        </div>
      )}
      {location.pathname !== "/tic-tac-toe-game" && (
        <div className="thumbnail-container" onClick={() => navigateTo("/tic-tac-toe-game")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/7231/7231279.png"
            alt="Tic-Tac-Toe Game"
          />
          <div className="overlay-text">Tic-Tac-Toe Game</div>
        </div>
      )}
    </>
  );
};

const AppContent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/current_user`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data) setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="App">
      <MainNavigation />
      <AppRoutes />
      <Thumbnail />
      <Footer />
      <FloatingWidget />
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;