import * as vscode from "vscode";

import {
  SECOND_AS_MILLISECONDS,
  MINUTE_AS_MILLISECONDS,
  HOUR_AS_MILLISECONDS,
  DAY_AS_MILLISECONDS,
  WEEK_AS_MILLISECONDS,
  MONTH_AS_MILLISECONDS,
  YEAR_AS_MILLISECONDS,
} from "./libs/constants";
import { getPressedKey, isValidChangedContent, setLongInterval } from "./libs/utils";
import {
  keystrokeRepository,
  getKeystrokeCountAnalyticsMessage,
  getThreeMostOftenpressedKeysInDescendingOrderMessage,
} from "./libs/keystroke_analytics_messages";
import { WordsPerMinuteCalculator } from "./libs/words_per_minute_calculator";
import { WordsPerMinuteStatusBar } from "./status_bar/words_per_minute_status_bar";
import { KeystrokCountStatusBar } from "./status_bar/keystroke_count_status_bar";
import { ConfigurationLoader } from "./libs/configuration_loader";

const keystrokeCountAnalyticsCommandId = "keystrokemanager.keystrokeCountAnalytics";
const mostOftenPressedKeysCommandId = "keystrokemanager.mostOftenPressedKeys";

const configurationLoader = ConfigurationLoader.getInstance(keystrokeRepository);

let wpmStatusBar: WordsPerMinuteStatusBar;
let keystrokeCountStatusBar: KeystrokCountStatusBar;

export function activate({ subscriptions }: vscode.ExtensionContext): void {
  configurationLoader.load();

  createCommands(subscriptions);
  createStatusBarItems(subscriptions);

  subscriptions.push(vscode.workspace.onDidChangeTextDocument(updateKeystrokes));

  setTimers();
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
  const message: string = getThreeMostOftenpressedKeysInDescendingOrderMessage();
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

    const pressedKey: string = getPressedKey(event);
    keystrokeRepository.addPressedKeyToAll(pressedKey);
  }
}

//! test7 is working :))))
const test7 = new Date().setSeconds(new Date().getSeconds() + 1) - Date.now();
//! Wie speichern?
// Startzeitpunkt speichern (jedes mal, wenn resettet wird, muss der ja wieder neu gesetzt werden)
// Aktueller Zeitpunkt speichern (jedes mal, wenn geschlossen wird oder so, sollte der gespeichert werden)
// damit kann man dann die Differenz berechnen und kommt auf die Zeit, die vergangen ist (= Aktuell - Start)
// wenn das bspw. kleiner als new Date.setYears(new Date().getYear() + 1) ist, dann ist es noch im Jahr
// wenn das bspw. kleiner als new Date.setMonths(new Date().getMonth() + 1) ist, dann ist es noch im Monat
// wenn das bspw. kleiner als new Date.setDays(new Date().getDay() + 1) ist, dann ist es noch im Tag
// wenn das bspw. kleiner als new Date.setHours(new Date().getHours() + 1) ist, dann ist es noch in der Stunde
// wenn das bspw. kleiner als new Date.setMinutes(new Date().getMinutes() + 1) ist, dann ist es noch in der Minute
// wenn das bspw. kleiner als new Date.setSeconds(new Date().getSeconds() + 1) ist, dann ist es noch in der Sekunde
// sonst ist es schon in der nächsten Sekunde und es kann bspw. eine Meldung angezeigt werden mit einer Mini-Auswertung

//! Was soll noch reinkommen?
// Speichern der Daten
// CICD-Pipeline
// Publishing auf dem Marketplace

console.log(test7);

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
    const test: Date = new Date();
  }, YEAR_AS_MILLISECONDS);
}
