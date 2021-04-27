const clamp: (number: number, lower: number, upper: number) => number = (
  number,
  lower,
  upper
) => {
  lower = lower === lower ? lower : 0;
  upper = upper === upper ? upper : 0;

  if (number === number) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
  }
  return number;
};

export default clamp;
