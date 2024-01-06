const ENTER_CHARACTER: string = "\r\n";
const BACKSPACE_CHARACTER: string = "";
const TAB_CHARACTER: string = "    ";
const SPACE_CHARACTER: string = " ";

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
    if (key === ENTER_CHARACTER) {
      return "Enter";
    } else if (key === BACKSPACE_CHARACTER) {
      return "Backspace";
    } else if (key === TAB_CHARACTER) {
      return "Tab";
    } else if (key === SPACE_CHARACTER) {
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

  // todo: testing
  public toJsonObject(): any {
    const jsonObject: any = {
      pressedKeys: {},
    };

    for (const [key, value] of this._pressedKeys.entries()) {
      jsonObject["pressedKeys"][key] = value as number;
    }

    return jsonObject;
  }

  // todo: testing
  public static fromJsonObject(jsonObject: any): KeystrokeTimeSpan {
    const pressedKeys: Map<string, number> = new Map<string, number>();

    for (const [key, value] of Object.entries(jsonObject["pressedKeys"])) {
      pressedKeys.set(key, value === undefined ? 0 : (value as number));
    }

    return new KeystrokeTimeSpan(pressedKeys);
  }
}
