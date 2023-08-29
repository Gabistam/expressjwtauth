const express = require('express');
const router = express.Router();
const resaController = require('../controllers/ResaController');

router.post('/', resaController.getresa);

module.exports = router;
