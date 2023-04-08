import { DataWrapper } from "./DataWrapper";

export interface CharactersDataWrapper extends DataWrapper<Character> {}

export interface Character {
  id?: number;
  name?: string;
  description?: string;
  modified?: string;
  resourceURI?: string;
  urls?: Url[];
  thumbnail?: Image;
  comics?: ComicList;
  stories?: StoryList;
  events?: EventList;
  series?: SeriesList;
}

interface Url {
  type?: string;
  url?: string;
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

interface StoryList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: StorySummary[];
}

interface StorySummary {
  resourceURI?: string;
  name?: string;
  type?: string;
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
