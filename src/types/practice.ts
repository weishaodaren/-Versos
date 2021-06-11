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
