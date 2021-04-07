import { delay, take } from 'rxjs/operators';
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
