import './App.css'
import HomePlaylistLibrary from './Components/HomePlaylistLibrary';
import AddPlaylistPage from './Components/AddPlaylistPage';
import EditPlaylistPage from './Components/EditPlaylistPage';
import ViewPlaylistPage from './Components/ViewPlaylistpage';
import AddSongPage from './Components/AddSongPage.tsx';
import EditSongPage from './Components/EditSongPage.tsx';
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



function App() {

  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [dataToEdit, setDataToEdit] = useState({} as IPlaylist);
  const [dataToView, setDataToView] = useState<ISong[]>([]);
  const [data, setData] = useState({} as IPlaylist);
  const [songData, setSongData] = useState({} as ISong);

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
            <Routes>
              <Route path='/' element={<HomePlaylistLibrary/>}></Route>
              <Route path='/add-playlist' element={<AddPlaylistPage/>}></Route>
              <Route path='/edit-playlist' element={<EditPlaylistPage/>}></Route>
              <Route path='/view-playlist' element={<ViewPlaylistPage/>}></Route>
              <Route path='/add-song' element={<AddSongPage/>}></Route>
              <Route path='/edit-song' element={<EditSongPage/>}></Route>
            </Routes>
            </SongDataContext.Provider>
          </ViewPlaylistContext.Provider>
        </UpdatePlaylistContext.Provider>
      </PlaylistDataContext.Provider>
    </PlayListContext.Provider>
    </div>
  );
}

export default App
