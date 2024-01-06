// import * as assert from "assert";
// import { KeystrokeRepository } from "../../libs/keystroke_repository";
// import { resetKeystrokeRepository } from "../test_utils";
// import {
//   getKeystrokeCountAnalyticsMessage,
//   getThreeMostOftenpressedKeysInDescendingOrderMessage,
// } from "../../libs/keystroke_analytics_messages";

// suite("KeystrokeAnalyticsMessages Test Suite", () => {
//   let repository: KeystrokeRepository;

//   setup(() => {
//     repository = KeystrokeRepository.getInstance();
//   });

//   teardown(() => {
//     resetKeystrokeRepository(repository);
//   });

//   test("getKeystrokeCountAnalyticsMessage() returns the correct message", () => {
//     repository.addPressedKeyToAll("a");
//     const expectedPattern =
//       /😊 (.*)! You collected so far 1 keystrokes in total. 1 of them this year, 1 this month, 1 this week, 1 today, 1 this hour and 1 this minute!/;

//     const message: string = getKeystrokeCountAnalyticsMessage();

//     assert.match(message, expectedPattern);
//   });

//   test("getThreeMostOftenpressedKeysInDescendingOrderMessage() returns the correct message", () => {
//     repository.addPressedKeyToAll("a");
//     repository.addPressedKeyToAll("a");
//     repository.addPressedKeyToAll("a");
//     repository.addPressedKeyToAll("a");
//     repository.addPressedKeyToAll("b");
//     repository.addPressedKeyToAll("b");
//     repository.addPressedKeyToAll("b");
//     repository.addPressedKeyToAll("c");
//     repository.addPressedKeyToAll("c");
//     repository.addPressedKeyToAll("d");

//     const message: string = getThreeMostOftenpressedKeysInDescendingOrderMessage();

//     assert.strictEqual(message, `You pressed 🥇 'a' 4x, 🥈 'b' 3x, 🥉 'c' 2x!`);
//   });

//   test("getThreeMostOftenpressedKeysInDescendingOrderMessage() returns the correct message when there is only one pressed key", () => {
//     repository.addPressedKeyToAll("a");

//     const message: string = getThreeMostOftenpressedKeysInDescendingOrderMessage();

//     assert.strictEqual(message, `You pressed 🥇 'a' 1x!`);
//   });

//   test("getThreeMostOftenpressedKeysInDescendingOrderMessage() returns the correct message when there are less than 3 pressed keys", () => {
//     repository.addPressedKeyToAll("a");
//     repository.addPressedKeyToAll("a");
//     repository.addPressedKeyToAll("b");

//     const message: string = getThreeMostOftenpressedKeysInDescendingOrderMessage();

//     assert.strictEqual(message, `You pressed 🥇 'a' 2x, 🥈 'b' 1x!`);
//   });

//   test("getThreeMostOftenpressedKeysInDescendingOrderMessage() returns the correct message when there are no pressed keys", () => {
//     const message: string = getThreeMostOftenpressedKeysInDescendingOrderMessage();

//     assert.strictEqual(message, "You pressed no keys so far!");
//   });

//   test("getThreeMostOftenpressedKeysInDescendingOrderMessage() returns the word 'Enter' when the key 'Enter' got pressed", () => {
//     repository.addPressedKeyToAll("\r\n");

//     const message: string = getThreeMostOftenpressedKeysInDescendingOrderMessage();

//     assert.strictEqual(message, `You pressed 🥇 'Enter' 1x!`);
//   });

//   test("getThreeMostOftenpressedKeysInDescendingOrderMessage() returns the word 'Tab' when the key 'Tab' got pressed", () => {
//     repository.addPressedKeyToAll("    ");

//     const message: string = getThreeMostOftenpressedKeysInDescendingOrderMessage();

//     assert.strictEqual(message, `You pressed 🥇 'Tab' 1x!`);
//   });

//   test("getThreeMostOftenpressedKeysInDescendingOrderMessage() returns the word 'Space' when the key 'Space' got pressed", () => {
//     repository.addPressedKeyToAll(" ");

//     const message: string = getThreeMostOftenpressedKeysInDescendingOrderMessage();

//     assert.strictEqual(message, `You pressed 🥇 'Space' 1x!`);
//   });

//   test("getThreeMostOftenpressedKeysInDescendingOrderMessage() returns the word 'Backspace' when the key 'Backspace' got pressed", () => {
//     repository.addPressedKeyToAll("");

//     const message: string = getThreeMostOftenpressedKeysInDescendingOrderMessage();

//     assert.strictEqual(message, `You pressed 🥇 'Backspace' 1x!`);
//   });
// });
