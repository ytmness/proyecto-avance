import React from "react";

function Reservations() {
  return (
    <div className="app">
      {/* Video de fondo */}
      <video className="background-video" autoPlay loop muted>
        <source src="/background.mp4" type="video/mp4" />
        Tu navegador no soporta video.
      </video>

      <div className="content">
        <h1>Reservaciones</h1>
        <p>Bienvenido, aquí puedes gestionar tus reservaciones.</p>
        {/* Aquí puedes agregar el formulario para hacer reservaciones */}
      </div>
    </div>
  );
}

export default Reservations;
