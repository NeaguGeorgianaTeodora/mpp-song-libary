import PlaylistLibrary  from './Playlist/PlaylistLibrary.js';
import './Button.style.css';
import { useNavigate } from 'react-router-dom';
import { IPlaylist } from './Playlist/Playlist.type.js';
import {useContext, useEffect} from 'react';
import { PlayListContext} from '../App.js';
import { useState } from 'react';
import { Pagination } from './Pagination.js';
import Axios  from 'axios';

function HomePlaylistLibrary() {
  
  const navigate = useNavigate();
  const playListContext = useContext(PlayListContext);
  const [currentPage, setCurrentPage] = useState(1);
  const postPage = 3;

  const lastPostIndex = currentPage * postPage;
  const firstPostIndex = lastPostIndex - postPage;
  const currentPosts = playListContext.playlists?.slice(firstPostIndex, lastPostIndex);


  useEffect(() => {
    window.addEventListener('online', () =>  {
      const failedItems = JSON.parse(localStorage.getItem('failedItems') || '');
      if(failedItems.length) {
        console.log("CAlling api")
        const api = `http://localhost:3005/playlistLibrary/sync`;
        Axios.post(api, {items: failedItems})
        localStorage.setItem('failedItems', JSON.stringify([]))
     }


    })

   
  }, [])

  const handleSortByName = () => {
      const tempList = [...playListContext.playlists]; // Create a copy of the array
      const sortedList = tempList.sort((a, b) => (a.Name > b.Name ? 1 : -1));
      playListContext.setPlaylists(sortedList);
      console.log(playListContext.playlists); // Log the sorted list, not the original one
  };

  const deletePlaylistHnd = (data: IPlaylist) => {
    const api = `http://localhost:3005/playlistLibrary/${data.Id}`;
    fetch(api, {method: "DELETE"}).then(response => response.json()).then((response) =>{
        return response.json();
    }).catch((error) => {
        console.log('Error:', error);
    });
  };

  return (
    <>
       <PlaylistLibrary
            items={currentPosts}
            deletePlaylist={deletePlaylistHnd}
        />
        <Pagination
            setCurrentPage={setCurrentPage}
            postPage={postPage}
        />

        <button className="button" onClick={() => {navigate('/add-playlist');}}>Add</button>
        <input type='button' className="button" onClick={handleSortByName} value='Sort by Name' />
    </>
  );
}

export default HomePlaylistLibrary;

