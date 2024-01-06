import * as vscode from "vscode";

import { SECOND_AS_MILLISECONDS } from "./libs/constants";
import { getPressedKey, isValidChangedContent } from "./libs/utils";
import {
  keystrokeRepository,
  getKeystrokeCountAnalyticsMessage,
  getThreeMostOftenUsedKeystrokesOfAlltimeMessage,
} from "./libs/keystroke_analytics_messages";
import { WordsPerMinuteCalculator } from "./libs/words_per_minute_calculator";
import { WordsPerMinuteStatusBar } from "./status_bar/words_per_minute_status_bar";
import { KeystrokCountStatusBar } from "./status_bar/keystroke_count_status_bar";
import { ConfigurationLoader } from "./libs/configuration_loader";

const keystrokeCountAnalyticsCommandId = "keystrokemanager.keystrokeCountAnalytics";
const mostOftenPressedKeysCommandId = "keystrokemanager.mostOftenPressedKeys";

const configurationLoader = ConfigurationLoader.getInstance(keystrokeRepository);

let keystrokeCountStatusBar: KeystrokCountStatusBar;
let wpmStatusBar: WordsPerMinuteStatusBar;

export function activate({ subscriptions }: vscode.ExtensionContext): void {
  configurationLoader.load();

  createCommands(subscriptions);
  createStatusBarItems(subscriptions);
  subscriptions.push(vscode.workspace.onDidChangeTextDocument(updateKeystrokes));
}

export function deactivate(): void {
  configurationLoader.save();
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
  const message: string = getKeystrokeCountAnalyticsMessage();
  vscode.window.showInformationMessage(message);
}

function mostOftenPressedKeysCommand(): void {
  const message: string = getThreeMostOftenUsedKeystrokesOfAlltimeMessage();
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

  setInterval(() => {
    wpmStatusBar.update();
  }, SECOND_AS_MILLISECONDS);
}

function updateKeystrokes(event: vscode.TextDocumentChangeEvent): void {
  if (isValidChangedContent(event)) {
    keystrokeCountStatusBar.update();

    const pressedKey: string = getPressedKey(event);
    keystrokeRepository.addPressedKey(pressedKey, Date.now());
  }
}
