require('dotenv').config()

const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors')
const app = express();
const port = 3000
const {createUser,loginUser} = require("./controllers/user");
const { getSauces } = require("./controllers/sauces");
const userSchema=require('./models/usermodel')
const User=mongoose.model("User",userSchema)

const MOT=process.env.MOTDEPASSE
const jwt = require('jsonwebtoken');
console.log("variable d'enverenement:",process.env.MOTDEPASSE) 




//middelware
app.use(cors())
app.use(express.json())
//const{ authenticateUser }=require("./middelware/auth")

//routes
app.post('/api/auth/signup',createUser)
app.post('/api/auth/login',loginUser)
app.get('/api/sauces',getSauces)
//app.post('/api/sauces',createSauces)




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
 