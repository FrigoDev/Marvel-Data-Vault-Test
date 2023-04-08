import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import CharacterCard from "../../../components/ContentCards/CharacterCard";
import ComicCard from "../../../components/ContentCards/ComicCard";
import Loader from "../../../components/Loader";
import useDetailedSection from "../../../hooks/useDetailedSection";
import type { Character } from "../../../types/CharactersResponse";
import type { Comic } from "../../../types/ComicsResponse";
import { Bookmark } from "../../../types/ReducerBookmark";
import { Sections } from "../../../types/sections";
import type { Story } from "../../../types/StoriesResponse";
import {
  getItemById,
  getSectionsFilteredByItemId,
} from "../../../utils/apiSocket";

export default function DetailedStory() {
  const navigate = useNavigate();
  const bookmark = useSelector(
    (state: { bookmark: Bookmark[] }) => state.bookmark
  );
  const { id } = useParams<{ id: string }>();
  const getStory = async () => getItemById<Story>(Sections.stories, Number(id));
  const getComics = async () =>
    getSectionsFilteredByItemId<Comic>(
      Sections.stories,
      Number(id),
      Sections.comics
    );
  const getCharacters = async () =>
    getSectionsFilteredByItemId<Character>(
      Sections.stories,
      Number(id),
      Sections.characters
    );

  const { data, error, loading } = useDetailedSection(
    getStory,
    getComics,
    getCharacters
  );
  if (error) navigate("/stories");
  if (loading) return <Loader />;
  const [story, comics, characters] = data;
  if (story && comics && characters) {
    return (
      <main className="page-component">
        <h1 className="page-main-title">{story.title}</h1>
        <div className="container">
          <div className="info-section">
            <h2 className="page-subtitle">Description</h2>
            <p>{story.description || "No description available"}</p>
          </div>
          <div className="info-section">
            <h2 className="page-subtitle">Comics</h2>
            <div className="cards-container">
              {comics.map((comic) => (
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
          </div>
          <div className="info-section">
            <h2 className="page-subtitle">Characters</h2>
            <div className="cards-container">
              {characters.map((character) => (
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
          </div>
        </div>
      </main>
    );
  }
  return <p>Not found</p>;
}
