export interface ISong {
    Id: string;
    Title: string;
    Artist: string;
}

async function getAllSongs() {
    try{
        const isOnline = navigator.onLine;
        if(!isOnline) return;
  
        const api = 'http://localhost:3005/songList';
        const response = await fetch(api);
        console.log('Response ', response)
        const responseData = await response.json();
        const list: ISong[] = [];
        responseData.map( function(song: ISong) {
          const data: ISong = {
                Id: String(song.Id),
                Title: String(song.Title),
                Artist: String(song.Artist),
            };
            list.push(data);
      });
      return list;
    } catch (e) {
        console.log('Error:', e);
        return e;
    }
  }
  
  
  export const songList: ISong[] = await getAllSongs() as ISong[] ?? [];
  