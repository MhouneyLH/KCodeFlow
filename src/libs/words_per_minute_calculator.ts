import { KeystrokeRepository } from "./keystroke_repository";

// Calculates the average words per minute
export class WordsPerMinuteCalculator {
  private _repository: KeystrokeRepository;
  private _totalTimeCalled: number = 0;

  constructor(repository: KeystrokeRepository) {
    this._repository = repository;
  }

  public getAverageWordsPerMinute(): number {
    ++this._totalTimeCalled;

    const totalWordCount = this.getWordCountFromKeyCount(this._repository.total.count);
    const wpm = (totalWordCount / this._totalTimeCalled) * 60;
    return wpm;
  }

  private getWordCountFromKeyCount(keyCount: number): number {
    const AVERAGE_WORD_LENGTH: number = 5;
    return keyCount / AVERAGE_WORD_LENGTH;
  }
}