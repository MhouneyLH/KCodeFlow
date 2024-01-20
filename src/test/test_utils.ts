import { Keystroke } from "../libs/keystroke";
import { KeystrokeRepository } from "../libs/keystroke_repository";

export class TestUtils {
  public static generateIdenticalKeystrokes(
    repository: KeystrokeRepository,
    keystroke: Keystroke,
    count: number
  ): void {
    for (let i = 0; i < count; i++) {
      repository.addKeystroke(keystroke.key, keystroke.timestampInMilliseconds);
    }
  }
}
