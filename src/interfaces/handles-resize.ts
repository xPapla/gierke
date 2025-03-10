export interface HandlesResize {
  readonly handlesResize: true;
  onResize: (width: number, height: number) => void;
}

export const handlesResize = (object: unknown): object is HandlesResize => {
  return (object as HandlesResize).handlesResize;
};
