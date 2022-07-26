const express = require('express');

const router = express.Router();
const { getSauces,getOneSauce,createSauce,modifySauce, deleteSauce} = require("../controllers/sauces");

//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

// Routes
router.get('/', getSauces);
router.get('/:id',getOneSauce);
router.post('/',createSauce);
router.put('/:id',modifySauce);
router.delete('/:id',deleteSauce);


module.exports = router;
