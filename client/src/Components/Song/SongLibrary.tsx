import { ISong } from './Song.type.js';
import '../Playlist/Playlist.style.css';
import { useNavigate } from 'react-router-dom';
import { UpdateSongContext } from "../../App";
import { useContext } from "react";

type Props = {
    songs: ISong[];
    deleteSong: (data: ISong) => void;
};

function SongLibrary(props: Props) {
    const {songs, deleteSong} = props;
    const navigate = useNavigate();

    const updateSongContext = useContext(UpdateSongContext);

    const onEditClick = (data: ISong) => {
        updateSongContext.setSongToEdit(data);
        navigate('/edit-song');
    }
    const songsList = songs.map((song: ISong) => (
        <li key={song.Id} className="card">
            <img className="card-image"/>
            <div >
                <h4 className="card-text">{song.Title}</h4>
                <p className="card-text">
                    {song.Artist}
                </p>
                <button className="button" onClick={() =>deleteSong(song)}>Delete</button>
                <button className="button" onClick={() =>onEditClick(song)}>Edit</button>
            </div>
        </li>
));

    return <ul>{songsList}</ul>;
}

SongLibrary.defaultProps = {
    songs: [],
}

export default SongLibrary;
