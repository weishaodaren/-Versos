const foo = <T>(args: T): T => args;

foo<string>('weishaodaren');

class Foo<T, U> {
  constructor(public args1: T, public args2: U) {}

  public method(): T {
    return this.args1;
  }
}

type A = <T extends {}, K extends keyof T>(obj: T, key: K) => T[K];

const _pickSingleValue: A = (obj, key) => {
  return obj[key];
};

function pickSingleValue<T>(obj: T, key: keyof T): T[keyof T] {
  return obj[key];
}

function pick_<T extends object, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map((key) => obj[key]);
}

type PickA = <T extends object, U extends keyof T>(obj: T, keys: U[]) => T[U][];
const pick: PickA = (obj, keys) => keys.map((key) => obj[key]);

interface F {
  [key: number]: string;
}
const o: F = { 1: `Hi` };

o[1] === o[1];

interface Aa {
  a: boolean;
  b: string;
  c: number;
  d: () => void;
}

type TypeAa<T> = { [K in keyof T]: string };

let numOrStrProp: number | string;

const isString = (arg: unknown): arg is string => typeof arg === 'string';

function useIt(numOrStr: number | string) {
  if (isString(numOrStr)) {
    console.log(numOrStr.length);
  }
}

type Falsy = false | '' | 0 | null | undefined;
const isFalsy = (val: unknown): val is Falsy => !val;

class D {
  public a() {}

  public useA() {
    return 'A';
  }
}

class E {
  public b() {}

  public useB() {}
}
