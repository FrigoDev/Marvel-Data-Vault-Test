import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Bookmarks from ".";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

describe("Bookmarks", () => {
  it("should render", () => {
    mockUseSelector.mockReturnValue({ bookmark: [], hide: [] });
    const { container } = render(<Bookmarks />);
    expect(container).toBeTruthy();
  });

  it("should render comic section", () => {
    mockUseSelector.mockReturnValue({
      bookmark: [
        {
          id: 1,
          name: "a boookmark title",
          type: "comic",
          image: "image",
        },
      ],
      hide: [],
    });
    render(<Bookmarks />);
    screen.getByText("a boookmark title");
  });

  it("should hide a bookmark", () => {
    mockUseSelector.mockReturnValue({
      bookmark: [
        {
          id: 1,
          name: "a boookmark title",
          type: "comic",
          image: "image",
        },
      ],
      hide: [
        {
          id: 1,
          type: "comic",
        },
      ],
    });
    render(<Bookmarks />);
    expect(screen.queryByText("a boookmark title")).toBeNull();
  });

  it("should Show all hide bookmarks", () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    mockUseSelector.mockReturnValue({
      bookmark: [
        {
          id: 1,
          name: "a boookmark title",
          type: "comic",
          image: "image",
        },
      ],
      hide: [
        {
          id: 1,
          type: "comic",
        },
      ],
    });
    render(<Bookmarks />);
    fireEvent.click(screen.getByText("View Hidden"));
    expect(dispatch).toHaveBeenCalledWith({ type: "SHOW_ALL_BOOKMARKS" });
  });

  it("should delete all bookmarks", () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    mockUseSelector.mockReturnValue({
      bookmark: [
        {
          id: 1,
          name: "a boookmark title",
          type: "comic",
          image: "image",
        },
      ],
      hide: [
        {
          id: 1,
          type: "comic",
        },
      ],
    });
    render(<Bookmarks />);
    fireEvent.click(screen.getByText("Delete all bookmarks"));
    expect(dispatch).toHaveBeenCalledWith({ type: "DELETE_ALL_BOOKMARKS" });
    expect(dispatch).toHaveBeenCalledWith({ type: "SHOW_ALL_BOOKMARKS" });
  });
  it("should click on a bookmark", () => {
    const navigate = jest.fn();
    mockUseNavigate.mockReturnValue(navigate);
    mockUseSelector.mockReturnValue({
      bookmark: [
        {
          id: 1,
          name: "a boookmark title",
          type: "comic",
          image: "image",
        },
      ],
      hide: [],
    });
    render(<Bookmarks />);
    fireEvent.click(screen.getByText("a boookmark title"));
    expect(navigate).toHaveBeenCalledWith("/comics/1");
  });
  it("render character section", () => {
    mockUseSelector.mockReturnValue({
      bookmark: [
        {
          id: 1,
          name: "a boookmark title",
          type: "character",
          image: "image",
        },
      ],
      hide: [],
    });
    render(<Bookmarks />);
    screen.getByText("a boookmark title");
  });
  it("click on hide bookmark comic", () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    mockUseSelector.mockReturnValue({
      bookmark: [
        {
          id: 1,
          name: "a boookmark title",
          type: "comic",
          image: "image",
        },
      ],
      hide: [],
    });
    render(<Bookmarks />);
    fireEvent.click(screen.getByText("Hide"));
    expect(dispatch).toHaveBeenCalledWith({
      type: "HIDE_BOOKMARK",
      payload: { id: 1, type: "comic" },
    });
  });
  it("click on hide bookmark character", () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    mockUseSelector.mockReturnValue({
      bookmark: [
        {
          id: 1,
          name: "a boookmark title",
          type: "character",
          image: "image",
        },
      ],
      hide: [],
    });
    render(<Bookmarks />);
    fireEvent.click(screen.getByText("Hide"));
    expect(dispatch).toHaveBeenCalledWith({
      type: "HIDE_BOOKMARK",
      payload: { id: 1, type: "character" },
    });
  });

  it("click on delete bookmark story", () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    mockUseSelector.mockReturnValue({
      bookmark: [
        {
          id: 1,
          name: "a boookmark title",
          type: "story",
          image: "image",
        },
      ],
      hide: [],
    });
    render(<Bookmarks />);
    fireEvent.click(screen.getByText("Delete"));
    expect(dispatch).toHaveBeenCalledWith({
      type: "DELETE_BOOKMARK",
      payload: { id: 1, type: "story" },
    });
  });

  it("click on delete bookmark comic", () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    mockUseSelector.mockReturnValue({
      bookmark: [
        {
          id: 1,
          name: "a boookmark title",
          type: "comic",
          image: "image",
        },
      ],
      hide: [],
    });
    render(<Bookmarks />);
    fireEvent.click(screen.getByText("Delete"));
    expect(dispatch).toHaveBeenCalledWith({
      type: "DELETE_BOOKMARK",
      payload: { id: 1, type: "comic" },
    });
  });

  it("click on delete bookmark character", () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    mockUseSelector.mockReturnValue({
      bookmark: [
        {
          id: 1,
          name: "a boookmark title",
          type: "character",
          image: "image",
        },
      ],
      hide: [],
    });
    render(<Bookmarks />);
    fireEvent.click(screen.getByText("Delete"));
    expect(dispatch).toHaveBeenCalledWith({
      type: "DELETE_BOOKMARK",
      payload: { id: 1, type: "character" },
    });
  });
});
export {};
