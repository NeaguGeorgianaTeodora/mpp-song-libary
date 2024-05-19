const http = require('http'); // Import Node.js core module
const app = require('./app'); // Import app.js
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Playlist = require('./models/playlistModel.js');
const Song = require('./models/songModel.js');

const port = process.env.PORT || 3005; // Set port
const server = http.createServer(app); // create web server
const connectDB = require('./config/dbConn.js');
require('dotenv').config(); // Load environment variables


connectDB();
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    //generatePlaylists(20);
    //generateSongs(100);
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    }); // listen for incoming requests
});

// Function to generate playlists
const generatePlaylists = async (count) => {
    try {
        const playlists = [];
        for (let i = 0; i < count; i++) {
            const playlist = {
                Id: faker.database.mongodbObjectId(),
                Name: faker.string.alpha(10, 20),
                Creator: faker.person.firstName(),
                Rating: faker.number.int({ min: 1, max: 5 }),
                ImageURL: faker.image.url(),
            };
            playlists.push(playlist);
        }
        await Playlist.insertMany(playlists);
        console.log(`${count} playlists created successfully.`);
    } catch (err) {
        console.error('Error generating playlists:', err);
    }
};

const generateSongs = async (count) => {
    try {
        const songs = [];
        for (let i = 0; i < count; i++) {
            const song = {
                Id: faker.database.mongodbObjectId(),
                Artist: faker.person.fullName(),
                Title: faker.music.songName(),
            };
            songs.push(song);
        }
        await Song.insertMany(songs);
        console.log(`${count} songs created successfully.`);
    } catch (err) {
        console.error('Error generating songs:', err);
    }
};

