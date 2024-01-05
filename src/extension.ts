import * as vscode from "vscode";

import {
  SECOND_AS_MILLISECONDS,
  MINUTE_AS_MILLISECONDS,
  HOUR_AS_MILLISECONDS,
  DAY_AS_MILLISECONDS,
  WEEK_AS_MILLISECONDS,
  MONTH_AS_MILLISECONDS,
  YEAR_AS_MILLISECONDS,
} from "./constants";
import { getPraisingWord, isValidChangedContent, setLongInterval } from "./utils";
import {
  keystrokeRepository,
  getMostOftenPressedKeysMessage,
  getKeystrokeCountAnalyticsMessage,
  collectPressedKey,
} from "./libs/keystrokes_analytics";
import { WordsPerMinuteCalculator } from "./libs/words_per_minute_calculator";
import { WordsPerMinuteStatusBar } from "./status_bar/words_per_minute_status_bar";
import { KeystrokCountStatusBar } from "./status_bar/keystroke_count_status_bar";

const keystrokeCountAnalyticsCommandId = "keystrokemanager.keystrokeCountAnalytics";
const mostOftenPressedKeysCommandId = "keystrokemanager.mostOftenPressedKeys";

let wpmStatusBar: WordsPerMinuteStatusBar;
let keystrokeCountStatusBar: KeystrokCountStatusBar;

export function activate({ subscriptions }: vscode.ExtensionContext): void {
  createCommands(subscriptions);
  createStatusBarItems(subscriptions);

  subscriptions.push(vscode.workspace.onDidChangeTextDocument(updateKeystrokes));

  setTimers();
}

function createCommands(subscriptions: any): void {
  subscriptions.push(
    vscode.commands.registerCommand(
      keystrokeCountAnalyticsCommandId,
      keystrokeCountAnalyticsCommand
    )
  );
  subscriptions.push(
    vscode.commands.registerCommand(mostOftenPressedKeysCommandId, mostOftenPressedKeysCommand)
  );
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

function createStatusBarItems(subscriptions: any): void {
  const STATUS_BAR_ITEM_PRIORITY = 101;

  const wpmCalculator = new WordsPerMinuteCalculator(keystrokeRepository);
  const wpmStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    STATUS_BAR_ITEM_PRIORITY
  );
  wpmStatusBarItem.tooltip = "Average words per minute [total]";

  const keystrokeCountStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    STATUS_BAR_ITEM_PRIORITY + 1
  );
  keystrokeCountStatusBarItem.tooltip = "Keystroke count [total]";
  keystrokeCountStatusBarItem.command = keystrokeCountAnalyticsCommandId;

  wpmStatusBar = new WordsPerMinuteStatusBar(wpmCalculator, wpmStatusBarItem);
  keystrokeCountStatusBar = new KeystrokCountStatusBar(
    keystrokeRepository,
    keystrokeCountStatusBarItem
  );

  subscriptions.push(wpmStatusBar);
  subscriptions.push(keystrokeCountStatusBar);
}

function updateKeystrokes(event: vscode.TextDocumentChangeEvent): void {
  if (isValidChangedContent(event)) {
    keystrokeCountStatusBar.update();
    collectPressedKey(event);
  }
}

function setTimers(): void {
  setInterval(() => {
    wpmStatusBar.update();

    keystrokeRepository.second.reset();
  }, SECOND_AS_MILLISECONDS);
  setInterval(() => {
    keystrokeRepository.minute.reset();
  }, MINUTE_AS_MILLISECONDS);
  setInterval(() => {
    keystrokeRepository.hour.reset();
  }, HOUR_AS_MILLISECONDS);
  setInterval(() => {
    keystrokeRepository.day.reset();
  }, DAY_AS_MILLISECONDS);
  setInterval(() => {
    keystrokeRepository.week.reset();
  }, WEEK_AS_MILLISECONDS);
  setLongInterval(() => {
    keystrokeRepository.month.reset();
  }, MONTH_AS_MILLISECONDS);
  setLongInterval(() => {
    keystrokeRepository.year.reset();
  }, YEAR_AS_MILLISECONDS);
}
