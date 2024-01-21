import { MINUTE_AS_MILLISECONDS, SECOND_AS_MILLISECONDS } from "./constants";
import { Keystroke } from "./keystroke";
import { KeystrokeRepository } from "./keystroke_repository";

// Calculates the average words per minute
export class WordsPerMinuteCalculator {
  private _repository: KeystrokeRepository;
  private _fixedTimeSinceLastKeystrokeInMilliseconds: number;

  constructor(repository: KeystrokeRepository) {
    this._repository = repository;
    this._fixedTimeSinceLastKeystrokeInMilliseconds = 0;
  }

  public getAverageWordsPerMinute(): number {
    const elapsedMilliseconds: number = this.getAllElapsedTimeInMilliseconds();
    if (elapsedMilliseconds === 0) {
      return 0;
    }

    const elapsedMinutes: number = elapsedMilliseconds / MINUTE_AS_MILLISECONDS;
    const wpm: number =
      this.getWordCountFromKeystrokeCount(this._repository.allKeystrokeCount()) / elapsedMinutes;

    return wpm;
  }

  private getWordCountFromKeystrokeCount(keyCount: number): number {
    const AVERAGE_WORD_LENGTH: number = 5;
    return keyCount / AVERAGE_WORD_LENGTH;
  }

  private getAllElapsedTimeInMilliseconds(): number {
    const firstKeystroke: Keystroke = this._repository.getFirstKeystroke();
    const lastKeystroke: Keystroke = this._repository.getLastKeystroke();

    // invalid
    if (!firstKeystroke && !lastKeystroke) {
      return 0;
    }

    // only one
    if (firstKeystroke === lastKeystroke) {
      const timeInMillisecondsSinceLastKeystroke: number =
        Date.now() - lastKeystroke.timestampInMilliseconds;
      return timeInMillisecondsSinceLastKeystroke;
    }

    // only two
    const only2Keystrokes: boolean = this._repository.allKeystrokeCount() === 2;
    if (only2Keystrokes) {
      return lastKeystroke.timestampInMilliseconds - firstKeystroke.timestampInMilliseconds;
    }

    // history
    let elapsedMilliseconds: number = 0;
    for (let i = 0; i < this._repository.allKeystrokeCount() - 1; i++) {
      const currentKeystroke = this._repository.allKeystrokes[i];
      const nextKeystroke = this._repository.allKeystrokes[i + 1];

      const timeBetweenInMilliseconds: number =
        nextKeystroke.timestampInMilliseconds - currentKeystroke.timestampInMilliseconds;
      const isAFK: boolean = timeBetweenInMilliseconds > 5 * SECOND_AS_MILLISECONDS;
      if (!isAFK) {
        elapsedMilliseconds += timeBetweenInMilliseconds;
        continue;
      } else {
        elapsedMilliseconds += 5 * SECOND_AS_MILLISECONDS;
      }
    }

    // main loop
    const timeSinceLastKeystrokeInMilliseconds: number =
      Date.now() - lastKeystroke.timestampInMilliseconds;
    const isAFK: boolean = timeSinceLastKeystrokeInMilliseconds > 5 * SECOND_AS_MILLISECONDS;
    if (!isAFK) {
      this._fixedTimeSinceLastKeystrokeInMilliseconds = timeSinceLastKeystrokeInMilliseconds;
      elapsedMilliseconds += timeSinceLastKeystrokeInMilliseconds;
    } else {
      elapsedMilliseconds += this._fixedTimeSinceLastKeystrokeInMilliseconds;
    }

    return elapsedMilliseconds;
  }
}
