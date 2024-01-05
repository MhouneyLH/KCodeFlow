// Managing time spans for key strokes.
export class KeystrokeTimeSpan {
  private _pressedKeys: Map<string, number>;

  constructor(pressedKeys: Map<string, number> = new Map<string, number>()) {
    this._pressedKeys = pressedKeys;
  }

  public addPressedKey(pressedKey: string): void {
    const pressedKeyDefaultCount: number = 0;
    const previousCount: number = this._pressedKeys.get(pressedKey) ?? pressedKeyDefaultCount;

    this._pressedKeys.set(pressedKey, previousCount + 1);
  }

  public reset(): void {
    this._pressedKeys.clear();
  }

  public get pressedKeys(): Map<string, number> {
    return this._pressedKeys;
  }

  public get count(): number {
    let count: number = 0;
    for (const value of this._pressedKeys.values()) {
      count += value;
    }

    return count;
  }
}
