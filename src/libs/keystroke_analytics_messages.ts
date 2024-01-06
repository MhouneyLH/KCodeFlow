import { FIRST_ICON, SECOND_ICON, THIRD_ICON } from "./constants";
import { KeystrokeRepository } from "./keystroke_repository";

export const keystrokeRepository = KeystrokeRepository.getInstance();

export function getKeystrokeCountAnalyticsMessage(): string {
  let message = `😊 ${getPraisingWord()}! `;
  message += `You collected so far ${keystrokeRepository.total.count} keystrokes in total.`;
  message += ` ${keystrokeRepository.year.count} of them this year,`;
  message += ` ${keystrokeRepository.month.count} this month,`;
  message += ` ${keystrokeRepository.week.count} this week,`;
  message += ` ${keystrokeRepository.day.count} today,`;
  message += ` ${keystrokeRepository.hour.count} this hour and`;
  message += ` ${keystrokeRepository.minute.count} this minute!`;

  return message;
}

// randomly generates a praising word based on an array of praising words
function getPraisingWord(): string {
  const WORDS = ["Awesome", "Wonderful", "Great", "Fantastic", "Cool"];
  const randomNumber: number = Math.floor(Math.random() * WORDS.length);

  return WORDS[randomNumber];
}

export function getThreeMostOftenpressedKeysInDescendingOrderMessage(): string {
  if (keystrokeRepository.total.count === 0) {
    return "You pressed no keys so far!";
  }

  const placementIcons = [FIRST_ICON, SECOND_ICON, THIRD_ICON];

  const pressedKeysInDescendingOrder =
    keystrokeRepository.getMostOftenPressedKeysInTotalWithCountInDescendingOrder(
      placementIcons.length
    );

  const messageParts = Array.from(pressedKeysInDescendingOrder.entries()).map(
    ([key, value], index) => {
      return `${placementIcons[index]} '${key}' ${value}x`;
    }
  );

  return `You pressed ${messageParts.join(", ")}!`;
}
