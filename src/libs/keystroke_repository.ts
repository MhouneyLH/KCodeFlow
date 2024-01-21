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

  public get allKeystrokes(): Keystroke[] {
    return this._allKeystrokes;
  }

  public set allKeystrokes(keystrokes: Keystroke[]) {
    this._allKeystrokes = keystrokes;
  }

  public addKeystroke(pressedKey: string, timestampInMs: number): void {
    const keystroke: Keystroke = new Keystroke(pressedKey, timestampInMs);
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
    const nowInMs: number = Date.now();
    const oneYearAgoInMs: number = new Date().setFullYear(new Date().getFullYear() - 1);

    return this.getKeystrokesInTimeSpan(oneYearAgoInMs, nowInMs).length;
  }

  public monthKeystrokeCount(): number {
    const nowInMs: number = Date.now();
    const oneMonthAgoInMs: number = new Date().setMonth(new Date().getMonth() - 1);

    return this.getKeystrokesInTimeSpan(oneMonthAgoInMs, nowInMs).length;
  }

  public weekKeystrokeCount(): number {
    const nowInMs: number = Date.now();
    const oneWeekAgoInMs: number = new Date().setDate(new Date().getDate() - 7);

    return this.getKeystrokesInTimeSpan(oneWeekAgoInMs, nowInMs).length;
  }

  public dayKeystrokeCount(): number {
    const nowInMs: number = Date.now();
    const oneDayAgoInMs: number = new Date().setDate(new Date().getDate() - 1);

    return this.getKeystrokesInTimeSpan(oneDayAgoInMs, nowInMs).length;
  }

  public hourKeystrokeCount(): number {
    const nowInMs: number = Date.now();
    const oneHourAgoInMs: number = new Date().setHours(new Date().getHours() - 1);

    return this.getKeystrokesInTimeSpan(oneHourAgoInMs, nowInMs).length;
  }

  public minuteKeystrokeCount(): number {
    const nowInMs: number = Date.now();
    const oneMinuteAgoInMs: number = new Date().setMinutes(new Date().getMinutes() - 1);

    return this.getKeystrokesInTimeSpan(oneMinuteAgoInMs, nowInMs).length;
  }

  public keystrokesToMapWithUniqueKeysInDescendingOrder(): Map<string, number> {
    const mapWithUniqueKeys = this.keystrokesToMapWithUniqueKeys();

    const entries = Array.from(mapWithUniqueKeys.entries());
    entries.sort((left, right) => right[1] - left[1]);

    const sortedMap = new Map<string, number>(entries);

    return sortedMap;
  }

  public allKeystrokesToJsonArray(): any[] {
    const keystrokesAsJson: any[] = [];

    for (const keystroke of this._allKeystrokes) {
      keystrokesAsJson.push(keystroke.toJsonObject());
    }

    return keystrokesAsJson;
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

  private getKeystrokesInTimeSpan(startTimeInMs: number, endTimeInMs: number): Keystroke[] {
    const keystrokesInTimeSpan: Keystroke[] = [];

    for (const keystroke of this._allKeystrokes) {
      if (keystroke.timestampInMs >= startTimeInMs && keystroke.timestampInMs <= endTimeInMs) {
        keystrokesInTimeSpan.push(keystroke);
      }
    }

    return keystrokesInTimeSpan;
  }
}
