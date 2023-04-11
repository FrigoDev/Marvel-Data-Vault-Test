import { Bookmark } from "../../types/ReducerBookmark";

import {
  addBookmark,
  deleteBookmark,
  hideBookmark,
  showBookmark,
} from "./bookmarkActions";

describe("addBookmark", () => {
  it("should add a new bookmark to the state", () => {
    const bookmark: Bookmark = { id: 1, name: "juan", type: "comic" };
    const initialState: Bookmark[] = [];

    const newState = addBookmark(bookmark, initialState);

    expect(newState.length).toEqual(1);
    expect(newState[0]).toEqual(bookmark);
  });

  it("should not add a bookmark if it already exists in the state", () => {
    const bookmark: Bookmark = { id: 1, name: "juan", type: "comic" };
    const initialState: Bookmark[] = [bookmark];

    const newState = addBookmark(bookmark, initialState);

    expect(newState.length).toEqual(1);
    expect(newState[0]).toEqual(bookmark);
  });
});

describe("deleteBookmark", () => {
  it("should remove the specified bookmark from the state", () => {
    const bookmark: Bookmark = { id: 1, name: "juan", type: "comic" };
    const initialState: Bookmark[] = [bookmark];

    const newState = deleteBookmark(bookmark, initialState);

    expect(newState.length).toEqual(0);
  });

  it("should not remove any bookmarks if the specified bookmark does not exist in the state", () => {
    const bookmark: Bookmark = { id: 1, name: "juan", type: "comic" };
    const initialState: Bookmark[] = [];

    const newState = deleteBookmark(bookmark, initialState);

    expect(newState.length).toEqual(0);
  });
});

describe("hideBookmark", () => {
  it("should add the specified bookmark to the state", () => {
    const bookmark: Bookmark = { id: 1, name: "avengers", type: "comic" };
    const initialState: Bookmark[] = [];

    const newState = hideBookmark(bookmark, initialState);

    expect(newState.length).toEqual(1);
    expect(newState[0]).toEqual(bookmark);
  });

  it("should not add a bookmark if it already exists in the state", () => {
    const bookmark: Bookmark = { id: 1, name: "avengers", type: "comic" };
    const initialState: Bookmark[] = [bookmark];

    const newState = hideBookmark(bookmark, initialState);

    expect(newState.length).toEqual(1);
    expect(newState[0]).toEqual(bookmark);
  });
});

describe("showBookmark", () => {
  it("should remove the specified bookmark from the state", () => {
    const bookmark: Bookmark = { id: 1, name: "avengers", type: "comic" };
    const initialState: Bookmark[] = [bookmark];

    const newState = showBookmark(bookmark, initialState);

    expect(newState.length).toEqual(0);
  });

  it("should not remove any bookmarks if the specified bookmark does not exist in the state", () => {
    const bookmark: Bookmark = { id: 1, name: "avengers", type: "comic" };
    const initialState: Bookmark[] = [
      { id: 2, name: "spiderman", type: "comic" },
      { id: 3, name: "batman", type: "comic" },
      { id: 4, name: "superman", type: "comic" },
      { id: 1, name: "avengers", type: "comic" },
    ];

    const newState = showBookmark(bookmark, initialState);

    expect(newState).toEqual([
      { id: 2, name: "spiderman", type: "comic" },
      { id: 3, name: "batman", type: "comic" },
      { id: 4, name: "superman", type: "comic" },
    ]);
  });
});
