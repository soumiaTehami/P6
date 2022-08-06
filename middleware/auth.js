/* *****Middleware qui protégera les routes sélectionnées et vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes***** */

// On récupère le package jsonwebtoken
const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
    //récupère le token dans le header d'authorization et split retourne un tableau avec bearer en 0 et le token en 1
       const token = req.headers.authorization.split(' ')[1];
       //décoder le token avec verify (token, clé secrète qui sera plus longue avec le userId)
       const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
       //je récupère le userId du token
       const userId = decodedToken.userId;
       //j'ajoute userId récupéré du token à l'objet requête pour pouvoir vérifier si un utilisateur peut supprimer une sauce
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
