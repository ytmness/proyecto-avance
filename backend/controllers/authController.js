const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registro de usuario
exports.register = async (req, res) => {
    try {
        console.log("🟢 Datos recibidos en el backend:", req.body); // <-- Depuración

        const { username, email, password } = req.body;

        // Verificar que todos los campos estén presentes
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Verificar si el usuario ya existe (por email o username)
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "El email o el nombre de usuario ya están en uso" });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        console.log("✅ Usuario registrado con éxito:", newUser);
        res.status(201).json({ message: "Usuario registrado con éxito" });

    } catch (error) {
        console.error("❌ Error en el registro:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Login de usuario
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Correo o contraseña incorrectos" });
        }

        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Correo o contraseña incorrectos" });
        }

        // Verificar que la variable de entorno `JWT_SECRET` está definida
        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET no está definido en las variables de entorno.");
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        // Generar token de autenticación
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("✅ Usuario autenticado:", user.username);
        res.json({ token });

    } catch (error) {
        console.error("❌ Error en el login:", error.message);
        res.status(500).json({ error: "Error en el login" });
    }
};
