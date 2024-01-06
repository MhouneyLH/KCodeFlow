// import * as assert from "assert";
// import { KeystrokeTimeSpan } from "../../libs/keystroke";

// suite("KeystrokeTimeSpan Test Suite", () => {
//   let timeSpan: KeystrokeTimeSpan;

//   setup(() => {
//     timeSpan = new KeystrokeTimeSpan();
//   });

//   test("Initial count is 0", () => {
//     assert.strictEqual(timeSpan.count, 0);
//   });

//   test("Initial pressedKeys is empty", () => {
//     assert.strictEqual(timeSpan.pressedKeys.size, 0);
//   });

//   test("When initialized with a map, the count is the sum of the values in the map", () => {
//     const pressedKeys = new Map<string, number>();
//     pressedKeys.set("a", 1);
//     pressedKeys.set("b", 2);
//     pressedKeys.set("c", 3);

//     const timeSpan = new KeystrokeTimeSpan(pressedKeys);

//     assert.strictEqual(timeSpan.count, 6);
//   });

//   test("AddPressedKey() for 'a' once, so the count is 1", () => {
//     timeSpan.addPressedKey("a");

//     assert.strictEqual(timeSpan.count, 1);
//   });

//   test("AddPressedKey() for 'a' once, so the count for the key 'a' is 1 and only 1 element is in the map", () => {
//     timeSpan.addPressedKey("a");

//     assert.strictEqual(timeSpan.pressedKeys.size, 1);
//     assert.strictEqual(timeSpan.pressedKeys.get("a"), 1);
//   });

//   test("AddPressedKey() for 'a' twice, so the count for the key 'a' is 2 and only 1 element is in the map", () => {
//     timeSpan.addPressedKey("a");
//     timeSpan.addPressedKey("a");

//     assert.strictEqual(timeSpan.pressedKeys.size, 1);
//     assert.strictEqual(timeSpan.pressedKeys.get("a"), 2);
//   });

//   test("AddPressedKey() for 'a' once and 'b' once, so the count for the key 'a' and 'b' is 1 and 2 elements are in the map", () => {
//     timeSpan.addPressedKey("a");
//     timeSpan.addPressedKey("b");

//     assert.strictEqual(timeSpan.pressedKeys.size, 2);
//     assert.strictEqual(timeSpan.pressedKeys.get("a"), 1);
//     assert.strictEqual(timeSpan.pressedKeys.get("b"), 1);
//   });

//   test("AddPressedKey() handles special key labels correctly (Enter, Space, Tab, Backspace)", () => {
//     timeSpan.addPressedKey("\r\n");
//     timeSpan.addPressedKey("");
//     timeSpan.addPressedKey("    ");
//     timeSpan.addPressedKey(" ");

//     assert.strictEqual(timeSpan.pressedKeys.size, 4);
//     assert.strictEqual(timeSpan.pressedKeys.get("Enter"), 1);
//     assert.strictEqual(timeSpan.pressedKeys.get("Backspace"), 1);
//     assert.strictEqual(timeSpan.pressedKeys.get("Tab"), 1);
//     assert.strictEqual(timeSpan.pressedKeys.get("Space"), 1);
//   });

//   test("reset() clears all elements in the map", () => {
//     timeSpan.addPressedKey("a");
//     timeSpan.addPressedKey("b");
//     timeSpan.reset();

//     assert.strictEqual(timeSpan.pressedKeys.size, 0);
//   });
// });
