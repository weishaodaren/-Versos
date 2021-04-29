const MAX_SAFE_INTEGER = 9007199254740991;
const MAX_ARRAY_LENGTH = 4294967295;

const times: <T>(n: number, iteratee: (args: any) => T) => Array<T> = (
  n,
  iteratee
) => {
  if (n < 1 || n > MAX_SAFE_INTEGER) return [];
  let index = -1;
  const length = Math.min(n, MAX_ARRAY_LENGTH);
  const result = new Array(length);
  while (++index < length) {
    result[index] = iteratee(index);
  }

  index = MAX_ARRAY_LENGTH;
  console.log(index, 'index');
  n -= MAX_ARRAY_LENGTH;
  console.log(n, 'n');
  while (++index < n) {
    iteratee(index);
  }
  return result;
};

export default times;
