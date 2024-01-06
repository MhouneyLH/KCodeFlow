import * as vscode from "vscode";
import { WordsPerMinuteCalculator } from "../libs/words_per_minute_calculator";

const DIGIT_PRECISION: number = 1;

// Shows the average words per minute in the status bar
export class WordsPerMinuteStatusBar {
  private _wpmCalculator: WordsPerMinuteCalculator;
  private _statusBarItem: vscode.StatusBarItem;

  constructor(wpmCalculator: WordsPerMinuteCalculator, statusBarItem: vscode.StatusBarItem) {
    this._wpmCalculator = wpmCalculator;
    this._statusBarItem = statusBarItem;

    this.update();
    this._statusBarItem.show();
  }

  public update(): void {
    const wpm: number = this._wpmCalculator.getAverageWordsPerMinute();
    this._statusBarItem.text = `${wpm.toFixed(DIGIT_PRECISION)} wpm`;
  }

  dispose() {
    this._statusBarItem.dispose();
  }
}
