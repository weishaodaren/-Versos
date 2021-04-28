const idCounter = {};
export default (prefix: string = '$loadsh$') => {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  const id = ++idCounter[prefix];
  if (prefix === '$loadsh$') {
    return `${id}`;
  }

  return `${prefix}${id}`;
};
