import axios from "axios";

import { ApiConstants } from "../types/ApiConstants";
import type { Character } from "../types/CharactersResponse";
import type { Comic } from "../types/ComicsResponse";
import type { DataWrapper } from "../types/DataWrapper";
import type { Story } from "../types/StoriesResponse";

const marvelApi = axios.create({
  baseURL: ApiConstants.APIURI.toString(),
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getSections<Type>(
  name: string,
  params: { [key: string]: string }
) {
  const urlParams = new URLSearchParams(params).toString();
  const {
    data: { data: response },
  }: { data: DataWrapper<Type> } = await marvelApi.get(
    `${name}?${ApiConstants.KEYAUTH}${urlParams !== "" ? "&" + urlParams : ""}`
  );
  return response;
}

export async function getItemById<Type>(name: string, id: number) {
  const {
    data: { data: response },
  }: { data: DataWrapper<Type> } = await marvelApi.get(
    `${name}/${id}?${ApiConstants.KEYAUTH}`
  );
  return response?.results?.at(0);
}

export async function getSectionsFilteredByItemId<Type>(
  name: string,
  id: number,
  itemName: string
) {
  const {
    data: { data: response },
  }: { data: DataWrapper<Type> } = await marvelApi.get(
    `${name}/${id}/${itemName}?${ApiConstants.KEYAUTH}`
  );
  return response?.results;
}

export const getCharacters = async (params: { [key: string]: string }) => {
  return await getSections<Character>("characters", params);
};

export const getStories = async (params: { [key: string]: string }) => {
  return await getSections<Story>("stories", params);
};

export const getComics = async (params: { [key: string]: string }) => {
  return await getSections<Comic>("comics", params);
};
