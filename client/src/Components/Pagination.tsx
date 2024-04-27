import {useContext} from 'react';
import { PlayListContext} from '../App.js';

type Props = {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postPage: number;
};

export const Pagination = (props: Props) => {

  const { setCurrentPage, postPage } = props;
  const playListContext = useContext(PlayListContext);
  const totalPosts = playListContext.playlists.length;
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts/postPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {
        pages.map((page, index) => {
          return (
            <button key={index} onClick={() => setCurrentPage(page)}>{page}</button>
          )
        })
      }
    </div>
  )
}
