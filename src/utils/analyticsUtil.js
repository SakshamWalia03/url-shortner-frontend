export const objectToArray = (obj = {}, keyName = "name") => {
  return Object.entries(obj).map(([key, value]) => ({
    [keyName]: key,
    count: value,
  }));
};
