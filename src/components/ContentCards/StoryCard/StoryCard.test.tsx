import { act, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";

import storyDataMock from "../../../__Mocks__/storiesData";
import { Story } from "../../../types/StoriesResponse";

import StoryCard from ".";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

const mockDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

describe("testing Cards", () => {
  it("should render CharacterCard", () => {
    const dispatch = jest.fn();
    const navigate = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    render(
      <StoryCard
        story={storyDataMock.data.results[0] as unknown as Story}
        bookmarked={true}
        handleClick={() => {
          navigate();
        }}
      />
    );
    screen.findByText("Remove Bookmark");
  });

  it("click on Remove bookmark", async () => {
    const dispatch = jest.fn();
    const navigate = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    render(
      <StoryCard
        story={storyDataMock.data.results[0] as unknown as Story}
        bookmarked={true}
        handleClick={() => {
          navigate();
        }}
      />
    );
    const bookmark = await screen.findByText("Remove Bookmark");
    act(() => {
      bookmark.click();
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "DELETE_BOOKMARK",
      payload: { id: storyDataMock.data.results[0].id, type: "story" },
    });
  });

  it("click on Add bookmark", async () => {
    const dispatch = jest.fn();
    const navigate = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    render(
      <StoryCard
        story={storyDataMock.data.results[0] as unknown as Story}
        bookmarked={false}
        handleClick={() => {
          navigate();
        }}
      />
    );
    const bookmark = await screen.findByText("Bookmark");
    act(() => {
      bookmark.click();
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "ADD_BOOKMARK",
      payload: {
        id: storyDataMock.data.results[0].id,
        name: storyDataMock.data.results[0].title,
        type: "story",
      },
    });
  });
});
