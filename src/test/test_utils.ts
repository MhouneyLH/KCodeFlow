import { KeystrokeRepository } from "../libs/keystroke_repository";

export function resetKeystrokeRepository(repository: KeystrokeRepository): void {
  repository.second.reset();
  repository.minute.reset();
  repository.hour.reset();
  repository.day.reset();
  repository.week.reset();
  repository.month.reset();
  repository.year.reset();
  repository.total.reset();
}
