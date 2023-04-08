import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import StoryCard from "../../components/ContentCards/StoryCard";
import FilterSelect from "../../components/filterSelect";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";
import { Bookmark } from "../../types/ReducerBookmark";
import { getStories } from "../../utils/apiSocket";

const Stories = () => {
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
    changeParam,
    queryParams,
    removeParam,
    error
  } = usePagination(getStories,"", ["characters"]);
  const filterByCharacter = [
    { id:0 , name: "All" },
    ...bookmark.filter((x) => x.type === "character").map((x) => ({ id: x.id, name: x.name })) as { id: number; name: string }[],
  ];
  const changeComicParam = (value: string) => {
    const characterId = filterByCharacter.find((x) => x.id === Number(value))?.id;
    if (characterId && characterId !== 0) {
      return changeParam("characters", characterId.toString());
    }
    return removeParam("characters");
  };
  
  if(error) return <main className="page-component"><h1 className="page-main-title">Something went wrong</h1></main>;
  return (
    <main className="page-component">
      <h1 className="page-main-title">Stories</h1>
      <div className="page-filter-container">
        <FilterSelect data={filterByCharacter} defaultValue={queryParams?.characters || "0"} name="characters" onChange={changeComicParam} />
      </div>
      <div className="container">
        <div className="page-bookmark">
          <p>
              bookmarked: {bookmark.filter((x) => x.type === "story").length}
          </p>
        </div>
        
        {loading ? (
          <Loader />
        ) : (
          <div className="cards-container">
            {data?.results?.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                handleClick={() => navigate(`/stories/${story.id}`)}
                bookmarked={bookmark.some(
                  (x) => story?.id && x.id === story.id
                )}
              />
            ))}
          </div>
        )}
      </div>
      {currentPage !== undefined && totalPages !== undefined && totalPages !== 0 && (
        <Pagination
          firstPage={firstPage}
          prevPage={prevPage}
          currentPage={currentPage}
          nextPage={nextPage}
          lastPage={lastPage}
          totalPages={totalPages}
        />
      )}
      {
        data?.results?.length === 0 && <h1 className="page-main-title">No results found</h1>
      }
    </main>
  );
};

export default Stories;
