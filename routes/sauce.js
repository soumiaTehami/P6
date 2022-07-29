const express = require('express');

const router = express.Router();
const { getSauces,getOneSauce,createSauce,modifySauce, deleteSauce,likeOrDislike} = require("../controllers/sauces");
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

// Routes
router.get('/',auth,multer,getSauces);
router.get('/:id',auth,getOneSauce);
router.post('/',auth,multer,createSauce);
router.put('/:id',auth,multer,modifySauce);
router.delete('/:id',auth,deleteSauce);
router.post('/:id/like', auth,likeOrDislike)


module.exports = router;
