import { get, provide } from "./helpers";

export class Time {
  constructor(
    public readonly currentTimeMs: number = Time.now(),
    public readonly deltaTimeMs: number = 0
  ) {}

  get deltaTimeSeconds() {
    return this.deltaTimeMs / 1000;
  }

  static update(previous: Time) {
    const now = Time.now();
    return new Time(now, now - previous.currentTimeMs);
  }

  static now() {
    return performance.now();
  }
}

export const provideTime = provide<Time>;
export const getTime = () => get(Time);
