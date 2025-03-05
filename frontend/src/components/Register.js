import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext"; 

function Register() {
  const { language, translateText } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState({});

  useEffect(() => {
    const fetchTranslations = async () => {
      console.log("♻️ Traduciendo textos en Register.js a:", language);
      const translations = {
        registerTitle: await translateText("Registro"),
        usernamePlaceholder: await translateText("Nombre de usuario"),
        emailPlaceholder: await translateText("Correo electrónico"),
        passwordPlaceholder: await translateText("Contraseña"),
        registerButton: await translateText("Registrarse"),
      };
      setTranslatedTexts(translations);
    };

    fetchTranslations();
  }, [language, translateText]); // 🔥 Agregamos `translateText` para evitar la advertencia

  return (
    <div>
      <h1>{translatedTexts.registerTitle || "Registro"}</h1>
      <input type="text" placeholder={translatedTexts.usernamePlaceholder || "Nombre de usuario"} />
      <input type="email" placeholder={translatedTexts.emailPlaceholder || "Correo electrónico"} />
      <input type="password" placeholder={translatedTexts.passwordPlaceholder || "Contraseña"} />
      <button>{translatedTexts.registerButton || "Registrarse"}</button>
    </div>
  );
}

export default Register;
