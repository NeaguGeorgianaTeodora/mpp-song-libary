
import { TextField } from '@mui/material';
import './Button.style.css';
import { useNavigate } from 'react-router-dom';
import './AddPlaylistPage.style.css'
import './Playlist/Playlist.style.css'
import {useState, useContext} from 'react';
import { PlaylistDataContext,  } from '../App.js';
import Axios from 'axios';

function AddSongPage() {
    
    const navigate = useNavigate();

    const playlistDataContext = useContext(PlaylistDataContext);

    const [songTitle, setSongTitle] = useState("");
    const [artist, setArtist] = useState("");

    const onTitleChange = (e: any) => {
        setSongTitle(e.target.value);
    };

    const onArtistChange = (e: any) => {
        setArtist(e.target.value);
    };

    const addSongHnd = () => {
        /*const api = `http://localhost:3005/playlistLibrary/${playlistDataContext.data.Id}/songs`;
        Axios.put(api, {
            Songs: [...playlistDataContext.data.Songs, {
                Title: songTitle, 
                Artist: artist,
            }],
        }).then((response) => {
            console.log("Updated Playlist");
            console.log(response.data);
        }).catch((error) => {
            console.log('Error:', error);
        });
        navigate('/');*/
        //const api = `http://localhost:3005/playlistLibrary/${playlistDataContext.data.Id}/songs`;
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
        navigate('/');
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