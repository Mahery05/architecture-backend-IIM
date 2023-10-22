const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BadRequestError, InternalServerError } = require("../utils/error");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Vérifier si les champs ne sont pas vides
    if (!email || !password) {
      throw new BadRequestError("Tous les champs sont obligatoires");
    }

    // Vérifier si l'email est valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestError("L'email n'est pas valide");
    }

    // Vérifier si le mot de passe a au moins 6 caractères
    if (password.length < 6) {
      throw new BadRequestError(
        "Le mot de passe doit comporter au moins 6 caractères"
      );
    }

    const existingUser = await User.findOne({ email: `${email}` }).exec();
    if (existingUser) {
      throw new BadRequestError("Cet email est déjà utilisé");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      msg: "Inscription réussie",
      user,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      next(error);
    } else {
      next(new InternalServerError());
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email: `${email}` }).exec();
    if (!user) {
      throw new BadRequestError("Identifiants invalides");
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestError("Identifiants invalides");
    }

    // Génération du JWT
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, {
          Secure: true,
          httpOnly: true,
          expires: new Date(Date.now() + 15 * 60 * 1000),
          // SameSite: 'None'
        });
        res.json({
          message: "connexion réussite",
          user: {
            id: user._id,
          },
        });
      }
    );
  } catch (error) {
    if (error instanceof BadRequestError) {
      next(error);
    } else {
      console.error(error.message);
      next(new InternalServerError());
    }
  }
};

exports.logout = (req, res) => {
  res.status(200).clearCookie("token").json({ message: "Déconnexion réussie" });
};