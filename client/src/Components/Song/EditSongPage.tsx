

import { TextField } from '@mui/material';
import '../Button.style.css';
import { useNavigate } from 'react-router-dom';
import '../Playlist/AddPlaylistPage.style.css'
import '../Playlist/Playlist.style.css'
import {useState, useContext} from 'react';
import { UpdateSongContext } from '../../App.js';
import Axios from 'axios';

function EditSongPage() {
    
    const navigate = useNavigate();
    
    const updateSongContext = useContext(UpdateSongContext);


    const [songTitle, setSongTitle] = useState(updateSongContext.songToEdit.Title);
    const [artist, setArtist] = useState(updateSongContext.songToEdit.Artist);

    const onSongTitleChange = (e: any) => {
        setSongTitle(e.target.value);
    };

    const onArtistChange = (e: any) => {
        setArtist(e.target.value);
    };

    const updateSong = () => {
        const api = `http://localhost:3005/songList/${updateSongContext.songToEdit.Id}`;
        Axios.put(api, {
            Title: songTitle,
            Artist: artist,
        }).then((response) => {
            console.log("Updated Song");
            console.log(response.data);
        }).catch((error) => {
            console.log('Error:', error);
        });
        navigate('/songs-library');
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