
import '../Button.style.css';
import { useNavigate } from 'react-router-dom';
import { ISong } from '../Song/Song.type.js';
import {useContext, useState} from 'react';
import { ViewPlaylistContext, PlaylistDataContext, SongDataContext} from '../../App.js';

function ViewPlaylistPage() {
    
    const navigate = useNavigate();
    const viewPlaylistContext = useContext(ViewPlaylistContext);
    const playlistDataContext = useContext(PlaylistDataContext);
    const songDataContext = useContext(SongDataContext);

    const [playlistName] = useState(playlistDataContext.data.Name);
    const [songList] = useState(viewPlaylistContext.dataToView);

    const deleteSong = () => {
        console.log('Delete Song');
        const api = `http://localhost:3005/playlistLibrary/${playlistDataContext.data.Id}/songs/${songDataContext.data.Id}`;
        fetch(api, {method: "DELETE"}).then(response => response.json()).then((response) =>{
            return response.json();
        }).catch((error) => {
            console.log('Error:', error);
        });
    };

    const editSong = (song: ISong) => {
      songDataContext.setData(song);
      console.log('Edit Song');
      navigate('/edit-song');
    };
    
    const songs = songList.map((playlistSong: ISong) => (
        <li key={playlistSong.Id} className="card">
            <div >
                <h4 className="card-text">{playlistSong.Title}</h4>
                <p className="card-text">
                    {playlistSong.Artist}
                </p>
                <button className="button" onClick={() =>deleteSong()}>Delete</button>
                <button className="button" onClick={() =>editSong(playlistSong)}>Edit</button>
            </div>
        </li>
    ));

    return (
      <>
        <h1>{playlistName}</h1>
        <ul>{songs}</ul>
        <button className="button" onClick={() => {navigate('/');}}>
            Back
        </button>
        <button className="button" onClick={() => {navigate('/add-song');}}>
            Add Song
        </button>
      </>
    );
  }
  
  export default ViewPlaylistPage;
