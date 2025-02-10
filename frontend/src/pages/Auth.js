import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Auth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await axios.post("http://localhost:5000/api/auth/register", formData);
        setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
        setIsRegistering(false);
      } else {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        // Guardar el token en el localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        // Redirigir al usuario a la página de reservas
        navigate("/reservar");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error en el servidor");
    }
  };

  return (
    <div className="auth-container">
      {/* ✅ Video de fondo agregado aquí */}
      <video className="background-video" autoPlay loop muted>
        <source src="/background.mp4" type="video/mp4" />
        Tu navegador no soporta video.
      </video>

      <div className="auth-box">
        <h1>{isRegistering ? "Registro" : "Iniciar Sesión"}</h1>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
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
          <button type="submit">{isRegistering ? "Registrarse" : "Iniciar Sesión"}</button>
        </form>
        <p>{message}</p>
        <p>
          {isRegistering ? (
            <span onClick={() => setIsRegistering(false)} className="auth-switch">
              ¿Ya tienes cuenta? Inicia sesión.
            </span>
          ) : (
            <span onClick={() => setIsRegistering(true)} className="auth-switch">
              ¿No tienes cuenta? Regístrate.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default Auth;
