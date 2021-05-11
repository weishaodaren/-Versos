const intersection: (
  arrays: Array<string>,
  iteratee: () => void,
  comparator: () => void
) => void = (A, I, C) => {
  const length = A[0].length;
  const otherLength = A.length;
  const caches = new Array(otherLength);
  const result = [];

  let array: string[] | string;
  let maxLength = Infinity;
  let otherIndex = otherLength;

  while (otherIndex--) {
    array = A[otherIndex];
    if (otherIndex && I) {
      // array = (<unknown>array).map((el) => I(el));
    }
  }
};

export default intersection;
