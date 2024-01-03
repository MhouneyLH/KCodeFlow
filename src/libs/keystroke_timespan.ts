// Managing time spans for key strokes.
export class KeystrokeTimeSpan {
  private _count: number;
  private _pressedKeys: Map<string, number>;

  constructor(count: number) {
    this._count = count;
    this._pressedKeys = new Map<string, number>();
  }

  public incrementCount(): void {
    this._count++;
  }

  public resetCount(): void {
    this._count = 0;
  }

  public get count(): number {
    return this._count;
  }

  public get pressedKeys(): Map<string, number> {
    return this._pressedKeys;
  }

  public set pressedKeys(pressedKeys: Map<string, number>) {
    this._pressedKeys = pressedKeys;
  }
}
