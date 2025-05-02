const express = require('express');
const router = express.Router();
const artController = require('../controllers/artController');

// this GETS all the arts from the database
router.get('/', artController.getAllArt);
// this GETS a specific art by id from the database
router.get('/:id', artController.getArtById);
// this POSTs a new art to the database
router.post('/', artController.createArt);
// this PUTs an updated art to the database
router.put('/:id', artController.updateArt);
// this DELETEs an art from the database
router.delete('/:id', artController.deleteArt);

module.exports = router;