import worker from "../__Mocks__/mockServer";
import type { Character } from "../types/CharactersResponse";
import type { Comic } from "../types/ComicsResponse";

import {
  getSections,
  getItemById,
  getSectionsFilteredByItemId,
  getCharacters,
  getStories,
  getComics,
} from "./apiSocket";

worker.listen();

describe("apiSocket", () => {
  it("should return a comic datawrapper", async () => {
    const data = await getComics({ limit: "10" });
    expect(data).toBeDefined();
  });
  it("should return a story datawrapper", async () => {
    const data = await getStories({ limit: "10" });
    expect(data).toBeDefined();
  });

  it("should return a character datawrapper", async () => {
    const data = await getCharacters({ limit: "10" });
    expect(data).toBeDefined();
  });

  it("should return only 1 comic in the datawrapper", async () => {
    const data = await getItemById<Comic>("comics", 1994);
    expect(data).toBeDefined();
  });
  it("should return character from comic id", async () => {
    const data = await getSectionsFilteredByItemId<Character>(
      "comics",
      1994,
      "characters"
    );
    expect(data).toBeDefined();
  });
  it("should throw error", async () => {
    const getdata = async () => {
      const data = await getSections<Comic>("comic", { limit: "10" });
      return data;
    };
    expect(getdata).rejects.toThrow();
  });
  it("should id any param is given", async () => {
    const data = await getSections("comics", {});
    expect(data).toBeDefined();
  });
});
