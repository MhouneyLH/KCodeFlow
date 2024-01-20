import { MINUTE_AS_MILLISECONDS } from "./constants";
import { Keystroke } from "./keystroke";
import { KeystrokeRepository } from "./keystroke_repository";

// Calculates the average words per minute
export class WordsPerMinuteCalculator {
  private _repository: KeystrokeRepository;

  constructor(repository: KeystrokeRepository) {
    this._repository = repository;
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

    if (!firstKeystroke && !lastKeystroke) {
      return 0;
    }

    const timeInMillisecondsSinceLastKeystroke: number =
      Date.now() - lastKeystroke.timestampInMilliseconds;
    if (firstKeystroke === lastKeystroke) {
      return timeInMillisecondsSinceLastKeystroke;
    }

    const elapsedMilliseconds: number =
      lastKeystroke.timestampInMilliseconds -
      firstKeystroke.timestampInMilliseconds +
      timeInMillisecondsSinceLastKeystroke;

    return elapsedMilliseconds;
  }
}
