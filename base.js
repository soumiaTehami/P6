const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
  email:String,
  password:String
  
})
  const User=mongoose.model("User",userSchema)
//database
mongoose.connect("mongodb+srv://tehami:1988soumia@cluster0.uqmi5.mongodb.net/?retryWrites=true&w=majority", function(err) {
    if (err) { throw err;
    }
    else { console.log("Connexion à MongoDB réussie !")}
  });
  
  module.exports={mongoose,User}