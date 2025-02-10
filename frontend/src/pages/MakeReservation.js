import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MakeReservation.css"; // Importar el CSS

function MakeReservation() {
  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    people: 1,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ No estás autenticado. Inicia sesión.");
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserId(response.data.userId);
      })
      .catch((error) => {
        console.error("❌ Error al obtener el usuario:", error);
      });
  }, []);

  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ No estás autenticado. Inicia sesión.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/reservations",
        { ...reservation, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("✅ Reservación creada exitosamente.");
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Error al crear la reservación.");
    }
  };

  return (
    <div className="make-reservation-container">
      {/* Video de fondo */}
      <video className="background-video" autoPlay loop muted>
        <source src="/background.mp4" type="video/mp4" />
        Tu navegador no soporta video.
      </video>

      {/* Contenido principal */}
      <div className="reservation-content">
        <button className="reservations-button" onClick={() => navigate("/mis-reservaciones")}>
          Mis Reservaciones
        </button>

        <h1>Hacer una Reservación</h1>
        <form className="make-reservation-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Tu Nombre" value={reservation.name} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Teléfono" value={reservation.phone} onChange={handleChange} required />
          <input type="date" name="date" value={reservation.date} onChange={handleChange} required />
          <input type="time" name="time" value={reservation.time} onChange={handleChange} required />
          <input type="number" name="people" placeholder="Número de personas" value={reservation.people} onChange={handleChange} min="1" required />
          <button type="submit">Reservar</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default MakeReservation;
