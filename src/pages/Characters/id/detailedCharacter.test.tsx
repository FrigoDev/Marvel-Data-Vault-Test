import { render, screen, waitFor } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import comicsDataMocks from "../../../__Mocks__/comicsData";
import worker from "../../../__Mocks__/mockServer";
import storiesDataMocks from "../../../__Mocks__/storiesData";

import DetailedCharacter from ".";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

worker.listen();
const mockNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;
const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

describe("DetailedCharacter", () => {
  it("should render", () => {
    mockNavigate.mockReturnValue(() => jest.fn());
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<DetailedCharacter />);
    expect(container.querySelector(".loader-container")).toBeInTheDocument();
  });
  it("should get data", async () => {
    mockNavigate.mockReturnValue(() => jest.fn());
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<DetailedCharacter />);
    await waitFor(() => {
      expect(
        container.querySelector(".loader-container")
      ).not.toBeInTheDocument();
    });
  });
  it("should render error", async () => {
    mockNavigate.mockReturnValue(() => jest.fn());
    mockUseParams.mockReturnValue({ id: "3" });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<DetailedCharacter />);
    await waitFor(() => {
      expect(
        container.querySelector(".loader-container")
      ).not.toBeInTheDocument();
    });
    expect(screen.getByText("Not found")).toBeInTheDocument();
  });

  it("should click on comic card", async () => {
    const navigate = jest.fn();
    mockNavigate.mockReturnValue(navigate);
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<DetailedCharacter />);
    await waitFor(() => {
      expect(
        container.querySelector(".loader-container")
      ).not.toBeInTheDocument();
    });
    const comicCard = screen.getByText(comicsDataMocks.data.results[4].title);
    comicCard.click();
    expect(navigate).toHaveBeenCalledWith(
      `/comics/${comicsDataMocks.data.results[4].id}`
    );
  });
  it("should click on story card", async () => {
    const navigate = jest.fn();
    mockNavigate.mockReturnValue(navigate);
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<DetailedCharacter />);
    await waitFor(() => {
      expect(
        container.querySelector(".loader-container")
      ).not.toBeInTheDocument();
    });
    const storyCard = screen.getByText(storiesDataMocks.data.results[4].title);
    storyCard.click();
    expect(navigate).toHaveBeenCalledWith(
      `/stories/${storiesDataMocks.data.results[4].id}`
    );
  });

  it("should click on bookmark comic card", async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    mockNavigate.mockReturnValue(() => jest.fn());
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseSelector.mockReturnValue([
      {
        id: comicsDataMocks.data.results[4].id,
        name: comicsDataMocks.data.results[4].title,
        image: `${comicsDataMocks.data.results[4].thumbnail.path}.${comicsDataMocks.data.results[4].thumbnail.extension}`,
        type: "comic",
      },
    ]);
    const { container } = render(<DetailedCharacter />);
    await waitFor(() => {
      expect(
        container.querySelector(".loader-container")
      ).not.toBeInTheDocument();
    });

    const bookmarkComicCard = screen.getByText(
      comicsDataMocks.data.results[5].title
    );
    bookmarkComicCard.parentElement?.parentElement
      ?.querySelector("li")
      ?.click();
    expect(dispatch).toHaveBeenCalled();

    const bookmarkComicCard2 = screen.getByText(
      comicsDataMocks.data.results[4].title
    );
    bookmarkComicCard2.parentElement?.parentElement
      ?.querySelector("li")
      ?.click();
    expect(dispatch).toHaveBeenCalled();
  });
});
