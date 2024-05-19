
import '../Button.style.css';
import './ViewPage.style.css';
import { useNavigate } from 'react-router-dom';
import { ISong, songList } from '../Song/Song.type.js';
import {useContext, useState} from 'react';
import { ViewPlaylistContext, PlaylistDataContext} from '../../App.js';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Axios from 'axios';

function ViewPlaylistPage() {
    
    const navigate = useNavigate();
    const viewPlaylistContext = useContext(ViewPlaylistContext);
    const playlistDataContext = useContext(PlaylistDataContext);
    const [playlistName] = useState(playlistDataContext.data.Name);
    const [playlistSongList] = useState(viewPlaylistContext.dataToView);

    const onDeleteClick = (song: ISong) => {
        console.log('Delete Song');
        const api = `http://localhost:3005/playlistLibrary/${playlistDataContext.data.Id}/songs/${song.Id}`;
        fetch(api, {method: "DELETE"}).then(response => response.json()).then((response) =>{
            return response.json();
        }).catch((error) => {
            console.log('Error:', error);
        });
    };

    const onAddClick = (song: ISong) => {
        console.log('Added Song:', song.Title);
        const api = `http://localhost:3005/playlistLibrary/${playlistDataContext.data.Id}/songs/${song.Id}`;
        Axios.put(api).then((response) => {
            console.log("Updated Playlist with new song");
            console.log(response.data.songs);
        }).catch((error) => {
            console.log('Error:', error);
        });  
    }

    //from the list of ids in the playlist, get the songs
    const getSongsFromIDs = () => {
        const list: ISong[] = [];
        for (let i = 0; i < songList.length; i++) {
            for (let j = 0; j< playlistSongList.length; j++){
                if(songList[i].Id === playlistSongList[j]){
                    list.push(songList[i]);
                }
            }
        }
        return list;
    }

    //display the songs in the playlist
    const playlistSongsToBeSeen = getSongsFromIDs().map((song: ISong) => (  
        <li key={String(song.Id)} className="song">
            <div >
                <h4 className="song-text">{String(song.Title)}</h4>
                <p className="song-text">{String(song.Artist)}
                <button className="button" onClick={() =>onDeleteClick(song)}>Delete</button>
                </p>
            </div>
        </li>
    ));

    //display the songs that can be added to the playlist
    const songsToAdd = songList.map((song: ISong) => (  
        <li key={song.Id} className="song">
            <div >
                <h4 className="song-text">{song.Title}</h4>
                <p className="song-text">{song.Artist}
                <Button className="song-button" onClick={() =>onAddClick(song)}><AddIcon/></Button>
                </p>
            </div>
        </li>
    ));

    return (
      <>
        <button className="back-button" onClick={() => {navigate('/home');}}>
            <span> &#8249; </span>
        </button>
        <br></br>
        <h1 className='title'>{playlistName}</h1>
        <ul>{playlistSongsToBeSeen}</ul>
        <h3 className='text-style'>Recomanded Songs</h3>
        <br></br>
        <br></br>
        <ul>{songsToAdd}</ul>
      </>
    );
  }
  
  export default ViewPlaylistPage;
