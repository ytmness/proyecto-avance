const Reservation = require("../models/Reservation");

// Crear una reservación
exports.createReservation = async (req, res) => {
  try {
    console.log("🔹 Datos recibidos en el backend:", req.body);

    const { name, phone, date, time, people } = req.body;
    const userId = req.user.userId;

    if (!name || !phone || !date || !time || !people || !userId) {
      return res.status(400).json({ message: "❌ Todos los campos son obligatorios." });
    }

    const newReservation = new Reservation({
      name,
      phone,
      date,
      time,
      people,
      user: userId,
    });

    await newReservation.save();
    res.status(201).json({ message: "✅ Reserva creada con éxito", reservation: newReservation });

  } catch (error) {
    console.error("❌ Error en la reserva:", error);
    res.status(500).json({ message: "❌ Error en el servidor" });
  }
};

// Obtener todas las reservaciones
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.userId });
    res.status(200).json(reservations);
  } catch (error) {
    console.error("❌ Error al obtener reservaciones:", error);
    res.status(500).json({ message: "❌ Error en el servidor" });
  }
};

// Eliminar una reservación
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.findByIdAndDelete(id);
    res.status(200).json({ message: "✅ Reservación eliminada con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar la reservación:", error);
    res.status(500).json({ message: "❌ Error en el servidor" });
  }
};
