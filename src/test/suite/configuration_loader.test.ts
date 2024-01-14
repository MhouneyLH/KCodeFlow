import * as assert from "assert";
import { ConfigurationLoader } from "../../libs/configuration_loader";
import { KeystrokeRepository } from "../../libs/keystroke_repository";

suite("ConfigurationLoader Test Suite", () => {
  let repository: any;
  let configLoader: any;

  setup(() => {
    repository = KeystrokeRepository.getInstance();
    configLoader = ConfigurationLoader.getInstance(repository);
  });

  teardown(() => {
    configLoader = null;
    repository = null;
  });

  test("getInstance() returns the same instance", () => {
    assert.strictEqual(configLoader, ConfigurationLoader.getInstance(repository));
  });

  suite("load()", () => {
    // test("Can readout clean data from a config file", () => {
    //   // todo: so hier umstrukturieren
    //   const actualJson = configLoader.load();
    //   const expectedJson = {
    //     keystrokes: [
    //       {
    //         key: "a",
    //         timestampInMilliseconds: 1000,
    //       },
    //       {
    //         key: "b",
    //         timestampInMilliseconds: 2000,
    //       },
    //     ],
    //   };
    //   assert.deepStrictEqual(actualJson, expectedJson);
    // });
    // test("Can readout clean data from a config file", () => {")
  });

  suite("save()", () => {
    // test("", () => {});
  });
});
