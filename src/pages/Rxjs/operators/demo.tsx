import { defineComponent } from 'vue';
import { of, interval } from 'rxjs';
import { map, first } from 'rxjs/operators';

const Demo1 = defineComponent({
  name: 'Demo1',
  setup() {
    // first()(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));
    map((x: number) => (x *= x))(of(1, 2, 3)).subscribe((v) =>
      console.log(`value: ${v}`)
    );
    const observable = interval(1000);
    return () => <h1>sas</h1>;
  },
});

export default Demo1;
