import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import BookmarkCard from "../../components/BookmarkCards";
import {
  hideBookmark,
  clearBookmark,
  removeBookmark,
  showAllBookmark,
} from "../../redux/DispatchMethods/bookmark";
import { Bookmark } from "../../types/ReducerBookmark";
import "../DetailedStyles.css";
import "./Bookmarks.css";

const Bookmarks = () => {
  const navigate = useNavigate();
  const { bookmark, hide } = useSelector(
    (state: { bookmark: Bookmark[]; hide: Bookmark[] }) => state
  );
  const comics = bookmark.filter(
    (comic) =>
      !hide.some((x) => x.id === comic.id && x.type === comic.type) &&
      comic.type === "comic"
  );
  const stories = bookmark.filter(
    (story) =>
      !hide.some((x) => x.id === story.id && x.type === story.type) &&
      story.type === "story"
  );
  const characters = bookmark.filter(
    (character) =>
      !hide.some((x) => x.id === character.id && x.type === character.type) &&
      character.type === "character"
  );
  const dispatch = useDispatch();
  return (
    <main className="page-component">
      <h1 className="page-main-title">Bookmarks</h1>
      <div className="page-buttons-container">
        <button
          className="page-buttons"
          onClick={() => {
            showAllBookmark(dispatch);
          }}
        >
          View Hidden
        </button>
        <button
          className="page-buttons"
          onClick={() => {
            clearBookmark(dispatch);
            showAllBookmark(dispatch);
          }}
        >
          Delete all bookmarks
        </button>
      </div>
      <div className="container">
        <div className="info-section">
          <h2 className="page-subtitle">Comics</h2>
          <div className="cards-container">
            {comics.map((item) => (
              <BookmarkCard
                key={item.id}
                bookmark={item}
                handleClick={() => navigate(`/comics/${item.id}`)}
                handleDelete={() => {
                  removeBookmark(dispatch, item.id, item.type);
                }}
                handleHide={() => {
                  hideBookmark(dispatch, item.id, item.type);
                }}
              />
            ))}
          </div>
        </div>
        <div className="info-section">
          <h2 className="page-subtitle">Characters</h2>
          <div className="cards-container">
            {characters.map((item) => (
              <BookmarkCard
                key={item.id}
                bookmark={item}
                handleClick={() => navigate(`/characters/${item.id}`)}
                handleDelete={() => {
                  removeBookmark(dispatch, item.id, item.type);
                }}
                handleHide={() => {
                  hideBookmark(dispatch, item.id, item.type);
                }}
              />
            ))}
          </div>
        </div>
        <div className="info-section">
          <h2 className="page-subtitle">Stories</h2>
          <div className="cards-container">
            {stories.map((item) => (
              <BookmarkCard
                key={item.id}
                bookmark={item}
                handleClick={() => navigate(`/stories/${item.id}`)}
                handleDelete={() => {
                  removeBookmark(dispatch, item.id, item.type);
                }}
                handleHide={() => {
                  hideBookmark(dispatch, item.id, item.type);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Bookmarks;
