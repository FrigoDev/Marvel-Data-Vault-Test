import type { DataWrapper } from "./DataWrapper";

export interface StoriesDataWrapper extends DataWrapper<Story> {}

export interface Story {
  id?: number;
  title?: string;
  description?: string;
  resourceURI?: string;
  type?: string;
  modified?: string;
  thumbnail?: Image;
  comics?: ComicList;
  series?: SeriesList;
  events?: EventList;
  characters?: CharacterList;
  creators?: CreatorList;
  originalissue?: ComicSummary;
}

interface Image {
  path?: string;
  extension?: string;
}

interface ComicList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: ComicSummary[];
}

interface ComicSummary {
  resourceURI?: string;
  name?: string;
}

interface SeriesList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: SeriesSummary[];
}

interface SeriesSummary {
  resourceURI?: string;
  name?: string;
}

interface EventList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: EventSummary[];
}

interface EventSummary {
  resourceURI?: string;
  name?: string;
}

interface CharacterList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: CharacterSummary[];
}

interface CharacterSummary {
  resourceURI?: string;
  name?: string;
  role?: string;
}

interface CreatorList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: CreatorSummary[];
}

interface CreatorSummary {
  resourceURI?: string;
  name?: string;
  role?: string;
}
