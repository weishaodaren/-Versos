const invert: (object: { [x: string]: any }) => object = (object) => {
  const result = <any>{};
  Object.keys(object).forEach((key) => {
    let value = object[key];
    if (value !== null && typeof value.toString !== 'function') {
      value = toString.call(value);
    }
    result[value] = key;
  });
  return result;
};

export default invert;
