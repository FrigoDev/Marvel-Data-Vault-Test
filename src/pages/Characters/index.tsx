import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CharacterCard from "../../components/ContentCards/CharacterCard";
import FilterSelect from "../../components/filterSelect";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";
import { Bookmark } from "../../types/ReducerBookmark";
import { getCharacters } from "../../utils/apiSocket";

const Characters = () => {
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
    filter,
    handlefilter,
    queryParams,
    changeParam,
    removeParam,
    error
  } = usePagination(getCharacters, "nameStartsWith", ["comics", "stories"]);

  const comicsfilter = [
    { id: 0, name: "All" },
    ...(bookmark
      .filter((x) => x.type === "comic")
      .map((x) => ({ id: x.id, name: x.name })) as {
      id: number;
      name: string;
    }[]),
  ];
  //remove undefined f
  const storiesFilter = [
    { id: 0, name: "All" },
    ...(bookmark
      .filter((x) => x.type === "story")
      .map((x) => ({ id: x.id, name: x.name })) as {
      id: number;
      name: string;
    }[]),
  ];

  const changeComicParam = (value: string) => {
    const comicId = comicsfilter.find((x) => x.id === Number(value))?.id;

    if (comicId && comicId !== 0) {
      return changeParam("comics", comicId.toString());
    }
    return removeParam("comics");
  };

  const changeStoriesParam = (value: string) => {
    const storyId = storiesFilter.find((x) => x.id === Number(value))?.id;

    if (storyId && storyId !== 0) {
      return changeParam("stories", storyId.toString());
    }
    return removeParam("stories");
  };
  if (error)
    return (
      <main className="page-component">
        <h1 className="page-main-title">Something went wrong</h1>
      </main>
    );
  return (
    <main className="page-component">
      <h1 className="page-main-title">Characters</h1>
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
          data={comicsfilter}
          name="comics"
          defaultValue={queryParams.comics}
          onChange={changeComicParam}
        />
        <FilterSelect
          data={storiesFilter}
          name="Story"
          defaultValue={queryParams.stories}
          onChange={changeStoriesParam}
        />
      </div>
      <div className="container">
        <div className="bookmark-container">
          <p className="bookmark-text">
            Bookmarked: {bookmark.filter((x) => x.type === "character").length}
          </p>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="cards-container">
            {data?.results?.map((character) => (
              <CharacterCard
                key={character.id}
                bookmarked={bookmark.some(
                  (x) => x.id === character.id && x.type === "character"
                )}
                character={character}
                handleClick={() => navigate(`/characters/${character.id}`)}
              />
            ))}
          </div>
        )}
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
    </main>
  );
};
export default Characters;
