import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import CharacterCard from "../../../components/ContentCards/CharacterCard";
import StoryCard from "../../../components/ContentCards/StoryCard";
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

import "../../DetailedStyles.css";

export default function DetailedComic() {
  const navigate = useNavigate();
  const bookmark = useSelector(
    (state: { bookmark: Bookmark[] }) => state.bookmark
  );
  const { id } = useParams<{ id: string }>();
  const getComic = async () => getItemById<Comic>(Sections.comics, Number(id));
  const getCharacters = async () =>
    getSectionsFilteredByItemId<Character>(
      Sections.comics,
      Number(id),
      Sections.characters
    );
  const getStories = async () =>
    getSectionsFilteredByItemId<Story>(
      Sections.comics,
      Number(id),
      Sections.stories
    );

  const { data, error, loading } = useDetailedSection(
    getComic,
    getCharacters,
    getStories
  );

  if (error) navigate("/comics");
  if (loading) return <Loader />;
  const [comic, characters, stories] = data;
  if (comic && characters && stories) {
    return (
      <main className="page-component">
        <h1 className="page-main-title">{comic.title}</h1>
        <div className="img-container">
          <img
            className="detailed-img"
            src={`${comic.thumbnail?.path}.${comic?.thumbnail?.extension}`}
            alt={comic.title}
          />
        </div>
        <div className="container">
          <div className="info-section">
            <h2 className="page-subtitle">Description</h2>
            <p className="description">
              {comic.description || "No description available"}
            </p>
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
          <div className="info-section">
            <h2 className="page-subtitle">Stories</h2>
            <div className="cards-container">
              {stories.map((story) => (
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
          </div>
        </div>
      </main>
    );
  }
  return <p>Not found</p>;
}
