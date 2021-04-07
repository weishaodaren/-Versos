import { of, interval } from 'rxjs';
import { map, concatAll, take } from 'rxjs/operators';

export const A = () => {
  const source = interval(2000);
  const example = source.pipe(
    map((val) => of(val + 10)),
    concatAll()
  );
  example.subscribe((v) => console.log(v));
};

export const B = () => {
  const sample = (val: unknown) => new Promise((res) => res(val));
  const source = interval(2000);
  const example = source.pipe(
    map((val) => sample(val)),
    concatAll()
  );

  example.subscribe((a) => console.log(a));
};

export const C = () => {
  const obs1 = interval(1000).pipe(take(5));
  const obs2 = interval(500).pipe(take(2));
  const obs3 = interval(2000).pipe(take(1));

  const source = of(obs1, obs2, obs3)
    .pipe(concatAll())
    .subscribe((s) => console.log(s));
};
