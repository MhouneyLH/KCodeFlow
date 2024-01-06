import { MINUTE_AS_MILLISECONDS, SECOND_AS_MILLISECONDS } from "./constants";
import { Keystroke } from "./keystroke";
import { KeystrokeRepository } from "./keystroke_repository";

// Calculates the average words per minute
export class WordsPerMinuteCalculator {
  private _repository: KeystrokeRepository;

  constructor(repository: KeystrokeRepository) {
    this._repository = repository;
  }

  public getAverageWordsPerMinute(): number {
    const timeInMillisecondsSinceLastKeystroke: number =
      Date.now() - this._repository.getLastKeystroke().timestampInMilliseconds;
    const elapsedMinutes: number =
      this.getElapsedTimeInMinutes() +
      timeInMillisecondsSinceLastKeystroke / MINUTE_AS_MILLISECONDS;

    const wpm: number =
      this.getWordCountFromKeystrokeCount(this._repository.allKeystrokeCount()) / elapsedMinutes;

    return wpm;
  }

  private getWordCountFromKeystrokeCount(keyCount: number): number {
    const AVERAGE_WORD_LENGTH: number = 5;
    return keyCount / AVERAGE_WORD_LENGTH;
  }

  private getElapsedTimeInMinutes(): number {
    let elapsedMinutes: number = 0;

    let firstKeystrokeOfStartedMinute: Keystroke = this._repository.getFirstKeystroke();
    for (const keystroke of this._repository.allKeystrokes.slice(1)) {
      if (
        keystroke.timestampInMilliseconds - firstKeystrokeOfStartedMinute.timestampInMilliseconds >
        MINUTE_AS_MILLISECONDS
      ) {
        elapsedMinutes += 1;
        firstKeystrokeOfStartedMinute = keystroke;
      }
    }

    return elapsedMinutes;
  }
}
