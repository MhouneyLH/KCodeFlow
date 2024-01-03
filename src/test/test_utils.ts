import { KeystrokeRepository } from "../libs/keystroke_repository";

export function resetKeystrokeRepository(repository: KeystrokeRepository): void {
  repository.second.resetCount();
  repository.minute.resetCount();
  repository.hour.resetCount();
  repository.day.resetCount();
  repository.week.resetCount();
  repository.month.resetCount();
  repository.year.resetCount();
  repository.total.resetCount();

  repository.second.resetPressedKeys();
  repository.minute.resetPressedKeys();
  repository.hour.resetPressedKeys();
  repository.day.resetPressedKeys();
  repository.week.resetPressedKeys();
  repository.month.resetPressedKeys();
  repository.year.resetPressedKeys();
  repository.total.resetPressedKeys();
}
