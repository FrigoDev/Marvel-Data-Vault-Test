import { Bookmark } from "../../types/ReducerBookmark";

export const addBookmark = (payload: Bookmark, state: Bookmark[]) => {
 
  if (state.some((bookmark: Bookmark) => bookmark.id === payload.id)) {
    return state;
  }
  return [...state, payload];
};

export const deleteBookmark = (payload: Bookmark, state: Bookmark[]) => {
  return state.filter(
    (bookmark: Bookmark) =>
      bookmark.id !== payload.id || bookmark.type !== payload.type
  );
};

export const hideBookmark = (payload: Bookmark, state: Bookmark[]) => {
  if (state.some((bookmark: Bookmark) => bookmark.id === payload.id)) {
    return state;
  }
  return [...state, payload];
};

export const showBookmark = (payload: Bookmark, state: Bookmark[]) => {
  return state.filter(
    (bookmark: Bookmark) =>
      bookmark.id !== payload.id || bookmark.type !== payload.type
  );
};
