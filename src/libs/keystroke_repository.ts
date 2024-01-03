import { KeystrokeTimeSpan } from "./keystroke_timespan";

// Manages every time span.
export class KeystrokeRepository {
  private static _instance: KeystrokeRepository;

  second: KeystrokeTimeSpan;
  minute: KeystrokeTimeSpan;
  hour: KeystrokeTimeSpan;
  day: KeystrokeTimeSpan;
  week: KeystrokeTimeSpan;
  month: KeystrokeTimeSpan;
  year: KeystrokeTimeSpan;
  total: KeystrokeTimeSpan;

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
}
