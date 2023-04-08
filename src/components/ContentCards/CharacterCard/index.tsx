import { FaCalendarAlt, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useDispatch } from "react-redux";

import {
  addBookmark,
  removeBookmark,
} from "../../../redux/DispatchMethods/bookmark";
import type { Character } from "../../../types/CharactersResponse";
import dateConverter from "../../../utils/dateConverter";
import "../GenericCard.css";

const CharacterCard = ({
  character,
  bookmarked,
  handleClick,
}: {
  character: Character;
  bookmarked: boolean;
  handleClick: () => void;
}) => {
  const dispatch = useDispatch();
  const addCharacterBookmark = () => {
    character.name &&
      addBookmark(
        dispatch,
        Number(character.id),
        character.name,
        "character",
        `${character?.thumbnail?.path}.${character?.thumbnail?.extension}`
      );
  };

  const removeCharacterBookmark = () => {
    removeBookmark(dispatch, Number(character.id), "character");
  };
  return (
    <div className="column">
      <div className="card">
        <img
          className="card-image"
          src={
            character.thumbnail?.extension &&
            `${character.thumbnail.path}.${character.thumbnail.extension}`
          }
          alt={character.name}
          onClick={handleClick}
        />
        <div className="card-body" onClick={handleClick}>
          <h3 className="card-title">{character.name}</h3>
          <p className="card-text">
            {character.description || "No description available"}
          </p>
        </div>
        <div className="card-footer">
          <ul className="card-footer-list">
            {character.modified && !character.modified.includes("-0001") && (
              <li className="card-footer-item">
                <span className="card-footer-icon">
                  <FaCalendarAlt />
                </span>
                {dateConverter(character.modified)}
              </li>
            )}
            {!bookmarked ? (
              <li className="card-footer-item" onClick={addCharacterBookmark}>
                <span className="card-footer-icon">
                  <FaRegBookmark />
                </span>
                Bookmark
              </li>
            ) : (
              <li
                className="card-footer-item"
                onClick={removeCharacterBookmark}
              >
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
};
export default CharacterCard;
