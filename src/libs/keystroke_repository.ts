import { KeystrokeTimeSpan } from "./keystroke_timespan";

// Manages every time span.
export class KeystrokeRepository {
  second: KeystrokeTimeSpan;
  minute: KeystrokeTimeSpan;
  hour: KeystrokeTimeSpan;
  day: KeystrokeTimeSpan;
  week: KeystrokeTimeSpan;
  month: KeystrokeTimeSpan;
  year: KeystrokeTimeSpan;
  total: KeystrokeTimeSpan;

  constructor() {
    this.second = new KeystrokeTimeSpan(0);
    this.minute = new KeystrokeTimeSpan(0);
    this.hour = new KeystrokeTimeSpan(0);
    this.day = new KeystrokeTimeSpan(0);
    this.week = new KeystrokeTimeSpan(0);
    this.month = new KeystrokeTimeSpan(0);
    this.year = new KeystrokeTimeSpan(0);
    this.total = new KeystrokeTimeSpan(0);
  }

  incrementAll(): void {
    this.second.increment();
    this.minute.increment();
    this.hour.increment();
    this.day.increment();
    this.week.increment();
    this.month.increment();
    this.year.increment();
    this.total.increment();
  }
}
