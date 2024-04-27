
import { ISong } from '../Song/Song.type';
//import P1_image from '../assets/P1_image.jpeg';
//import P2_image from '../assets/P2_image.jpeg';
//import P3_image from '../assets/P3_image.jpeg';


export interface IPlaylist {
    Id: string;
    Name: string;
    Creator: string;
    Rating: number;
    ImageURL: string;
    Songs: ISong[];
}

async function callData() {
  try{
      const isOnline = navigator.onLine;
      if(!isOnline) return;

      const api = 'http://localhost:3005/playlistLibrary';
      const response = await fetch(api);
      console.log('Response ', response)
      const responseData = await response.json();
      console.log(responseData);
      const list: IPlaylist[] = [];
      responseData.map( function(playlist: IPlaylist) {
        const playlistSongs: ISong[] = [];
        playlist.Songs.map( function(songList: ISong) {
          const song: ISong = {
              Id: String(songList.Id),
              Title: String(songList.Title),
              Artist: String(songList.Artist),
          };
          playlistSongs.push(song);
        });
          const data: IPlaylist = {
              Id: String(playlist.Id),
              Name: String(playlist.Name),
              Creator: String(playlist.Creator),
              Rating: Number(playlist.Rating),
              ImageURL: String(playlist.ImageURL),
              Songs: playlistSongs,
          };
        list.push(data);
    });
    return list;
  } catch (e) {
      console.log('Error:', e);
      return e;
  }
}


export const exampleList: IPlaylist[] = await callData() as IPlaylist[] ?? [];
