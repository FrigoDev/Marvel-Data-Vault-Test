/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fireEvent, render, screen } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import comics from "../../__Mocks__/storiesData";
import usePagination from "../../hooks/usePagination";

import ComicPage from ".";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("../../hooks/usePagination");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockUsePagination = usePagination as jest.MockedFunction<
  typeof usePagination
>;

const mockNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
useDispatch as jest.MockedFunction<typeof useDispatch>;
describe("ComicPage", () => {
  const nextPage = jest.fn();
  const prevPage = jest.fn();
  const firstPage = jest.fn();
  const lastPage = jest.fn();
  const handlefilter = jest.fn();
  const changeParam = jest.fn();
  const removeParam = jest.fn();
  const usePaginationreturn = {
    data: undefined,
    loading: false,
    error: true,
    currentPage: 1,
    totalPages: 1,
    changeParam,
    filter: "",
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    handlefilter,
    queryParams: { limit: "10", offset: "0" },
    removeParam,
  };
  it("should render page", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      error: false,
      loading: true,
    });
    mockUseSelector.mockReturnValue([]);
    render(<ComicPage />);
    expect(screen.getByText("Stories")).toBeInTheDocument();
  });
  it("should render error", () => {
    mockUsePagination.mockReturnValue(usePaginationreturn);
    mockUseSelector.mockReturnValue([]);
    render(<ComicPage />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should render loading", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: true,
      error: false,
    });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<ComicPage />);
    const loading = container.querySelector(".loader-container");
    expect(loading).toBeInTheDocument();
  });

  it("should render no comics found", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: { results: [] },
    });
    mockUseSelector.mockReturnValue([]);
    render(<ComicPage />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
  it("should render characters", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: {
        results: [comics.data.results[0]],
      },
    });
    mockUseSelector.mockReturnValue([]);
    render(<ComicPage />);
    expect(screen.getByText(comics.data.results[0].title)).toBeInTheDocument();
  });
  it("should render bookmarked characters", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: {
        results: [comics.data.results[0]],
      },
    });
    mockUseSelector.mockReturnValue([
      { id: 1017100, name: "A-Bomb (HAS)", type: "story" },
    ]);
    render(<ComicPage />);
    expect(screen.getByText("bookmarked: 1")).toBeInTheDocument();
  });

  it("should change filter", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: {
        results: [comics.data.results[0]],
      },
    });
    mockUseSelector.mockReturnValue([
      { id: 1017100, name: "A-Bomb (HAS)", type: "character" },
    ]);
    const { container } = render(<ComicPage />);
    const select = container.querySelector("[name=\"characters\"]");
    expect(select).toBeInTheDocument();
    fireEvent.change(select!, { target: { value: "1017100" } });
    expect(changeParam).toBeCalledWith("characters", "1017100");
  });

  it("should change clear filter param", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: { results: [comics.data.results[0]] },
    });
    mockUseSelector.mockReturnValue([
      { id: 1017100, name: "A-Bomb (HAS)", type: "character" },
    ]);
    const { container } = render(<ComicPage />);
    const select = container.querySelector("[name=\"characters\"]");
    expect(select).toBeInTheDocument();
    fireEvent.change(select!, { target: { value: "1017100" } });
    expect(changeParam).toBeCalledWith("characters", "1017100");
    fireEvent.change(select!, { target: { value: "0" } });
    expect(removeParam).toBeCalledWith("characters");
  });

  it("should navigate to character page", async () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: {
        results: [comics.data.results[0]],
      },
    });
    mockUseSelector.mockReturnValue([]);
    const navigate = jest.fn();
    mockNavigate.mockReturnValue(navigate);
    const container = render(<ComicPage />);
    const character = await container.findByText(comics.data.results[0].title);
    character.parentElement?.click();
    expect(navigate).toBeCalledWith(`/stories/${comics.data.results[0].id}`);
  });
});
