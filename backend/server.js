require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Conectar a MongoDB
connectDB();

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api", reservationRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("API de Reservaciones funcionando 🚀");
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
