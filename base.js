const mongoose = require('mongoose');
const User=mongoose.model("User",userSchema)
const userSchema=new mongoose.Schema({
  email:{ type: String, required: true, unique: true },//unique email
  password:{ type: String, required: true }//unique passeword
  
})


// Connexion à la base de données avec mongoose
mongoose.connect(`mongodb+srv://tehami:${MOT}@cluster0.uqmi5.mongodb.net/?retryWrites=true&w=majority`, function(err) {
    if (err) { throw err;
    }
    else { console.log("Connexion à MongoDB réussie !")}
  });
 

  module.exports={mongoose, User}