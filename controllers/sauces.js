const jwt = require('jsonwebtoken');
const Sauce = require('../models/Sauce');

// Fonction pour la création d'une sauce
function getSauces (req, res, next) {
	Sauce.find()
	  .then(sauces => res.status(200).json(sauces))
	  .catch(error => res.status(400).json({ error }));
  };
// Lecture d'une sauce avec son ID (Get/:id)
function getOneSauce (req, res, next) {
	Sauce.findOne({ _id: req.params.id })
	  .then(sauce => res.status(200).json(sauce))
	  .catch(error => res.status(404).json({ error }));
  };

  // Création d'une nouvelle sauce (Post)
function createSauce  (req, res, next){
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
  
	// Création d'un nouvel objet Sauce
	const sauce = new Sauce({
	  ...sauceObject,
	  // Création de l'URL de l'image : http://localhost:3000/image/nomdufichier 
	  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	// Enregistrement de l'objet sauce dans la base de données
	sauce.save()
	  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
	  .catch(error => res.status(400).json({ error }));
  };
  function modifySauce (req, res, next) {
	const sauceObject = req.file ?
	  // Si il existe déjà une image
	  {
		...JSON.parse(req.body.sauce),
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	  } : { ...req.body }; 
	  // Si il n'existe pas d'image
	  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Objet modifié !'}))
		.catch(error => res.status(400).json({ error }));
  };

 function deleteSauce 
 (req, res, next)  {
	Sauce.findOne({_id: req.params.id})
	  .then(sauce => {
		// Récupération du nom du fichier
		const filename = sauce.imageUrl.split('/images/')[1];
		// On efface le fichier (unlink)
		fs.unlink(`images/${filename}`, () => {
		  Sauce.deleteOne({ _id: req.params.id })
		  .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
		  .catch(error => res.status(400).json({ error }));
		});
	  })
	  .catch(error => res.status(500).json({ error }));
  };

module.exports={ getSauces,getOneSauce,createSauce,modifySauce, deleteSauce}
