const after: (n: number, fn: () => void) => () => void = (n, fn) => {
  if (typeof fn !== 'function') {
    throw new TypeError(`Excepted a function !`);
  }

  n = n || 0;
  return () => {
    if (--n < 1) return fn.call(this);
  };
};

export default after;
