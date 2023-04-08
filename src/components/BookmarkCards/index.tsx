import { FaEyeSlash, FaTrash } from "react-icons/fa";

import { Bookmark } from "../../types/ReducerBookmark";
import "../ContentCards/GenericCard.css";

const BookmarkCard = ({
  bookmark,
  handleDelete,
  handleClick,
  handleHide,
}: {
  bookmark: Bookmark;
  handleDelete: () => void;
  handleClick: () => void;
  handleHide: () => void;
}) => {
  return (
    <div className="column">
      <div className="card">
        {bookmark.image && (
          <img
            className="card-image"
            onClick={handleClick}
            src={bookmark.image}
            alt={bookmark.name}
          />
        )}
        <div className="card-body" onClick={handleClick}>
          <h3 className="card-title">
            {bookmark.name?.replace(/&QUOT;/g, "\"").replace(/Ñ/g,"")}</h3>
        </div>
        <div className="card-footer">
          <ul className="card-footer-list">
            <li className="card-footer-item" onClick={handleHide}>
              <span className="card-footer-icon">
                <FaEyeSlash />
              </span>
              Hide
            </li>
            <li className="card-footer-item" onClick={handleDelete}>
              <span className="card-footer-icon">
                <FaTrash />
              </span>
              Delete
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
