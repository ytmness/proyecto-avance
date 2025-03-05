import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

// 🔥 Verificar que la API Key está cargando
const API_KEY = "AIzaSyD2Hnj5JkbMuRfE4dIZX9xSmbxGT6RkA3Q";
console.log("🔑 API Key cargada en LanguageContext:", API_KEY);

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  // 🔥 Verificar que setLanguage está cambiando el estado
  const handleSetLanguage = (newLanguage) => {
    console.log("🌍 Cambio de idioma detectado en LanguageContext:", newLanguage);
    setLanguage(newLanguage);
  };

  // 🔥 Asegurar que translateText se está ejecutando
  const translateText = useCallback(async (text) => {
    console.log("🔍 Intentando traducir en LanguageContext:", text, "al idioma", language);

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
          q: text,
          target: language,
        }
      );

      console.log("📡 Respuesta de la API en LanguageContext:", response.data);
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("❌ Error en la traducción en LanguageContext:", error);
      return text; // Devuelve el texto original si falla
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
