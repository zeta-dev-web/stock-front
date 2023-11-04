import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavbarApp from "./components/NavbarApp";
import HomeScreen from "./views/HomeScreen";
import ContactScreen from "./views/ContactScreen";
import ErrorScreen from "./views/ErrorScreen";
import AdminScreen from "./views/AdminScreen";
import LoginScreen from "./views/LoginScreen";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const changeMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={darkMode ? "navbar-custom-dark" : "navbar-custom"}>
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
