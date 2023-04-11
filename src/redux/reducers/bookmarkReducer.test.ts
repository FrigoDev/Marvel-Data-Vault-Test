import {
  BookmarkAction,
  BookmarkActionTypes,
} from "../../types/ReducerBookmark";

import bookmarkReducer from "./bookmarkReducer";

describe("bookmark Reducer", () => {
  it("should return the initial state", () => {
    expect(bookmarkReducer(undefined, {} as BookmarkAction)).toEqual([]);
  });
  it("should handle ADD_BOOKMARK", () => {
    expect(
      bookmarkReducer([], {
        type: BookmarkActionTypes.ADD_BOOKMARK,
        payload: {
          id: 1,
          name: "Test",
          type: "comics",
        },
      })
    ).toEqual([
      {
        id: 1,
        name: "Test",
        type: "comics",
      },
    ]);
  });
  it("should handle DELETE_BOOKMARK", () => {
    expect(
      bookmarkReducer(
        [
          {
            id: 1,
            name: "Test",
            type: "comics",
          },
        ],
        {
          type: BookmarkActionTypes.DELETE_BOOKMARK,
          payload: { id: 1, name: "Test", type: "comics" },
        }
      )
    ).toEqual([]);
  });
  it("should handle DELETE_ALL_BOOKMARKS", () => {
    expect(
      bookmarkReducer(
        [
          {
            id: 1,
            name: "Test",
            type: "comics",
          },
          {
            id: 2,
            name: "Test2",
            type: "comics",
          },
        ],
        {
          type: BookmarkActionTypes.DELETE_ALL_BOOKMARKS,
        }
      )
    ).toEqual([]);
  });

  it("should to return the same state", () => {
    expect(
      bookmarkReducer(
        [
          {
            id: 1,
            name: "Test",
            type: "comics",
          },
          {
            id: 2,
            name: "Test2",
            type: "comics",
          },
        ],
        {
          type: BookmarkActionTypes.ADD_BOOKMARK,
        }
      )
    ).toEqual([
      {
        id: 1,
        name: "Test",
        type: "comics",
      },
      {
        id: 2,
        name: "Test2",
        type: "comics",
      },
    ]);

    expect(
      bookmarkReducer(
        [
          {
            id: 1,
            name: "Test",
            type: "comics",
          },
          {
            id: 2,
            name: "Test2",
            type: "comics",
          },
        ],
        {
          type: BookmarkActionTypes.DELETE_BOOKMARK,
        }
      )
    ).toEqual([
      {
        id: 1,
        name: "Test",
        type: "comics",
      },
      {
        id: 2,
        name: "Test2",
        type: "comics",
      },
    ]);
  });
});

export {};
