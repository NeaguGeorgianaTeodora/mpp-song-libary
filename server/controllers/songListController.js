const mongoose = require('mongoose');
const songs = require('../models/songModel.js');

const createSong = async (req,res,next) => {
    console.log(req.body);
    const song = new songs({
        Id: 0,
        Title: req.body.Title,
        Artist: req.body.Artist
    });
    song.Id = song._id;
    song.save().then(result=>{
        res.status(201).json({ 
            message: 'Song was created',
            createdSong: result
        });
    }).catch(err=>console.log(err));
}

const getAllSongs = async (req,res,next)=> {
    try {
        const result = await songs.find();
        res.send(result);
    } catch (err) {
        res.status(500).json({
            error: err 
        });
    }
}

const deleteSong = async (req,res,next)=>{
    const {songId} = req.params;
    const result = await songs.deleteOne({Id: songId});
    res.status(200).json({
        message: 'Deleted song!',
        songId: req.body.songId
    });

}

const updateSong = async(req,res,next)=>{
    try{
        const {songId} = req.params;
        const result = await songs.updateOne({Id: songId}, req.body);
        res.status(200).json({
            message: 'Updated song!',
            songId: req.body.songId
        });
    }
    catch(err){
        res.status(500).json({
            error: err 
        });
    }
}

module.exports = {
    getAllSongs,
    createSong,
    deleteSong,
    updateSong
}