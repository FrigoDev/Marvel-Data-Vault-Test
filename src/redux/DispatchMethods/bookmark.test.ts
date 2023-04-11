import { BookmarkActionTypes } from "../../types/ReducerBookmark";

import {
  addBookmark,
  hideBookmark,
  clearBookmark,
  removeBookmark,
  showBookmark,
  showAllBookmark,
} from "./bookmark";

const dispatchMock = jest.fn();

const id = 1;
const name = "Test bookmark";
const type = "Test type";
const image = "Test image";

describe("Bookmark Actions", () => {
  it("addBookmark dispatches the correct action", () => {
    addBookmark(dispatchMock, id, name, type, image);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: BookmarkActionTypes.ADD_BOOKMARK,
      payload: {
        id: id,
        type: type,
        name: name,
        image: image,
      },
    });
  });

  it("hideBookmark dispatches the correct action", () => {
    hideBookmark(dispatchMock, id, type);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: BookmarkActionTypes.HIDE_BOOKMARK,
      payload: {
        id: id,
        type: type,
      },
    });
  });

  it("clearBookmark dispatches the correct action", () => {
    clearBookmark(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: BookmarkActionTypes.DELETE_ALL_BOOKMARKS,
    });
  });

  it("removeBookmark dispatches the correct action", () => {
    removeBookmark(dispatchMock, id, type);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: BookmarkActionTypes.DELETE_BOOKMARK,
      payload: {
        id: id,
        type: type,
      },
    });
  });

  it("showBookmark dispatches the correct action", () => {
    showBookmark(dispatchMock, id, type);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: BookmarkActionTypes.SHOW_BOOKMARK,
      payload: {
        id: id,
        type: type,
      },
    });
  });

  it("showAllBookmark dispatches the correct action", () => {
    showAllBookmark(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: BookmarkActionTypes.SHOW_ALL_BOOKMARKS,
    });
  });
});
