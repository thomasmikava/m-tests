export type SetState<T> = (val: T | ((prev: T) => T)) => void;
