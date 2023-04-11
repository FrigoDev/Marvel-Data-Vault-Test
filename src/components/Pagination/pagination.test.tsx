import { render, fireEvent } from "@testing-library/react";
import React from "react";

import Pagination from ".";

describe("Pagination", () => {
  const mockFirstPage = jest.fn();
  const mockLastPage = jest.fn();
  const mockNextPage = jest.fn();
  const mockPrevPage = jest.fn();

  const defaultProps = {
    firstPage: mockFirstPage,
    lastPage: mockLastPage,
    currentPage: 1,
    nextPage: mockNextPage,
    prevPage: mockPrevPage,
    totalPages: 3,
  };

  test("renders Pagination component", () => {
    const { getByText } = render(<Pagination {...defaultProps} />);
    expect(getByText("2")).toBeInTheDocument();
  });

  test("clicking firstPage calls the firstPage function", () => {
    const { getByTestId } = render(<Pagination {...defaultProps} />);
    fireEvent.click(getByTestId("first-page"));
    expect(mockFirstPage).toHaveBeenCalledTimes(1);
  });

  test("clicking lastPage calls the lastPage function", () => {
    const { getByTestId } = render(<Pagination {...defaultProps} />);
    fireEvent.click(getByTestId("last-page"));
    expect(mockLastPage).toHaveBeenCalledTimes(1);
  });

  test("clicking nextPage calls the nextPage function", () => {
    const { getByTestId } = render(<Pagination {...defaultProps} />);
    fireEvent.click(getByTestId("next-page"));
    expect(mockNextPage).toHaveBeenCalledTimes(1);
  });

  test("clicking prevPage calls the prevPage function", () => {
    const { getByTestId } = render(<Pagination {...defaultProps} />);
    fireEvent.click(getByTestId("prev-page"));
    expect(mockPrevPage).toHaveBeenCalledTimes(1);
  });
});
