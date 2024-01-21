import * as fs from "fs";
import * as path from "path";

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

  public static getFullFixturePath(fixtureFileName: string): string {
    return path.join(__dirname, "..", "..", "src", "test", "fixtures", fixtureFileName);
  }

  public static readFixture(fixturePath: string): any {
    const fixture = fs.readFileSync(fixturePath, "utf8");
    return JSON.parse(fixture);
  }
}
