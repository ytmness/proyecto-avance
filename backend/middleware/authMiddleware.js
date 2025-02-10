const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "❌ Acceso denegado, token no proporcionado." });
  }

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET); // ✅ Quitar "Bearer " antes de verificar
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "❌ Token inválido." });
  }
};

module.exports = authMiddleware;

