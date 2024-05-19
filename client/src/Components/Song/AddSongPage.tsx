
import { TextField } from '@mui/material';
import '../Button.style.css';
import { useNavigate } from 'react-router-dom';
import '../Playlist/AddPlaylistPage.style.css'
import '../Playlist/Playlist.style.css'
import {useState} from 'react';
import Axios from 'axios';

function AddSongPage() {
    
    const navigate = useNavigate();

    const [songTitle, setSongTitle] = useState("");
    const [artist, setArtist] = useState("");

    const onTitleChange = (e: any) => {
        setSongTitle(e.target.value);
    };

    const onArtistChange = (e: any) => {
        setArtist(e.target.value);
    };

    const addSongHnd = () => {
        const api = 'http://localhost:3005/songList'
        Axios.post(api, {
                Title: songTitle, 
                Artist: artist,
        }).then((response) => {
            console.log("Updated Playlist");
            console.log(response.data);
        }).catch((error) => {
            console.log('Error:', error);
        });
        navigate('/songs-library');
      };


    return (
      <>
        <h1>Add Song</h1>
        <form >
            <div>
                <TextField 
                    id="SongTitleLbl" 
                    label="Song Title" 
                    value={songTitle}
                    variant="standard" 
                    className='text-field' 
                    onChange={onTitleChange}
                    />
            </div>
            <div>
                <TextField 
                    id="ArtistLbl" 
                    label="Artist" 
                    value={artist}
                    variant="standard" 
                    className='text-field' 
                    onChange={onArtistChange}
                    />
            </div>
        </form>

        <button className="button" onClick={() => {navigate('/');}}>
            Back
        </button>
        <button type="submit" className="button" onClick={addSongHnd}>
            Create
        </button>
      </>
    );
  }
  
  export default AddSongPage;