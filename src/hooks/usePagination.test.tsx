import { renderHook, waitFor, act } from "@testing-library/react";
import { useSearchParams, useLocation } from "react-router-dom";

import comicsMockData from "../__Mocks__/comicsData";
import worker from "../__Mocks__/mockServer";
import { getComics } from "../utils/apiSocket";

import usePagination from "./usePagination";

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
  useLocation: jest.fn(),
}));

worker.listen();

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>;
const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;

describe("usePagination", () => {
  it("should getData", async () => {
    mockUseLocation.mockReturnValue({
      pathname: "/comics",
      search: "?page=1",
      state: undefined,
      key: "5nvxpbdafa",
      hash: "",
    });
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("page=1&comics=1234"),
      jest.fn(),
    ]);
    const { result } = renderHook(() =>
      usePagination(getComics, "nameStartsWith", ["comics", "stories"])
    );
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.currentPage).toBe(0);
    expect(result.current.error).toBe(false);
    expect(result.current.data).not.toBe(undefined);
    expect(result.current.data?.results).not.toBe(undefined);
  });
  it("should getData whitout page", async () => {
    mockUseLocation.mockReturnValue({
      pathname: "/comics",
      search: "?page=1",
      state: undefined,
      key: "5nvxpbdafa",
      hash: "",
    });
    mockUseSearchParams.mockReturnValue([new URLSearchParams(""), jest.fn()]);
    const { result } = renderHook(() => usePagination(getComics));
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.currentPage).toBe(0);
    expect(result.current.error).toBe(false);
    expect(result.current.data).not.toBe(undefined);
    expect(result.current.data?.results).not.toBe(undefined);
  });

  it("should set error while getData", async () => {
    mockUseLocation.mockReturnValue({
      pathname: "/comics",
      search: "?page=5",
      state: undefined,
      key: "5nvxpbdafa",
      hash: "",
    });
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("page=5&comics=1234"),
      jest.fn(),
    ]);
    const { result } = renderHook(() =>
      usePagination(getComics, "nameStartsWith", ["comics", "stories"])
    );
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe(true);
  });

  it("should remove a param", () => {
    mockUseLocation.mockReturnValue({
      pathname: "/comics",
      search: "?page=5",
      state: undefined,
      key: "5nvxpbdafa",
      hash: "",
    });
    const setParams = jest.fn();
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("page=5&comics=1234"),
      setParams,
    ]);
    const { result } = renderHook(() =>
      usePagination(getComics, "nameStartsWith", ["comics", "stories"])
    );
    result.current.removeParam("comics");
    expect(setParams).toBeCalledWith({ page: "5" });
    expect(result.current.removeParam("comics2")).toBe(undefined);
  });

  it("should change page", async () => {
    mockUseLocation.mockReturnValue({
      pathname: "/comics",
      search: "?page=2",
      state: undefined,
      key: "5nvxpbdafa",
      hash: "",
    });
    const setParams = jest.fn();
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("page=2&comics=1234"),
      setParams,
    ]);
    const { result } = renderHook(() =>
      usePagination(getComics, "nameStartsWith", ["comics", "stories"])
    );
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.nextPage();
    });
    expect(setParams).toBeCalledWith({ page: "3", comics: "1234" });
    act(() => {
      result.current.prevPage();
    });
    expect(setParams).toBeCalledWith({ page: "1", comics: "1234" });
    act(() => {
      result.current.firstPage();
    });
    expect(setParams).toBeCalledWith({ page: "1", comics: "1234" });
    act(() => {
      result.current.lastPage();
    });
    expect(setParams).toBeCalledWith({
      page: Math.ceil(
        comicsMockData.data.total / comicsMockData.data.limit
      ).toString(),
      comics: "1234",
    });
  });

  it("should change param", async () => {
    mockUseLocation.mockReturnValue({
      pathname: "/comics",
      search: "?page=2",
      state: undefined,
      key: "5nvxpbdafa",
      hash: "",
    });
    const setParams = jest.fn();
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("page=2&comics=1234"),
      setParams,
    ]);
    const { result } = renderHook(() =>
      usePagination(getComics, "nameStartsWith", ["comics", "stories"])
    );
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    act(() => {
      result.current.changeParam("comics", "12345");
    });
    expect(setParams).toBeCalledWith({ page: "2", comics: "12345" });
    expect(result.current.changeParam("comics2", "12345")).toBe(undefined);
  });

  it("should handel filter change", async () => {
    mockUseLocation.mockReturnValue({
      pathname: "/comics",
      search: "?page=2",
      state: undefined,
      key: "5nvxpbdafa",
      hash: "",
    });
    const setParams = jest.fn();
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("page=2&comics=1234"),
      setParams,
    ]);
    const { result } = renderHook(() =>
      usePagination(getComics, "nameStartsWith", ["comics", "stories"])
    );
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    act(() => {
      result.current.handlefilter("12345");
    });
    expect(result.current.filter).toBe("12345");
  });
  it("redirect to first page", async () => {
    mockUseLocation.mockReturnValue({
      pathname: "/comics",
      search: "?page=1000",
      state: undefined,
      key: "5nvxpbdafa",
      hash: "",
    });
    const setParams = jest.fn();
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("page=7000&comics=1234"),
      setParams,
    ]);
    const { result } = renderHook(() =>
      usePagination(getComics, "nameStartsWith", ["comics", "stories"])
    );
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(setParams).toBeCalledWith({
      page: (
        Math.ceil(comicsMockData.data.total / comicsMockData.data.limit) - 1
      ).toString(),
      comics: "1234",
    });
  });
  it("should call setSearchparams after debounce time has passed", () => {
    jest.useFakeTimers();
    mockUseLocation.mockReturnValue({
      pathname: "/",
      search: "?page=1",
      state: undefined,
      key: "5nvxpbdafa",
      hash: "",
    });
    const setParams = jest.fn();
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("page=1&comics=1234"),
      setParams,
    ]);
    const { result } = renderHook(() =>
      usePagination(getComics, "nameStartsWith", ["comics", "stories"])
    );
    act(() => {
      result.current.handlefilter("12345");
    });
    expect(setParams).not.toBeCalled();
    jest.advanceTimersByTime(1500);
    expect(setParams).toBeCalledWith({ comics: "1234", search: "12345" });
  });
});
