import { FaCalendarAlt, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch } from "react-redux";

import {
  addBookmark,
  removeBookmark,
} from "../../../redux/DispatchMethods/bookmark";
import type { Story } from "../../../types/StoriesResponse";
import dataconverter from "../../../utils/dateConverter";

import "./StoryCard.css";

export default function StoryCard({
  story,
  bookmarked,
  handleClick,
}: {
  story: Story;
  bookmarked: boolean;
  handleClick: () => void;
}) {
  const dispatch = useDispatch();

  const addStoryBookmark = () => {
    story.title &&
      addBookmark(
        dispatch,
        Number(story.id),
        story.title,
        "story"
      );
  };

  const removeStoryBookmark = () => {
    removeBookmark(dispatch, Number(story.id), "story");
  };

  return (
    <div className="column">
      <div className="card-story">
        <div className="card-story-body" onClick={handleClick}>
          <h3 className="card-story-title">{story.title?.replace(/&QUOT;/g, "\"").replace(/Ñ/g,"")}</h3>
        </div>
        <div className="card-story-footer">
          <ul className="card-story-footer-list">
            {story.modified && !story.modified.includes("-0001") && (
              <li className="card-footer-item">
                <span className="card-footer-icon">
                  <FaCalendarAlt />
                </span>
                {dataconverter(story.modified)}
              </li>
            )}
            {!bookmarked && (
              <li className="card-footer-item" onClick={addStoryBookmark}>
                <span className="card-footer-icon">
                  <FaRegBookmark />
                </span>
                Bookmark
              </li>
            )}
            {bookmarked && (
              <li className="card-footer-item" onClick={removeStoryBookmark}>
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
