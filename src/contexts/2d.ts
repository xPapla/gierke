import { get, provide } from "./helpers";

export const provide2DContext = provide<CanvasRenderingContext2D>;
export const get2DContext = () => get(CanvasRenderingContext2D);
