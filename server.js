/*j'importe dotenv pour gérer les variables d'environnement
.env*/
require('dotenv').config({ path: process.cwd() + '/.env' })
//Accès au chemin de notre système de fichiers
const path = require('path');
//j'importe express pour créer plus facilement mon server
const express = require('express');
//j'importe mongosse - gestion de ma base de données
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const port = 3000
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')
const MOT=process.env.DB_MOTDEPASSE
const username=process.env.DB_user
console.log("variable d'enverenement:",process.env.DB_MOTDEPASSE) 


//middelware
app.use(cors())
app.use(express.json())


//routes
app.use("/files", express.static(path.join(__dirname, "files")));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth/',userRoutes)
app.use('/api/sauces', sauceRoutes);




// Connexion à la base de données avec mongoose
mongoose.connect(`mongodb+srv://${username}:${MOT}@cluster0.uqmi5.mongodb.net/?retryWrites=true&w=majority`, function(err) {
    if (err) { throw err;
    }
    else { console.log("Connexion à MongoDB réussie !")}
  });
  // Définition de headers pour éviters les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());
//server
app.listen(port, () => {
  console.log("Example app listening on port "+port)
})
//j'exporte mon application express
 module.exports = app;