import { HandlesMount } from "../interfaces/handles-mount";
import { HandlesResize } from "../interfaces/handles-resize";

export class GameCavnas implements HandlesResize, HandlesMount {
  readonly handlesResize = true as const;
  readonly handlesMount = true as const;

  canvas: HTMLCanvasElement = document.createElement("canvas");

  constructor(window: Pick<Window, "innerWidth" | "innerHeight">) {
    this.onResize(window.innerWidth, window.innerHeight);
  }

  onMount() {
    document.body.appendChild(this.canvas);
  }

  get context() {
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get 2d context");
    }
    return context;
  }

  onResize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
