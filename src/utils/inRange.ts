const inRange: (number: number, start: number, end: number) => boolean = (
  N,
  S,
  E
) => {
  if (!E) {
    E = S;
    S = 0;
  }
  return N >= Math.min(S, E) && N <= Math.max(S, E);
};

export default inRange;
