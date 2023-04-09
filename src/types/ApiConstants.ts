import * as dotenv from "dotenv";

if (process.env.NODE_ENV === "test") dotenv.config();

export const ApiConstants = {
  KEYAUTH: process.env.VITE_API_KEY as string,
  APIURI: process.env.VITE_API_URI as string,
};
