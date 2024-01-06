import * as assert from "assert";
import { KeystrokeRepository } from "../../libs/keystroke_repository";
import { WordsPerMinuteCalculator } from "../../libs/words_per_minute_calculator";
import { resetKeystrokeRepository } from "../test_utils";
import { WordsPerMinuteStatusBar } from "../../status_bar/words_per_minute_status_bar";
import * as vscode from "vscode";

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
    resetKeystrokeRepository(repository);
  });

  test("Update() sets the text of the status bar item properly", () => {
    statusBar.update();

    assert.strictEqual(statusBar["_statusBarItem"].text, "0.0 wpm");
  });

  test("Update() should set the text of the status bar item to '60.0 wpm' after addPressedKeyToAll() got called 5 times", () => {
    repository.addPressedKeyToAll("a");
    repository.addPressedKeyToAll("a");
    repository.addPressedKeyToAll("a");
    repository.addPressedKeyToAll("a");
    repository.addPressedKeyToAll("a");

    statusBar.update();

    assert.strictEqual(statusBar["_statusBarItem"].text, "60.0 wpm");
  });
});
