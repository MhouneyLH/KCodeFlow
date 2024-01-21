import { AFK_TIME_IN_MS, MINUTE_IN_MS } from "./constants";
import { Keystroke } from "./keystroke";
import { KeystrokeRepository } from "./keystroke_repository";

export class WordsPerMinuteCalculator {
  private _repository: KeystrokeRepository;
  private _fixedTimeSinceLastKeystrokeInMs: number;

  constructor(repository: KeystrokeRepository) {
    this._repository = repository;
    this._fixedTimeSinceLastKeystrokeInMs = 0;
  }

  public getAverageWordsPerMinute(): number {
    const elapsedTimeInMs: number = this.getAllElapsedTimeInMs();
    if (elapsedTimeInMs === 0) {
      return 0;
    }

    const elapsedTimeInMin: number = elapsedTimeInMs / MINUTE_IN_MS;
    const wpm: number =
      this.getWordCountFromKeystrokeCount(this._repository.allKeystrokeCount()) / elapsedTimeInMin;

    return wpm;
  }

  private getWordCountFromKeystrokeCount(keyCount: number): number {
    const AVERAGE_WORD_LENGTH: number = 5;
    return keyCount / AVERAGE_WORD_LENGTH;
  }

  private getAllElapsedTimeInMs(): number {
    const firstKeystroke: Keystroke = this._repository.getFirstKeystroke();
    const lastKeystroke: Keystroke = this._repository.getLastKeystroke();

    const noKeystrokes: boolean = this._repository.allKeystrokeCount() === 0;
    if (noKeystrokes) {
      return 0;
    }

    const only1Keystroke: boolean = this._repository.allKeystrokeCount() === 1;
    if (only1Keystroke) {
      return this.getTimeBetweenInMs(Date.now(), lastKeystroke.timestampInMs);
    }

    const only2Keystrokes: boolean = this._repository.allKeystrokeCount() === 2;
    if (only2Keystrokes) {
      return this.getTimeBetweenInMs(lastKeystroke.timestampInMs, firstKeystroke.timestampInMs);
    }

    let elapsedTimeInMs: number = this.getElapsedTimeInMsFromPastKeystrokes();
    elapsedTimeInMs += this.getElapsedTimeInMsForBetweenActiveAndAFK(lastKeystroke);

    return elapsedTimeInMs;
  }

  private getTimeBetweenInMs(earlierTimeInMs: number, laterTimeInMs: number): number {
    const timeBetweenInMs: number = Math.abs(laterTimeInMs - earlierTimeInMs);
    return timeBetweenInMs;
  }

  private getElapsedTimeInMsFromPastKeystrokes(): number {
    let elapsedTimeInMs: number = 0;

    for (let i = 0; i < this._repository.allKeystrokeCount() - 1; i++) {
      const currentKeystroke = this._repository.allKeystrokes[i];
      const nextKeystroke = this._repository.allKeystrokes[i + 1];
      const timeBetweenInMs: number = this.getTimeBetweenInMs(
        nextKeystroke.timestampInMs,
        currentKeystroke.timestampInMs
      );

      if (!this.isAFK(timeBetweenInMs)) {
        elapsedTimeInMs += timeBetweenInMs;
        continue;
      }

      // the time between the keystrokes was afk time and should be added to the elapsed time
      elapsedTimeInMs += AFK_TIME_IN_MS;
    }

    return elapsedTimeInMs;
  }

  private getElapsedTimeInMsForBetweenActiveAndAFK(lastKeystroke: Keystroke): number {
    const timeSinceLastKeystrokeInMs: number = this.getTimeBetweenInMs(
      Date.now(),
      lastKeystroke.timestampInMs
    );

    if (!this.isAFK(timeSinceLastKeystrokeInMs)) {
      // the time since the last keystroke was active time and should be added to the elapsed time
      this._fixedTimeSinceLastKeystrokeInMs = timeSinceLastKeystrokeInMs;
      return timeSinceLastKeystrokeInMs;
    }

    // the time since the last keystroke was afk time and should be added to the elapsed time
    return this._fixedTimeSinceLastKeystrokeInMs;
  }

  private isAFK(timeBetweenInMs: number): boolean {
    return timeBetweenInMs > AFK_TIME_IN_MS;
  }
}
