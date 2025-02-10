import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",  // ✅ Aseguramos que username está en el estado
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("🟡 Datos enviados al backend:", formData); // ✅ Depuración: Ver qué se envía

    // Verificar que todos los campos estén completos antes de enviar
    if (!formData.username || !formData.email || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
        headers: { "Content-Type": "application/json" }, // ✅ Aseguramos que se envíen como JSON
      });

      console.log("✅ Usuario registrado:", response.data);
      setSuccess("Registro exitoso.");
      setError("");
    } catch (error) {
      setError(error.response?.data?.error || "Error desconocido");
      setSuccess("");
      console.error("❌ Error en el registro:", error.response?.data?.error || "Error desconocido");
    }
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default Register;
