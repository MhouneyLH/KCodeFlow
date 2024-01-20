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

  public set allKeystrokes(keystrokes: Keystroke[]) {
    this._allKeystrokes = keystrokes;
  }

  public addKeystroke(pressedKey: string, timestampInMilliseconds: number): void {
    const keystroke: Keystroke = new Keystroke(pressedKey, timestampInMilliseconds);
    this._allKeystrokes.push(keystroke);
  }

  public getFirstKeystroke(): Keystroke {
    return this._allKeystrokes[0];
  }

  public getLastKeystroke(): Keystroke {
    return this._allKeystrokes[this._allKeystrokes.length - 1];
  }

  public allKeystrokeCount(): number {
    return this._allKeystrokes.length;
  }

  public yearKeystrokeCount(): number {
    const nowInMilliseconds: number = Date.now();
    const oneYearAgoInMilliseconds: number = new Date().setFullYear(new Date().getFullYear() - 1);

    return this.getKeystrokesInTimeSpan(oneYearAgoInMilliseconds, nowInMilliseconds).length;
  }

  public monthKeystrokeCount(): number {
    const nowInMilliseconds: number = Date.now();
    const oneMonthAgoInMilliseconds: number = new Date().setMonth(new Date().getMonth() - 1);

    return this.getKeystrokesInTimeSpan(oneMonthAgoInMilliseconds, nowInMilliseconds).length;
  }

  public weekKeystrokeCount(): number {
    const nowInMilliseconds: number = Date.now();
    const oneWeekAgoInMilliseconds: number = new Date().setDate(new Date().getDate() - 7);

    return this.getKeystrokesInTimeSpan(oneWeekAgoInMilliseconds, nowInMilliseconds).length;
  }

  public dayKeystrokeCount(): number {
    const nowInMilliseconds: number = Date.now();
    const oneDayAgoInMilliseconds: number = new Date().setDate(new Date().getDate() - 1);

    return this.getKeystrokesInTimeSpan(oneDayAgoInMilliseconds, nowInMilliseconds).length;
  }

  public hourKeystrokeCount(): number {
    const nowInMilliseconds: number = Date.now();
    const oneHourAgoInMilliseconds: number = new Date().setHours(new Date().getHours() - 1);

    return this.getKeystrokesInTimeSpan(oneHourAgoInMilliseconds, nowInMilliseconds).length;
  }

  public minuteKeystrokeCount(): number {
    const nowInMilliseconds: number = Date.now();
    const oneMinuteAgoInMilliseconds: number = new Date().setMinutes(new Date().getMinutes() - 1);

    return this.getKeystrokesInTimeSpan(oneMinuteAgoInMilliseconds, nowInMilliseconds).length;
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

  private getKeystrokesInTimeSpan(
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
}
