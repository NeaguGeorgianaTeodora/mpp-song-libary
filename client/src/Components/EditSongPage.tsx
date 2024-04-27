

import { TextField } from '@mui/material';
import './Button.style.css';
import { useNavigate } from 'react-router-dom';
import './AddPlaylistPage.style.css'
import './Playlist/Playlist.style.css'
import {useState, useContext} from 'react';
import { SongDataContext } from '../App.js';
import Axios from 'axios';

function EditSongPage() {
    
    const navigate = useNavigate();
    
    const songDataContext = useContext(SongDataContext);


    const [songTitle, setSongTitle] = useState(songDataContext.data.Title);
    const [artist, setArtist] = useState(songDataContext.data.Artist);

    const onSongTitleChange = (e: any) => {
        setSongTitle(e.target.value);
    };

    const onArtistChange = (e: any) => {
        setArtist(e.target.value);
    };

    const updateSong = () => {
       /* const api = `http://localhost:3005/playlistLibrary/${updatePlaylistContext.dataToEdit.Id}`;
        Axios.put(api, {
            Name: playlistName,
            Creator: creator,
            Rating: rating,
            ImageURL: updatePlaylistContext.dataToEdit.ImageURL,
            Songs: updatePlaylistContext.dataToEdit.Songs,
        }).then((response) => {
            console.log("Updated Playlist");
            console.log(response.data);
        }).catch((error) => {
            console.log('Error:', error);
        });       */ 
        navigate('/');
      };

    return (
      <>
        <h1>Edit Song</h1>
        <form>
            <div>
                <TextField 
                    id="SongTitleLbl" 
                    label="Song Title" 
                    value={songTitle}
                    variant="standard" 
                    className='text-field' 
                    onChange={onSongTitleChange}
                    />
            </div>
            <div>
                <TextField 
                    id="artistLbl" 
                    label="Artist" 
                    value={artist}
                    variant="standard" 
                    className='text-field' 
                    onChange={onArtistChange}
                    />
            </div>
        </form>
        <button type="submit" className="button" onClick={updateSong}>
            Edit
        </button>
      </>
    );
  }

export default EditSongPage;