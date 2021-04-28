const random: (lower: number, upper: number, floating?: boolean) => number = (
  lower,
  upper,
  floating?
) => {
  if (floating) {
    return -1;
  }
  let num = Math.random();
  return num >= Math.min(lower) && num <= Math.max(upper);
};

export default random;
