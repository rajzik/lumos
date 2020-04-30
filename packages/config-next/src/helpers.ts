import mergeWith from 'lodash/mergeWith';

function doMerge(prevValue: unknown, nextValue: unknown): unknown {
  if (Array.isArray(prevValue) && Array.isArray(nextValue)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Array.from(new Set(prevValue.concat(nextValue)));
  }

  return undefined;
}

export function mergeConfig<T>(prev: T, next: T): T {
  return mergeWith(prev, next, doMerge);
}
