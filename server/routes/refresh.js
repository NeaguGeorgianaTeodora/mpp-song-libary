const express = require('express'); // Import express.js
const router = express.Router(); // create express router
const controller = require('../controllers/refreshTokenController');

router.get('/', controller.handleRefreshToken); 


module.exports = router;