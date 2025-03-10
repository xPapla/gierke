export enum Direction {
  None = 0,
  Up = 1,
  Down = 2,
  Left = 4,
  Right = 8,
  UpLeft = Up | Left,
  UpRight = Up | Right,
  DownLeft = Down | Left,
  DownRight = Down | Right,
}
