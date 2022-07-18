require('dotenv').config()
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
//const app = require('./app');
const uniqueValidator = require('mongoose-unique-validator');
const cors = require('cors')
const app = express();
const port = 3000


const MOT=process.env.MOTDEPASSE
const jwt = require('jsonwebtoken');
console.log("variable d'enverenement:",process.env.MOTDEPASSE) 
const userSchema=new mongoose.Schema({
  email:{ type: String, required: true, unique: true },//unique email
  password:{ type: String, required: true }//unique passeword
  
})
userSchema.plugin(uniqueValidator)



//middelware
app.use(cors())
app.use(express.json())
//routes
app.post('/api/auth/signup',createUser)
app.post('/api/auth/login',loginUser)
//function login
async function loginUser(req,res){
const email=req.body.email
const password=req.body.password
const user= await User.findOne({ email:email })
const passewordOk= await bcrypt.compare(password,user.password)
if (!passewordOk){
  res.status(403).send({ message:"mot de passe incorrect" })
}
//const token=createToken(email)
res.status(200).send({  userId: user._id,
  token: jwt.sign(
      { userId: user._id },
      'RANDOM_TOKEN_SECRET',
      { expiresIn: '24h' }
  )})

console.log('user:',user)
console.log('passewordOk:',passewordOk)

}
//sign up
async function createUser(req,res){
const email=req.body.email
const password=req.body.password
const hashedpassword= await hashdpassword(password)
console.log("password:",password)
console.log("hashedpassword:",hashedpassword)
const user=new User({email:email,password:hashedpassword})
user
.save()
.then(()=> 
  res.status(201).send({message:"user enregistré!"}))
.catch((err)=> res.status(409).send({message:"user pas enregistré!",err}))

}
//hashd passeword
function hashdpassword(password){
  const saltRounds = 10
  return bcrypt.hash(password,saltRounds)
}


const User=mongoose.model("User",userSchema)

// Connexion à la base de données avec mongoose
mongoose.connect(`mongodb+srv://tehami:${MOT}@cluster0.uqmi5.mongodb.net/?retryWrites=true&w=majority`, function(err) {
    if (err) { throw err;
    }
    else { console.log("Connexion à MongoDB réussie !")}
  });


 app.listen(port, () => {
   console.log("Example app listening on port "+port)
 })
 