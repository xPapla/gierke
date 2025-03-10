export interface Updatable {
  readonly isUpdatable: true;
  update: () => void;
}

export const isUpdatable = (object: unknown): object is Updatable => {
  return (object as Updatable).isUpdatable;
};
