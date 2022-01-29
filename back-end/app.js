const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const db = require("./models");
const app = express();

app.use(helmet());


app.use(express.json());
//Chemin vers le dossier où stocker les fichiers entrant dans l'application
app.use("/images", express.static(path.join(__dirname, "images")));

// db connexion
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion réussie à la base de données");
  })
  .catch((error) => {
    console.log("Impossible de se connecter à la base de données: ", error);
  });

//middleware pour résoudre les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//ROUTES
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", commentRoutes); 

module.exports = app;