import * as assert from "assert";
import { KeystrokeTimeSpan } from "../../libs/keystroke_timespan";

suite("KeystrokeTimeSpan Test Suite", () => {
  let timeSpan: KeystrokeTimeSpan;

  setup(() => {
    timeSpan = new KeystrokeTimeSpan(0);
  });

  suite("count", () => {
    test("Initial count is 0", () => {
      assert.strictEqual(timeSpan.count, 0);
    });

    test("IncrementCount increases count by 1", () => {
      timeSpan.incrementCount();
      assert.strictEqual(timeSpan.count, 1);
    });

    test("ResetCount sets count to 0", () => {
      timeSpan.incrementCount();
      timeSpan.resetCount();
      assert.strictEqual(timeSpan.count, 0);
    });
  });

  suite("pressedKeys", () => {
    test("Initial pressedKeys is empty", () => {
      assert.strictEqual(timeSpan.pressedKeys.size, 0);
    });

    test("Setting pressed keys a, b, c to value 1, 2, 3 and getting them", () => {
      const pressedKeys = new Map<string, number>();
      pressedKeys.set("a", 1);
      pressedKeys.set("b", 2);
      pressedKeys.set("c", 3);

      timeSpan.pressedKeys = pressedKeys;

      assert.strictEqual(timeSpan.pressedKeys.size, 3);
      assert.strictEqual(timeSpan.pressedKeys.get("a"), 1);
      assert.strictEqual(timeSpan.pressedKeys.get("b"), 2);
      assert.strictEqual(timeSpan.pressedKeys.get("c"), 3);
    });
  });
});
