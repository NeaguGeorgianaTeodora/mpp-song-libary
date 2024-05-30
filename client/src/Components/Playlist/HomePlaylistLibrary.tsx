import PlaylistLibrary  from './PlaylistLibrary.js';
import '../Button.style.css';
import { useNavigate } from 'react-router-dom';
import { IPlaylist, fetchDataPerPage, allData} from './Playlist.type.js';
import {useContext, useEffect, useState} from 'react';
import { PlayListContext} from '../../App.js';
//import Axios  from 'axios';
import NetworkStatus from '../NetworkStatus.js';
import InfiniteScroll from 'react-infinite-scroll-component';
//import AuthContext from '../../Context/AuthProvider.tsx';
import useRefreshToken from "../../Hooks/useRefreshToken.tsx";

function HomePlaylistLibrary() {
  
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  //const auth = useContext(AuthContext);
  const playListContext = useContext(PlayListContext);
  //const authContext = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const totalPlaylists =  allData.length;
  const limit = 100;
  let curruntNrOfLoadedItems = currentPage * limit;

  /*useEffect(() => {
      console.log("Online")
      //console.log("Authorization Token:"+ auth?.auth);
      const failedItems = JSON.parse(localStorage.getItem('failedItems') || '');
      if(failedItems.length) {
        console.log("Calling api")
        const api = `http://localhost:3005/playlistLibrary/sync`;
        Axios.post(api, {items: failedItems})
        localStorage.setItem('failedItems', JSON.stringify([]))
      }
  }, []);*/


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

  const fetchMoreData = () => {

    if(curruntNrOfLoadedItems >= totalPlaylists){
      setHasMore(false);
    }else{
      setCurrentPage(currentPage + 1);
      console.log('Current Page:', currentPage);
      setTimeout(() => {
        fetchDataPerPage(currentPage, limit).then((response) => {
        playListContext.setPlaylists([...playListContext.playlists, ...(response as [])]); 
        }
      ).catch((error) => {
        console.log('Error:', error.message);
        console.log('Page Number: ', currentPage);
      });
      }, 1500);
    }
    curruntNrOfLoadedItems = currentPage * limit;
  }

  return (
    <>
      <button className="button" onClick={() => {refresh();}}>Refresh</button>
       <button className="button" onClick={() => {navigate('/songs-library');}}>Songs</button>
       <button className="button" onClick={() => {navigate('/add-playlist');}}>+</button>
       <button className='button' onClick={handleSortByName}><span>&#8693;</span> Name</button>
     
        <NetworkStatus/>
       <br></br>
       <br></br>

       <InfiniteScroll dataLength={playListContext.playlists.length} next={fetchMoreData} hasMore={hasMore} loader={<p>Loading...</p>} endMessage={<p>No more data to load</p>}>

        <PlaylistLibrary
              items={playListContext.playlists}
              deletePlaylist={deletePlaylistHnd}
          />
       </InfiniteScroll>
    </>
  );
}

export default HomePlaylistLibrary;