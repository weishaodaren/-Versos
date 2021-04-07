import { defineComponent } from 'vue';
import { delay, concat as RxConcat } from 'rxjs/operators';
import { of, concat, interval } from 'rxjs';

const demo01 = () => {
  const sourceOne = of(1, 2, 3);
  const sourceTwo = of(4, 5, 6);
  const example = concat(sourceOne, sourceTwo);

  example.subscribe((val) => {
    console.log(val);
  });
};

const demo02 = () => {
  const sourceOne = of(1, 2, 3);
  const sourceTwo = of(4, 5, 6);

  const sourceThree = sourceOne.pipe(delay(3000));
  const example = sourceThree.pipe(RxConcat(sourceTwo));
  example.subscribe((el) => console.log(el));
};

const demo03 = () => {
  const source = concat(interval(1000), of(`This`, `Never`, `Runs`));
  source.subscribe((val) => console.log(val));
};

export default defineComponent({
  name: 'Concat',
  setup() {
    demo03();
  },
});
