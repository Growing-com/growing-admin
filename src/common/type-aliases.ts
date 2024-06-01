export type Nullable<T> = T | null;
export type NullishArg<T> = Nullable<T> | undefined;
export type NullableAsync<T> = Promise<Nullable<T>>;

export type Throwable<T> = T | never;
export type ThrowableAsync<T> = Promise<T> | never;
