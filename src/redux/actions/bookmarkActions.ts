import { Bookmark } from "../../types/ReducerBookmark";

export const addBookmark = (payload: Bookmark, state: Bookmark[]) => {
  const idSet = new Set(state.map((bookmark: Bookmark) => bookmark.id));
  if (idSet.has(payload.id)) {
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
  const idSet = new Set(state.map((bookmark: Bookmark) => bookmark.id));
  if (idSet.has(payload.id)) {
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
