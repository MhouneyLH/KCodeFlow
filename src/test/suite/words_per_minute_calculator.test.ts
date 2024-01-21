import * as assert from "assert";
import { KeystrokeRepository } from "../../libs/keystroke_repository";
import { WordsPerMinuteCalculator } from "../../libs/words_per_minute_calculator";
import { MINUTE_IN_MS, SECOND_IN_MS } from "../../libs/constants";
import { Keystroke } from "../../libs/keystroke";
import { TestUtils } from "../test_utils";

suite("WordsPerMinuteCalculator Test Suite", () => {
  let repository: KeystrokeRepository;
  let calculator: WordsPerMinuteCalculator;

  setup(() => {
    repository = KeystrokeRepository.getInstance();
    calculator = new WordsPerMinuteCalculator(repository);
  });

  teardown(() => {
    repository.allKeystrokes = [];
    repository = null as any;
    calculator = null as any;
  });

  suite("getAverageWordsPerMinute()", () => {
    test("Returns 0 wpm when no key is pressed", () => {
      const wpm = calculator.getAverageWordsPerMinute();
      assert.strictEqual(wpm, 0);
    });

    test("Returns 0.2 wpm when only 1 key is pressed 1 minute (5 keys = 1 word)", () => {
      const now = Date.now();
      const oneMinuteBefore: number = now - MINUTE_IN_MS;

      repository.addKeystroke("a", oneMinuteBefore);

      const wpm = calculator.getAverageWordsPerMinute();
      const roundedOn1Decimal = Math.round(wpm * 10) / 10;
      assert.strictEqual(roundedOn1Decimal, 0.2);
    });

    test("Returns 60 wpm when 300 keys are pressed in 1 minute (5 keys = 1 word)", () => {
      const now = Date.now();
      const oneMinuteBefore: number = now - MINUTE_IN_MS;

      TestUtils.generateKeystrokesWithIncreasingTimestamps(
        repository,
        new Keystroke("a", oneMinuteBefore),
        300
      );

      const wpm = calculator.getAverageWordsPerMinute();
      assert.strictEqual(Math.round(wpm), 60);
    });

    test("Returns 60 wpm when 600 keys are pressed in 2 minutes (5 keys = 1 word)", () => {
      const now = Date.now();
      const twoMinutesBefore: number = now - 2 * MINUTE_IN_MS;

      TestUtils.generateKeystrokesWithIncreasingTimestamps(
        repository,
        new Keystroke("a", twoMinutesBefore),
        600,
        2 * MINUTE_IN_MS
      );

      const wpm = calculator.getAverageWordsPerMinute();
      assert.strictEqual(Math.round(wpm), 60);
    });

    test("Returns 60 wpm when 450 keys are pressed in 1 minute and 30 seconds (5 keys = 1 word)", () => {
      const now = Date.now();
      const oneAndAHalfMinutesBefore: number = now - 1.5 * MINUTE_IN_MS;

      TestUtils.generateKeystrokesWithIncreasingTimestamps(
        repository,
        new Keystroke("a", oneAndAHalfMinutesBefore),
        450,
        1.5 * MINUTE_IN_MS
      );

      const wpm = calculator.getAverageWordsPerMinute();
      assert.strictEqual(Math.round(wpm), 60);
    });

    test("Returns 60 wpm when 150 keys are pressed in 30 seconds (5 keys = 1 word)", () => {
      const now = Date.now();
      const thirtySecondsBefore: number = now - 0.5 * MINUTE_IN_MS;

      TestUtils.generateKeystrokesWithIncreasingTimestamps(
        repository,
        new Keystroke("a", thirtySecondsBefore),
        150,
        0.5 * MINUTE_IN_MS
      );

      const wpm = calculator.getAverageWordsPerMinute();
      assert.strictEqual(Math.round(wpm), 60);
    });

    test("Returns 60 wpm when user is AFK after pressed 300 keys in 1 minute (5 keys = 1 word)", () => {
      const now = Date.now();
      const oneMinuteBefore: number = now - MINUTE_IN_MS;
      const fiveSecondsBefore: number = now - 5 * SECOND_IN_MS;

      TestUtils.generateKeystrokesWithIncreasingTimestamps(
        repository,
        new Keystroke("a", oneMinuteBefore),
        299,
        MINUTE_IN_MS - 5 * SECOND_IN_MS
      );

      repository.addKeystroke("a", fiveSecondsBefore);

      const wpm = calculator.getAverageWordsPerMinute();
      assert.strictEqual(Math.round(wpm), 60);
    });

    test("The user presses 300 keystrokes in 1 minute. Then he is afk for 10 seconds. After that he presses 150 keystrokes in 30 seconds. It should return about 57 wpm.", () => {
      // Calculation:
      // Total "active time" (with the AFK_TIME_IN_MS) is also counted = 1 minute and 35 seconds = 95 seconds
      // 300 + 150 = 450 keys in 95 seconds
      // normal for 90 seconds without being AFK = 450 / 90 = 5 keys per second = 60wpm
      // with AFK time = 450 / 95 = 4.73684210526 keys per second = 56.8421052632wpm

      const now = Date.now();
      const oneMinuteAnd40SecondsBefore: number = now - MINUTE_IN_MS - 40 * SECOND_IN_MS;
      const thirtySecondsBefore: number = now - 30 * SECOND_IN_MS; // afk time ends

      TestUtils.generateKeystrokesWithIncreasingTimestamps(
        repository,
        new Keystroke("a", oneMinuteAnd40SecondsBefore),
        300,
        MINUTE_IN_MS
      );

      TestUtils.generateKeystrokesWithIncreasingTimestamps(
        repository,
        new Keystroke("a", thirtySecondsBefore),
        150,
        30 * SECOND_IN_MS
      );

      const wpm = calculator.getAverageWordsPerMinute();
      assert.strictEqual(Math.round(wpm), 57);
    });
  });
});
