import { get, provide } from "./helpers";

type Object = unknown;

export class Layer {
  readonly isLayer = true;

  constructor(private readonly _objects: Object[] = []) {}

  add = (object: Object) => {
    this._objects.push(object);
  };

  clear = () => {
    this._objects.length = 0;
  };

  *objects(): Generator<{ object: Object; layer: Layer }> {
    for (const object of this._objects) {
      if (isLayer(object)) {
        yield* object.objects();
      }
      yield { object, layer: this };
    }
  }
}

const isLayer = (object: Object): object is Layer => {
  return (object as Layer).isLayer === true;
};

export const provideLayer = provide<Layer>;
export const getLayer = () => get(Layer);
