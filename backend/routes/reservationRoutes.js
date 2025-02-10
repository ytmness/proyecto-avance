const express = require("express");
const reservationController = require("../controllers/reservationController"); // ✅ Importa correctamente
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Crear una reservación
router.post("/reservations", authMiddleware, reservationController.createReservation);

// Obtener todas las reservaciones
router.get("/reservations", authMiddleware, reservationController.getAllReservations);

// Eliminar una reservación
router.delete("/reservations/:id", authMiddleware, reservationController.deleteReservation);

module.exports = router;
