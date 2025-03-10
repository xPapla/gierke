export interface HandlesMount {
  readonly handlesMount: true;
  onMount: () => void;
}

export const handlesMount = (object: unknown): object is HandlesMount => {
  return (object as HandlesMount).handlesMount;
};
