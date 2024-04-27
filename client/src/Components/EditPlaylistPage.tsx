import { TextField } from '@mui/material';
import './Button.style.css';
import { useNavigate } from 'react-router-dom';
import './AddPlaylistPage.style.css'
import './Playlist/Playlist.style.css'
import {useState, useContext} from 'react';
import { UpdatePlaylistContext} from '../App.js';
import Axios from 'axios';

function EditPlaylistPage() {
    
    const navigate = useNavigate();
    
    const updatePlaylistContext = useContext(UpdatePlaylistContext);


    const [playlistName, setPlaylistName] = useState(updatePlaylistContext.dataToEdit.Name);
    const [creator, setCreator] = useState(updatePlaylistContext.dataToEdit.Creator);
    const [rating, setRating] = useState(String(updatePlaylistContext.dataToEdit.Rating));

    const onPlaylistNameChange = (e: any) => {
        setPlaylistName(e.target.value);
    };

    const onCreatorChange = (e: any) => {
        setCreator(e.target.value);
    };

    const onRatingChange = (e: any) => {
        setRating(e.target.value);
    };

    const updatePlaylist = () => {
        const api = `http://localhost:3005/playlistLibrary/${updatePlaylistContext.dataToEdit.Id}`;
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
        });        
        navigate('/');
      };

    return (
      <>
        <h1>Edit Playlist</h1>
        <h1>{typeof(playlistName)}</h1>
        <form>
            <div>
                <TextField 
                    id="PlaylistNameLbl" 
                    label="Playlist Name" 
                    value={playlistName}
                    variant="standard" 
                    className='text-field' 
                    onChange={onPlaylistNameChange}
                    />
            </div>
            <div>
                <TextField 
                    id="CreatorNameLbl" 
                    label="Creator Name" 
                    value={creator}
                    variant="standard" 
                    className='text-field' 
                    onChange={onCreatorChange}
                    />
            </div>
            <div>
                <TextField 
                    id="RatingLbl" 
                    label="Rating" 
                    value={rating}
                    variant="standard"
                    className='text-field'
                    helperText="Select a rating from 1-5" 
                    type="number"
                    inputProps={{ min: "1", max: "5" }}
                    onChange={onRatingChange}
                />
            </div>
        </form>
        <button type="submit" className="button" onClick={updatePlaylist}>
            Edit
        </button>
      </>
    );
  }
  
  export default EditPlaylistPage;