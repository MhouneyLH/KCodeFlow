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
    this.second = new KeystrokeTimeSpan(0);
    this.minute = new KeystrokeTimeSpan(0);
    this.hour = new KeystrokeTimeSpan(0);
    this.day = new KeystrokeTimeSpan(0);
    this.week = new KeystrokeTimeSpan(0);
    this.month = new KeystrokeTimeSpan(0);
    this.year = new KeystrokeTimeSpan(0);
    this.total = new KeystrokeTimeSpan(0);
  }

  public incrementAll(): void {
    this.second.incrementCount();
    this.minute.incrementCount();
    this.hour.incrementCount();
    this.day.incrementCount();
    this.week.incrementCount();
    this.month.incrementCount();
    this.year.incrementCount();
    this.total.incrementCount();
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
}
