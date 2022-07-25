const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const sauceSchema = mongoose.Schema({
    userId: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	manufacturer: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	mainPepper: {
		type: String,
		required: true,
	},
	heat: {
		type: Number,
		required: true,
	},
	likes: {
		type: Number,
	},
	dislikes: {
		type: Number,
	},
	usersLiked: {
		type: Array,
	},
	usersDisliked: {
		type: Array,
	},
});

function getSauces(req,res){
    try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			throw 'User ID non valable !';
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error | 'Requête non authentifiée !' });
	}
}

//function createSauces(req,res){
    //const product=new product({

    //})

//}
module.exports={getSauces}
