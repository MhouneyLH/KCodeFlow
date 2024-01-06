import { Keystroke } from "./keystroke";

export class KeystrokeRepository {
  private static _instance: KeystrokeRepository;

  private _allKeystrokes: Keystroke[] = [];

  public static getInstance(): KeystrokeRepository {
    if (!KeystrokeRepository._instance) {
      KeystrokeRepository._instance = new KeystrokeRepository();
    }

    return KeystrokeRepository._instance;
  }

  public keystrokeCount(): number {
    return this._allKeystrokes.length;
  }

  public addPressedKey(pressedKey: string, timestampInMilliseconds: number): void {
    const keystroke: Keystroke = new Keystroke(pressedKey, timestampInMilliseconds);
    this._allKeystrokes.push(keystroke);
  }

  public get allKeystrokes(): Keystroke[] {
    return this._allKeystrokes;
  }

  public set allKeystrokes(keystrokes: Keystroke[]) {
    this._allKeystrokes = keystrokes;
  }

  public getKeystrokesInTimeSpan(
    startTimeInMilliseconds: number,
    endTimeInMilliseconds: number
  ): Keystroke[] {
    const keystrokesInTimeSpan: Keystroke[] = [];

    for (const keystroke of this._allKeystrokes) {
      if (
        keystroke.timestampInMilliseconds >= startTimeInMilliseconds &&
        keystroke.timestampInMilliseconds <= endTimeInMilliseconds
      ) {
        keystrokesInTimeSpan.push(keystroke);
      }
    }

    return keystrokesInTimeSpan;
  }

  public keystrokesToMapWithUniqueKeys(): Map<string, number> {
    const mapWithUniqueKeys = new Map<string, number>();

    for (const keystroke of this._allKeystrokes) {
      const key: string = keystroke.key;
      const count: number = mapWithUniqueKeys.get(key) || 0;
      mapWithUniqueKeys.set(key, count + 1);
    }

    return mapWithUniqueKeys;
  }

  public allKeystrokesToJsonArray(): any[] {
    const jsonArray: any[] = [];

    for (const keystroke of this._allKeystrokes) {
      jsonArray.push(keystroke.toJsonObject());
    }

    return jsonArray;
  }

  public static allKeystrokesFromJsonArray(jsonArray: any[]): Keystroke[] {
    const keystrokes: Keystroke[] = [];

    for (const jsonObject of jsonArray) {
      keystrokes.push(Keystroke.fromJsonObject(jsonObject));
    }

    return keystrokes;
  }

  // public getMostOftenPressedKeysInTotalWithCountInDescendingOrder(
  //   targetSize: number
  // ): Map<string, number> {
  //   const entries = Array.from(this.total.pressedKeys.entries());
  //   entries.sort((left, right) => right[1] - left[1]);

  //   const topEntriesMap = new Map<string, number>(entries.slice(0, targetSize));

  //   return topEntriesMap;
  // }
}
