import { rest } from "msw";
import { setupServer } from "msw/node";

import paramsToObject from "../utils/paramsToObject";

import charactersDataMock from "./charactersData";
import dataComics from "./comicsData";
import DetailedCharacterData from "./detailedCharacter";
import detailedComicData from "./detailedComicData";
import storiesData from "./storiesData";

const endpoints = [
  rest.get("https://gateway.marvel.com/v1/public/comics", (req, res, ctx) => {
    const params = paramsToObject(req.url.searchParams.entries());
    const offset = Number(params.offset) || 0;
    if (offset === 40) {
      return res(ctx.status(404));
    }
    return res(
      ctx.json({
        ...dataComics,
        data: { ...dataComics.data, offset },
      })
    );
  }),

  rest.get(
    "https://gateway.marvel.com/v1/public/characters",
    (req, res, ctx) => {
      return res(ctx.json(charactersDataMock));
    }
  ),

  rest.get("https://gateway.marvel.com/v1/public/stories", (req, res, ctx) => {
    return res(ctx.json(charactersDataMock));
  }),

  rest.get(
    "https://gateway.marvel.com/v1/public/comics/:id",
    (req, res, ctx) => {
      return res(ctx.json(detailedComicData));
    }
  ),

  rest.get(
    "https://gateway.marvel.com/v1/public/comics/:id/characters",
    (req, res, ctx) => {
      const id = req.params.id;
      if (id === "3") return res(ctx.status(404));
      return res(ctx.json(charactersDataMock));
    }
  ),

  rest.get(
    "https://gateway.marvel.com/v1/public/comics/:id/stories",
    (req, res, ctx) => {
      return res(ctx.json(storiesData));
    }
  ),

  rest.get(
    "https://gateway.marvel.com/v1/public/characters/:id/stories",
    (req, res, ctx) => {
      return res(ctx.json(storiesData));
    }
  ),

  rest.get(
    "https://gateway.marvel.com/v1/public/characters/:id/comics",
    (req, res, ctx) => {
      return res(ctx.json(dataComics));
    }
  ),

  rest.get(
    "https://gateway.marvel.com/v1/public/characters/:id",
    (req, res, ctx) => {
      const id = req.params.id;
      if (id === "3") return res(ctx.status(404));
      return res(ctx.json(DetailedCharacterData));
    }
  ),

  rest.get(
    "https://gateway.marvel.com/v1/public/stories/:id",
    (req, res, ctx) => {
      return res(ctx.json(detailedComicData));
    }
  ),

  rest.get(
    "https://gateway.marvel.com/v1/public/stories/:id/characters",
    (req, res, ctx) => {
      const id = req.params.id;
      if (id === "3") return res(ctx.status(404));
      return res(ctx.json(charactersDataMock));
    }
  ),

  rest.get(
    "https://gateway.marvel.com/v1/public/stories/:id/comics",
    (req, res, ctx) => {
      return res(ctx.json(dataComics));
    }
  ),

  rest.get("https://gateway.marvel.com/v1/public/*", (req, res, ctx) => {
    return res(ctx.status(404));
  }),

  rest.get("*", (req, res, ctx) => {
    return res(ctx.status(404));
  }),
];

const worker = setupServer(...endpoints);

export default worker;
