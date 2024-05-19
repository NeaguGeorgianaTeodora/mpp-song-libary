const express = require('express'); // Import express.js
const router = express.Router(); // create express router
const controller = require('../controllers/playlistLibraryController.js');

router.get('/all' , controller.getAllPlaylists); // show a list of all playlists

router.get('/' , controller.getPaginatedPlaylists); // show a list of all playlists

router.post('/', controller.createNewPlaylist); // create a new playlist

router.post('/sync', controller.batchWrite);

router.get('/:playlistId', controller.showDetailsOfSpecificPlaylist); // shaw details of a specific playlist

router.delete('/:playlistId', controller.deletePlaylist); // DELETE a specific playlist

router.put('/:playlistId',controller.updatePlaylist); // Update a specific playlist

router.get('/:playlistId/songs', controller.getAllSongs); // show a list of all songs

router.put('/:playlistId/songs/:songId', controller.addSongToPlaylist); // add a song to a playlist

router.delete('/:playlistId/songs/:songId', controller.deleteSongFromPlaylist); // DELETE a song from a playlist

module.exports = router; // Export router