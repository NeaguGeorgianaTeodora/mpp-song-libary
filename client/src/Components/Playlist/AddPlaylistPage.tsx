import { TextField } from '@mui/material';
import '../Button.style.css';
import { useNavigate } from 'react-router-dom';
import './AddPlaylistPage.style.css'
import '../assets/standardImage.png';
import './AddPlaylistPage.style.css'
import {useState} from 'react';
import Axios from 'axios';
import mongoose from 'mongoose';

function AddPlaylistPage() {
    
    const navigate = useNavigate();
    const standardImage = '../assets/standardImage.png';

    const [playlistName, setPlaylistName] = useState("");
    const [creator, setCreator] = useState("");
    const [rating, setRating] = useState("");

    const onPlaylistNameChange = (e: any) => {
        setPlaylistName(e.target.value);
    };

    const onCreatorChange = (e: any) => {
        setCreator(e.target.value);
    };

    const onRatingChange = (e: any) => {
        setRating(e.target.value);
    };

    const addPlaylistHnd = () => {

        const api = `http://localhost:3005/playlistLibrary`;
        Axios.post(api, {
            Name: playlistName,
            Creator: creator,
            Rating: rating,
            ImageURL: standardImage,
            Songs: [],
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log('Error:', error);

            const localStorageItems = localStorage.getItem('failedItems');

            if(localStorageItems) {
                const items = JSON.parse(localStorageItems);
                items.push({
                    Id: new mongoose.Types.ObjectId(), 
                    Name: playlistName,
                    Creator: creator,
                    Rating: rating,
                    ImageURL: standardImage,
                    Songs: [],
                });
                localStorage.setItem('failedItems', JSON.stringify(items));
            } else {
                localStorage.setItem('failedItems', JSON.stringify([{
                    Id: new mongoose.Types.ObjectId(),
                    Name: playlistName,
                    Creator: creator,
                    Rating: rating,
                    ImageURL: standardImage,
                    Songs: [],
                }]))
            }

        });
        
        navigate('/home');
      };


    return (
      <>
        <h1>Add Playlist Page</h1>
        <form >
            <div>
                <img className="card-image" src={standardImage} alt="Avatar" style={{width: "100%"}}/>
            </div>
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

        <button className="button" onClick={() => {navigate('/home');}}>
            Back
        </button>
        <button type="submit" className="button" onClick={addPlaylistHnd}>
            Create
        </button>
      </>
    );
  }
  
  export default AddPlaylistPage;