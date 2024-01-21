import * as assert from "assert";
import { KeystrokeRepository } from "../../libs/keystroke_repository";
import { WordsPerMinuteCalculator } from "../../libs/words_per_minute_calculator";
import { MINUTE_AS_MILLISECONDS, SECOND_AS_MILLISECONDS } from "../../libs/constants";
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
      const oneMinuteBefore: number = now - MINUTE_AS_MILLISECONDS;

      repository.addKeystroke("a", oneMinuteBefore);

      const wpm = calculator.getAverageWordsPerMinute();
      const roundedOn1Decimal = Math.round(wpm * 10) / 10;
      assert.strictEqual(roundedOn1Decimal, 0.2);
    });

    test("Returns 60 wpm when 300 keys are pressed in 1 minute (5 keys = 1 word)", () => {
      const now = Date.now();
      const oneMinuteBefore: number = now - MINUTE_AS_MILLISECONDS;

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
      const twoMinutesBefore: number = now - 2 * MINUTE_AS_MILLISECONDS;

      TestUtils.generateKeystrokesWithIncreasingTimestamps(
        repository,
        new Keystroke("a", twoMinutesBefore),
        600,
        2 * MINUTE_AS_MILLISECONDS
      );

      const wpm = calculator.getAverageWordsPerMinute();
      assert.strictEqual(Math.round(wpm), 60);
    });

    test("Returns 60 wpm when 450 keys are pressed in 1 minute and 30 seconds (5 keys = 1 word)", () => {
      const now = Date.now();
      const oneAndAHalfMinutesBefore: number = now - 1.5 * MINUTE_AS_MILLISECONDS;

      TestUtils.generateKeystrokesWithIncreasingTimestamps(
        repository,
        new Keystroke("a", oneAndAHalfMinutesBefore),
        450,
        1.5 * MINUTE_AS_MILLISECONDS
      );

      const wpm = calculator.getAverageWordsPerMinute();
      assert.strictEqual(Math.round(wpm), 60);
    });

    test("Returns 60 wpm when 150 keys are pressed in 30 seconds (5 keys = 1 word)", () => {
      const now = Date.now();
      const thirtySecondsBefore: number = now - 0.5 * MINUTE_AS_MILLISECONDS;

      TestUtils.generateKeystrokesWithIncreasingTimestamps(
        repository,
        new Keystroke("a", thirtySecondsBefore),
        150,
        0.5 * MINUTE_AS_MILLISECONDS
      );

      const wpm = calculator.getAverageWordsPerMinute();
      assert.strictEqual(Math.round(wpm), 60);
    });
  });
});
