const findKey = (
  obj: { [s: string]: object },
  fn: (value: object, key: string, obj: object) => string | boolean
) => {
  let result;
  if (obj === null) return result;

  Object.keys(obj).some((key) => {
    const value = obj[key];
    if (fn(value, key, obj)) {
      result = key;
      return true;
    }
  });

  return result;
};

export default findKey;
