import { Direction } from "./direction";

export class Vec2 {
  constructor(public readonly x: number, public readonly y: number) {}

  add(other: Vec2): Vec2 {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  multiply(scalar: number): Vec2 {
    return new Vec2(this.x * scalar, this.y * scalar);
  }

  subtract(other: Vec2): Vec2 {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  divide(scalar: number): Vec2 {
    return new Vec2(this.x / scalar, this.y / scalar);
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vec2 {
    return this.divide(this.length());
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  static fromAngle(angle: number): Vec2 {
    return new Vec2(Math.cos(angle), Math.sin(angle));
  }

  static zero(): Vec2 {
    return new Vec2(0, 0);
  }

  static fromDirection(direction: Direction): Vec2 {
    return new Vec2(
      (direction & Direction.Right ? 1 : 0) -
        (direction & Direction.Left ? 1 : 0),
      (direction & Direction.Down ? 1 : 0) - (direction & Direction.Up ? 1 : 0)
    ).normalize();
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
