const jwt = require("jsonwebtoken");
require("dotenv").config();

//Middleware pour générer un token lorsque l'utilisateur est connecté à sa session

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //on récupère le token du front
    const decodedToken = jwt.verify(token, process.env.TOKEN); //on décode le token
    const userId = decodedToken.id; //on prend le userId du token décodé

    //si on a un userId mais qu'il est différent de celui stocké dans le token
    if (req.body.userId && req.body.userId != userId) {
      throw "User Id non valable";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ message: "Requête invalide !" });
  }
};
