const paramsToObject = (entries: IterableIterator<[string, string]>) => {
  const result = {} as { [key: string]: string };
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
};

export default paramsToObject;
