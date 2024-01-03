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

  public addPressedKey(pressedKey: string): void {
    const pressedKeyDefaultCount: number = 0;
    const previousCount: number = this._pressedKeys.get(pressedKey) ?? pressedKeyDefaultCount;

    this._pressedKeys.set(pressedKey, previousCount + 1);
  }

  public resetPressedKeys(): void {
    this._pressedKeys.clear();
  }

  public get count(): number {
    return this._count;
  }

  public get pressedKeys(): Map<string, number> {
    return this._pressedKeys;
  }
}
