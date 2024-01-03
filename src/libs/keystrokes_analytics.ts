import * as vscode from "vscode";

import { KEYSTROKE_DEFAULT_VALUE, FIRST_ICON, SECOND_ICON, THIRD_ICON } from "../constants";
import { KeystrokeRepository } from "./keystroke_repository";

export const keystrokeRepository = KeystrokeRepository.getInstance();
const pressedKeys = new Map<string, number>();

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
export function getMostOftenPressedKeysMessage(keyMap: Map<string, number>): string {
  var message = "You pressed ";

  const placementIcons = [FIRST_ICON, SECOND_ICON, THIRD_ICON];
  let placement = 1;

  // todo map.iterator

  keyMap.forEach((value, key) => {
    message += `${placementIcons[placement]} '${key}' ${value} times `;
    placement++;
  });

  return message.toString();
}

// increments the count of the pressed key
export function collectPressedKey(event: vscode.TextDocumentChangeEvent): void {
  const pressedKey = event.contentChanges[0].text;
  const prevCount = pressedKeys.get(pressedKey) ?? KEYSTROKE_DEFAULT_VALUE;

  pressedKeys.set(pressedKey, prevCount + 1);
}

// takes the 3 keys, that have the highest count and returns them
export function getThreeMostOftenPressedKeys(): Map<string, number> {
  const pressedKeysSortedDescending = new Map(
    [...pressedKeys].sort((prev, curr) => prev[1] - curr[1]).reverse()
  );

  const targetSize = 3;
  const mostOftenPressedKeys = new Map([...pressedKeysSortedDescending].slice(0, targetSize));

  return mostOftenPressedKeys;
}
