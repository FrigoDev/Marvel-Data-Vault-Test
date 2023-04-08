import lodash from "lodash";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import type { DataContainer } from "../types/DataContainer";
import paramsToObject from "../utils/paramsToObject";

export default function usePagination<Type>(
  getData: (props: {
    [key: string]: string;
  }) => Promise<DataContainer<Type> | undefined>,
  startWithParamName = "",
  otherParams = [] as string[]
) {
  const Location = useLocation();
  const [data, setData] = useState<DataContainer<Type>>();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchparams] = useSearchParams();
  const [filter, setFilter] = useState<string>("");
  const [error, setError] = useState(false);

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

  lodash.forIn(params, (value, key) => {
    if (value === undefined || value === "") {
      delete params[key];
    }
  });

  const getAsyncData = async () => {
    setError(false);
    setLoading(true);
    try {
      setData(await getData(params));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAsyncData();
    setFilter(nameStartsWith ? nameStartsWith : "");
  }, [searchParams]);

  const debouncedFilter = useCallback(
    lodash.debounce((value) => {
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

  useEffect(() => {
    debouncedFilter(filter);
  }, [filter]);

  const handlefilter = (value: string) => {
    setFilter(value);
  };

  const totalPages =
    data?.total && Math.ceil(data.total / parseInt(params.limit)) - 1;
  const currentPage =
    data?.offset && Math.ceil(data?.offset / parseInt(params.limit));

  if (currentPage && totalPages && data?.total && currentPage > totalPages) {
    setSearchparams({
      ...searchParams,
      page: (Math.ceil(data.total / parseInt(params.limit)) - 1).toString(),
    });
  }

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

  const changeParam = (key: string, value: string) => {
    otherParams.includes(key) &&
      setSearchparams({ ...queryParams, [key]: value });
  };

  const removeParam = (key: string) => {
    otherParams.includes(key) && setSearchparams(lodash.omit(queryParams, key));
  };
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
