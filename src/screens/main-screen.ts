import { get2DContext } from "../contexts/2d";
import { getLayer, Layer } from "../contexts/layer";
import { Drawable } from "../interfaces/drawable";
import { HandlesMount } from "../interfaces/handles-mount";
import { Updatable } from "../interfaces/updatable";
import { FPSCounter } from "../objects/fps-counter";
import { Player } from "../objects/player";

export class MainScreen implements HandlesMount, Updatable, Drawable {
  readonly isDrawable = true;
  readonly isUpdatable = true;
  readonly handlesMount = true;

  onMount() {
    const { add } = getLayer();

    add(new FPSCounter());
    add(new Layer([new Player()]));
  }

  update() {}

  draw() {
    const ctx = get2DContext();

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
