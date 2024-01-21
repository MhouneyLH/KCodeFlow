export const ENTER_CHARACTER: string = "\r\n";
export const BACKSPACE_CHARACTER: string = "";
export const TAB_CHARACTER: string = "    ";
export const SPACE_CHARACTER: string = " ";

export class Keystroke {
  private _key: string;
  private _timestampInMs: number;

  public constructor(key: string, timestampInMs: number) {
    this._key = this.getCorrectKeyLabel(key);
    this._timestampInMs = timestampInMs;
  }

  public get key(): string {
    return this._key;
  }

  public get timestampInMs(): number {
    return this._timestampInMs;
  }

  public toJsonObject(): any {
    const jsonObject: any = {
      key: this._key,
      timestampInMs: this._timestampInMs,
    };

    return jsonObject;
  }

  public static fromJsonObject(jsonObject: any): Keystroke {
    const key: string = jsonObject["key"];
    const timestamp: number = jsonObject["timestampInMs"];

    return new Keystroke(key, timestamp);
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
}
