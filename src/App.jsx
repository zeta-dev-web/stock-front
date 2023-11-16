import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavbarApp from "./components/NavbarApp";
import HomeScreen from "./views/HomeScreen";
import ContactScreen from "./views/ContactScreen";
import ErrorScreen from "./views/ErrorScreen";
import AdminScreen from "./views/AdminScreen";
import LoginScreen from "./views/LoginScreen";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import StockScreen from "./views/StockScreen";
import SaleScreen from "./views/SaleScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode-body");
    } else {
      document.body.classList.remove("dark-mode-body");
    }
  }, [darkMode]);

  const changeMode = () => {
    console.log("Cambiando modo");
    setDarkMode(!darkMode);
  };

  return (
    <div className={`vh-100 ${darkMode ? "v-h100" : ""}`}>
      <BrowserRouter>
        <NavbarApp
          darkMode={darkMode}
          changeMode={changeMode}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route path="/" element={<HomeScreen darkMode={darkMode} />} />
          <Route
            path="/contact"
            element={<ContactScreen darkMode={darkMode} />}
          />
          <Route path="/stock" element={<StockScreen darkMode={darkMode} />} />
          <Route path="/venta" element={<SaleScreen darkMode={darkMode} />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes isLoggedIn={isLoggedIn}>
                <AdminScreen darkMode={darkMode} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <LoginScreen darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/*" element={<ErrorScreen darkMode={darkMode} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
