const express = require('express'); // Import express.js
const router = express.Router(); // create express router
const controller = require('../controllers/userListController.js');

router.post('/register', controller.createUser); // create a new user
router.post('/login', controller.loginUser); // login a user


module.exports = router;

