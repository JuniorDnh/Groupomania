const jwt = require("jsonwebtoken");
require('dotenv').config();

//Middleware pour générer un token lorsque l'utilisateur est connecté à sa session

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.id;

    if (req.body.userId && req.body.userId !== userId) {
      throw "Cet identifiant n'est pas disponible";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: "Demande non identifiée" });
  }
};