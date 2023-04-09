import {
  Bookmark,
  BookmarkAction,
  BookmarkActionTypes,
  isBookmark
} from "../../types/ReducerBookmark";
import { hideBookmark, showBookmark } from "../actions/bookmarkActions";
export const initialState: Bookmark[] = [];

const bookmarkHideReducer = (state = initialState, action: BookmarkAction) => {
  switch (action.type) {
  case BookmarkActionTypes.HIDE_BOOKMARK:
    if (isBookmark(action.payload)){return hideBookmark(action.payload, state);}
    return state;
  case BookmarkActionTypes.SHOW_BOOKMARK:
    if (isBookmark(action.payload)){return showBookmark(action.payload, state);}
    return state;
  case BookmarkActionTypes.SHOW_ALL_BOOKMARKS:
    return initialState;
  default:
    return state;
  }
};
export default bookmarkHideReducer;
