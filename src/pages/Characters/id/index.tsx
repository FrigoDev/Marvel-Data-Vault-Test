import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ComicCard from "../../../components/ContentCards/ComicCard";
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

export default function DetailedCharacter() {
  const navigate = useNavigate();
  const bookmark = useSelector(
    (state: { bookmark: Bookmark[] }) => state.bookmark
  );
  const { id } = useParams<{ id: string }>();
  const getCharacter = async () =>
    getItemById<Character>(Sections.characters, Number(id));
  const getComics = async () =>
    getSectionsFilteredByItemId<Comic>(
      Sections.characters,
      Number(id),
      Sections.comics
    );
  const getStories = async () =>
    getSectionsFilteredByItemId<Story>(
      Sections.characters,
      Number(id),
      Sections.stories
    );

  const { data, error, loading } = useDetailedSection(
    getCharacter,
    getComics,
    getStories
  );
  if (error) navigate("/characters");
  if (loading) return <Loader />;
  const [character, comics, stories] = data;
  if (character && comics && stories) {
    return (
      <main className="page-component">
        <h1 className="page-main-title">{character.name}</h1>
        <div className="img-container">
          <img
            className="detailed-img"
            src={`${character.thumbnail?.path}.${character?.thumbnail?.extension}`}
            alt={character.name}
          />
        </div>
        <div className="container">
          <div className="info-section">
            <h2 className="page-subtitle">Description</h2>
            <p className="description">
              {character.description || "No description available"}
            </p>
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
