import * as assert from "assert";
import { ConfigurationLoader } from "../../libs/configuration_loader";
import { TestUtils } from "../test_utils";

const correctFixtureFilePath: string =
  "D:\\git\\vscode_keystroke_manager\\src\\test\\fixtures\\correct_fixture.json";

suite("ConfigurationLoader Test Suite", () => {
  let configLoader: ConfigurationLoader;

  teardown(() => {
    configLoader = null as any;
  });

  test("getInstance() returns the same instance", () => {
    configLoader = ConfigurationLoader.getInstance(correctFixtureFilePath);

    assert.strictEqual(configLoader, ConfigurationLoader.getInstance(correctFixtureFilePath));
  });

  suite("save()", () => {
    test("Writes to file successfully", () => {
      configLoader = ConfigurationLoader.getInstance(correctFixtureFilePath);

      const expectedJson: any = {
        keystrokes: [
          {
            key: "a",
            timestampInMilliseconds: 0,
          },
          {
            key: "b",
            timestampInMilliseconds: 0,
          },
        ],
      };
      const actualJson = TestUtils.readFixture(correctFixtureFilePath);

      // todo: problem = the test overwrites the fixture file everytime :(
      configLoader.save(expectedJson);

      assert.deepStrictEqual(actualJson, expectedJson);
    });
  });

  suite("load()", () => {
    // test("Reads from file successfully", () => {
    //   configLoader = ConfigurationLoader.getInstance(correctFixtureFilePath);
    //   assert.strictEqual(configLoader["_filePath"], correctFixtureFilePath);
    //   const expectedJson: any = TestUtils.readFixture(correctFixtureFilePath);
    //   const actualJson: any = configLoader.load();
    //   assert.deepStrictEqual(actualJson, expectedJson);
    // });
  });
});
