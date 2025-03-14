import { Direction } from "../common/direction";
import { Vec2 } from "../common/vec2";
import { get2DContext } from "../contexts/2d";
import { getTime } from "../contexts/time";
import { Drawable } from "../interfaces/drawable";
import { HandlesMount } from "../interfaces/handles-mount";
import { Updatable } from "../interfaces/updatable";

export class Player implements Updatable, Drawable, HandlesMount {
  readonly isDrawable = true;
  readonly isUpdatable = true;
  readonly handlesMount = true;

  direction = Direction.None;
  position = new Vec2(0, 0);
  velocity = new Vec2(0, 0);

  onMount() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
          this.direction |= Direction.Up;
          break;
        case "a":
          this.direction |= Direction.Left;
          break;
        case "s":
          this.direction |= Direction.Down;
          break;
        case "d":
          this.direction |= Direction.Right;
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
          this.direction &= ~Direction.Up;
          break;
        case "a":
          this.direction &= ~Direction.Left;
          break;
        case "s":
          this.direction &= ~Direction.Down;
          break;
        case "d":
          this.direction &= ~Direction.Right;
          break;
      }
    });
  }

  update() {
    const time = getTime();
    const accelerationRate = 1500;
    const friction = 4;
    const maxVelocity = 300;

    // Calculate direction vector from key inputs
    const direction = Vec2.fromDirection(this.direction);

    // Apply acceleration in the direction of movement
    const acceleration =
      direction.magnitude() > 0
        ? direction.normalize().multiply(accelerationRate)
        : Vec2.zero();

    // Apply acceleration to velocity
    this.velocity = this.velocity.add(
      acceleration.multiply(time.deltaTimeSeconds)
    );

    // Apply friction to slow down
    this.velocity = this.velocity.multiply(
      1 - friction * time.deltaTimeSeconds
    );

    // Limit maximum velocity
    if (this.velocity.magnitude() > maxVelocity) {
      this.velocity = this.velocity.normalize().multiply(maxVelocity);
    }

    // Apply velocity to position
    this.position = this.position.add(
      this.velocity.multiply(time.deltaTimeSeconds)
    );
  }

  draw() {
    const ctx = get2DContext();

    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, 10, 10);
    ctx.restore();
  }
}
