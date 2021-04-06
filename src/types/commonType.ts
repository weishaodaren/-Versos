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

export type _Extract<T, U> = T extends U ? T : never;

type SoulmateExtract = _Extract<SoulmateRecord, Soulmate>;

export type _Omit<T, K> = _Pick<T, _Exclude<keyof T, K>>;

type SoulmateOmit = _Omit<Soulmate, 'age'>;

export type Omit<T, K> = {
  [P in Exclude<keyof T, K>]: T[P];
};

type SoulmateOmit_ = Omit<Soulmate, 'age'>;
