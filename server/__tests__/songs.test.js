const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from 'app.js'
const mongoose = require('mongoose');

// Describe block for SongListController tests
describe("SongListController", () => {
    // Test case for creating a new song
    it("should create a new song", async () => {
        const newSong = {
            Title: "Test Song",
            Artist: "Test Artist"
        };

        const response = await request(app)
            .post('/songList')
            .send(newSong);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Song was created");
        expect(response.body.createdSong.Title).toBe("Test Song");
        expect(response.body.createdSong.Artist).toBe("Test Artist");
        
        // Clean up: delete the created song from the database
        await mongoose.connection.collection('songlists').deleteOne({ _id: response.body.createdSong._id });
    });

    // Test case for getting all songs
    it("should return a list of all songs", async () => {
        const response = await request(app)
            .get('/songList');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3); // Modify this based on your actual test data
    });

    // Test case for deleting a specific song
    it("should delete a specific song", async () => {
        const newSong = new songs({
            Title: "Test Song",
            Artist: "Test Artist"
        });
        await newSong.save();

        const response = await request(app)
            .delete(`/songList/${newSong._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Deleted song!");
        
        // Make sure the song is deleted from the database
        const deletedSong = await songs.findById(newSong._id);
        expect(deletedSong).toBeNull();
    });

    // Test case for updating a specific song
    it("should update a specific song", async () => {
        const newSong = new songs({
            Title: "Test Song",
            Artist: "Test Artist"
        });
        await newSong.save();

        const updatedData = {
            Title: "Updated Test Song",
            Artist: "Updated Test Artist"
        };

        const response = await request(app)
            .put(`/songList/${newSong._id}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Updated song!");
        
        // Verify the updated data in the database
        const updatedSong = await songs.findById(newSong._id);
        expect(updatedSong.Title).toBe(updatedData.Title);
        expect(updatedSong.Artist).toBe(updatedData.Artist);
    });
});
