require('dotenv').config()
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const cors = require('cors')
const app = express();
const port = 3000
const MOT=process.env.MOTDEPASSE

console.log("variable d'enverenement:",process.env.MOTDEPASSE) 

const userSchema=new mongoose.Schema({
  email:{ type: String, required: true, unique: true },
  password:{ type: String, required: true }
  
})
userSchema.plugin(uniqueValidator)



//middelware
app.use(cors())
app.use(express.json())
//routes
app.post('/api/auth/signup',createUser)
app.post('/api/auth/login',loginUser)

function loginUser(req,res){
const email=req.body.email
const password=req.body.password

}

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
  res.send({message:"user enregistré!"}))
.catch((err)=> console.log("user pas enregistré!",err))
 
}
function hashdpassword(password){
  const saltRounds = 10
  return bcrypt.hash(password,saltRounds)
}
app.get('/', (req, res) => {

  res.send('Hello World!')
 })
 app.listen(port, () => {
   console.log("Example app listening on port "+port)
 })
 const User=mongoose.model("User",userSchema)
//database
mongoose.connect("mongodb+srv://tehami:1988soumia@cluster0.uqmi5.mongodb.net/?retryWrites=true&w=majority", function(err) {
    if (err) { throw err;
    }
    else { console.log("Connexion à MongoDB réussie !")}
  });