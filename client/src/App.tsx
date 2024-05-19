import './App.css'
import HomePlaylistLibrary from './Components/Playlist/HomePlaylistLibrary.tsx';
import AddPlaylistPage from './Components/Playlist/AddPlaylistPage.tsx';
import EditPlaylistPage from './Components/Playlist/EditPlaylistPage.tsx';
import ViewPlaylistPage from './Components/Playlist/ViewPlaylistpage.tsx';
import AddSongPage from './Components/Song/AddSongPage.tsx';
import EditSongPage from './Components/Song/EditSongPage.tsx';
import HomeSongsLibrary from './Components/Song/HomeSongsLibrary.tsx'
import {Routes, Route} from 'react-router-dom';
import { IPlaylist, exampleList} from './Components/Playlist/Playlist.type.tsx';
import { ISong } from './Components/Song/Song.type.tsx';
import { createContext, useEffect, useState } from 'react';

export interface PlayListContextType {
  playlists: IPlaylist[];
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[]>>;
}
export interface UpdatePlaylistContextType {
  dataToEdit: IPlaylist;
  setDataToEdit:  React.Dispatch<React.SetStateAction<IPlaylist>>
}
export interface UpdateSongContextType {
  songToEdit: ISong;
  setSongToEdit:  React.Dispatch<React.SetStateAction<ISong>>
}
export interface ViewPlaylistContextType {
  dataToView: ISong[];
  setDataToView:  React.Dispatch<React.SetStateAction<ISong[]>>
}
export interface PlaylistDataContextType {
  data: IPlaylist;
  setData:  React.Dispatch<React.SetStateAction<IPlaylist>>
}
export interface SongDataContextType {
  data: ISong;
  setData:  React.Dispatch<React.SetStateAction<ISong>>
}

export const PlayListContext = createContext<PlayListContextType>({} as PlayListContextType); 
export const UpdatePlaylistContext = createContext<UpdatePlaylistContextType>({} as UpdatePlaylistContextType);
export const ViewPlaylistContext = createContext<ViewPlaylistContextType>({} as ViewPlaylistContextType);
export const PlaylistDataContext = createContext<PlaylistDataContextType>({} as PlaylistDataContextType);
export const SongDataContext = createContext<SongDataContextType>({} as SongDataContextType);
export const UpdateSongContext = createContext<UpdateSongContextType>({} as UpdateSongContextType);



function App() {

  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [dataToEdit, setDataToEdit] = useState({} as IPlaylist);
  const [dataToView, setDataToView] = useState<ISong[]>([]);
  const [data, setData] = useState({} as IPlaylist);
  const [songData, setSongData] = useState({} as ISong);
  const [songToEdit, setSongToEdit] = useState({} as ISong);


  useEffect(()=> {
      setPlaylists(exampleList);
  }, [])

  return (
    <div>
    <PlayListContext.Provider value={{playlists, setPlaylists}}>
      <PlaylistDataContext.Provider value={{data, setData}}>
        <UpdatePlaylistContext.Provider value={{dataToEdit, setDataToEdit}}>
          <ViewPlaylistContext.Provider value={{dataToView, setDataToView}}>
            <SongDataContext.Provider value={{data: songData, setData: setSongData}}>
              <UpdateSongContext.Provider value={{songToEdit, setSongToEdit}}>
            <Routes>
              <Route path='/' element={<HomePlaylistLibrary/>}></Route>
              <Route path='/add-playlist' element={<AddPlaylistPage/>}></Route>
              <Route path='/edit-playlist' element={<EditPlaylistPage/>}></Route>
              <Route path='/view-playlist' element={<ViewPlaylistPage/>}></Route>
              <Route path='/add-song' element={<AddSongPage/>}></Route>
              <Route path='/edit-song' element={<EditSongPage/>}></Route>
              <Route path='/songs-library' element={<HomeSongsLibrary/>}></Route>
            </Routes>
             </UpdateSongContext.Provider>
            </SongDataContext.Provider>
          </ViewPlaylistContext.Provider>
        </UpdatePlaylistContext.Provider>
      </PlaylistDataContext.Provider>
    </PlayListContext.Provider>
    </div>
  );
}

export default App
