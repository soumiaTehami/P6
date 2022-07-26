
require('dotenv').config()

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
app.use( bodyParser .json())
//const{authenticateUser}=require("./middelware/auth")

//routes

app.use('/api/auth/',userRoutes)
app.use('/api/sauces', sauceRoutes);




// Connexion à la base de données avec mongoose
mongoose.connect(`mongodb+srv://tehami:${MOT}@cluster0.uqmi5.mongodb.net/?retryWrites=true&w=majority`, function(err) {
    if (err) { throw err;
    }
    else { console.log("Connexion à MongoDB réussie !")}
  });

//server
 app.listen(port, () => {
   console.log("Example app listening on port "+port)
 })
 module.exports = app;