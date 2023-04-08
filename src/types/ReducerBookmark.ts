export interface Bookmark {
  id: number;
  name?: string;
  image?: string;
  type: string;
}

export interface BookmarkAction {
  type: string;
  payload: Bookmark;
}

export function isBookmark(payload: Bookmark): payload is Bookmark {
  return (payload as Bookmark).id !== undefined;
}

export enum BookmarkActionTypes {
  ADD_BOOKMARK = "ADD_BOOKMARK",
  DELETE_BOOKMARK = "DELETE_BOOKMARK",
  DELETE_ALL_BOOKMARKS = "DELETE_ALL_BOOKMARKS",
  HIDE_BOOKMARK = "HIDE_BOOKMARK",
  SHOW_BOOKMARK = "SHOW_BOOKMARK",
  SHOW_ALL_BOOKMARKS = "SHOW_ALL_BOOKMARKS",
}
