//import P1_image from '../assets/P1_image.jpeg';
//import P2_image from '../assets/P2_image.jpeg';
//import P3_image from '../assets/P3_image.jpeg';


export interface IPlaylist {
    Id: string;
    Name: string;
    Creator: string;
    Rating: number;
    ImageURL: string;
    Songs: string[];
}

async function fetchAllData() {
  try{
      const api = 'http://localhost:3005/playlistLibrary/all';
      const response = await fetch(api);
      const responseData = await response.json();
      const list: IPlaylist[] = [];
      responseData.map( function(playlist: IPlaylist) {
        const playlistSongs: string[] = [];
        playlist.Songs.map( function(songID: string) {
          playlistSongs.push(String(songID));
        })
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
    console.log(list.length);
    return list;
  } catch (e) {
      console.log('Error:', e);
      return e;
  }
}

export const allData = await fetchAllData() as IPlaylist[] ?? [];

//load first page of data from the server and return it as a list of IPlaylist objects
export async function fetchDataPerPage(pageNr: number, limit: number) {
  try{
      const isOnline = navigator.onLine;
      if(!isOnline) return;
      console.log(isOnline)
      const api = 'http://localhost:3005/playlistLibrary?page=' + pageNr + '&limit=' + limit;
      const response = await fetch(api);
      const responseData = await response.json();
      const list: IPlaylist[] = [];
      responseData.map( function(playlist: IPlaylist) {
        const playlistSongs: string[] = [];
        playlist.Songs.map( function(songID: string) {
          playlistSongs.push(String(songID));
        })
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
export const exampleList: IPlaylist[] = await fetchDataPerPage(1,100) as IPlaylist[] ?? [];
