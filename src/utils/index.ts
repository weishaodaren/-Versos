import clamp from './clamp';
import inRange from './inRange';
import uniqueId from './uniqueId';
import times from './times';
import invert from './invert';
import findKey from './findKey';
import after from './after';
import pull from './pull';

const messageChannelFn = () => {
  const channel = new MessageChannel();
  const { port1, port2 } = channel;

  port1.onmessage = (event) => {
    // console.log('from port2', event.data);
  };

  port2.onmessage = (event) => {
    // console.log('from port1', event.data);
  };

  return { port1, port2 };
};

const block = (params: object) => {
  const P = new Proxy(params, {
    get(target, key) {
      console.log(target, key);
      return target;
    },
    set(target, key, value) {
      if (typeof value === 'string') {
        target[key] += `${value}weishaodaren`;
      } else if (typeof value === 'number') {
        target[key] *= 1000;
      } else {
        throw new Error(`value type must be string | number`);
      }
      return Reflect(target, key, value);
    },
  });

  return P;
};

export {
  messageChannelFn,
  block,
  clamp,
  inRange,
  uniqueId,
  times,
  invert,
  findKey,
  after,
  pull,
};
