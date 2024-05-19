const express = require('express'); // Import express.js
const router = express.Router(); // create express router
const controller = require('../controllers/logoutController');

router.get('/', controller.handleLogout); 


module.exports = router;