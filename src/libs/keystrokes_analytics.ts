import * as vscode from "vscode";

import { KEYSTROKE_DEFAULT_VALUE, FIRST_ICON, SECOND_ICON, THIRD_ICON } from "../constants";
import { KeystrokeRepository } from "./keystroke_repository";

export const keystrokeRepository = KeystrokeRepository.getInstance();

// message for the keystrokeCountAnalyticsCommand
export function getKeystrokeCountAnalyticsMessage(): string {
  const message = `You collected so far ${keystrokeRepository.total.count} keystrokes in total.
					${keystrokeRepository.year.count} of them this year, 
					${keystrokeRepository.month.count} this month, 
					${keystrokeRepository.week.count} this week, 
					${keystrokeRepository.day.count} today, 
					${keystrokeRepository.hour.count} this hour and
					${keystrokeRepository.minute.count} this minute!`;

  return message;
}

// message for the mostOftenPressedKeysCommand
export function getMostOftenPressedKeysMessage(pressedKeys: Map<string, number>): string {
  var message = "You pressed ";

  const placementIcons = [FIRST_ICON, SECOND_ICON, THIRD_ICON];
  let placement = 1;

  // todo map.iterator

  pressedKeys.forEach((value, key) => {
    message += `${placementIcons[placement]} '${key}' ${value} times `;
    placement++;
  });

  return message.toString();
}

// increments the count of the pressed key
export function collectPressedKey(event: vscode.TextDocumentChangeEvent): void {
  const pressedKey = event.contentChanges[0].text;
  keystrokeRepository.addPressedKeyToAll(pressedKey);
}