import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext"; 
import Auth from "./pages/Auth";
import MakeReservation from "./pages/MakeReservation";
import MyReservations from "./pages/MyReservations";
import Register from "./components/Register";  // ✅ Cambiado a components/
import Login from "./components/Login";  // ✅ Cambiado a components/
import LanguageSelector from "./components/LanguageSelector"; 
import "./App.css";
function App() {
  console.log("🔍 Renderizando App.js"); // 👀 Depuración

  return (
    <LanguageProvider>
      <Router>
        <div>
          <LanguageSelector />
          <h1>🌟 Bienvenido al sistema de reservaciones</h1> {/* Texto de prueba */}
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reservar" element={<MakeReservation />} />
            <Route path="/mis-reservaciones" element={<MyReservations />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
