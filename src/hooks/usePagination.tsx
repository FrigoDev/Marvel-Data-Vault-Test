import * as lodash from "lodash";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import type { DataContainer } from "../types/DataContainer";
import paramsToObject from "../utils/paramsToObject";

// usePagination Hook
export default function usePagination<Type>(
  getData: (props: {
    [key: string]: string;
  }) => Promise<DataContainer<Type> | undefined>,
  startWithParamName = "",
  otherParams = [] as string[]
) {
  // React Router Hooks to get and manage the search params
  const Location = useLocation();
  const [searchParams, setSearchparams] = useSearchParams();

  // Local states to manage data, loaders, filters and errors
  const [data, setData] = useState<DataContainer<Type>>();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");
  const [error, setError] = useState(false);

  // Variable declaration to manage the search params
  const queryParams = paramsToObject(searchParams.entries());
  const nameStartsWith = queryParams.search;
  const page = (parseInt(queryParams.page) || 1) - 1;
  const limit = Math.abs(parseInt(queryParams.limit)) || 10;
  const offset = page * limit;
  const params = {
    limit: limit.toString(),
    offset: offset.toString(),
    [startWithParamName]: nameStartsWith,
    ...otherParams.reduce(
      (acc, curr) => ({
        ...acc,
        ...(queryParams[curr] && { [curr]: queryParams[curr] }),
      }),
      {}
    ),
  } as { [key: string]: string };

  // Clean undefined and empty params
  lodash.forIn(params, (value, key) => {
    if (value === undefined || value === "") {
      delete params[key];
    }
  });

  // Get AsyncData function
  const getAsyncData = async () => {
    setError(false);
    setLoading(true);
    try {
      const responseData = await getData(params);
      setData(responseData);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // call getAsyncData when the component is mounted
  useEffect(() => {
    getAsyncData();
    setFilter(nameStartsWith ? nameStartsWith : "");
  }, [searchParams]);

  // Debounce function to update the search params when the filter changes its value and the user stops typing for 500ms
  const debouncedFilter = useCallback(
    lodash.debounce((value) => {
      // Update the search params only if the user is in the same page and the filter value is different from the search param
      if (
        new RegExp(Location.pathname + "$").test(window.location.pathname) &&
        (nameStartsWith !== undefined || value !== "") &&
        nameStartsWith !== value
      ) {
        const otherParams = Object.keys(queryParams).filter(
          (key) =>
            key !== "search" &&
            key !== "page" &&
            key !== "limit" &&
            key !== "offset"
        );
        setSearchparams({
          ...searchParams,
          ...otherParams.reduce(
            (acc, curr) => ({
              ...acc,
              ...(queryParams[curr] && { [curr]: queryParams[curr] }),
            }),
            {}
          ),
          ...(value !== "" && { search: value }),
          ...(page !== 0 && { page: "1" }),
        });
      }
    }, 500),
    [searchParams]
  );

  // Call debouncedFilter when the filter changes its value
  useEffect(() => {
    debouncedFilter(filter);
  }, [filter]);

  // Filter handler
  const handlefilter = (value: string) => {
    setFilter(value);
  };

  // Pagination calculations
  const totalPages =
    data?.total && Math.ceil(data.total / parseInt(params.limit)) - 1;
  const currentPage =
    data?.offset && Math.ceil(data?.offset / parseInt(params.limit));

  // Validate if the current page is greater than the total pages and redirect to the last page
  if (currentPage && totalPages && data?.total && currentPage > totalPages) {
    setSearchparams({
      ...queryParams,
      page: (Math.ceil(data.total / parseInt(params.limit)) - 1).toString(),
    });
  }

  // Navigate between pages
  const nextPage = () => {
    currentPage !== totalPages &&
      setSearchparams({
        ...queryParams,
        page: (
          (parseInt(params.offset) + parseInt(params.limit)) /
            parseInt(params.limit) +
          1
        ).toString(),
      });
  };

  const prevPage = () => {
    currentPage !== 0 &&
      setSearchparams({
        ...queryParams,
        page: (
          (parseInt(params.offset) - parseInt(params.limit)) /
            parseInt(params.limit) +
          1
        ).toString(),
      });
  };

  const firstPage = () => {
    setSearchparams({ ...queryParams, page: "1" });
  };

  const lastPage = () => {
    data?.total &&
      setSearchparams({
        ...queryParams,
        page: Math.ceil(data.total / parseInt(params.limit)).toString(),
      });
  };

  // Change or remove a param from the search params
  const changeParam = (key: string, value: string) => {
    otherParams.includes(key) &&
      setSearchparams({ ...queryParams, [key]: value });
  };

  const removeParam = (key: string) => {
    otherParams.includes(key) && setSearchparams(lodash.omit(queryParams, key));
  };

  // Return object with the data, states and functions to manage the pagination and filters
  return {
    data,
    loading,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    currentPage,
    totalPages,
    handlefilter,
    filter,
    changeParam,
    queryParams,
    removeParam,
    error,
  };
}
