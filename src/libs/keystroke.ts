const ENTER_CHARACTER: string = "\r\n";
const BACKSPACE_CHARACTER: string = "";
const TAB_CHARACTER: string = "    ";
const SPACE_CHARACTER: string = " ";

// Managing time spans for key strokes.
export class Keystroke {
  private _key: string;
  private _timestampInMilliseconds: number;

  public constructor(key: string, timestampInMilliseconds: number) {
    this._key = this.getCorrectKeyLabel(key);
    this._timestampInMilliseconds = timestampInMilliseconds;
  }

  public get key(): string {
    return this._key;
  }

  // todo: testing
  public toJsonObject(): any {
    const jsonObject: any = {
      key: this._key,
      timestampInMilliseconds: this._timestampInMilliseconds,
    };

    return jsonObject;
  }

  // todo: testing
  public static fromJsonObject(jsonObject: any): Keystroke {
    const key: string = jsonObject["key"];
    const timestamp: number = jsonObject["timestamp"];

    return new Keystroke(key, timestamp);
  }

  // public addPressedKey(pressedKey: string): void {
  //   const pressedKeyDefaultCount: number = 0;
  //   const previousCount: number = this._pressedKeys.get(pressedKey) ?? pressedKeyDefaultCount;

  //   const correctKeyLabel: string = this.getCorrectKeyLabel(pressedKey);
  //   this._pressedKeys.set(correctKeyLabel, previousCount + 1);
  // }

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

  // public get count(): number {
  //   let count: number = 0;
  //   for (const value of this._pressedKeys.values()) {
  //     count += value;
  //   }

  //   return count;
  // }
}
