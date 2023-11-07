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
import SidebarApp from "./components/SidebarApp";
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const changeMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div
      className={darkMode ? "bg-dark v-h100" : ""}
    >
      <BrowserRouter>
        <div className="d-md-none">
          <SidebarApp
            darkMode={darkMode}
            changeMode={changeMode}
            isLoggedIn={isLoggedIn}
          />
        </div>
        <div className="d-none d-md-block fixed-top p-0">
          <NavbarApp
            darkMode={darkMode}
            changeMode={changeMode}
            isLoggedIn={isLoggedIn}
          />
        </div>
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
