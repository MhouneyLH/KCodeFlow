import { KeystrokeTimeSpan } from "./keystroke_timespan";

// Manages every time span.
export class KeystrokeRepository {
  private static _instance: KeystrokeRepository;

  public second: KeystrokeTimeSpan;
  public minute: KeystrokeTimeSpan;
  public hour: KeystrokeTimeSpan;
  public day: KeystrokeTimeSpan;
  public week: KeystrokeTimeSpan;
  public month: KeystrokeTimeSpan;
  public year: KeystrokeTimeSpan;
  public total: KeystrokeTimeSpan;

  public static getInstance(): KeystrokeRepository {
    if (!KeystrokeRepository._instance) {
      KeystrokeRepository._instance = new KeystrokeRepository();
    }

    return KeystrokeRepository._instance;
  }

  private constructor() {
    this.second = new KeystrokeTimeSpan();
    this.minute = new KeystrokeTimeSpan();
    this.hour = new KeystrokeTimeSpan();
    this.day = new KeystrokeTimeSpan();
    this.week = new KeystrokeTimeSpan();
    this.month = new KeystrokeTimeSpan();
    this.year = new KeystrokeTimeSpan();
    this.total = new KeystrokeTimeSpan();
  }

  public addPressedKeyToAll(pressedKey: string): void {
    this.second.addPressedKey(pressedKey);
    this.minute.addPressedKey(pressedKey);
    this.hour.addPressedKey(pressedKey);
    this.day.addPressedKey(pressedKey);
    this.week.addPressedKey(pressedKey);
    this.month.addPressedKey(pressedKey);
    this.year.addPressedKey(pressedKey);
    this.total.addPressedKey(pressedKey);
  }

  public getMostOftenPressedKeysInTotalWithCountInDescendingOrder(): Map<string, number> {
    const entries = Array.from(this.total.pressedKeys.entries());
    entries.sort((left, right) => right[1] - left[1]);

    const targetSize: number = 3;
    const topEntriesMap = new Map<string, number>(entries.slice(0, targetSize));

    return topEntriesMap;
  }
}
