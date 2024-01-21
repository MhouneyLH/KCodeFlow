import * as assert from "assert";
import { KeystrokeRepository } from "../../libs/keystroke_repository";
import { WordsPerMinuteCalculator } from "../../libs/words_per_minute_calculator";
import { WordsPerMinuteStatusBar } from "../../status_bar/words_per_minute_status_bar";
import * as vscode from "vscode";
import { MINUTE_IN_MS } from "../../libs/constants";
import { Keystroke } from "../../libs/keystroke";
import { TestUtils } from "../test_utils";

suite("WordsPerMinuteStatusBar Test Suite", () => {
  let repository: KeystrokeRepository;
  let calculator: WordsPerMinuteCalculator;
  let statusBarItem: vscode.StatusBarItem;
  let statusBar: WordsPerMinuteStatusBar;

  setup(() => {
    repository = KeystrokeRepository.getInstance();
    calculator = new WordsPerMinuteCalculator(repository);
    statusBarItem = vscode.window.createStatusBarItem();
    statusBar = new WordsPerMinuteStatusBar(calculator, statusBarItem);
  });

  teardown(() => {
    repository.allKeystrokes = [];
    repository = null as any;
    calculator = null as any;
    statusBarItem = null as any;
    statusBar = null as any;
  });

  suite("update()", () => {
    test("For 0 wpm the status bar text is set to '0.0 wpm'", () => {
      statusBar.update();

      assert.strictEqual(statusBar["_statusBarItem"].text, "0.0 wpm");
    });

    test("For 60 wpm the status bar text is set to '60.0 wpm'", () => {
      const now = Date.now();
      const oneMinuteBefore: number = now - MINUTE_IN_MS;

      TestUtils.generateKeystrokesWithIncreasingTimestamps(
        repository,
        new Keystroke("a", oneMinuteBefore),
        300
      );

      statusBar.update();

      assert.strictEqual(statusBar["_statusBarItem"].text, "60.0 wpm");
    });
  });
});
