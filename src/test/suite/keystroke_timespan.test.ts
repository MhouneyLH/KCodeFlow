import * as assert from "assert";
import { KeystrokeTimeSpan } from "../../libs/keystroke_timespan";

suite("KeystrokeTimeSpan Test Suite", () => {
  let timeSpan: KeystrokeTimeSpan;

  setup(() => {
    timeSpan = new KeystrokeTimeSpan();
  });

  test("Initial count is 0", () => {
    assert.strictEqual(timeSpan.count, 0);
  });

  test("Initial pressedKeys is empty", () => {
    assert.strictEqual(timeSpan.pressedKeys.size, 0);
  });

  test("AddPressedKey() for 'a' once, so the count is 1", () => {
    timeSpan.addPressedKey("a");

    assert.strictEqual(timeSpan.count, 1);
  });

  test("AddPressedKey() for 'a' once, so the count for the key 'a' is 1 and only 1 element is in the map", () => {
    timeSpan.addPressedKey("a");

    assert.strictEqual(timeSpan.pressedKeys.size, 1);
    assert.strictEqual(timeSpan.pressedKeys.get("a"), 1);
  });

  test("AddPressedKey() for 'a' twice, so the count for the key 'a' is 2 and only 1 element is in the map", () => {
    timeSpan.addPressedKey("a");
    timeSpan.addPressedKey("a");

    assert.strictEqual(timeSpan.pressedKeys.size, 1);
    assert.strictEqual(timeSpan.pressedKeys.get("a"), 2);
  });

  test("AddPressedKey() for 'a' once and 'b' once, so the count for the key 'a' and 'b' is 1 and 2 elements are in the map", () => {
    timeSpan.addPressedKey("a");
    timeSpan.addPressedKey("b");

    assert.strictEqual(timeSpan.pressedKeys.size, 2);
    assert.strictEqual(timeSpan.pressedKeys.get("a"), 1);
    assert.strictEqual(timeSpan.pressedKeys.get("b"), 1);
  });

  test("reset() clears all elements in the map", () => {
    timeSpan.addPressedKey("a");
    timeSpan.addPressedKey("b");
    timeSpan.reset();

    assert.strictEqual(timeSpan.pressedKeys.size, 0);
  });
});
