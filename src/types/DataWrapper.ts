import { DataContainer } from "./DataContainer";

export interface DataWrapper<T> {
  code?: number;
  status?: string;
  attributionText?: string;
  attributionHTML?: string;
  data?: DataContainer<T>;
  etag?: string;
}
