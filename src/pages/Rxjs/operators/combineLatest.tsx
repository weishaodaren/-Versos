import { defineComponent, onMounted, Ref, ref, unref } from 'vue';
import { fromEvent, timer, combineLatest } from 'rxjs';
import { mapTo, startWith, scan, tap, map } from 'rxjs/operators';

const projection: () => void = () => {
  const timerOne = timer(1000, 4000);
  const timerTwo = timer(2000, 4000);
  const timerThree = timer(3000, 4000);

  const combined = combineLatest(
    timerOne,
    timerTwo,
    timerThree,
    (one, two, three) => {
      return `Timer One (Proj) Latest: ${one}, 
            Timer Two (Proj) Latest: ${two}, 
            Timer Three (Proj) Latest: ${three}`;
    }
  );
  combined.subscribe((lastestVals) => {
    console.log(lastestVals);
  });
};

export default defineComponent({
  name: 'CombineLatest',
  setup() {
    const red = ref<HTMLButtonElement | null>(null);
    const black = ref<HTMLButtonElement | null>(null);

    const redTotal = ref<HTMLSpanElement | null>(null);
    const blackTotal = ref<HTMLSpanElement | null>(null);
    const total = ref<HTMLSpanElement | null>(null);

    onMounted(() => {
      const setHTML = (refName: Ref<HTMLButtonElement | HTMLSpanElement>) => (
        val: any
      ) => {
        console.log(val, refName.value);
        unref(refName).innerHTML = val;
      };

      const addOneClick$ = (
        refName: Ref<HTMLButtonElement | HTMLSpanElement>
      ) =>
        fromEvent(unref(refName), 'click').pipe(
          mapTo(1),
          startWith(0),
          scan((acc, curr) => acc + curr),
          tap(setHTML(refName))
        );

      const combineTotal$ = combineLatest(
        addOneClick$(red as Ref<HTMLButtonElement | HTMLSpanElement>),
        addOneClick$(black as Ref<HTMLButtonElement | HTMLSpanElement>)
      )
        .pipe(map(([one, two]) => one + two))
        .subscribe(setHTML(total as Ref<HTMLButtonElement | HTMLSpanElement>));
    });

    return () => (
      <div>
        <div>
          <button ref={red}>Red</button>
          <button ref={black}>Black</button>
        </div>
        <div>
          Red: <span ref={redTotal}></span>
        </div>
        <div>
          Black: <span ref={blackTotal}></span>
        </div>
        <div>
          Total: <span ref={total}></span>
        </div>
      </div>
    );
  },
});
