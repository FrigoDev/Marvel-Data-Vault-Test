import { FaCalendarAlt, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useDispatch } from "react-redux";

import {
  addBookmark,
  removeBookmark,
} from "../../../redux/DispatchMethods/bookmark";
import type { Comic } from "../../../types/ComicsResponse";
import dataconverter from "../../../utils/dateConverter";
import "../GenericCard.css";

export default function ComicCard({
  comic,
  bookmarked,
  handleClick,
}: {
  comic: Comic;
  bookmarked: boolean;
  handleClick: () => void;
}) {
  const dispatch = useDispatch();

  const addComicBookmark = () => {
    comic.title &&
      addBookmark(
        dispatch,
        Number(comic.id),
        comic.title,
        "comic",
        `${comic?.thumbnail?.path + "." + comic?.thumbnail?.extension}`
      );
  };

  const removeComicBookmark = () => {
    removeBookmark(dispatch, Number(comic.id), "comic");
  };
  return (
    <div className="column">
      <div className="card">
        <img
          className="card-image"
          onClick={handleClick}
          src={comic?.thumbnail?.path + "." + comic?.thumbnail?.extension}
          alt={comic.title}
        />
        <div className="card-body" onClick={handleClick}>
          <h3 className="card-title">{comic.title}</h3>
          <p className="card-text">
            {comic.description || "No description available"}
          </p>
        </div>
        <div className="card-footer">
          <ul className="card-footer-list">
            {comic.modified && !comic.modified.includes("-0001") && (
              <li className="card-footer-item">
                <span className="card-footer-icon">
                  <FaCalendarAlt />
                </span>
                {dataconverter(comic.modified)}
              </li>
            )}
            {!bookmarked && (
              <li className="card-footer-item" onClick={addComicBookmark}>
                <span className="card-footer-icon">
                  <FaRegBookmark />
                </span>
                Bookmark
              </li>
            )}
            {bookmarked && (
              <li className="card-footer-item" onClick={removeComicBookmark}>
                <span className="card-footer-icon">
                  <FaBookmark />
                </span>
                Remove Bookmark
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
