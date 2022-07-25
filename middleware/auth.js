/* *****Middleware qui protégera les routes sélectionnées et vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes***** */

// On récupère le package jsonwebtoken
const jwt = require('jsonwebtoken');


function authenticateUser(req, res, next) {
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
};
//* //////////////////// auth END //////////////////// */
module.exports={authenticateUser}