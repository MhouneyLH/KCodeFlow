// Managing time spans for key strokes.
export class KeystrokeTimeSpan {
  private _pressedKeys: Map<string, number>;

  constructor(pressedKeys: Map<string, number> = new Map<string, number>()) {
    this._pressedKeys = pressedKeys;
  }

  public addPressedKey(pressedKey: string): void {
    const pressedKeyDefaultCount: number = 0;
    const previousCount: number = this._pressedKeys.get(pressedKey) ?? pressedKeyDefaultCount;

    const correctKeyLabel: string = this.getCorrectKeyLabel(pressedKey);
    this._pressedKeys.set(correctKeyLabel, previousCount + 1);
  }

  private getCorrectKeyLabel(key: string): string {
    if (key === "\r\n") {
      return "Enter";
    } else if (key === "") {
      return "Backspace";
    } else if (key === "    ") {
      return "Tab";
    } else if (key === " ") {
      return "Space";
    }

    return key;
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
