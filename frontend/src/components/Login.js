import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext"; 

function Login() {
  const { language, translateText } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState({});

  useEffect(() => {
    console.log("🔥 useEffect en Login.js detectó un cambio de idioma:", language);

    const fetchTranslations = async () => {
      console.log("♻️ Ejecutando `translateText` en Login.js...");
      const translations = {
        loginTitle: await translateText("Iniciar Sesión"),
        emailPlaceholder: await translateText("Correo"),
        passwordPlaceholder: await translateText("Contraseña"),
        loginButton: await translateText("Iniciar sesión"),
      };
      console.log("✅ Traducciones obtenidas en Login.js:", translations);
      setTranslatedTexts(translations);
    };

    fetchTranslations();
  }, [language, translateText]);

  return (
    <div>
      <h1>{translatedTexts.loginTitle || "Iniciar Sesión"}</h1>
      <input type="email" placeholder={translatedTexts.emailPlaceholder || "Correo"} />
      <input type="password" placeholder={translatedTexts.passwordPlaceholder || "Contraseña"} />
      <button>{translatedTexts.loginButton || "Iniciar sesión"}</button>
    </div>
  );
}

export default Login;
