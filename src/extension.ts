import * as vscode from "vscode";

import {
  KEYBOARD_ICON,
  SECOND_AS_MILLISECONDS,
  MINUTE_AS_MILLISECONDS,
  HOUR_AS_MILLISECONDS,
  DAY_AS_MILLISECONDS,
  WEEK_AS_MILLISECONDS,
  MONTH_AS_MILLISECONDS,
  YEAR_AS_MILLISECONDS,
} from "./constants";
import { getPraisingWord, setLongInterval } from "./utils";
import { isValidChangedContent } from "./vscode_utils";
import {
  keystrokeRepository,
  getMostOftenPressedKeysMessage,
  getKeystrokeCountAnalyticsMessage,
  collectPressedKey,
} from "./libs/keystrokes_analytics";
import { WordsPerMinuteCalculator } from "./libs/words_per_minute_calculator";
import { WordsPerMinuteStatusBar } from "./words_per_minute_status_bar";

let wpmStatusBar: WordsPerMinuteStatusBar;

export function activate({ subscriptions }: vscode.ExtensionContext): void {
  // commands
  const keystrokeCountAnalyticsCommandId = "keystrokemanager.keystrokeCountAnalytics";
  const mostOftenPressedKeysCommandId = "keystrokemanager.mostOftenPressedKeys";

  subscriptions.push(
    vscode.commands.registerCommand(
      keystrokeCountAnalyticsCommandId,
      keystrokeCountAnalyticsCommand
    )
  );
  subscriptions.push(
    vscode.commands.registerCommand(mostOftenPressedKeysCommandId, mostOftenPressedKeysCommand)
  );

  createStatusBarItems(subscriptions);

  // change-detections
  subscriptions.push(vscode.workspace.onDidChangeTextDocument(updateKeystrokes));

  // intervals
  setInterval(() => {
    wpmStatusBar.update();

    keystrokeRepository.second.resetCount();
    keystrokeRepository.second.resetPressedKeys();
  }, SECOND_AS_MILLISECONDS);
  setInterval(() => {
    keystrokeRepository.minute.resetCount();
    keystrokeRepository.minute.resetPressedKeys();
  }, MINUTE_AS_MILLISECONDS);
  setInterval(() => {
    keystrokeRepository.hour.resetCount();
    keystrokeRepository.hour.resetPressedKeys();
  }, HOUR_AS_MILLISECONDS);
  setInterval(() => {
    keystrokeRepository.day.resetCount();
    keystrokeRepository.day.resetPressedKeys();
  }, DAY_AS_MILLISECONDS);
  setInterval(() => {
    keystrokeRepository.week.resetCount();
    keystrokeRepository.week.resetPressedKeys();
  }, WEEK_AS_MILLISECONDS);
  setLongInterval(() => {
    keystrokeRepository.month.resetCount();
    keystrokeRepository.month.resetPressedKeys();
  }, MONTH_AS_MILLISECONDS);
  setLongInterval(() => {
    keystrokeRepository.year.resetCount();
    keystrokeRepository.year.resetPressedKeys();
  }, YEAR_AS_MILLISECONDS);
}

function createStatusBarItems(subscriptions: any): void {
  const STATUS_BAR_ITEM_PRIORITY = 101;

  const wpmCalculator = new WordsPerMinuteCalculator(keystrokeRepository);
  const wpmStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    STATUS_BAR_ITEM_PRIORITY
  );
  wpmStatusBarItem.tooltip = "Average words per minute [total]";

  wpmStatusBar = new WordsPerMinuteStatusBar(wpmCalculator, wpmStatusBarItem);
  subscriptions.push(wpmStatusBar);
}

function keystrokeCountAnalyticsCommand(): void {
  const message = getKeystrokeCountAnalyticsMessage();

  vscode.window.showInformationMessage(`😊 ${getPraisingWord()}! ${message}`);
}

function mostOftenPressedKeysCommand(): void {
  const mostOftenPressedKeys =
    keystrokeRepository.getMostOftenPressedKeysInTotalWithCountInDescendingOrder();
  const message = getMostOftenPressedKeysMessage(mostOftenPressedKeys);

  vscode.window.showInformationMessage(message);
}

function updateKeystrokes(event: vscode.TextDocumentChangeEvent): void {
  if (isValidChangedContent(event)) {
    keystrokeRepository.incrementAll();
    collectPressedKey(event);
  }
}
