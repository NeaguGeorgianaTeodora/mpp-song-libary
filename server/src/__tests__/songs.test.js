const request = require('supertest');
const app = require('../app'); // Adjust the path as needed

describe('songs', () => {
    /*it('should return a list of all songs', async () => {
        const response = await request(app)
            .get('/api/songs')
            .expect(200);

        expect(response.body).toHaveLength(3);
        expect(response.body[0].Name).toBe("S1");
        expect(response.body[1].Name).toBe("AS2");
        expect(response.body[2].Name).toBe("BS2");
    });*/

    /*it('should create a new song', async () => {
        const response = await request(app)
            .post('/api/songs')
            .send({
                Name: "S1",
                Artist: "Georgiana",
                Album: "Album1",
                Duration: 5,
                Rating: 5,
                ImageURL: "S3_image",
                Playlist: []
            })
            .expect(201);

        expect(response.body.message).toBe("Song was created");
        expect(response.body.createdSong.Name).toBe("S1");
    });

    it('should show details of a specific song', async () => {
        const response = await request(app)
            .get('/api/songs/1')
            .expect(200);

        expect(response.body.message).toBe("song details");
        expect(response.body.songId).toBe(1);
    });

    it('should delete a specific song', async () => {
        const response = await request(app)
            .delete('/api/songs/1')
            .expect(200);

        expect(response.body.message).toBe("Deleted product!");
        expect(response.body.songId).toBe(1);
    });

    it('should update a specific song', async () => {
        const response = await request(app)
            .patch('/api/songs/1')
            .expect(200);

        expect(response.body.message).toBe("Updated product!");
    });*/
});
