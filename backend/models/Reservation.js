const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  name: { type: String, required: true },  // ✅ Nombre obligatorio
  phone: { type: String, required: true }, // ✅ Teléfono obligatorio
  date: { type: String, required: true },  // ✅ Fecha obligatoria
  time: { type: String, required: true },  // ✅ Hora obligatoria
  people: { type: Number, required: true }, // ✅ Número de personas obligatorio
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // ✅ ID del usuario
});

module.exports = mongoose.model("Reservation", ReservationSchema);
