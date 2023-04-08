import {
  Bookmark,
  BookmarkAction,
  isBookmark,
  BookmarkActionTypes,
} from "../../types/ReducerBookmark";
import { addBookmark, deleteBookmark } from "../actions/bookmarkActions";
export const initialState: Bookmark[] = [];

const bookmarkReducer = (state = initialState, action: BookmarkAction) => {
  switch (action.type) {
  case BookmarkActionTypes.ADD_BOOKMARK:
    if (isBookmark(action.payload)) {
      return addBookmark(action.payload, state);
    }
    return state;
    break;

  case BookmarkActionTypes.DELETE_BOOKMARK:
    if (isBookmark(action.payload)) {
      return deleteBookmark(action.payload, state);
    }
    return state;
    break;
  case BookmarkActionTypes.DELETE_ALL_BOOKMARKS:
    return [];
    break;

  default:
    return state;
  }
};

export default bookmarkReducer;
