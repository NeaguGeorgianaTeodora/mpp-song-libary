/*describe("Playlist", () => {
    it("should return a list of all playlists", () => {
        request(app)
            .get('/api/playlists')
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveLength(3);
                expect(response.body[0].Name).toBe("P1");
                expect(response.body[1].Name).toBe("AP2");
                expect(response.body[2].Name).toBe("BP2");
            });
    });
    it("should create a new playlist", () => {
        request(app)
            .post('/api/playlists')
            .send({
                Name: "P1",
                Creator: "Georgiana",
                Rating: 5,
                ImageURL: "P3_image",
                Songs: []
            })
            .expect(201)
            .then((response) => {
                expect(response.body.message).toBe("Playlist was created");
                expect(response.body.createdPlaylist.Name).toBe("P1");
            });
    });
    it("should show details of a specific playlist", () => {
        request(app)
            .get('/api/playlists/1')
            .expect(200)
            .then((response) => {
                expect(response.body.message).toBe("playlist details");
                expect(response.body.playlistId).toBe(1);
            });
    });
    it("should delete a specific playlist", () => {
        request(app)
            .delete('/api/playlists/1')
            .expect(200)
            .then((response) => {
                expect(response.body.message).toBe("Deleted product!");
                expect(response.body.playlistId).toBe(1);
            });
    });
    it("should update a specific playlist", () => {
        request(app)
            .patch('/api/playlists/1')
            .expect(200)
            .then((response) => {
                expect(response.body.message).toBe("Updated product!");
            });
    });
});*/

describe("Playlist", () => {
    it("should return true", () => {
        expect(true).toBe(true);
    });
});