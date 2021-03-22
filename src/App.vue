<template>
  <!-- <Three msg="weishaodaren" /> -->
  <!-- <Line /> -->
  <div ref="refApp"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Three, Line } from './components';
import * as Util from './util';
import produce from 'immer';

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
      fn: () => {
        return '111';
      },
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
      defineProperty(obj, prop, descriptor) {
        console.log(obj, prop, descriptor, 'defineProperty');
        return Reflect.defineProperty(obj, prop, descriptor);
      },
      has(target, key) {
        console.log(target, key, 'has');
        if (key === 'skin') return false;
        return Reflect.has(target, key);
      },
      deleteProperty(target, props) {
        return Reflect.deleteProperty(target, props);
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
    let desc = { configurable: true, enumerable: true, value: 10 };
    Reflect.defineProperty(love, 'a', desc);
    Reflect.deleteProperty(love, 'age');
    console.log('skin' in love, 'in');

    const target = (a, b) => a + b;
    const handler = {
      apply(target, ctx, args) {
        console.log(target, ctx, args);
        return Reflect.apply(...arguments) * 10;
      },
    };
    const P = new Proxy(target, handler);
    console.log(Reflect.apply(P, null, [10, 3]));

    let AA = new Proxy(function () {}, {
      construct(target, args, newTarget) {
        console.log(target, args);
        return {
          val: args[0] * 10,
        };
      },
    });
    let A = new AA(2222);
    console.log(A.val);

    onMounted(() => {});

    return {
      refApp,
    };
  },
});
</script>
