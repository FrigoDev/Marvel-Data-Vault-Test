import { Dispatch, AnyAction } from "redux";

import { BookmarkActionTypes, Bookmark } from "../../types/ReducerBookmark";

export const addBookmark = (
  dispatch: Dispatch<AnyAction>,
  id: number,
  name: string,
  type: string,
  image?: string
) => {
  dispatch({
    type: BookmarkActionTypes.ADD_BOOKMARK,
    payload: {
      id: id,
      type: type,
      name: name,
      ...(image && { image }),
    } as Bookmark,
  });
};

export const removeBookmark = (
  dispatch: Dispatch<AnyAction>,
  id: number,
  type: string
) => {
  dispatch({
    type: BookmarkActionTypes.DELETE_BOOKMARK,
    payload: {
      id: id,
      type: type,
    },
  });
};

export const hideBookmark = (
  dispatch: Dispatch<AnyAction>,
  id: number,
  type: string
) => {
  dispatch({
    type: BookmarkActionTypes.HIDE_BOOKMARK,
    payload: {
      id: id,
      type: type,
    },
  });
};

export const showBookmark = (
  dispatch: Dispatch<AnyAction>,
  id: number,
  type: string
) => {
  dispatch({
    type: BookmarkActionTypes.SHOW_BOOKMARK,
    payload: {
      id: id,
      type: type,
    },
  });
};

export const showAllBookmark = (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: BookmarkActionTypes.SHOW_ALL_BOOKMARKS,
  });
};

export const clearBookmark = (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: BookmarkActionTypes.DELETE_ALL_BOOKMARKS,
  });
};
