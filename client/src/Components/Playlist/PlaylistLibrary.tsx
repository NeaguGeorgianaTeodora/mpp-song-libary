import { IPlaylist} from "./Playlist.type"
import './Playlist.style.css';
import { useNavigate } from 'react-router-dom';
import { UpdatePlaylistContext, ViewPlaylistContext, PlaylistDataContext } from "../../App";
import { useContext } from "react";

type Props = {
    items: IPlaylist[];
    deletePlaylist: (data: IPlaylist) => void;
};

function PlaylistLibrary(props: Props) {
    const {items, deletePlaylist} = props;
    const navigate = useNavigate();

    const updatePlaylistContext = useContext(UpdatePlaylistContext);
    const viewPlaylistContext = useContext(ViewPlaylistContext);
    const playlistDataContext = useContext(PlaylistDataContext);

    const onEditClick = (data: IPlaylist) => {
        updatePlaylistContext.setDataToEdit(data);
        navigate('/edit-playlist');
    }

    const onViewClick = (data: IPlaylist) => {
        viewPlaylistContext.setDataToView(data.Songs);
        playlistDataContext.setData(data);

        const api = `http://localhost:3005/playlistLibrary/${data.Id}/songs`;
        fetch(api, {method: "GET"}).then(response => response.json()).then((response) =>{
            
            console.log('Response:', response.data);
            return response;
        }).catch((error) => {
            console.log('Error:', error.message);
        });
        navigate('/view-playlist');
    }

    const playlists = items.map((playlist: IPlaylist) => (
            <li key={playlist.Id} className="card">
                <img className="card-image" src={playlist.ImageURL} alt="Avatar" style={{width: "100%"}}/>
                <div >
                    <h4 className="card-text">{playlist.Name}</h4>
                    <p className="card-text">
                        {playlist.Creator}
                        <span> &#8226; </span>
                        {playlist.Rating}
                    </p>
                    <button className="button" onClick={() => onViewClick(playlist)}>View</button>
                    <button className="button" onClick={() =>deletePlaylist(playlist)}>Delete</button>
                    <button className="button" onClick={() =>onEditClick(playlist)}>Edit</button>
                </div>
            </li>
    ));
    return <ul>{playlists}</ul>;
}

PlaylistLibrary.defaultProps = {
    items: [],
}

export default PlaylistLibrary;
