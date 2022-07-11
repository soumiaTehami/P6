console.log("hello")
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = 3000
const userSchema=new mongoose.Schema({
  email:String,
  password:String
  
})
const User=mongoose.model("User",userSchema)
//middelware
app.use(cors())
app.use(express.json())
//routes
app.post('/api/auth/login',(req,res)=>{


const email=req.body.email
const password=req.body.password
const user=new User({email:email,password:password})
user
.save()
.then(()=> 
  res.send({message:"user enregistré!"}))
.catch((err)=> console.log("user pas enregistré!",err))
 
})
app.get('/', (req, res) => {

  res.send('Hello World!')
 })
 app.listen(port, () => {
   console.log("Example app listening on port "+port)
 })
 //database
 mongoose.connect("mongodb+srv://tehami:1988soumia@cluster0.uqmi5.mongodb.net/?retryWrites=true&w=majority", function(err) {
  if (err) { throw err;
  }
  else { console.log("Connexion à MongoDB réussie !")}
});