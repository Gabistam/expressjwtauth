const express = require("express");
const { init } = require("./dbconfig");
const path = require("path");

require("dotenv").config()

const app = express();

//models
const User = require("./models/User");
const Team = require("./models/Team");
const Club = require("./models/Club");

const { registerValidator } = require("./validators/registerValidator");
const { HomeController } = require("./controllers/HomeController");
const { loginValidator } = require("./validators/loginValidator");

const userRouter = require("./routes/userroutes")
const teamRouter = require("./routes/teamroutes")
const clubRouter = require("./routes/clubroutes");
const { JWTController } = require("./controllers/JWTController");

init()
app.use(express.json());
app.use("/user" , JWTController.verifyAccessToken.bind(JWTController), userRouter)
app.use("/club" , JWTController.verifyAccessToken.bind(JWTController), clubRouter)
app.use("/team" , JWTController.verifyAccessToken.bind(JWTController), teamRouter)

// Utilisation de Twig pour les vues
app.set('view engine', 'twig');
app.set('views', __dirname + '/views');

//Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));



// app.get("/", (req, res) => {
//   res.send({ message: "Hello you are all the best people" });
// });

app.get(
  "/", 
  HomeController.getHome
);

app.post(
  "/register",
  registerValidator,
  HomeController.register
);
app.post(
    "/login",
    loginValidator,
    HomeController.login
  );


//les associations
Team.hasMany(Club, {
  foreignKey: {
      allowNull: true
  }
});
Team.hasMany(User, {
    foreignKey: {
        name: "team_id",
        allowNull: true
    }
});

// // Synchronisation des modèles avec la base de données
// sequelize.sync()
//     .then(() => {
//         console.log("Les modèles ont été synchronisés avec succès !");
//     })
//     .catch(err => {
//         console.error("Erreur lors de la synchronisation des modèles :", err);
//     });
  

app.get("/new_access_token", JWTController.grantNewAccessToken.bind(JWTController))

app.listen(3001, () => {
  console.log("server running great!");
});
