<template>
  <!-- <Three msg="weishaodaren" /> -->
  <!-- <Line /> -->
  <div ref="refApp"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Three, Line } from './components';
import * as Util from './util';

export default defineComponent({
  name: 'App',
  components: {
    Three,
    Line,
  },
  setup() {
    const refApp = ref<HTMLDivElement | Node>();
    Util.messageChannelFn().port1.postMessage('呼叫 port2');
    Util.messageChannelFn().port2.postMessage('回复 port1');

    const myLove = {
      name: 'qinyue',
      age: 18,
    };
    const validator = {
      get(obj, prop) {
        return prop in obj ? obj[prop] : 33;
      },
      set(obj, prop, value): boolean {
        if (prop === 'age') {
          if (!Number.isInteger(value)) {
            throw new TypeError(`The age is not an integer`);
          }
          if (value > 200) {
            throw new RangeError(`The age seems invalid`);
          }
        }
        obj[prop] = value;
        return true;
      },
      getPrototypeOf(obj): object | null {
        console.log(obj, 'getPrototypeOf');
        return obj;
      },
      setPrototypeOf(obj, proto) {
        console.log(obj, proto, 'setPrototypeOf');
        return false;
      },
      isExtensible(obj) {
        return Reflect.isExtensible(obj);
      },
      preventExtensions(obj) {
        obj.canEvolve = false;
        return Reflect.preventExtensions(obj);
      },
      getOwnPropertyDescriptor(obj, prop) {
        console.log(obj, prop, 'weiwei');
        return { configurable: true, enumerable: true, value: 9999 };
      },
    };

    const love = new Proxy(myLove, {
      ...validator,
    });

    love.skin = `white`;
    love.age = 23;
    console.log(love);
    console.log(Reflect.getPrototypeOf(love) === myLove);
    Reflect.setPrototypeOf(love, { time: 'long' });
    console.log(Reflect.isExtensible({ 231: 'asd' }), 'isExtensible');
    console.log(
      Reflect.getOwnPropertyDescriptor(love, 'skkin'),
      'getOwnPropertyDescriptor'
    );

    onMounted(() => {});

    return {
      refApp,
    };
  },
});
</script>
