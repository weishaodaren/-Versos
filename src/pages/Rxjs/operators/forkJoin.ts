import { delay, take, mergeMap } from 'rxjs/operators';
import { forkJoin, of, interval } from 'rxjs';

export const A = () => {
  const myPromise = (val: unknown) =>
    new Promise((res) => setTimeout(() => res(`xixiixix${val}`), 5000));

  const example = forkJoin(
    of(`Hello`),
    of(`World`).pipe(delay(1000)),
    interval(1000).pipe(take(1)),
    interval(1000).pipe(take(2)),
    myPromise(`RESULT`)
  );

  example.subscribe((el) => console.log(el));
};

export const B = () => {
  const myPromise = (val: unknown) =>
    new Promise((res) => setTimeout(() => res(`xixiixix${val}`), 5000));

  const source = of([1, 2, 3, 4, 5]);
  const example = source.pipe(mergeMap((q) => forkJoin(...q.map(myPromise))));
  example.subscribe((a) => console.log(a));
};
