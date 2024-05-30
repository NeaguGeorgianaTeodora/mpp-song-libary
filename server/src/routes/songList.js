const express = require('express'); // Import express.js
const router = express.Router(); // create express router
const controller = require('../controllers/songListController.js');

router.get('/', controller.getAllSongs); // show a list of all songs
router.post('/', controller.createSong); // create a new song
router.delete('/:songId', controller.deleteSong); // DELETE a specific song
router.put('/:songId',controller.updateSong); // Update a specific song

module.exports = router; // Export router