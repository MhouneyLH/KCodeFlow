import { MINUTE_AS_MILLISECONDS, SECOND_AS_MILLISECONDS } from "./constants";
import { KeystrokeRepository } from "./keystroke_repository";

// Calculates the average words per minute
export class WordsPerMinuteCalculator {
  private _repository: KeystrokeRepository;

  constructor(repository: KeystrokeRepository) {
    this._repository = repository;
  }

  public getAverageWordsPerMinute(): number {
    const elapsedTimeInMilliseconds: number =
      this._repository.getLastKeystroke().timestampInMilliseconds -
      this._repository.getFirstKeystroke().timestampInMilliseconds;
    const timeInMillisecondsSinceLastKeystroke: number =
      Date.now() - this._repository.getLastKeystroke().timestampInMilliseconds;
    const elapsedMinutes: number =
      (elapsedTimeInMilliseconds + timeInMillisecondsSinceLastKeystroke) / MINUTE_AS_MILLISECONDS;

    const wpm: number =
      this.getWordCountFromKeystrokeCount(this._repository.allKeystrokeCount()) / elapsedMinutes;

    return wpm;
  }

  private getWordCountFromKeystrokeCount(keyCount: number): number {
    const AVERAGE_WORD_LENGTH: number = 5;
    return keyCount / AVERAGE_WORD_LENGTH;
  }
}
