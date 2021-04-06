interface Soulmate {
  name: string;
  age?: number;
  skin: 'Yellow' | 'White' | 'Black' | 'Blue';
  male: boolean;
}

export type _Partial<T> = {
  [P in keyof T]?: T[P];
};

type SoulmatePartial = _Partial<Soulmate>;

export type _Required<T> = {
  [P in keyof T]-?: T[P];
};

type SoulmateRequired = _Required<Soulmate>;

export type _Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type SoulmateAge = _Pick<Soulmate, 'age'>;

export type _Record<K extends keyof any, T> = {
  [P in K]: T;
};

type SoulmateRecord = _Record<'Weishaodaren' | 'Qinyue', Soulmate>;

export type _Exclude<T, U> = T extends U ? never : T;

type SoulmateExclute = _Exclude<Soulmate | SoulmateRequired, SoulmateRecord>;
