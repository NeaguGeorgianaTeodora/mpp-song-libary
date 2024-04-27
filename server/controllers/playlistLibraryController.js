
const mongoose = require('mongoose');
const playlists = require('../models/playlistModel.js');
const songs = require('../models/songModel.js');

const getAllPlaylists = async (req,res,next)=> {
    try {
        const result = await playlists.find();
        res.send(result);
    } catch (err) {
        res.status(500).json({
            error: err 
        });
    }
}
const createNewPlaylist = (req,res,next)=>{
    console.log(req.body);
    const playlisy = new playlists({
        Id: new mongoose.Types.ObjectId(),
        Name: req.body.Name,
        Creator: req.body.Creator,
        Rating: req.body.Rating,
        ImageURL: req.body.ImageURL,
        Songs: req.body.Songs
    });
    playlisy.save().then(result=>{
        res.status(201).json({ 
            message: 'Playlist was created',
            createdPlaylist: result
        });
    }).catch(err=>console.log(err));
}

const batchWrite = async (req, res, next) => {
    const items = req.body.items;
    console.log('Request body ', req.body.items)
    const response = await playlists.collection.insertMany(items);
    console.log('[Mongo Repsonse]: ', response);
    res.status(201).send({items});
}


const showDetailsOfSpecificPlaylist = async(req,res,next)=>{
    try{
        const {playlistId} = req.params;
        const result = await playlists.findOne({Id: playlistId});
        res.send(result);
    } catch (err) {
        res.status(500).json({
            error: err 
        });
    }
}

const deletePlaylist = async (req,res,next)=>{
    const {playlistId} = req.params;
    const result = await playlists.deleteOne({Id: playlistId});
    res.status(200).json({
        message: 'Deleted product!',
        playlistId: req.body.productId
    });

}

const updatePlaylist = async(req,res,next)=>{
    
    try{
        const {playlistId} = req.params;
        const result = await playlists.updateOne({Id: playlistId}, req.body);
        res.status(200).json({
            message: 'Updated product!',
            playlist: req.body
        });
    } catch (err) {
        res.status(500).json({
            error: err 
        });
    }
};

const getAllSongs = async (req,res,next)=> {

    try{
        const {playlistId} = req.params;
        const result = await playlists.findOne({Id: playlistId}).populate('Songs');
        res.send(result);
    } catch (err) {
        res.status(500).json({
            error: err 
        });
    }
}

const addSongToPlaylist = async (req,res,next)=> {
    res.send('addSongToPlaylist');
}
const deleteSongFromPlaylist = async (req,res,next)=> {
    try{
        const {playlistId} = req.params;
        const {songId} = req.params;
        const result = await playlists.findOne({Id: playlistId});
        result.Songs.pull(songId);
        result.save();
        res.send(result);
    } catch (err) {
        res.status(500).json({
            error: err 
        });
    }
}

module.exports = {
    getAllPlaylists,
    createNewPlaylist,
    showDetailsOfSpecificPlaylist,
    deletePlaylist,
    updatePlaylist,
    getAllSongs,
    addSongToPlaylist,
    deleteSongFromPlaylist,
    batchWrite
}