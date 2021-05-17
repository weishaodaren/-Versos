export default function <T>(args: T[], ...values: T[]): T[] {
  const pullVal = [...values];
  const argsVal = args;
  pullVal.forEach((val, index, args) => {
    console.log(val, 'val');
    argsVal.forEach((_val, _index, _args) => {
      console.log(_val, `_val`);
      if (val === _val) _args.splice(_index, 1);
    });
  });
  console.log(argsVal, 'argsVal');

  return argsVal;
}
