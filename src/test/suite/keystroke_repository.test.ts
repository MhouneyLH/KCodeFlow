import * as assert from "assert";
import { KeystrokeRepository } from "../../libs/keystroke_repository";
import { Keystroke } from "../../libs/keystroke";

suite("KeystrokeRepository Test Suite", () => {
  let repository: KeystrokeRepository;

  setup(() => {
    repository = KeystrokeRepository.getInstance();
  });

  teardown(() => {
    repository.allKeystrokes = [];
    repository = null as any;
  });

  test("getInstance() returns the same instance", () => {
    assert.strictEqual(repository, KeystrokeRepository.getInstance());
  });

  test("Initial count is 0", () => {
    assert.strictEqual(repository.allKeystrokeCount(), 0);
  });

  test("addKeystroke() adds the keystroke to allKeystrokes", () => {
    repository.addKeystroke("a", 0);

    assert.strictEqual(repository.allKeystrokeCount(), 1);
    assert.deepStrictEqual(repository.getLastKeystroke(), new Keystroke("a", 0));
  });

  test("getFirstKeystroke() returns the first keystroke", () => {
    repository.addKeystroke("a", 0);
    repository.addKeystroke("b", 0);

    assert.strictEqual(repository.getFirstKeystroke().key, "a");
  });

  test("getLastKeystroke() returns the last keystroke", () => {
    repository.addKeystroke("a", 0);
    repository.addKeystroke("b", 0);

    assert.strictEqual(repository.getLastKeystroke().key, "b");
  });

  test("allKeystrokeCount() returns the correct count", () => {
    repository.addKeystroke("a", 0);
    repository.addKeystroke("b", 0);
    repository.addKeystroke("c", 0);

    assert.strictEqual(repository.allKeystrokeCount(), 3);
  });

  test("yearKeystrokeCount() returns the correct count", () => {
    repository.addKeystroke("a", Date.now());

    assert.strictEqual(repository.yearKeystrokeCount(), 1);
  });

  test("monthKeystrokeCount() returns the correct count", () => {
    repository.addKeystroke("a", Date.now());

    assert.strictEqual(repository.monthKeystrokeCount(), 1);
  });

  test("weekKeystrokeCount() returns the correct count", () => {
    repository.addKeystroke("a", Date.now());

    assert.strictEqual(repository.weekKeystrokeCount(), 1);
  });

  test("dayKeystrokeCount() returns the correct count", () => {
    repository.addKeystroke("a", Date.now());

    assert.strictEqual(repository.dayKeystrokeCount(), 1);
  });

  test("hourKeystrokeCount() returns the correct count", () => {
    repository.addKeystroke("a", Date.now());

    assert.strictEqual(repository.hourKeystrokeCount(), 1);
  });

  test("minuteKeystrokeCount() returns the correct count", () => {
    repository.addKeystroke("a", Date.now());

    assert.strictEqual(repository.minuteKeystrokeCount(), 1);
  });

  test("keystrokesToMapWithUniqueKeysInDescendingOrder() returns the unique keystrokes for 3x 'a', 2x 'b', 1x 'c' in descending order", () => {
    repository.addKeystroke("a", 0);
    repository.addKeystroke("b", 0);
    repository.addKeystroke("a", 0);
    repository.addKeystroke("a", 0);
    repository.addKeystroke("b", 0);
    repository.addKeystroke("c", 0);

    const expected = new Map<string, number>([
      ["a", 3],
      ["b", 2],
      ["c", 1],
    ]);
    const actual = repository.keystrokesToMapWithUniqueKeysInDescendingOrder();

    assert.deepStrictEqual(actual, expected);
  });

  test("allKeystrokesToJsonArray() returns the correct JSON array", () => {
    repository.addKeystroke("a", 0);
    repository.addKeystroke("b", 0);

    const expected = [
      {
        key: "a",
        timestampInMs: 0,
      },
      {
        key: "b",
        timestampInMs: 0,
      },
    ];
    const actual = repository.allKeystrokesToJsonArray();

    assert.deepStrictEqual(actual, expected);
  });

  test("allKeystrokesFromJsonArray() returns the correct Keystroke array", () => {
    const json = [
      {
        key: "a",
        timestampInMs: 0,
      },
      {
        key: "b",
        timestampInMs: 0,
      },
    ];

    const expected = [new Keystroke("a", 0), new Keystroke("b", 0)];
    const actual = KeystrokeRepository.allKeystrokesFromJsonArray(json);

    assert.deepStrictEqual(actual, expected);
  });
});
