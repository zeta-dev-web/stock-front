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
import FooterApp from "./components/FooterApp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const  [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode-body");
    } else {
      document.body.classList.remove("dark-mode-body");
    }
  }, [darkMode]);

  const changeMode = () => {
    setDarkMode(!darkMode);
  };

const handlesetIsLoggedIn = ()=>{
  setIsLoggedIn(!isLoggedIn);
  if (localStorage.getItem("token")){
    localStorage.setItem("LoginIn", JSON.stringify("true"));  
  }
}
  return (
    <div className={`${darkMode ? "v-h100" : ""}`}>
      <BrowserRouter>
        <div className="vh-100 d-flex flex-column justify-content-between">
          <NavbarApp darkMode={darkMode} changeMode={changeMode} />
          <Routes>
            <Route
              path="/"
              element={
                <HomeScreen darkMode={darkMode} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/contact"
              element={<ContactScreen darkMode={darkMode} />}
            />
            <Route
              path="/stock"
              element={<StockScreen darkMode={darkMode} />}
            />
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
                <LoginScreen
                  isLoggedIn={isLoggedIn}
                  darkMode={darkMode}
                  handlesetIsLoggedIn={handlesetIsLoggedIn}
                />
              }
            />
            <Route path="/*" element={<ErrorScreen darkMode={darkMode} />} />
          </Routes>
          <FooterApp darkMode={darkMode} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
