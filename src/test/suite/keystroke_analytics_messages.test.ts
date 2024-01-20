import * as assert from "assert";
import { KeystrokeRepository } from "../../libs/keystroke_repository";
import {
  getKeystrokeCountAnalyticsMessage,
  getThreeMostOftenUsedKeystrokesOfAlltimeMessage,
} from "../../libs/keystroke_analytics_messages";

suite("KeystrokeAnalyticsMessages Test Suite", () => {
  let repository: KeystrokeRepository;

  setup(() => {
    repository = KeystrokeRepository.getInstance();
  });

  teardown(() => {
    repository.allKeystrokes = [];
    repository = null as any;
  });

  test("getKeystrokeCountAnalyticsMessage() returns the correct message", () => {
    repository.addKeystroke("a", Date.now());

    const expected =
      /😊 (.*)! You collected so far 1 keystrokes in total. 1 of them this year, 1 this month, 1 this week, 1 today, 1 this hour and 1 this minute!/;
    const actual: string = getKeystrokeCountAnalyticsMessage();

    assert.match(actual, expected);
  });

  test("getThreeMostOftenUsedKeystrokesOfAlltimeMessage() returns the correct message", () => {
    repository.addKeystroke("a", Date.now());
    repository.addKeystroke("a", Date.now());
    repository.addKeystroke("a", Date.now());
    repository.addKeystroke("a", Date.now());
    repository.addKeystroke("b", Date.now());
    repository.addKeystroke("b", Date.now());
    repository.addKeystroke("b", Date.now());
    repository.addKeystroke("c", Date.now());
    repository.addKeystroke("c", Date.now());
    repository.addKeystroke("d", Date.now());

    const expected: string = "You pressed 🥇 'a' 4x, 🥈 'b' 3x, 🥉 'c' 2x!";
    const actual: string = getThreeMostOftenUsedKeystrokesOfAlltimeMessage();

    assert.strictEqual(actual, expected);
  });

  test("getThreeMostOftenUsedKeystrokesOfAlltimeMessage() returns the correct message when there is only one pressed key", () => {
    repository.addKeystroke("a", Date.now());

    const expected: string = "You pressed 🥇 'a' 1x!";
    const actual: string = getThreeMostOftenUsedKeystrokesOfAlltimeMessage();

    assert.strictEqual(actual, expected);
  });

  test("getThreeMostOftenUsedKeystrokesOfAlltimeMessage() returns the correct message when there are less than 3 pressed keys", () => {
    repository.addKeystroke("a", Date.now());
    repository.addKeystroke("a", Date.now());
    repository.addKeystroke("b", Date.now());

    const expected: string = "You pressed 🥇 'a' 2x, 🥈 'b' 1x!";
    const actual: string = getThreeMostOftenUsedKeystrokesOfAlltimeMessage();

    assert.strictEqual(actual, expected);
  });

  test("getThreeMostOftenUsedKeystrokesOfAlltimeMessage() returns the correct message when there are no pressed keys", () => {
    const expected: string = "You pressed no keys so far!";
    const actual: string = getThreeMostOftenUsedKeystrokesOfAlltimeMessage();

    assert.strictEqual(actual, expected);
  });
});
