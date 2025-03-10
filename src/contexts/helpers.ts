const valueMap = new Map<object, unknown>();

export const provide = <T extends object>(value: T, callback: () => void) => {
  const previousValue = valueMap.get(value.constructor);
  valueMap.set(value.constructor, value);
  try {
    callback();
  } finally {
    valueMap.set(value.constructor, previousValue);
  }
};

export const get = <T extends abstract new (...args: any) => any>(
  context: T
) => {
  const value = valueMap.get(context) as InstanceType<T> | undefined;
  if (!value) {
    throw new Error("Could not get context value");
  }
  return value;
};
