import * as assert from "assert";
import { KeystrokeRepository } from "../../libs/keystroke_repository";
import * as vscode from "vscode";
import { KeystrokCountStatusBar } from "../../status_bar/keystroke_count_status_bar";
import { KEYBOARD_ICON } from "../../libs/constants";
import { Keystroke } from "../../libs/keystroke";
import { TestUtils } from "../test_utils";

suite("KeystrokeCountStatusBar Test Suite", () => {
  let repository: KeystrokeRepository;
  let statusBarItem: vscode.StatusBarItem;
  let statusBar: KeystrokCountStatusBar;

  setup(() => {
    repository = KeystrokeRepository.getInstance();
    statusBarItem = vscode.window.createStatusBarItem();
    statusBar = new KeystrokCountStatusBar(repository, statusBarItem);
  });

  teardown(() => {
    repository.allKeystrokes = [];
    repository = null as any;
    statusBarItem = null as any;
    statusBar = null as any;
  });

  suite("update()", () => {
    test(`For 0 keys pressed the status bar text is set to '${KEYBOARD_ICON} 0'`, () => {
      statusBar.update();

      assert.strictEqual(statusBar["_statusBarItem"].text, `${KEYBOARD_ICON} 0`);
    });

    test(`For 5 keys pressed the status bar text is set to '${KEYBOARD_ICON} 5'`, () => {
      TestUtils.generateKeystrokesWithIncreasingTimestamps(repository, new Keystroke("a", 0), 5);

      statusBar.update();

      assert.strictEqual(statusBar["_statusBarItem"].text, `${KEYBOARD_ICON} 5`);
    });
  });
});
