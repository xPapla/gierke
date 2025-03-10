export interface Drawable {
  readonly isDrawable: true;
  draw: () => void;
}

export const isDrawable = (object: unknown): object is Drawable => {
  return (object as Drawable).isDrawable;
};
