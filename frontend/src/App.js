import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Solo usa Routes y Route
import Auth from "./pages/Auth";
import MakeReservation from "./pages/MakeReservation";
import MyReservations from "./pages/MyReservations";
import "./App.css";

function App() {
  return (
    <Routes> {/* ✅ No uses <Router> aquí */}
      <Route path="/" element={<Auth />} />
      <Route path="/reservar" element={<MakeReservation />} />
      <Route path="/mis-reservaciones" element={<MyReservations />} />
    </Routes>
  );
}

export default App;
