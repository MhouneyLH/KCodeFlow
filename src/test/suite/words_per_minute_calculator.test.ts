import * as assert from "assert";
import { KeystrokeRepository } from "../../libs/keystroke_repository";
import { WordsPerMinuteCalculator } from "../../libs/words_per_minute_calculator";
import { resetKeystrokeRepository } from "../test_utils";

suite("WordsPerMinuteCalculator Test Suite", () => {
  let repository: KeystrokeRepository;
  let calculator: WordsPerMinuteCalculator;

  setup(() => {
    repository = KeystrokeRepository.getInstance();
    calculator = new WordsPerMinuteCalculator(repository);
  });

  teardown(() => {
    resetKeystrokeRepository(repository);
  });

  test("GetAverageWordsPerMinute() returns 0 when no key is pressed", () => {
    const wpm = calculator.getAverageWordsPerMinute();
    assert.strictEqual(wpm, 0);
  });

  test("GetAverageWordsPerMinute() returns 60 when 5 keys are pressed (5 charactes are round about 1 word)", () => {
    repository.incrementAll();
    repository.incrementAll();
    repository.incrementAll();
    repository.incrementAll();
    repository.incrementAll();

    const wpm = calculator.getAverageWordsPerMinute();
    assert.strictEqual(wpm, 60);
  });

  test("GetAverageWordsPerMinute() returns 60 when 5 keys were pressed and at the second time without touching any further keys, it returns 30", () => {
    repository.incrementAll();
    repository.incrementAll();
    repository.incrementAll();
    repository.incrementAll();
    repository.incrementAll();

    const wpm1 = calculator.getAverageWordsPerMinute();
    assert.strictEqual(wpm1, 60);

    const wpm2 = calculator.getAverageWordsPerMinute();
    assert.strictEqual(wpm2, 30);
  });
});
