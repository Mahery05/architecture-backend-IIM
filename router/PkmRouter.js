const express = require('express');
const router = express.Router();
const PkmController = require('../controllers/PkmController');

// Create new pkm
router.post('/', PkmController.create);
router.get('/', PkmController.findAll);
router.put('/:id', PkmController.update);
router.delete('/:id', PkmController.delete);
//router.get('/:pkmID', PkmController.findOne);

module.exports = router;