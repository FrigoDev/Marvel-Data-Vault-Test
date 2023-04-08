import {
  Bookmark,
  BookmarkAction,
  BookmarkActionTypes
} from "../../types/ReducerBookmark";
import { hideBookmark, showBookmark } from "../actions/bookmarkActions";
export const initialState: Bookmark[] = [];

const bookmarkHideReducer = (state = initialState, action: BookmarkAction) => {
  switch (action.type) {
  case BookmarkActionTypes.HIDE_BOOKMARK:
    return hideBookmark(action.payload, state);
    break;
  case BookmarkActionTypes.SHOW_BOOKMARK:
    return showBookmark(action.payload, state);
    break;
  case BookmarkActionTypes.SHOW_ALL_BOOKMARKS:
    return initialState;
    break;
  default:
    return state;
  }
};
export default bookmarkHideReducer;
