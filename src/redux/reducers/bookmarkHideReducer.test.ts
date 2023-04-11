import {
  Bookmark,
  BookmarkActionTypes,
  BookmarkAction,
} from "../../types/ReducerBookmark";

import bookmarkHideReducer from "./bookmarkHideReducer";

const initialState: Bookmark[] = [];

describe(" hideBookmarkReducer", () => {
  it("should return the initial state", () => {
    expect(bookmarkHideReducer(undefined, {} as BookmarkAction)).toEqual(
      initialState
    );
  });
  it("should handle HIDE_BOOKMARK", () => {
    const action = {
      type: BookmarkActionTypes.HIDE_BOOKMARK,
      payload: {
        id: 1,
        name: "test",
        type: "comic",
      },
    };
    expect(bookmarkHideReducer(initialState, action)).toEqual([
      {
        id: 1,
        name: "test",
        type: "comic",
      },
    ]);
  });
  it("should handle SHOW_BOOKMARK", () => {
    const action = {
      type: BookmarkActionTypes.SHOW_BOOKMARK,
      payload: {
        id: 1,
        name: "test",
        type: "comic",
      },
    };
    expect(bookmarkHideReducer(initialState, action)).toEqual([]);
  });
  it("should handle show all bookmarks", () => {
    const action = {
      type: BookmarkActionTypes.SHOW_ALL_BOOKMARKS,
    };
    expect(bookmarkHideReducer(initialState, action)).toEqual([]);
  });
  it("should return the actual state", () => {
    const data = [
      {
        id: 1,
        name: "test",
        type: "comic",
      },
    ];
    expect(
      bookmarkHideReducer(data, {
        type: BookmarkActionTypes.HIDE_BOOKMARK,
      })
    ).toEqual(data);
    expect(
      bookmarkHideReducer(data, {
        type: BookmarkActionTypes.SHOW_BOOKMARK,
      })
    ).toEqual(data);
  });
});
