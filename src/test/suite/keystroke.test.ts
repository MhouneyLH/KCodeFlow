import * as assert from "assert";
import {
  BACKSPACE_CHARACTER,
  ENTER_CHARACTER,
  Keystroke,
  SPACE_CHARACTER,
  TAB_CHARACTER,
} from "../../libs/keystroke";

suite("Keystroke Test Suite", () => {
  suite("getCorrectKeyLabel", () => {
    test("Enter character is correctly converted to 'Enter'", () => {
      const keystroke = new Keystroke(ENTER_CHARACTER, 0);

      assert.strictEqual(keystroke.key, "Enter");
    });

    test("Backspace character is correctly converted to 'Backspace'", () => {
      const keystroke = new Keystroke(BACKSPACE_CHARACTER, 0);

      assert.strictEqual(keystroke.key, "Backspace");
    });

    test("Tab character is correctly converted to 'Tab'", () => {
      const keystroke = new Keystroke(TAB_CHARACTER, 0);

      assert.strictEqual(keystroke.key, "Tab");
    });

    test("Space character is correctly converted to 'Space'", () => {
      const keystroke = new Keystroke(SPACE_CHARACTER, 0);

      assert.strictEqual(keystroke.key, "Space");
    });
  });

  suite("toJsonObject", () => {
    test("ts-object with key 'a' and timestamp '0' returns the correct jsonObject", () => {
      const keystroke = new Keystroke("a", 0);
      const jsonObject = keystroke.toJsonObject();

      assert.strictEqual(jsonObject["key"], "a");
      assert.strictEqual(jsonObject["timestampInMilliseconds"], 0);
    });
  });

  suite("fromJsonObject", () => {
    test("jsonObject with key 'a' and timestamp '0' returns the correct ts-object", () => {
      const jsonObject = {
        key: "a",
        timestampInMilliseconds: 0,
      };
      const keystroke = Keystroke.fromJsonObject(jsonObject);

      assert.strictEqual(keystroke.key, "a");
      assert.strictEqual(keystroke.timestampInMilliseconds, 0);
    });
  });
});
