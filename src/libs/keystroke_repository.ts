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

  public keystrokesToMapWithUniqueKeysInDescendingOrder(): Map<string, number> {
    const mapWithUniqueKeys = this.keystrokesToMapWithUniqueKeys();

    const entries = Array.from(mapWithUniqueKeys.entries());
    entries.sort((left, right) => right[1] - left[1]);

    const sortedMap = new Map<string, number>(entries);

    return sortedMap;
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

  private keystrokesToMapWithUniqueKeys(): Map<string, number> {
    const mapWithUniqueKeys = new Map<string, number>();

    for (const keystroke of this._allKeystrokes) {
      const key: string = keystroke.key;
      const count: number = mapWithUniqueKeys.get(key) || 0;
      mapWithUniqueKeys.set(key, count + 1);
    }

    return mapWithUniqueKeys;
  }
}
