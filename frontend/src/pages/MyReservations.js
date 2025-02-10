import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/MyReservations.css"; // Importar el CSS

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ No estás autenticado. Inicia sesión.");
      return;
    }

    axios
      .get("http://localhost:5000/api/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("❌ Error al obtener las reservaciones:", error);
        setMessage("❌ Error al cargar tus reservaciones.");
      });
  }, []);

  return (
    <div className="my-reservations-container">
      <button className="back-button" onClick={() => navigate("/reservar")}>
        ⬅ Volver
      </button>

      <h1>Mis Reservaciones</h1>
      {message && <p>{message}</p>}
      {reservations.length === 0 ? (
        <p>No tienes reservaciones.</p>
      ) : (
        <ul className="my-reservations-list">
          {reservations.map((res) => (
            <li key={res._id}>
              📅 {res.date} 🕐 {res.time} 👥 {res.people} personas
              <br />
              ☎ {res.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyReservations;
