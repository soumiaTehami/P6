const express = require('express');

const router = express.Router();
const { getSauces,getOneSauce,createSauce,modifySauce, deleteSauce,likeOrDislike} = require("../controllers/sauces");
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

// Routes
router.get('/',getSauces);
router.get('/:id',getOneSauce);
router.post('/',multer,createSauce);
router.put('/:id',auth,multer,modifySauce);
router.delete('/:id',auth,multer,deleteSauce);
router.post('/:id/like', auth,multer,likeOrDislike)


module.exports = router;
