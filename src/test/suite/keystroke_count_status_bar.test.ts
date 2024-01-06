// import * as assert from "assert";
// import { KeystrokeRepository } from "../../libs/keystroke_repository";
// import { resetKeystrokeRepository } from "../test_utils";
// import * as vscode from "vscode";
// import { KeystrokCountStatusBar } from "../../status_bar/keystroke_count_status_bar";
// import { KEYBOARD_ICON } from "../../libs/constants";

// suite("KeystrokeCountStatusBar Test Suite", () => {
//   let repository: KeystrokeRepository;
//   let statusBarItem: vscode.StatusBarItem;
//   let statusBar: KeystrokCountStatusBar;

//   setup(() => {
//     repository = KeystrokeRepository.getInstance();
//     statusBarItem = vscode.window.createStatusBarItem();
//     statusBar = new KeystrokCountStatusBar(repository, statusBarItem);
//   });

//   teardown(() => {
//     resetKeystrokeRepository(repository);
//   });

//   test("Update() sets the text of the status bar item properly", () => {
//     statusBar.update();

//     assert.strictEqual(statusBar["_statusBarItem"].text, `${KEYBOARD_ICON} 0`);
//   });

//   test("Update() should set the text of the status bar item to '5' after addPressedKeyToAll() got called 5 times", () => {
//     repository.addPressedKeyToAll("a");
//     repository.addPressedKeyToAll("a");
//     repository.addPressedKeyToAll("a");
//     repository.addPressedKeyToAll("a");
//     repository.addPressedKeyToAll("a");

//     statusBar.update();

//     assert.strictEqual(statusBar["_statusBarItem"].text, `${KEYBOARD_ICON} 5`);
//   });
// });
