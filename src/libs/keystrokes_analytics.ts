import * as vscode from "vscode";

import { FIRST_ICON, SECOND_ICON, THIRD_ICON } from "../constants";
import { KeystrokeRepository } from "./keystroke_repository";

export const keystrokeRepository = KeystrokeRepository.getInstance();

export function getKeystrokeCountAnalyticsMessage(): string {
  return `You collected so far ${keystrokeRepository.total.count} keystrokes in total.
							   ${keystrokeRepository.year.count} of them this year, 
							   ${keystrokeRepository.month.count} this month, 
							   ${keystrokeRepository.week.count} this week, 
							   ${keystrokeRepository.day.count} today, 
							   ${keystrokeRepository.hour.count} this hour and
							   ${keystrokeRepository.minute.count} this minute!`;
}

export function getMostOftenPressedKeysMessage(pressedKeys: Map<string, number>): string {
  const placementIcons = [FIRST_ICON, SECOND_ICON, THIRD_ICON];
  const messageParts = Array.from(pressedKeys.entries()).map(([key, value], index) => {
    return `${placementIcons[index]} '${key}' ${value} times`;
  });

  return `You pressed ${messageParts.join(", ")}!`;
}

export function collectPressedKey(event: vscode.TextDocumentChangeEvent): void {
  const pressedKey = event.contentChanges[0].text;
  keystrokeRepository.addPressedKeyToAll(pressedKey);
}
