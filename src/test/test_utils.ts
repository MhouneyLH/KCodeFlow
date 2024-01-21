import * as fs from "fs";
import * as path from "path";

import { Keystroke } from "../libs/keystroke";
import { KeystrokeRepository } from "../libs/keystroke_repository";
import { MINUTE_AS_MILLISECONDS } from "../libs/constants";

export class TestUtils {
  public static generateKeystrokesWithIncreasingTimestamps(
    repository: KeystrokeRepository,
    keystroke: Keystroke,
    count: number,
    fullTimeInMilliseconds: number = MINUTE_AS_MILLISECONDS
  ): void {
    let timeIterator = keystroke.timestampInMilliseconds;

    for (let i = 0; i < count; i++) {
      repository.addKeystroke(keystroke.key, timeIterator);
      timeIterator += fullTimeInMilliseconds / count;
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
