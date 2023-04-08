import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ComicCard from "../../components/ContentCards/ComicCard";
import FilterSelect from "../../components/filterSelect";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import formats from "../../constants/formats";
import usePagination from "../../hooks/usePagination";
import { Bookmark } from "../../types/ReducerBookmark";
import { getComics } from "../../utils/apiSocket";

const Comics = () => {
  const navigate = useNavigate();
  const bookmark = useSelector(
    (state: { bookmark: Bookmark[] }) => state.bookmark
  );

  const {
    data,
    loading,
    firstPage,
    lastPage,
    currentPage,
    nextPage,
    prevPage,
    totalPages,
    handlefilter,
    filter,
    changeParam,
    queryParams,
    removeParam,
    error,
  } = usePagination(getComics, "titleStartsWith", ["format"]);


  const changeFormat = (value: string) => {
    const valueNumber = Number(value);
    if (valueNumber !== 0 && valueNumber < formats.length) {
      return changeParam("format", formats[valueNumber]);
    }
    removeParam("format");
  };
  if (error)
    return (
      <main className="page-component">
        <h1 className="page-main-title">Something went wrong</h1>
      </main>
    );
  return (
    <main className="page-component">
      <h1 className="page-main-title">Comics</h1>
      <div className="page-filter-container">
        <div className="search-container">
          <div className="input-group">
            <input
              name="search"
              className="form-input"
              autoComplete="off"
              type="text"
              id="input-search"
              placeholder=" "
              value={filter}
              onChange={(e) => {
                handlefilter(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="search">
              Search
            </label>
          </div>
        </div>
        <FilterSelect
          data={formats}
          onChange={changeFormat}
          defaultValue={
            queryParams.format
              ? formats.indexOf(queryParams.format).toString()
              : "0"
          }
          name="Format"
        />
      </div>
      <div className="container">
        <p>bookmarked: {bookmark.filter((x) => x.type === "comic").length}</p>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="cards-container">
              {data?.results?.map((comic) => (
                <ComicCard
                  handleClick={() => navigate(`/comics/${comic.id}`)}
                  key={comic.id}
                  comic={comic}
                  bookmarked={bookmark.some(
                    (x) => comic?.id && x.id === comic.id
                  )}
                />
              ))}
            </div>
            {data?.results?.length === 0 && (
              <h1 className="page-main-title">No results found</h1>
            )}
            {currentPage !== undefined &&
              totalPages !== undefined &&
              totalPages !== 0 && (
              <Pagination
                firstPage={firstPage}
                prevPage={prevPage}
                currentPage={currentPage}
                nextPage={nextPage}
                lastPage={lastPage}
                totalPages={totalPages}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Comics;
