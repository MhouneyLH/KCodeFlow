import { FIRST_ICON, SECOND_ICON, THIRD_ICON } from "./constants";
import { KeystrokeRepository } from "./keystroke_repository";

export const keystrokeRepository = KeystrokeRepository.getInstance();

export function getKeystrokeCountAnalyticsMessage(): string {
  let message = `😊 ${getPraisingWord()}! `;
  message += `You collected so far ${keystrokeRepository.allKeystrokeCount()} keystrokes in total.`;
  message += ` ${keystrokeRepository.yearKeystrokeCount()} of them this year,`;
  message += ` ${keystrokeRepository.monthKeystrokeCount()} this month,`;
  message += ` ${keystrokeRepository.weekKeystrokeCount()} this week,`;
  message += ` ${keystrokeRepository.dayKeystrokeCount()} today,`;
  message += ` ${keystrokeRepository.hourKeystrokeCount()} this hour and`;
  message += ` ${keystrokeRepository.minuteKeystrokeCount()} this minute!`;

  return message;
}

// randomly generates a praising word based on an array of praising words
function getPraisingWord(): string {
  const WORDS = ["Awesome", "Wonderful", "Great", "Fantastic", "Cool"];
  const randomNumber: number = Math.floor(Math.random() * WORDS.length);

  return WORDS[randomNumber];
}

export function getThreeMostOftenUsedKeystrokesOfAlltimeMessage(): string {
  if (keystrokeRepository.allKeystrokeCount() === 0) {
    return "You pressed no keys so far!";
  }

  let keystrokesInDescendingOrder =
    keystrokeRepository.keystrokesToMapWithUniqueKeysInDescendingOrder();
  const slicedKeystrokesInDescendingOrder = new Map<string, number>(
    Array.from(keystrokesInDescendingOrder.entries()).slice(0, 3)
  );

  const placementIcons = [FIRST_ICON, SECOND_ICON, THIRD_ICON];
  const messageParts = Array.from(slicedKeystrokesInDescendingOrder.entries()).map(
    ([key, value], index) => {
      return `${placementIcons[index]} '${key}' ${value}x`;
    }
  );

  return `You pressed ${messageParts.join(", ")}!`;
}
