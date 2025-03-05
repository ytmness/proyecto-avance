import React from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select 
      value={language} 
      onChange={(e) => {
        console.log("🌍 Cambiando idioma desde LanguageSelector:", e.target.value);
        setLanguage(e.target.value);
      }}
    >
      <option value="es">🇪🇸 Español</option>
      <option value="en">🇬🇧 Inglés</option>
      <option value="fr">🇫🇷 Francés</option>
      <option value="de">🇩🇪 Alemán</option>
    </select>
  );
};

export default LanguageSelector;
