/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fireEvent, render, screen } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import characters from "../../__Mocks__/charactersData";
import usePagination from "../../hooks/usePagination";

import CharaterPage from "./index";

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
describe("CharacterPage", () => {
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
    render(<CharaterPage />);
    expect(screen.getByText("Characters")).toBeInTheDocument();
  });

  it("should render error", () => {
    mockUsePagination.mockReturnValue(usePaginationreturn);
    mockUseSelector.mockReturnValue([]);
    render(<CharaterPage />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should render loading", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: true,
      error: false,
    });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<CharaterPage />);
    const loading = container.querySelector(".loader-container");
    expect(loading).toBeInTheDocument();
  });

  it("should render no characters found", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: { results: [] },
    });
    mockUseSelector.mockReturnValue([]);
    render(<CharaterPage />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("should render characters", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: {
        results: [characters.data.results[0]],
      },
    });
    mockUseSelector.mockReturnValue([]);
    render(<CharaterPage />);
    expect(
      screen.getByText(characters.data.results[0].name)
    ).toBeInTheDocument();
  });

  it("should render bookmarked characters", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: {
        results: [characters.data.results[0]],
      },
    });
    mockUseSelector.mockReturnValue([
      { id: 1017100, name: "A-Bomb (HAS)", type: "character" },
    ]);
    render(<CharaterPage />);
    expect(screen.getByText("Bookmarked: 1")).toBeInTheDocument();
  });

  it("should change comic param", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: {
        results: [characters.data.results[0]],
      },
    });
    mockUseSelector.mockReturnValue([
      { id: 1017100, name: "A-Bomb (HAS)", type: "comic" },
    ]);
    const { container } = render(<CharaterPage />);
    const select = container.querySelector("[name=\"comics\"]");
    expect(select).toBeInTheDocument();
    fireEvent.change(select!, { target: { value: "1017100" } });
    expect(changeParam).toBeCalledWith("comics", "1017100");
  });

  it("should change clear comic param", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: { results: [characters.data.results[0]] },
    });
    mockUseSelector.mockReturnValue([
      { id: 1017100, name: "A-Bomb (HAS)", type: "comic" },
    ]);
    const { container } = render(<CharaterPage />);
    const select = container.querySelector("[name=\"comics\"]");
    expect(select).toBeInTheDocument();
    fireEvent.change(select!, { target: { value: "1017100" } });
    expect(changeParam).toBeCalledWith("comics", "1017100");
    fireEvent.change(select!, { target: { value: "0" } });
    expect(removeParam).toBeCalledWith("comics");
  });

  it("should change clear or remove story param", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: { results: [characters.data.results[0]] },
    });
    mockUseSelector.mockReturnValue([
      { id: 1017100, name: "A-Bomb (HAS)", type: "story" },
    ]);
    const { container } = render(<CharaterPage />);
    const select = container.querySelector("[name=\"Story\"]");
    expect(select).toBeInTheDocument();
    fireEvent.change(select!, { target: { value: "1017100" } });
    expect(changeParam).toBeCalledWith("stories", "1017100");
    fireEvent.change(select!, { target: { value: "0" } });
    expect(removeParam).toBeCalledWith("stories");
  });

  it("input should change filter", () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: {
        results: [characters.data.results[0]],
      },
    });
    mockUseSelector.mockReturnValue([]);
    const { container } = render(<CharaterPage />);
    const input = container.querySelector("[name=\"search\"]");
    expect(input).toBeInTheDocument();
    fireEvent.change(input!, { target: { value: "A-Bomb" } });
    expect(handlefilter).toBeCalledWith("A-Bomb");
  });
  it("should navigate to character page", async () => {
    mockUsePagination.mockReturnValue({
      ...usePaginationreturn,
      loading: false,
      error: false,
      data: {
        results: [characters.data.results[0]],
      },
    });
    mockUseSelector.mockReturnValue([]);
    const navigate = jest.fn();
    mockNavigate.mockReturnValue(navigate);
    const container = render(<CharaterPage />);
    const character = await container.findByText(
      characters.data.results[0].name
    );
    character.parentElement?.click();
    expect(navigate).toBeCalledWith(
      `/characters/${characters.data.results[0].id}`
    );
  });
});
