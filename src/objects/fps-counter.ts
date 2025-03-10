import { get2DContext } from "../contexts/2d";
import { Drawable } from "../interfaces/drawable";

export class FPSCounter implements Drawable {
  readonly isDrawable = true;

  private readonly maxFrames = 240;
  private frameTimestamps: number[] = []; // circular buffer
  private frameIndex = 0;

  draw() {
    const ctx = get2DContext();
    const currentTime = performance.now();

    this.frameTimestamps[this.frameIndex] = currentTime;
    this.frameIndex = (this.frameIndex + 1) % this.maxFrames;

    const oneSecondAgo = currentTime - 1000;
    let count = 0;
    for (let i = 0; i < this.maxFrames; i++) {
      if (this.frameTimestamps[i] > oneSecondAgo) {
        count++;
      }
    }
    const text = `FPS: ${count}`;

    ctx.save();
    ctx.font = "14px monospace";

    const textMetrics = ctx.measureText(text);
    const padding = 6;

    // Add semi-transparent background
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"; // Black with 70% opacity
    ctx.fillRect(
      0,
      0,
      textMetrics.width + padding * 2,
      textMetrics.actualBoundingBoxAscent + padding * 2
    );

    ctx.fillStyle = "white";
    ctx.fillText(text, padding, textMetrics.actualBoundingBoxAscent + padding);
    ctx.restore();
  }
}
