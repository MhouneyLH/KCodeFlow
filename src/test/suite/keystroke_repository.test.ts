import * as assert from "assert";
import { KeystrokeRepository } from "../../libs/keystroke_repository";

suite("KeystrokeRepository Test Suite", () => {
  let repository: KeystrokeRepository;

  setup(() => {
    repository = KeystrokeRepository.getInstance();
  });

  teardown(() => {
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
  });

  test("getInstance() returns the same instance", () => {
    assert.strictEqual(repository, KeystrokeRepository.getInstance());
  });

  test("Initial count is 0", () => {
    assert.strictEqual(repository.second.count, 0);
    assert.strictEqual(repository.minute.count, 0);
    assert.strictEqual(repository.hour.count, 0);
    assert.strictEqual(repository.day.count, 0);
    assert.strictEqual(repository.week.count, 0);
    assert.strictEqual(repository.month.count, 0);
    assert.strictEqual(repository.year.count, 0);
    assert.strictEqual(repository.total.count, 0);
  });

  test("IncrementAll() increases count by 1 for every timeSpan", () => {
    repository.incrementAll();

    assert.strictEqual(repository.second.count, 1);
    assert.strictEqual(repository.minute.count, 1);
    assert.strictEqual(repository.hour.count, 1);
    assert.strictEqual(repository.day.count, 1);
    assert.strictEqual(repository.week.count, 1);
    assert.strictEqual(repository.month.count, 1);
    assert.strictEqual(repository.year.count, 1);
    assert.strictEqual(repository.total.count, 1);
  });

  test("AddPressedKeyToAll() adds pressedKey to every timeSpan", () => {
    repository.addPressedKeyToAll("a");

    assert.strictEqual(repository.second.pressedKeys.get("a"), 1);
    assert.strictEqual(repository.minute.pressedKeys.get("a"), 1);
    assert.strictEqual(repository.hour.pressedKeys.get("a"), 1);
    assert.strictEqual(repository.day.pressedKeys.get("a"), 1);
    assert.strictEqual(repository.week.pressedKeys.get("a"), 1);
    assert.strictEqual(repository.month.pressedKeys.get("a"), 1);
    assert.strictEqual(repository.year.pressedKeys.get("a"), 1);
    assert.strictEqual(repository.total.pressedKeys.get("a"), 1);
  });

  test("getMostOftenPressedKeysInTotalWithCountInDescendingOrder() returns the pressedKeys sorted descending", () => {
    repository.addPressedKeyToAll("a");
    repository.addPressedKeyToAll("b");
    repository.addPressedKeyToAll("a");
    repository.addPressedKeyToAll("b");
    repository.addPressedKeyToAll("a");
    repository.addPressedKeyToAll("c");

    // idk why, but for comparison the Map needs to be converted to an array
    const mostOftenPressedKeys = Array.from(
      repository.getMostOftenPressedKeysInTotalWithCountInDescendingOrder()
    );
    const expected = Array.from(
      new Map<string, number>([
        ["a", 3],
        ["b", 2],
        ["c", 1],
      ])
    );

    assert.deepStrictEqual(mostOftenPressedKeys, expected);
  });
});
