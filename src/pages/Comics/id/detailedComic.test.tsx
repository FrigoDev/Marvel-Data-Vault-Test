import { render, screen, waitFor } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import characterMockData from "../../../__Mocks__/charactersData";
import worker from "../../../__Mocks__/mockServer";
import storiesDataMocks from "../../../__Mocks__/storiesData";

import DetailedComic from ".";

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

describe("Detailed comic", () => {
  it("should render", () => {
    mockNavigate.mockReturnValue(() => jest.fn());
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<DetailedComic />);
    expect(container.querySelector(".loader-container")).toBeInTheDocument();
  });

  it("should get data", async () => {
    mockNavigate.mockReturnValue(() => jest.fn());
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<DetailedComic />);
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
    const { container } = render(<DetailedComic />);
    await waitFor(() => {
      expect(
        container.querySelector(".loader-container")
      ).not.toBeInTheDocument();
    });
    expect(screen.getByText("Not found")).toBeInTheDocument();
  });

  it("should click on character and story cards", async () => {
    const navigate = jest.fn();
    mockNavigate.mockReturnValue(navigate);
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<DetailedComic />);
    await waitFor(() => {
      expect(
        container.querySelector(".loader-container")
      ).not.toBeInTheDocument();
    });
    const comicCard = screen.getByText(characterMockData.data.results[4].name);
    comicCard.click();
    expect(navigate).toHaveBeenCalledWith(
      `/characters/${characterMockData.data.results[4].id}`
    );
  });

  it("should click on story card", async () => {
    const navigate = jest.fn();
    mockNavigate.mockReturnValue(navigate);
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<DetailedComic />);
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

  it("should render bookmarked character cards", async () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValue(dispatch);
    mockNavigate.mockReturnValue(() => jest.fn());
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseSelector.mockReturnValue([
      {
        id: characterMockData.data.results[4].id,
        name: characterMockData.data.results[4].name,
        image: `${characterMockData.data.results[4].thumbnail.path}.${characterMockData.data.results[4].thumbnail.extension}`,
        type: "comic",
      },
    ]);
    const { container } = render(<DetailedComic />);
    await waitFor(() => {
      expect(
        container.querySelector(".loader-container")
      ).not.toBeInTheDocument();
    });

    screen.getByText(characterMockData.data.results[5].name);
    screen.getByText(characterMockData.data.results[4].name);
  });
});
