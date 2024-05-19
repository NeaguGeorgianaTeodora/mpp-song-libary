import '../Button.style.css';
import { useNavigate } from 'react-router-dom';
import { ISong } from './Song.type.js';
//import { SongDataContext } from '../../App.js';
//import {useContext} from 'react';
import SongLibrary from './SongLibrary.js';
import { songList } from './Song.type.js';

function HomeSongsLibrary() {
  
  const navigate = useNavigate();
  //const songDataContext = useContext(SongDataContext);

  const deleteSonglistHnd = (data: ISong) => {
    const api = `http://localhost:3005/songList/${data.Id}`;
    fetch(api, {method: "DELETE"}).then(response => response.json()).then((response) =>{
        return response.json();
    }).catch((error) => {
        console.log('Error:', error);
    });
  };

  return (
    <>
       <button className="button" onClick={() => {navigate('/');}}>Playlists</button>

        <SongLibrary
                        songs={songList}
                        deleteSong={deleteSonglistHnd}
        />

        <button className="button" onClick={() => {navigate('/add-song');}}>Add</button>
    </>
  );
}

export default HomeSongsLibrary;

