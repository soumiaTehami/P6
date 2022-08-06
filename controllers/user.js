
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema=require('../models/usermodel')
const mongoose = require('mongoose');
const UserModel=mongoose.model("User",userSchema)


//function login

async function loginUser(req,res){
    const email=req.body.email
    const password=req.body.password
    const user= await UserModel.findOne({ email:email })
    const passewordOk= await bcrypt.compare(password,user.password)
    if (!passewordOk){
      res.status(403).send({ message:"mot de passe incorrect" })
    }
    
    res.status(200).send({  userId: user._id,
      token: jwt.sign(
          { userId: user._id },
          process.env.TOKEN_SECRET,
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
        const user=new UserModel({email:email,password:hashedpassword})
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
module.exports={createUser,loginUser}
