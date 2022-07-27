
require('dotenv').config({ path: process.cwd() + '/.env' })
const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const multer=require('multer')
const upload=multer().single("image")
const port = 3000

const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')
const userSchema=require('./models/usermodel')
const User=mongoose.model("User",userSchema)

const MOT=process.env.MOTDEPASSE
const jwt = require('jsonwebtoken');
console.log("variable d'enverenement:",process.env.MOTDEPASSE) 




//middelware
app.use(cors())
app.use(express.json())

//const{authenticateUser}=require("./middelware/auth")

//routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth/',userRoutes)
app.use('/api/sauces', sauceRoutes);




// Connexion à la base de données avec mongoose
mongoose.connect(`mongodb+srv://tehami:${MOT}@cluster0.uqmi5.mongodb.net/?retryWrites=true&w=majority`, function(err) {
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
 module.exports = app;