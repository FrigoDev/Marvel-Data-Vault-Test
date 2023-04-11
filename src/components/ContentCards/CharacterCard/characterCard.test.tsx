import { act, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";

import charactersDataMock from "../../../__Mocks__/charactersData";

import CharacterCard from ".";

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
      <CharacterCard
        character={charactersDataMock.data.results[0]}
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
      <CharacterCard
        character={charactersDataMock.data.results[0]}
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
      payload: { id: charactersDataMock.data.results[0].id, type: "character" },
    });
  });

  it("click on Add bookmark", async () => {
    const dispatch = jest.fn();
    const navigate = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    render(
      <CharacterCard
        character={charactersDataMock.data.results[0]}
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
        id: charactersDataMock.data.results[0].id,
        name: charactersDataMock.data.results[0].name,
        type: "character",
        image: `${charactersDataMock.data.results[0].thumbnail.path}.${charactersDataMock.data.results[0].thumbnail.extension}`,
      },
    });
  });
});
