import { defineComponent } from 'vue';
import { Observable as rxObservable, Subscriber } from 'rxjs';

/**
 * RxJS 逐步更新...
 */
const Observable = defineComponent({
  name: 'Observable',
  setup() {
    const observable = new rxObservable((subscriber: Subscriber<number>) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    console.log(`this is before`);
    observable.subscribe({
      next: (x) => {
        console.log(x, 'got value');
      },
      error: (err) => {
        console.log(`sth wrong`, err);
      },
      complete: () => {
        console.log(`done`);
      },
    });
    console.log(`just after subscribe`);
  },
});

export default Observable;
