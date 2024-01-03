import * as assert from "assert";
import { KeystrokeTimeSpan } from "../../libs/keystroke_timespan";

suite("KeystrokeTimeSpan Test Suite", () => {
  let timeSpan: KeystrokeTimeSpan;

  setup(() => {
    timeSpan = new KeystrokeTimeSpan(0);
  });

  test("Initial count is 0", () => {
    assert.strictEqual(timeSpan.count, 0);
  });

  test("Increment increases count by 1", () => {
    timeSpan.increment();
    assert.strictEqual(timeSpan.count, 1);
  });

  test("Reset sets count to 0", () => {
    timeSpan.increment();
    timeSpan.reset();
    assert.strictEqual(timeSpan.count, 0);
  });
});
